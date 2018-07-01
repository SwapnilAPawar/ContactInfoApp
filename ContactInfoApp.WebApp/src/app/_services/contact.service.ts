import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../_entities/contact';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ContactService {

  url = 'api/contact';

  constructor(private http: HttpClient) { }

  public getAllContacts(): Observable<any> {
    return this.http.get(this.url)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError)
      );
  }

  public getContactById(id: number): Observable<any> {
    return this.http.get(this.url + `?id=${id}`);
  }

  public addContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  public updateContact(contact: Contact) {
    return this.http.put(this.url, contact);
  }

  public deleteContact(id: number) {
    return this.http.delete(this.url + `?id=${id}`);
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.message || '');
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
