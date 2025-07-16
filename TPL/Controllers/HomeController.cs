﻿using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TPLWeb.Models;

namespace TPLWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {

            return View();
            //return RedirectToAction("Login", "Account");
        }


        [HttpGet("privacy/{statusCode}")]
        public IActionResult Privacy(int statusCode)
        {
            return View(statusCode);
        }

        [Route("learning")]
        public IActionResult Learn()
        {
            return View();
        }

        [Route("documentation")]
        public IActionResult Documentation()
        {
            return View();
        }


        [HttpGet("error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }



    }
}