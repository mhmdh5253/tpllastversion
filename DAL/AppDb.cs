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
        private readonly IConfiguration? _configuration;

        public Db()
        {
            // Parameterless constructor for migrations
        }

        public Db(DbContextOptions<Db> options) : base(options)
        {
        }

        public Db(DbContextOptions<Db> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured && _configuration != null)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("CON1"));
            }
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<BE.Wallet> Wallets { get; set; } = null!;
        public DbSet<WalletTransaction> WalletTransactions { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<TicketComment> TicketComments { get; set; } = null!;
        public DbSet<Attachment> Attachments { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Report> Reports { get; set; } = null!;
        public DbSet<Notification> Notifications { get; set; } = null!;
        public DbSet<Token> Tokens { get; set; } = null!;
        public DbSet<Letter> Letters { get; set; } = null!;
        public DbSet<Kelasehnameh> Kelasehnamehha { get; set; } = null!;
        public DbSet<Organization> Organizations { get; set; } = null!;
        public DbSet<LetterApproval> LetterApprovals { get; set; } = null!;
        public DbSet<UserOrganization> UserOrganizations { get; set; } = null!;
        public DbSet<LetterReferral> LetterReferrals { get; set; } = null!;
        public DbSet<LetterAction> LetterActions { get; set; } = null!;
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