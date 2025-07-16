using BE.LetterAutomation;
using BE.Ticketing.SupportTicketSystem.Models;
using Microsoft.AspNetCore.Identity;

namespace BE
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Ostan { get; set; }
        public string? AccountType { get; set; }
        public string? CompanyName { get; set; }
        public string? NameEdareh { get; set; }
        public string? Semat { get; set; }
        public string? Address { get; set; }
        public string? Emza { get; set; }
        public bool HaqEmza { get; set; } = false;
        public int? OrganizationId { get; set; }
        public virtual Organization? Organization { get; set; }
        public virtual ICollection<ApplicationUserClaim>? Claims { get; set; }
        public virtual ICollection<ApplicationUserLogin>? Logins { get; set; }
        public virtual ICollection<ApplicationUserToken>? Tokens { get; set; }
        public virtual ICollection<ApplicationUserRole>? UserRoles { get; set; }
        public ICollection<Ticket>? CreatedTickets { get; set; }
        public ICollection<Ticket>? AssignedTickets { get; set; }
        public ICollection<TicketComment>? Comments { get; set; }
        public ICollection<Notification>? Notifications { get; set; }

    }

}