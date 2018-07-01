import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../_entities/contact';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService, NotificationType } from '../../_services/notification.service';
import { LoaderService } from '../../_services/loader.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  providers: [ContactService]
})
export class ContactEditComponent implements OnInit, OnDestroy {

  subGetById: Subscription = new Subscription();
  subUpdateContact: Subscription = new Subscription();
  idValue: number;

  id: FormControl;
  myContactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  status: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private contactService: ContactService) { }

  ngOnInit() {
    this.idValue = this.activatedRoute.snapshot.queryParams['id'];
    this.createForm(Object.assign(new Contact(), {}));
    this.getContactById();
  }

  createFormControls(contact: Contact) {
    this.id = new FormControl(contact.id);
    this.firstName = new FormControl(contact.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/.]+$/)]);
    this.lastName = new FormControl(contact.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/.]+$/)]);
    this.phoneNumber = new FormControl(contact.phoneNumber, [Validators.pattern(/^(\+\d{1,2})?(\d{10})$/)]); // fomat xxxxxxxxxx, +xxxxxxxxxxxx
    this.email = new FormControl(contact.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]);
    this.status = new FormControl(contact.status);
  }

  createForm(contact: Contact) {
    this.createFormControls(contact);
    this.myContactForm = new FormGroup({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      status: this.status
    });
  }

  getContactById() {
    this.loaderService.loading = true;
    this.subGetById = this.contactService.getContactById(this.idValue)
      .subscribe((data: any) => {
        console.log('getById ==>', data);
        this.createForm(data);
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactEditComponent', 'getContactById', 'getContactById', error);
        this.loaderService.loading = false;
      });
  }

  updateContact(contact: Contact) {
    this.loaderService.loading = true;
    this.subUpdateContact = this.contactService.updateContact(contact)
      .subscribe((data: any) => {
        console.log('updateContact ==>', data);
        if (data === true) {
          this.notificationService.showNotification('Contact updated successfully.', NotificationType.Success);
          this.router.navigate([`/contact/index`]);
        }
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactEditComponent', 'updateContact', 'updateContact', error);
        this.loaderService.loading = false;
      });
  }

  ngOnDestroy() {
    this.subGetById.unsubscribe();
    this.subUpdateContact.unsubscribe();
  }
}
