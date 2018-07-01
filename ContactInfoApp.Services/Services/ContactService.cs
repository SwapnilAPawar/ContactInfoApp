namespace ContactInfoApp.Services.Services
{
    using ContactInfoApp.Repositories.Interfaces;
    using ContactInfoApp.Services.Interfaces;
    using System.Collections.Generic;
    using ContactInfoApp.Services.Models;
    using System.Linq;
    using ContactInfoApp.Data.Entity;
    using System;
    using static Models.ContactStatusEnum;

    public class ContactService : IContactService
    {
        private IUnitOfWork unitOfWork;
        public ContactService(IUnitOfWork unitOfWork)
        {
            if (unitOfWork == null)
            {
                throw new ArgumentNullException("UnitOfWork is null");
            }
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<ContactModel> GetAllContacts()
        {
            return unitOfWork.Contacts.GetAll()
                .Where(x=>x.Status == ContactStatus.Active.ToString())
                .Select(x => MapDataModeltoModel(x));
        }

        public ContactModel GetById(int id)
        {
            var contact = unitOfWork.Contacts.Get(id);
            return new ContactModel
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                Status = contact.Status
            };
        }

        public bool UpdateContact(ContactModel contactModel)
        {
            var contact = MapModeltoDataModel(contactModel);
            unitOfWork.Contacts.Update(contact);
            return unitOfWork.Complete() > 0;
        }

        public bool AddContact(ContactModel contactModel)
        {
            contactModel.Status = ContactStatus.Active.ToString();
            var contact = MapModeltoDataModel(contactModel);
            unitOfWork.Contacts.Add(contact);
            return unitOfWork.Complete() > 0;
        }

        public bool DeleteContact(int id)
        {
            var contact = unitOfWork.Contacts.Get(id);
            contact.Status = ContactStatus.InActive.ToString();
            unitOfWork.Contacts.Update(contact);
            return unitOfWork.Complete() > 0;
        }

        private ContactModel MapDataModeltoModel(Contact contact)
        {
            return new ContactModel
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                Status = contact.Status
            };
        }

        private Contact MapModeltoDataModel(ContactModel contactModel)
        {
            return new Contact
            {
                Id = contactModel.Id,
                FirstName = contactModel.FirstName,
                LastName = contactModel.LastName,
                Email = contactModel.Email,
                PhoneNumber = contactModel.PhoneNumber,
                Status = contactModel.Status
            };
        }
    }
}
