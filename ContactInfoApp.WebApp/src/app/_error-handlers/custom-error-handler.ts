import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor() { }

    handleError(error: any): void {
        console.error('Custom Error Handler : ' + error);
    }
}
