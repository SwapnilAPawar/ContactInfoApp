import { NgModule } from '@angular/core';
import { ContactRouteModule, routedComponents } from './contact-route.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, ContactRouteModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
  declarations: [routedComponents]
})
export class ContactModule { }
