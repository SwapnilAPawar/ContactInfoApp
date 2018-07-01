namespace ContactInfoApp.WebAPI.Controllers
{
    using ContactInfoApp.Services.Models;
    using ContactInfoApp.Services.Interfaces;
    using System.Web.Http;
    using System;
    using System.Web.Http.Cors;

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [Route("api/contact")]
    public class ContactController : ApiController
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            if (contactService == null)
            {
                throw new ArgumentNullException("ContactService is null");
            }
            _contactService = contactService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_contactService.GetAllContacts());
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Ok(_contactService.GetById(id));
        }

        [HttpPost]
        public bool Post(ContactModel contact)
        {
            return _contactService.AddContact(contact);
        }

        [HttpPut]
        public bool Put(ContactModel contact)
        {
            return _contactService.UpdateContact(contact);
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            return _contactService.DeleteContact(id);
        }
    }
}
