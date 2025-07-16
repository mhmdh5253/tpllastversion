using BE;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TPLWeb.Models;
using TPLWeb.Models.ManageUser;

namespace TPLWeb.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    public class ManageUserController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly Db _context;


        public ManageUserController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager, Db context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var model = _userManager.Users.Include(u => u.UserRoles).Include(x=>x.Organization)
                .Select(u => new UsersListViewNodel
                {
                    UserId = u.Id,
                    UserName = u.UserName!,
                    Email = u.Email!,
                    PhoneNumber = u.PhoneNumber!,
                    FirstName = u.FirstName!,
                    LastName = u.LastName!,
                    Ostan = u.Ostan!,
                    UserRoles = u.UserRoles!,
                    Organization = u.Organization
                }).ToList();
            return View(model);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        public async Task<IActionResult> EditUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var model = new EditViewModel
            {
                Id = user.Id,
                UserName = user.UserName!,
                Phone = user.PhoneNumber!,
                Email = user.Email!,
                FirstName = user.FirstName!,
                LastName = user.LastName!,
                Ostan = user.Ostan!,
                Emza = user.Emza,
                AccountType = user.AccountType,
                Address = user.Address,
                CompanyName = user.CompanyName,
                HaqEmza = user.HaqEmza,
                NameEdareh = user.NameEdareh,
                Semat = user.Semat,
            };

            var rolesList = _roleManager.Roles
                .Select(r => new RolesViewModel
                {
                    Id = r.Id,
                    roleName = r.Name!
                })
                .ToList();

            ViewBag.Roles = rolesList;
            ViewBag.UserRoles = await _userManager.GetRolesAsync(user);
            return View(model);
        }
        // اضافه کردن متدهای زیر به کنترلر موجود

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        public   IActionResult AddUser()
        {
            var model = new AddViewModel();

            var rolesList = _roleManager.Roles
                .Select(r => new RolesViewModel
                {
                    Id = r.Id,
                    roleName = r.Name!
                })
                .ToList();

            ViewBag.Roles = rolesList;
            return View(model);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUser(AddViewModel model, List<string> SelectedRoles)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.Phone,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Ostan = model.Ostan,
                    CompanyName = model.CompanyName,
                    NameEdareh = model.NameEdareh,
                    Semat = model.Semat,
                    HaqEmza = model.HaqEmza,
                    AccountType = model.AccountType,
                    Address = model.Address
                    ,EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                };

                // Handle signature upload
                if (model.EmzaPic != null && model.EmzaPic.Length > 0)
                {
                    // Create signatures directory if it doesn't exist
                    var signaturesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "signatures");
                    if (!Directory.Exists(signaturesPath))
                    {
                        Directory.CreateDirectory(signaturesPath);
                    }

                    // Generate unique filename
                    var fileName = $"signature_{Guid.NewGuid()}_{DateTime.Now:yyyyMMddHHmmss}{Path.GetExtension(model.EmzaPic.FileName)}";
                    var filePath = Path.Combine(signaturesPath, fileName);

                    // Save the file
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.EmzaPic.CopyToAsync(stream);
                    }

                    // Update user's signature path (store relative path)
                    user.Emza = fileName;
                }

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Assign selected roles
                    if (SelectedRoles != null && SelectedRoles.Any())
                    {
                        await _userManager.AddToRolesAsync(user, SelectedRoles);
                    }

                    return RedirectToAction("Index");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // Prepare view data for return in case of error
            var rolesList = _roleManager.Roles
                .Select(r => new RolesViewModel
                {
                    Id = r.Id,
                    roleName = r.Name!
                })
                .ToList();

            ViewBag.Roles = rolesList;
            return View(model);
        }
        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditUser(EditViewModel model, List<string> SelectedRoles)
        {
            ApplicationUser user = null;
            if (model.UserName == model.Phone)
            {
                 user = (await _userManager.Users.FirstOrDefaultAsync(x=>x.UserName==model.Phone))!;
            }
            if (model.UserName != model.Phone)
            {
                user = (await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == model.Phone))!;
            }
            else
            {
                 user = (await _userManager.FindByNameAsync(model.UserName!))!;

            }
            if (user == null)
            {
                return NotFound();
            }

            // Update basic user info
            user.UserName = model.UserName;
            user.PhoneNumber = model.Phone;
            user.Email = model.Email;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Ostan = model.Ostan;
            user.CompanyName = model.CompanyName;
            user.NameEdareh = model.NameEdareh;
            user.Semat = model.Semat;
            user.HaqEmza = model.HaqEmza;
            user.EmailConfirmed = true;
            user.PhoneNumberConfirmed = true;
            user.AccountType = model.AccountType;
            user.Address = model.Address;
            // Handle signature upload
            if (model.EmzaPic != null && model.EmzaPic.Length > 0)
            {
                // Create signatures directory if it doesn't exist
                var signaturesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "signatures");
                if (!Directory.Exists(signaturesPath))
                {
                    Directory.CreateDirectory(signaturesPath);
                }

                // Generate unique filename
                var fileName = $"signature_{user.Id}_{DateTime.Now:yyyyMMddHHmmss}{Path.GetExtension(model.EmzaPic.FileName)}";
                var filePath = Path.Combine(signaturesPath, fileName);

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.EmzaPic.CopyToAsync(stream);
                }

                // Update user's signature path (store relative path)
                user.Emza = $"{fileName}";
            }


            var result = await _userManager.UpdateAsync(user);

            // Update password if provided
            if (model.Password != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result2 = await _userManager.ResetPasswordAsync(user, token, model.Password);
                foreach (var error in result2.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // Update user roles
            var userRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, userRoles);

            if (SelectedRoles != null && SelectedRoles.Any())
            {
                await _userManager.AddToRolesAsync(user, SelectedRoles);
            }

            if (result.Succeeded)
            {
                return RedirectToAction("index", "ManageUser");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            // Prepare view data for return in case of error
            var rolesList = _roleManager.Roles
                .Select(r => new RolesViewModel
                {
                    Id = r.Id,
                    roleName = r.Name!
                })
                .ToList();

            ViewBag.Roles = rolesList;
            ViewBag.UserRoles = await _userManager.GetRolesAsync(user);

            return View(model);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = _userManager.Users.Include(x => x.Organization)
                .FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            // First delete or handle related Kelasehnamehha records
            var relatedRecords = _context.Kelasehnamehha.Where(x => x.UserId == id);
            _context.Kelasehnamehha.RemoveRange(relatedRecords);
            await _context.SaveChangesAsync();

            // Then delete the user
            await _userManager.DeleteAsync(user);

            return RedirectToAction("Index");
        }
    }
}