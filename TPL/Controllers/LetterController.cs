using BE;
using BE.LetterAutomation;
using BLL.LetterAutomation;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.Json;
using TPLWeb.Tools;
using Image = System.Drawing.Image;

namespace TPLWeb.Controllers
{
    [Authorize]
    [Route("Letter")]
    public class LetterController : Controller
    {
        private readonly ILetterService _letterService;
        private readonly Db _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<LetterController> _logger;
        private readonly BlRecivers _recivers;

        public LetterController(ILetterService letterService, Db context, UserManager<ApplicationUser> userManager,
            IWebHostEnvironment environment, ILogger<LetterController> logger, BlRecivers recivers)
        {
            _letterService = letterService;
            _context = context;
            _userManager = userManager;
            _environment = environment;
            _logger = logger;
            _recivers = recivers;
        }

        [HttpGet("letterviewpdf")]
        public async Task<IActionResult> ViewLetterPdf(int id)
        {
            await LetterGenerate(id);
            //Validate the file name/ path here for security
            var WordfilePath = Path.Combine(_environment.WebRootPath, "wordfiles", $"{id}.docx");
            var PdffilePath = Path.Combine(_environment.WebRootPath, "wordfiles", $"{id}.pdf");

            if (!global::System.IO.File.Exists(WordfilePath) || !global::System.IO.File.Exists(PdffilePath))
            {
                await LetterGenerate(id);
            }

            ViewBag.LetterNumber = id;

            return View();
        }

        [HttpGet("lettergenerate")]
        public async Task<IActionResult> LetterGenerate(int id)
        {
            var model = await _letterService.GetLetterByIdAsync(id);
            var res = (Letter)model.Data!;
            var engine = new LetterTemplateEngine();
            // 1. آماده‌سازی داده‌های جایگزین
            var textReplacements = new Dictionary<string, string>
            {
                { "DATE", res!.RegistrationDate.ToString("yyyy/MM/dd") },
                { "SENDER",await _recivers.GetReceiverFullPath(res.Sender) },
                { "RECIVER", await _recivers.GetReceiverFullPath(res.Receiver) },
                { "SUBJECT", res.Subject },
                { "PRIORITY", res.Priority.ToString() },
                { "CLASSIFICATION", res.Classification.ToString() },
                { "LETTERNUMBER", res?.LetterNumber ?? " " },
                { "SEMAT", res?.SignerPosition ?? " " },
                { "SIGNER", res?.SignerName ?? " " },
                { "CONTENT", res!.Content },
                { "Evaluation Warning: The document was created with Spire.Doc for", "" },
            };
            var signerr = _userManager.Users.FirstOrDefault(x => x.UserName == res.SignerUserName);

            // 2. آماده‌سازی تصاویر (اختیاری)
            var imageReplacements = new Dictionary<string, Image>
            {

                {
                    "SIGNIMAGE",
                    global::System.Drawing.Image.FromFile(Path.Combine(_environment.WebRootPath, "signatures",
                        signerr!.Emza))
                }

            };
            // 3. آماده‌سازی جداول
            var tableReplacements = new Dictionary<string, TableData>();

            // جدول اطلاعات نامه
            var letterInfoTable = new TableData(4, 2);
            letterInfoTable.FillData(new string[,]
            {
                { "تاریخ:", "{DATE}" },
                { "اولویت:", "{PRIORITY}" },
                { "محرمانگی:", "{CLASSIFICATION}" },
                { "شماره نامه:", "{LETTERNUMBER}" }
            });
            tableReplacements.Add("{LETTERINFO}", letterInfoTable);
            var letterpath = res.LetterNumber!.Replace("-","").ToString() ?? res.Id.ToString();
            string pathtemplatePath = Path.Combine(_environment.WebRootPath, "WordTemplate", "Doc1.docx");
            string pathfinalCombine = Path.Combine(_environment.WebRootPath, "wordfiles", letterpath);
            // 4. تولید سند نهایی
            engine.GenerateLetterFromTemplate(
                templatePath: pathtemplatePath,
                outputPath: pathfinalCombine,
                textReplacements: textReplacements,
                tableReplacements: tableReplacements,
                imageReplacements: imageReplacements

            );

            Console.WriteLine($"doc is created {letterpath}!");
            TempData["LetterDownloadLink"] = letterpath + ".docx";
            return Json(new { fileId =letterpath });
        }


        [HttpGet("letterview")]
        public async Task<IActionResult> LetterView(int id)
        {
            var model = await _letterService.GetLetterByIdAsync(id);
            return View((Letter)model.Data!);
        }



