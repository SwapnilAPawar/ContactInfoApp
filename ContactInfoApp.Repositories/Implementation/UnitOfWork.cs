namespace ContactInfoApp.Repositories.Implementation
{
    using ContactInfoApp.Repositories.Interfaces;
    using ContactInfoApp.Data.Entity;

    public class UnitOfWork : IUnitOfWork
    {
        private readonly ContactInfoAppContext _context;
        public IContactRepository Contacts { get; private set; }

        public UnitOfWork()
        {
            _context = new ContactInfoAppContext();
            Contacts = new ContactRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
