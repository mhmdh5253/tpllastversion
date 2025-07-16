using BE;
using BE.LetterAutomation;
using BE.Ticketing.SupportTicketSystem.Models;
using BE.Tokening;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL
{
    public class Db : IdentityDbContext<ApplicationUser, ApplicationRole, string, ApplicationUserClaim,
        ApplicationUserRole, ApplicationUserLogin, ApplicationRoleClaim, ApplicationUserToken>
    {
        private readonly IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

        public Db()
        {
        }

        public Db(DbContextOptions<Db> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("CON1"));
            }
            base.OnConfiguring(optionsBuilder);
        }
        public DbSet<BE.Wallet> Wallets { get; set; }
        public DbSet<WalletTransaction> WalletTransactions { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Letter> Letters { get; set; }
        public DbSet<Kelasehnameh> Kelasehnamehha { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<LetterApproval> LetterApprovals { get; set; }
        public DbSet<UserOrganization> UserOrganizations { get; set; }
        public DbSet<LetterReferral> LetterReferrals { get; set; }
        public DbSet<LetterAction> LetterActions { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            builder.Entity<Ticket>()
                .HasMany(t => t.Comments)
                .WithOne(c => c.Ticket)
                .HasForeignKey(c => c.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationUser>(b =>
                {
                    b.ToTable("Users");
                    b.Property(user => user.Email).HasMaxLength(260);

                    // افزودن ویژگی‌های جدید به ApplicationUser در صورت نیاز
                    b.Property(user => user.FirstName).HasMaxLength(250);
                    b.Property(user => user.LastName).HasMaxLength(250);
                    b.Property(user => user.Ostan).HasMaxLength(250);
                    b.Property(user => user.AccountType).HasMaxLength(20);
                    b.Property(user => user.CompanyName).HasMaxLength(300);
                    b.Property(user => user.Address).HasMaxLength(450);

                    b.HasMany(e => e.Claims)
                        .WithOne(e => e.User)
                        .HasForeignKey(uc => uc.UserId)
                        .IsRequired();

                    b.HasMany(e => e.Logins)
                        .WithOne(e => e.User)
                        .HasForeignKey(ul => ul.UserId)
                        .IsRequired();

                    b.HasMany(e => e.Tokens)
                        .WithOne(e => e.User)
                        .HasForeignKey(ut => ut.UserId)
                        .IsRequired();

                    b.HasMany(e => e.UserRoles)
                        .WithOne(e => e.User)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
                });

            builder.Entity<ApplicationRole>(b =>
            {
                b.ToTable("Roles");

                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                b.HasMany(e => e.RoleClaims)
                    .WithOne(e => e.Role)
                    .HasForeignKey(rc => rc.RoleId)
                    .IsRequired();
            });
            builder.Entity<Letter>()
                .HasOne(l => l.RelatedLetter)
                .WithMany()
                .HasForeignKey(l => l.RelatedLetterId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Kelasehnameh>()
                .HasOne(k => k.User)
                .WithMany() // اگر رابطه معکوس نیاز ندارید
                .HasForeignKey(k => k.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}