        [HttpGet("Letters")]
        public  IActionResult Index()
        {
            ViewData["Title"] = "کارتابل نامه های وارده";
            return View();
        }


        [HttpGet("Elanat")]
        public async Task<IActionResult> TabloElanat()
        {
            var result = await _letterService.GetAllLettersAsync();
            var res = (List<Letter>)result.Data!;
            var model = res.Where(x => x.IsDeleted != true &&x.ShowOnDashboard && x.Status == LetterStatus.Approved).ToList();
            if (!result.Success)
            {
                TempData["ErrorMessage"] = result.Message;
            }

            ViewData["Title"] = "تابلو اعلانات";
            TempData["vaziat"] = null;
            return View(nameof(Index), model);
        }


        [HttpGet("NamehhayeSadereh")]
        public async Task<IActionResult> KartableSadereh()
        {
            var result = await _letterService.GetAllLettersAsync();
            var res = (List<Letter>)result.Data!;
            var model = res.Where(x => x.IsDeleted != true && x.Username == User.Identity!.Name && x.Status == LetterStatus.Pending ||
                                       x.Status==LetterStatus.Rejected || x.Status == LetterStatus.InReview ||
                                       x.Status == LetterStatus.Returned ).ToList();
            if (!result.Success)
            {
                TempData["ErrorMessage"] = result.Message;
            }

            ViewData["Title"] = "کارتابل نامه های صادره";
            TempData["vaziat"] = "kartable";
            return View(nameof(Index), model);
        }


        [HttpGet("NamehhayeVaredeh")]
        public async Task<IActionResult> KartableVaredeh()
        {
            var currentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);
            if (currentUser == null)
            {
                TempData["ErrorMessage"] = "کاربر یافت نشد.";
                return RedirectToAction(nameof(KartableVaredeh));
            }

            var userOrganization = await _context.UserOrganizations
                .Include(c => c.Organization)
                .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            if (userOrganization?.Organization == null || userOrganization.IsActive==false)
            {
                TempData["ErrorMessage"] = "سازمان کاربر یافت نشد.";
                return RedirectToAction(nameof(KartableVaredeh));
            }

            var result = await _letterService.GetAllLettersAsync();
            if (!result.Success)
            {
                TempData["ErrorMessage"] = result.Message;
                return RedirectToAction(nameof(KartableVaredeh));
            }

            var userorgid = userOrganization.Organization.Id;
            var letters = (List<Letter>)result.Data!;
            var model = letters.Where(x =>
                !x.IsDeleted&&
                x.Status != LetterStatus.Deleted &&
                x.Status != LetterStatus.Pending &&
                x.Status != LetterStatus.Archived &&
                x.Status != LetterStatus.InReview &&
                x.Status != LetterStatus.Returned &&
                x.Status != LetterStatus.Rejected &&
                (x.Receiver == userorgid.ToString() ||  // یا گیرنده مستقیم است
                 (x.CopyReceivers != null &&  // یا در رونوشت‌ها وجود دارد
                  !string.IsNullOrEmpty(x.CopyReceivers.FirstOrDefault()) &&
                  x.CopyReceivers.FirstOrDefault()!
                      .Split(',', StringSplitOptions.RemoveEmptyEntries)
                      .Any(c => c.Equals(userorgid.ToString()))))
            ).ToList();

            ViewData["Title"] = "کارتابل نامه های وارده";
            TempData["vaziat"] = null;
            return View(nameof(Index), model);
        }
        [HttpGet("Answerletter")]
        public async Task<IActionResult> AnswerLetter(int letterid)
        {
            var let =await _context.Letters.Where(x => x.Id == letterid).FirstOrDefaultAsync();
            ViewBag.ParentOrganizations = _context.Organizations
                .Where(o => o.IsActive)
                .ToList();
            ViewBag.relatedtext  = $"{let!.LetterNumber}-{let.Subject}";
            return View(nameof(Create),new Letter()
            {
                LetterRelationType=LetterRelationType.پاسخ,
                RelatedLetterId = letterid,
                Content = $"با احترام در پاسخ به نامه شماره {let.LetterNumber} مورخ {let.RegistrationDate.ToString("yyyy/MM/dd")} :"
            });
        }
        [HttpGet("Followup")]
        public async Task<IActionResult> Followup(int letterid)
        {
            var let = await _context.Letters.Where(x => x.Id == letterid).FirstOrDefaultAsync();
            ViewBag.ParentOrganizations = _context.Organizations
                .Where(o => o.IsActive)
                .ToList();
            ViewBag.relatedtext = $"{let!.LetterNumber}-{let.Subject}";
            return View(nameof(Create), new Letter()
            {
                LetterRelationType = LetterRelationType.پیرو,
                RelatedLetterId = letterid,
                Content = $"با احترام پیرو نامه شماره {let.LetterNumber} مورخ {let.RegistrationDate.ToString("yyyy/MM/dd")} :"
            });
        }
        [HttpGet("createnewletter")]
        public IActionResult Create()
        {
            ViewBag.ParentOrganizations = _context.Organizations
                .Where(o => o.IsActive)
                .ToList();
            return View(new Letter());
        }

       

