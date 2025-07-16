﻿using BE.Ticketing.SupportTicketSystem.Models;
using BLL.Ticketing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TPLWeb.Models.Ticketing;

namespace TPLWeb.Controllers
{
    [Authorize]
    public class TicketUserController : Controller
    {
        private readonly BlTicket _ticketService;
        private readonly BlComment _commentService;
        private readonly BlAttachment _attachmentService;
        private readonly BlNotification _notificationService;
        private readonly BlCategory _category;

        public TicketUserController(
            BlTicket ticketService,
            BlComment commentService,
            BlAttachment attachmentService,
            BlNotification notificationService, BlCategory category)
        {
            _ticketService = ticketService;
            _commentService = commentService;
            _attachmentService = attachmentService;
            _notificationService = notificationService;
            _category = category;
        }

        // داشبورد کاربر
        public async Task<IActionResult> Dashboard()
        {
            var userId = User.FindFirst(global::System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var model = new UserDashboardViewModel
            {
                MyTickets = await _ticketService.GetAllUserTickets(userId),
                Notifications = await _notificationService.GetUserNotifications(userId)
            };

            return View(model);
        }

        // ایجاد تیکت جدید
        public async Task<IActionResult> CreateTicket()
        {
            ViewBag.Categories = await _category.GetAllCategories();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Ticket ticket)
        {
            string idd = User.FindFirst(global::System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!;
            ticket.Category = (await _category.GetAllCategories()).FirstOrDefault(x => x.Id == ticket.CategoryId)!;
            ticket.CreatedByUserId = idd;
            ticket.AssignedToUserId = idd;
            var result = await _ticketService.Create(ticket);

            if (result)
                TempData["Success"] = "تیکت با موفقیت ایجاد شد";
            else
                TempData["Error"] = "خطا در ایجاد تیکت";

            return RedirectToAction("Dashboard");
        }

        // مشاهده تیکت
        public async Task<IActionResult> ViewTicket(int id)
        {
            var ticket = (await _ticketService.GetAllTickets()).FirstOrDefault(t => t.Id == id);
            if (ticket == null)
                return NotFound();

            var comments = await _commentService.GetCommentsByTicket(id.ToString());
            var attachments = await _attachmentService.GetAttachmentsByTicket(id.ToString());

            var model = new TicketViewModel
            {
                Ticket = ticket,
                Comments = comments,
                Attachments = attachments
            };

            return View(model);
        }

        // افزودن نظر
        [HttpPost]
        public async Task<IActionResult> AddComment(TicketComment comment)
        {
            comment.CreatedByUserId = User.FindFirst(global::System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!;
            var result = await _commentService.AddComment(comment);

            if (result)
                TempData["Success"] = "نظر شما با موفقیت ثبت شد";
            else
                TempData["Error"] = "خطا در ثبت نظر";

            return RedirectToAction("ViewTicket", new { id = comment.TicketId });
        }

        // آپلود پیوست
        [HttpPost]
        public async Task<IActionResult> UploadAttachment(IFormFile file, int ticketId)
        {
            var userId = User.FindFirst(global::System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var result = await _attachmentService.UploadAttachment(file, ticketId.ToString(), userId);

            if (result)
                TempData["Success"] = "فایل با موفقیت آپلود شد";
            else
                TempData["Error"] = "خطا در آپلود فایل";

            return RedirectToAction("ViewTicket", new { id = ticketId });
        }
    }
}