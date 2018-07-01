import { EventEmitter, Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
@Injectable()
export class LoaderService {
  public loadingFlagUpdated: EventEmitter<any> = new EventEmitter();
  private loadingVal: number = 0;
  public get loading(): boolean { return this.loadingVal > 0; }
  // tslint:disable-next-line:adjacent-overload-signatures
  public set loading(value: boolean) {
    if (value) {
      this.loadingVal = this.loadingVal + 1;
    } else if (!value && this.loadingVal > 0) {
      this.loadingVal = this.loadingVal - 1;
    }
    this.loadingFlagUpdated.emit(this.loadingVal);
  }
  constructor() { }
}
