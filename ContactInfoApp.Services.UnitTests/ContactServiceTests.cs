using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ContactInfoApp.Data.Entity;
using ContactInfoApp.Repositories.Interfaces;
using Moq;
using System.Linq;
using ContactInfoApp.Services.Services;
using ContactInfoApp.Services.Models;

namespace ContactInfoApp.Services.UnitTests
{
    [TestClass]
    public class ContactServiceTests
    {
        private Mock<IUnitOfWork> unitOfWork;

        Contact[] contacts = new Contact[] {
            new Contact { Id = 1, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" },
            new Contact { Id = 2, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" }
        };

        ContactModel[] contactModels = new ContactModel[] {
            new ContactModel { Id = 1, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" },
            new ContactModel { Id = 2, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" }
        };

        [TestInitialize]
        public void SetupTests()
        {
            unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.Contacts.GetAll()).Returns(contacts.AsEnumerable());
        }

        [TestMethod]
        public void TestGetAllContacts()
        {
            var contactService = new ContactService(unitOfWork.Object);

            // Act
            var result = contactService.GetAllContacts().ToArray();

            // Assert the result
            Assert.IsNotNull(result);
            Assert.AreEqual(contactModels.Length, result.Length);
            Assert.AreEqual(contactModels[0].Id, result[0].Id);
            Assert.AreEqual(contactModels[0].Email, result[0].Email);
            Assert.AreEqual(contactModels[0].FirstName, result[0].FirstName);
            Assert.AreEqual(contactModels[0].LastName, result[0].LastName);
            Assert.AreEqual(contactModels[0].PhoneNumber, result[0].PhoneNumber);
            Assert.AreEqual(contactModels[0].Status, result[0].Status);
        }
    }
}
