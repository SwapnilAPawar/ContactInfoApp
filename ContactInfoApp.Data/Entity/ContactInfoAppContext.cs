namespace ContactInfoApp.Data.Entity
{
    using System.Data.Entity;

    public partial class ContactInfoAppContext : DbContext
    {
        public ContactInfoAppContext()
            : base("name=ContactInfoAppContext")
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Contact>()
                .Property(e => e.Status)
                .IsUnicode(false);
        }
    }
}
