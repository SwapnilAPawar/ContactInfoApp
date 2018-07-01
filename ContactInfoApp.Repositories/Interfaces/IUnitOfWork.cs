namespace ContactInfoApp.Repositories.Interfaces
{
    using System;
    public interface IUnitOfWork : IDisposable
    {
        IContactRepository Contacts { get; }
        int Complete();
    }
}
