using BE;
using BLL.LetterAutomation;
using BLL.Ticketing;
using BLL.Tokening;
using BLL.Wallet;
using DAL;
using DAL.LetterAutomation;
using DAL.Ticketing;
using DAL.Tokening;
using DAL.Wallet;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using TPLWeb.Tools;
using WebMarkupMin.AspNetCore3;
using static TPLWeb.Tools.RenderViewToString;

namespace TPLWEB
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            // Register DAL
            services.AddScoped<DlLetter>();

            // Register BLL
            services.AddScoped<ILetterService, BlLetter>();

            services.AddControllersWithViews()
                .AddRazorRuntimeCompilation();
            // Configure Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Achar Api", Version = "v1" });

                // فقط کنترلرهای دارای [ApiController] را نمایش دهد
                c.DocInclusionPredicate((docName, apiDesc) =>
                {
                    // بررسی وجود ApiControllerAttribute در متادیتای endpoint
                    return apiDesc.ActionDescriptor.EndpointMetadata
                        .Any(em => em is ApiControllerAttribute);
                });
            });

            // سرویس Identity
            ConfigureIdentity(services);

            // سرویس Logger
            ConfigureLogger();
            //-------------------------------------------------------------------------------------------------------------------
            // سرویس Minify کردن HTML
            ConfigureHtmlMinification(services);

            services.AddResponseCaching();
            services.AddSingleton(HtmlEncoder.Create(new[] { UnicodeRanges.BasicLatin, UnicodeRanges.Arabic }));
            services.AddSerilog();
            services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddHttpClient();
            services.AddProgressiveWebApp();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            
            // سرویس‌های دیگر
            ConfigureAdditionalServices(services);
        }



        private void ConfigureIdentity(IServiceCollection services)
        {
            services.AddDbContext<Db>(options => options.UseSqlServer(Configuration.GetConnectionString("CON1")));
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.User.RequireUniqueEmail = false;
                options.Password.RequireUppercase = true;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireLowercase = true;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.Lockout.AllowedForNewUsers = false;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(20);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Stores.ProtectPersonalData = false;
                options.SignIn.RequireConfirmedAccount = false; // غیر الزامی کردن تایید حساب
            })
            .AddEntityFrameworkStores<Db>()
            .AddDefaultTokenProviders()
            .AddErrorDescriber<PersianIdentityErrors>();

            services.ConfigureApplicationCookie(options =>
            {
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.LoginPath = "/Account/Login";
                options.LogoutPath = "/Account/LogOut";
                options.Cookie.HttpOnly = false;
                options.ExpireTimeSpan = TimeSpan.FromDays(10);
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy => policy.RequireRole("SuperAdmin"));
            });
        }

        private void ConfigureLogger()
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Seq(Configuration.GetConnectionString("SeqLoging")!)
                .CreateLogger();
        }

        private void ConfigureHtmlMinification(IServiceCollection services)
        {

            services.AddWebMarkupMin(options =>
            {
                options.AllowCompressionInDevelopmentEnvironment = true;
                options.AllowMinificationInDevelopmentEnvironment = true;
            })
                .AddHtmlMinification()
                .AddHttpCompression()
                .AddXhtmlMinification()
                .AddXmlMinification();
        }

        private void ConfigureAdditionalServices(IServiceCollection services)
        {
            // سایر سرویس‌ها
            services.AddSingleton<ControllerActionService>();
            services.AddTransient<ISmsSender, SmsSender>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IViewRenderService, ViewRenderService>();
            services.AddScoped<IWalletRepository, WalletRepository>();
            services.AddScoped<BlWallet>();
            services.AddDataProtection();
            // Register repositories
            services.AddScoped<ITicketService, DlTicket>();
            services.AddScoped<BlTicket>();
            services.AddScoped<DlTicket>();
            services.AddScoped<ICommentService, DlComment>();
            services.AddScoped<BlComment>();
            services.AddScoped<DlComment>();
            services.AddScoped<IAttachmentService, DlAttachment>();
            services.AddScoped<BlAttachment>();
            services.AddScoped<DlAttachment>();
            services.AddScoped<ICategoryService, DlCategory>();
            services.AddScoped<BlCategory>();
            services.AddScoped<DlCategory>();
            services.AddScoped<ITicketReport, DlTicketReport>();
            services.AddScoped<BlTicketReport>();
            services.AddScoped<DlTicketReport>();
            services.AddScoped<INotificationService, DlNotification>();
            services.AddScoped<BlNotification>();
            services.AddScoped<DlNotification>();
            services.AddScoped<ITokenRepository, DlToken>();
            services.AddScoped<BlToken>();
            services.AddScoped<DlToken>();
            services.AddScoped<IKelasehnamehRepository, DlKelasehnameh>();
            services.AddScoped<DlKelasehnameh>();
            services.AddScoped<Blkelaseh>();
            services.AddScoped<IOrganizationRepository, DlOrganization>();
            services.AddScoped<DlOrganization>();
            services.AddScoped<BlRecivers>();
            services.AddScoped<ILetterApprovalService, LetterApprovalService>();
            services.AddScoped<LetterApprovalService>();
            services.AddScoped<BlLetterApprovalService>();
            services.AddScoped<IApprovalService, ApprovalService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<OrganizationService>();
            services.AddScoped<ApprovalService>();
            services.AddScoped<BlLetter>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Db dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Main Web v1");
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            //برای ثبت تغییرات ایجاد شده توسط میگریشن ها
            dbContext.Database.Migrate();

            app.UseHttpsRedirection();
            app.UseResponseCaching();
            app.UseWebMarkupMin();
            var cachePeriod = "31536000";
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                    ctx.Context.Response.Headers.Append("Expires", new DateTimeOffset(DateTime.UtcNow.AddYears(1)).ToString("R"));
                }
            });
            app.UseSession();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<PermissionMiddleware>();
            app.UseHttpsRedirection();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
