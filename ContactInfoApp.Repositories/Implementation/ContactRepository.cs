namespace ContactInfoApp.Repositories.Implementation
{
    using ContactInfoApp.Repositories.Interfaces;
    using ContactInfoApp.Data.Entity;

    public class ContactRepository : Repository<Contact>, IContactRepository
    {
        public ContactRepository(ContactInfoAppContext context) : base(context)
        {
        }
    }
}
