namespace ContactInfoApp.Services.Interfaces
{
    using ContactInfoApp.Services.Models;
    using System.Collections.Generic;

    public interface IContactService
    {
        IEnumerable<ContactModel> GetAllContacts();

        ContactModel GetById(int id);

        bool AddContact(ContactModel contact);

        bool UpdateContact(ContactModel contact);

        bool DeleteContact(int id);
    }
}
