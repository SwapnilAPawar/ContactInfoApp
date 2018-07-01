import { NotificationService, NotificationType } from './../../_services/notification.service';
import { TableService } from './../../_services/table.service';
import { ContactService } from './../../_services/contact.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../_entities/contact';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../_services/loader.service';
import { error } from 'util';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css'],
  providers: [ContactService]
})
export class ContactIndexComponent implements OnInit, OnDestroy {

  subGetAllContacts: Subscription = new Subscription();
  subDeleteContact: Subscription = new Subscription();
  data: any;
  pageSize: number = 5;
  pager: any = {};
  pagedData: any;
  filteredData: any[];
  filterKey = '';
  sortBy = '';
  sortAsc = false;

  constructor(
    private contactService: ContactService,
    private tableService: TableService,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.loaderService.loading = true;
    this.subGetAllContacts = this.contactService.getAllContacts()
      .subscribe(data => {
        console.log('getAllContacts ==>', data);
        this.data = data;
        this.filteredData = data;
        this.setPage(1);
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactIndexComponent', 'getAllContacts', 'getAllContacts', error);
        this.loaderService.loading = false;
      });
  }

  deleteContact(id: number) {
    this.loaderService.loading = true;
    this.subDeleteContact = this.contactService.deleteContact(id)
      .subscribe(data => {
        console.log('deleteContact ==>', data);
        this.getAllContacts();
        this.notificationService.showNotification('Contact removed successfully.', NotificationType.Success);
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactIndexComponent', 'deleteContact', 'deleteContact', error);
        this.loaderService.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1 || (page > this.pager.totalPages && this.pager.totalPages > 0)) {
      return;
    }
    // get pager object from service
    this.pager = this.tableService.getPager(this.filteredData.length, page, this.pageSize);

    // get current page of items
    this.pagedData = this.filteredData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  filter() {
    if (this.filterKey !== '') {
      this.filteredData = this.data.filter(function (e) {
        return (
          (e.firstName && e.firstName.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.lastName && e.lastName.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.email && e.email.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.phoneNumber && e.phoneNumber.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1)
        );
      }.bind(this));

      this.setPage(1);
    } else {
      this.filteredData = this.data;
      this.setPage(1);
    }
  }

  sortDataBy(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }
    this.sortBy = sortBy;
    this.filteredData = this.tableService.sortData(this.filteredData, this.sortBy, this.sortAsc);
    if (this.pager.pages && this.pager.pages.length) {
      this.setPage(this.pager.currentPage);
    } else {
      this.setPage(1);
    }
  }

  ngOnDestroy() {
    this.subGetAllContacts.unsubscribe();
    this.subDeleteContact.unsubscribe();
  }
}
