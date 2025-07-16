# سیستم مدیریت نامه‌نگاری TPL

## توضیحات
سیستم جامع مدیریت نامه‌نگاری و ارتباطات سازمانی که با استفاده از .NET Core و معماری لایه‌ای پیاده‌سازی شده است.

## ویژگی‌ها
- 📝 مدیریت نامه‌ها و مکاتبات
- 👥 مدیریت کاربران و سازمان‌ها
- 🎫 سیستم تیکتینگ
- 💰 سیستم کیف پول دیجیتال
- 🔐 احراز هویت و مجوزدهی
- 📊 گزارش‌گیری و داشبورد

## تکنولوژی‌های استفاده شده
- **Backend**: .NET 9.0, ASP.NET Core MVC/API
- **Database**: SQL Server, Entity Framework Core
- **Frontend**: Bootstrap 5, jQuery, JavaScript ES6+
- **Authentication**: ASP.NET Core Identity
- **Logging**: Serilog
- **Build Tools**: Gulp, Webpack
- **Package Manager**: npm, NuGet

## پیش‌نیازها
- .NET 9.0 SDK
- SQL Server 2019+
- Node.js 18+
- Visual Studio 2022 یا VS Code

## نصب و راه‌اندازی

### 1. Clone کردن پروژه
```bash
git clone [repository-url]
cd TPL
```

### 2. تنظیم دیتابیس
```bash
# در پوشه اصلی پروژه
dotnet ef database update --project DAL --startup-project TPL
```

### 3. تنظیم User Secrets
```bash
cd TPL
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:CON1" "Server=.;Database=TPL;Trusted_Connection=true;TrustServerCertificate=true"
dotnet user-secrets set "EmailSettings:SmtpHost" "your-smtp-server"
dotnet user-secrets set "EmailSettings:SmtpUsername" "your-email"
dotnet user-secrets set "EmailSettings:SmtpPassword" "your-password"
```

### 4. نصب وابستگی‌های JavaScript
```bash
cd TPL
npm install
```

### 5. Build کردن Assets
```bash
npm run build
```

### 6. اجرای برنامه
```bash
dotnet run --project TPL
```

## ساختار پروژه
```
TPL/
├── BE/                    # Business Entities (Models)
├── BLL/                   # Business Logic Layer
├── DAL/                   # Data Access Layer
├── TPL/                   # Web Application (MVC/API)
│   ├── Controllers/       # MVC Controllers
│   ├── Views/            # Razor Views
│   ├── wwwroot/          # Static Files
│   └── Tools/            # Utility Classes
├── src/                  # Source Assets (SCSS, JS)
└── dist/                 # Compiled Assets
```

## تنظیمات امنیتی

### User Secrets
به جای قرار دادن اطلاعات حساس در `appsettings.json`، از User Secrets استفاده کنید:

```bash
dotnet user-secrets set "ConnectionStrings:CON1" "your-connection-string"
dotnet user-secrets set "EmailSettings:SmtpPassword" "your-email-password"
```

### Environment Variables
در production از متغیرهای محیطی استفاده کنید:
```bash
export ConnectionStrings__CON1="your-production-connection-string"
export EmailSettings__SmtpPassword="your-production-email-password"
```

## دستورات Build

### Development
```bash
npm run build          # Build assets
npm run watch          # Watch for changes
npm run serve          # Dev server with live reload
```

### Production
```bash
npm run build:prod     # Optimized production build
dotnet publish -c Release
```

## مشارکت در پروژه

### Code Style
- از C# Coding Conventions پیروی کنید
- از ESLint برای JavaScript استفاده کنید
- کامنت‌ها را به انگلیسی بنویسید

### Git Workflow
```bash
git checkout -b feature/new-feature
# ایجاد تغییرات
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# ایجاد Pull Request
```

## تست‌ها
```bash
# اجرای تست‌های Unit
dotnet test

# اجرای تست‌های Integration
dotnet test --filter "Category=Integration"
```

## Deployment

### Docker
```dockerfile
# Dockerfile example
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY . .
EXPOSE 80
ENTRYPOINT ["dotnet", "TPL.dll"]
```

### IIS
1. Publish پروژه: `dotnet publish -c Release`
2. فایل‌های خروجی را در IIS قرار دهید
3. Application Pool را به .NET 9.0 تنظیم کنید

## مشکلات شناخته شده
- نیاز به بهینه‌سازی CSS (کاهش !important)
- نیاز به بهبود Error Handling
- نیاز به اضافه کردن Unit Tests

## لایسنس
All Rights Reserved For TPL

## پشتیبانی
برای گزارش باگ یا درخواست ویژگی جدید، Issue ایجاد کنید.

---
**نکته**: قبل از deploy در production، حتماً تمام اطلاعات حساس را از فایل‌های تنظیمات حذف کرده و از User Secrets یا Environment Variables استفاده کنید.