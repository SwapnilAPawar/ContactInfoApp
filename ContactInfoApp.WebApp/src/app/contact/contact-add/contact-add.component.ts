import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../_entities/contact';
import { ContactService } from '../../_services/contact.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService, NotificationType } from '../../_services/notification.service';
import { LoaderService } from '../../_services/loader.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  providers: [ContactService]
})
export class ContactAddComponent implements OnInit, OnDestroy {

  subAddContact: Subscription = new Subscription();
  myContactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  phoneNumber: FormControl;
  email: FormControl;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/.]+$/)]);
    this.lastName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/.]+$/)]);
    this.phoneNumber = new FormControl('', [Validators.pattern(/^(\+\d{1,2})?(\d{10})$/)]); // fomat xxxxxxxxxx, +xxxxxxxxxxxx
    this.email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]);
  }

  createForm() {
    this.createFormControls();
    this.myContactForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email
    });
  }

  addContact(contact: Contact, isFormValid: boolean) {
    if (isFormValid) {
      this.loaderService.loading = true;
      this.subAddContact = this.contactService.addContact(contact)
        .subscribe((data: any) => {
          console.log('addContact ==>', data);
          if (data === true) {
            this.notificationService.showNotification('Contact added successfully.', NotificationType.Success);
            this.router.navigate([`/contact/index`]);
          }
          this.loaderService.loading = false;
        }, error => {
          this.notificationService.errorMessage('ContactAddComponent', 'addContact', 'addContact', error);
          this.loaderService.loading = false;
        });
    }
  }

  ngOnDestroy() {
    this.subAddContact.unsubscribe();
  }
}