        [HttpPost("createnewletter")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Letter letter)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // تنظیم اطلاعات کاربر امضا کننده
                    var user = await _userManager.FindByIdAsync(letter.SignerName);
                    if (user != null)
                    {
                        letter.SignerPosition = user.Semat;
                        letter.SignerName = $"{user.FirstName} {user.LastName}";
                        letter.SignerUserName = user.UserName;
                        letter.Username = User.Identity!.Name;
                    }

                    // مدیریت نامه مرتبط
                    if (letter.RelatedLetterId.HasValue)
                    {
                        letter.RelatedLetter = await _context.Letters
                            .FirstOrDefaultAsync(x => x.Id == letter.RelatedLetterId.Value);
                    }

                    // تنظیم توضیح کلاسه
                    if (!string.IsNullOrEmpty(letter.FileCode) && int.TryParse(letter.FileCode, out int fileCode))
                    {
                        var kelaseh = await _context.Kelasehnamehha
                            .FirstOrDefaultAsync(x => x.CodeKelaseh == fileCode);

                        if (kelaseh != null)
                        {
                            letter.FileDescription = kelaseh.NameKelaseh;
                        }
                    }

                    // پردازش کلیدواژه‌ها
                    if (!string.IsNullOrEmpty(letter.Keywords))
                    {
                        try
                        {
                            letter.KeywordsList = JsonDocument.Parse(letter.Keywords)
                                .RootElement
                                .EnumerateArray()
                                .Select(e => e.GetProperty("value").GetString())
                                .Where(x => !string.IsNullOrEmpty(x))
                                .ToList()!;
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error parsing keywords");
                            letter.KeywordsList = new List<string>();
                        }
                    }

                    // پردازش گیرندگان رونوشت
                    if (letter.CopyReceivers != null && letter.CopyReceivers.Count >= 1)
                    {
                        var receiverIds = letter.CopyReceivers.FirstOrDefault()?
                            .Split(',', StringSplitOptions.RemoveEmptyEntries);

                        if (receiverIds != null)
                        {
                            foreach (string id in receiverIds)
                            {
                                if (int.TryParse(id.Trim(), out int orgId))
                                {
                                    var org = await _context.Organizations
                                        .FirstOrDefaultAsync(x => x.Id == orgId);

                                    if (org != null && !letter.CopyReceiversList.Any(x => x.Id == orgId))
                                    {
                                        letter.CopyReceiversList.Add(org);
                                    }
                                }
                            }
                        }
                    }

                    // تنظیم وضعیت اولیه
                    letter.Status = LetterStatus.Pending;
                    letter.RegistrationDate = DateTime.Now;
                    letter.LastModifiedDate = DateTime.Now;
                    letter.LastModifiedBy = User.Identity!.Name;
                    
                    // ذخیره نامه
                    var result = await _letterService.CreateLetterAsync(letter);
                    if (result.Success)
                    {
                        TempData["SuccessMessage"] = result.Message;
                        return RedirectToAction(nameof(KartableVaredeh));
                    }

