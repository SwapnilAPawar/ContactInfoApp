import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactAddComponent } from './contact-add/contact-add.component';


const routes: Routes = [
  { path: '', component: ContactIndexComponent, data: { title: 'ContactInfoApp | Contact-Index' } },
  { path: 'index', component: ContactIndexComponent, data: { title: 'ContactInfoApp | Contact-Index' } },
  { path: 'add', component: ContactAddComponent, data: { title: 'ContactInfoApp | Contact-Add' } },
  { path: 'edit', component: ContactEditComponent, data: { title: 'ContactInfoApp | Contact-Edit' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRouteModule { }

export const routedComponents = [ContactIndexComponent, ContactAddComponent, ContactEditComponent];
