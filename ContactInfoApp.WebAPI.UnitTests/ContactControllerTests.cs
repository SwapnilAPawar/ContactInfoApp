using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ContactInfoApp.Services.Interfaces;
using ContactInfoApp.Services.Models;
using System.Collections.Generic;
using System.Linq;
using ContactInfoApp.WebAPI.Controllers;
using System.Web.Http.Results;
using System.Web.Http;

namespace ContactInfoApp.WebAPI.UnitTests
{
    [TestClass]
    public class ContactControllerTests
    {
        private Mock<IContactService> _contactService;

        ContactModel[] contacts = new ContactModel[] {
            new ContactModel { Id = 1, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" },
            new ContactModel { Id = 2, FirstName = "Jack", LastName = "Wilson", Email = "ack@gmail.com", PhoneNumber = null, Status = "Active" }
        };

        [TestInitialize]
        public void SetupTests()
        {
            _contactService = new Mock<IContactService>();
            _contactService.Setup(x => x.GetAllContacts()).Returns(contacts.AsEnumerable());
        }

        [TestMethod]
        public void TestContactGet()
        {
            ContactController contactController = new ContactController(_contactService.Object);

            // Act
            IHttpActionResult actionResult = contactController.Get();
            var createdResult = actionResult as OkNegotiatedContentResult<IEnumerable<ContactModel>>;

            // Assert the result
            Assert.IsNotNull(createdResult);
            Assert.IsNotNull(createdResult.Content);
            Assert.AreEqual(contacts.AsEnumerable(), createdResult.Content);
        }
    }
}