                    TempData["ErrorMessage"] = result.Message;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error creating new letter");
                    TempData["ErrorMessage"] = "خطا در ایجاد نامه. لطفاً دوباره تلاش کنید.";
                }
            }
            else
            {
                TempData["ErrorMessage"] = "اطلاعات وارد شده معتبر نیستند.";
            }

            ViewBag.ParentOrganizations = _context.Organizations
                .Where(o => o.IsActive)
                .ToList();
            return View(letter);
        }

        [HttpGet("EditLetter")]
        public async Task<IActionResult> Edit(int id)
        {
            var result = await _letterService.GetLetterByIdAsync(id);
            if (!result.Success)
            {
                TempData["ErrorMessage"] = result.Message;
                return RedirectToAction(nameof(KartableVaredeh));
            }

            var letter = (Letter)result.Data!;
            if (!letter.CopyReceivers.FirstOrDefault().IsNullOrEmpty())
            {
                letter.CopyReceiversList.Clear();
                List<string> recivers = letter?.CopyReceivers?.FirstOrDefault()!.Split(',', StringSplitOptions.None).ToList()!;
                foreach (var item in recivers)
                {
                    letter!.CopyReceiversList.Add(await _context.Organizations.FirstOrDefaultAsync(x => x.Id == int.Parse(item)));
                }
            }
           
            ViewBag.ParentOrganizations = await _context.Organizations
                .Where(o => o.IsActive)
                .ToListAsync();

            return View(letter);
        }

        [HttpPost("EditLetter")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Letter letter)
        {
            if (id != letter.Id)
            {
                TempData["ErrorMessage"] = "نامه پیدا نشد و یا حذف شده است";

                return RedirectToAction(nameof(KartableVaredeh));
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // دریافت نامه فعلی از دیتابیس
                    var existingLetter = await _context.Letters
                        .Include(l => l.CopyReceiversList)
                        .FirstOrDefaultAsync(l => l.Id == id);

                    if (existingLetter == null)
                    {
                        return NotFound();
                    }
                    var user = await _userManager.FindByIdAsync(letter.SignerName);
                    // به روزرسانی فیلدها
                    existingLetter.CorrespondenceType = letter.CorrespondenceType;
                    existingLetter.Classification = letter.Classification;
                    existingLetter.Priority = letter.Priority;
                    existingLetter.LetterRelationType = letter.LetterRelationType;
                    existingLetter.RelatedLetterId = letter.RelatedLetterId;
                    existingLetter.FollowUpDate = letter.FollowUpDate;
                    existingLetter.ShowOnDashboard = letter.ShowOnDashboard;
                    existingLetter.FileCode = letter.FileCode;
                    existingLetter.FileDescription = letter.FileDescription;
                    existingLetter.Subject = letter.Subject;
                    existingLetter.Content = letter.Content;
                    existingLetter.SignerName = $"{user!.FirstName} {user.LastName}";
                    existingLetter.SignerPosition = letter.SignerPosition;
                    existingLetter.Receiver = letter.Receiver;
                    existingLetter.Keywords = letter.Keywords;
                    existingLetter.CopyReceivers = letter.CopyReceivers;
                    // مدیریت پیوست
                    if (!string.IsNullOrEmpty(letter.AttachmentName))
                    {
                        existingLetter.AttachmentName = letter.AttachmentName;
                    }

                    // مدیریت گیرندگان رونوشت
                    if (!letter.CopyReceivers.FirstOrDefault().IsNullOrEmpty())
                    {
                        existingLetter.CopyReceiversList.Clear();

                        var receiverIds = letter.CopyReceivers.FirstOrDefault()!.Split(',', StringSplitOptions.None);
                        foreach (string idStr in receiverIds)
                        {
                            if (int.TryParse(idStr.Trim(), out int orgId))
                            {
                                var org = await _context.Organizations.FirstOrDefaultAsync(x => x.Id == orgId);
                                if (org != null)
                                {
                                    existingLetter.CopyReceiversList.Add(org);
                                }
                            }
                        }
                    }

                    // به روزرسانی اطلاعات ویرایش
                    existingLetter.LastModifiedDate = DateTime.Now;
                    existingLetter.LastModifiedBy = User.Identity?.Name;

                    var result = await _letterService.UpdateLetterAsync(existingLetter);
                    if (result.Success)
                    {
                        TempData["SuccessMessage"] = result.Message;
                        return RedirectToAction("KartableVaredeh");
                    }

                    TempData["ErrorMessage"] = result.Message;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error editing letter");
                    TempData["ErrorMessage"] = "خطا در ویرایش نامه. لطفاً دوباره تلاش کنید.";
                }
            }
            else
            {
                TempData["ErrorMessage"] = "اطلاعات وارد شده معتبر نیستند.";
            }

            ViewBag.ParentOrganizations = await _context.Organizations
                .Where(o => o.IsActive)
                .ToListAsync();
            return View(letter);
        }

        [HttpPost("RemoveAttachment")]
        public async Task<IActionResult> RemoveAttachment(int id)
        {
            try
            {
                var letter = await _context.Letters.FindAsync(id);
                if (letter == null)
                {
                    return Json(new { success = false, message = "نامه مورد نظر یافت نشد" });
                }

                // حذف فایل فیزیکی
                if (!string.IsNullOrEmpty(letter.AttachmentName))
                {
                    var filePath = Path.Combine(_environment.WebRootPath, "PeyvastNameha", letter.AttachmentName);
                    if (global::System.IO.File.Exists(filePath))
                    {
                        global::System.IO.File.Delete(filePath);
                    }
                }

                letter.AttachmentName = null;
                await _context.SaveChangesAsync();

                return Json(new { success = true, message = "پیوست با موفقیت حذف شد" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing attachment");
                return Json(new { success = false, message = "خطا در حذف پیوست" });
            }
        }




        [HttpGet("DeleteLetter")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _letterService.GetLetterByIdAsync(id);
            if (!result.Success)
            {
                TempData["ErrorMessage"] = result.Message;
                return RedirectToAction(nameof(Index));
            }

            return View(result.Data);
        }

        [HttpPost("DeleteLetter")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var result = await _letterService.DeleteLetterAsync(id);
            if (result.Success)
            {
                TempData["SuccessMessage"] = result.Message;
            }
            else
            {
                TempData["ErrorMessage"] = result.Message;
            }

            return RedirectToAction(nameof(KartableVaredeh));
        }

        [HttpPost("Search")]
        public async Task<IActionResult> SearchLetters([FromBody] LetterSearchModel model)
        {
            try
            {
                // اعتبارسنجی مدل
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "داده‌های ارسالی معتبر نیستند",
                        errors = ModelState.Values.SelectMany(v => v.Errors)
                    });
                }

                var results = await _letterService.SearchLettersAsync(new LetterSearchParams
                {
                    Subject = model.Subject,
                    LetterNumber = model.LetterNumber,
                    FromDate = model.FromDate,
                    ToDate = model.ToDate
                });


                return Ok(new
                {
                    Success = true,
                    Message = "جستجو با موفقیت انجام شد",
                    Data = results // ارسال مستقیم نتایج بدون لایه اضافی
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "خطا در انجام جستجو",
                    error = ex.Message
                });
            }
        }

      
        [HttpPost("UploadFile")]
        [RequestSizeLimit(500 * 1024 * 1024)] // 500 MB
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return Json(new { success = false, message = "فایلی انتخاب نشده است." });
            }

            if (file.Length > 500 * 1024 * 1024) // 500 MB
            {
                return Json(new { success = false, message = "حجم فایل نباید بیش از 500 مگابایت باشد." });
            }

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "PeyvastNameha");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Json(new { success = true, filePath = uniqueFileName });
        }


        public class LetterSearchModel
        {
            public string? Subject { get; set; }
            public string? LetterNumber { get; set; }
            public string? FromDate { get; set; }
            public string? ToDate { get; set; }
        }

        public class KeywordItem
        {
            public string Key { get; set; }
            public string Value { get; set; }
        }



        [HttpGet("AdvancedSearch")]
        public IActionResult AdvancedSearch()
        {
            // پر کردن لیست‌های dropdown
            ViewBag.Priorities = Enum.GetValues(typeof(PriorityType)).Cast<PriorityType>();
            ViewBag.Classifications = Enum.GetValues(typeof(ClassificationType)).Cast<ClassificationType>();
            ViewBag.Statuses = Enum.GetValues(typeof(LetterStatus)).Cast<LetterStatus>();
            ViewBag.CorrespondenceTypes = Enum.GetValues(typeof(CorrespondenceType)).Cast<CorrespondenceType>();

            return View();
        }

        [HttpPost("AdvancedSearch")]
        public async Task<IActionResult> AdvancedSearch(AdvancedLetterSearchParams searchParams)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new
                    {
                        success = false,
                        message = "حداقل باید یکی از شروط جستجو پر باشد.",
                    });
                }
                var result = await _letterService.AdvancedSearchLettersAsync(searchParams);

                if (!result.Success)
                    return BadRequest(result.Message);

                var res = (List<AdvancedLetterSearchResult>)result.Data!;
                foreach (AdvancedLetterSearchResult item in res)
                {
                    item.Receiver =await _recivers.GetReceiverFullPath(item.Receiver);
                    item.Sender =await _recivers.GetReceiverFullPath(item.Sender);
                }
                return Ok(new
                {
                    success = result.Success,
                    message = result.Message,
                    data = res // اگر وجود دارد
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in advanced search");
                return StatusCode(500, "خطا در انجام جستجو");
            }
        }


    }
}