import { ErrorInformation } from './../_entities/error-information';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  public show = false;
  public type: NotificationType;
  public message: any;
  public isMultiline = false;

  public showNotification(message: string, type: NotificationType) {
    const arr: Array<{ message: string, type: NotificationType }> = [{ message, type }];
    this.show = true;
    this.type = type;
    this.message = arr;
    setTimeout(() => {
      this.hideNotification();
    }, 10000);
  }

  public showNotificationWithoutTimeout(message: string, type: NotificationType) {
    const arr: Array<{ type: NotificationType, message: string }> = [{ type, message }];
    this.show = true;
    this.isMultiline = false;
    this.type = type;
    this.message = arr;
  }

  public hideNotification() {
    this.show = false;
    this.message = '';
  }

  public errorMessage(componentName: string, componentFunctionName: string, serviceFunctionName: string, res: any) {
    const commonMsg = ' If refreshing the page doesn\'t help, please submit a feedback form.';
    switch (res.ErrorType) {
      case 0:
        this.showNotificationWithoutTimeout('Error has occurred while processing your request. Please contact your system administrator.', NotificationType.Error);
        break;
      default:
        switch (componentName + '_' + componentFunctionName + '_' + serviceFunctionName) {
          case 'ContactIndexComponent_getAllContacts_getAllContacts':
            this.showNotificationWithoutTimeout('Error:1, An error occurred during the get all contacts request.' + commonMsg, NotificationType.Error);
            break;
          case 'ContactIndexComponent_deleteContact_deleteContact':
            this.showNotificationWithoutTimeout('Error:2, An error occurred during the delete contact request.' + commonMsg, NotificationType.Error);
            break;
          case 'ContactAddComponent_addContact_addContact':
            this.showNotificationWithoutTimeout('Error:3, An error occurred during the add contact request.' + commonMsg, NotificationType.Error);
            break;
          case 'ContactEditComponent_getContactById_getContactById':
            this.showNotificationWithoutTimeout('Error:4, An error occurred during the get contact by id request.' + commonMsg, NotificationType.Error);
            break;
          case 'ContactEditComponent_updateContact_updateContact':
            this.showNotificationWithoutTimeout('Error:5, An error occurred during the update contact request.' + commonMsg, NotificationType.Error);
            break;
          default:
            this.showNotificationWithoutTimeout('An unusual error occurred. Please submit a feedback form so we can check into it.', NotificationType.Error);
            break;
        }
        break;
    }
  }
}
export enum NotificationType {
  Success = 'success' as any,
  Info = 'info' as any,
  Warning = 'warning' as any,
  Error = 'danger' as any,
  Primary = 'primary' as any,
  Secondary = 'secondary' as any,
  Light = 'light' as any,
  Dark = 'dark' as any
}
