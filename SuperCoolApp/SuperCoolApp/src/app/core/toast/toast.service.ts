import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface ToastMessage {
    message: string,
    toastType: string
}

@Injectable()
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();

  toastState = this.toastSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: ToastService) {
    if (prior) {
      console.log('toast service already exists');
      return prior;
    } else {
      console.log('created toast service')
    }
  }

  activate(message?: string) {
    this.toastSubject.next(<ToastMessage>{ message: message, toastType: 'info' });
  }

  activateError(message?: string) {
      this.toastSubject.next(<ToastMessage>{ message: message, toastType: 'error' });
  }
  activateSuccess(message?: string) {
      this.toastSubject.next(<ToastMessage>{ message: message, toastType: 'success' });
  }
  activateWarning(message?: string) {
      this.toastSubject.next(<ToastMessage>{ message: message, toastType: 'warning' });
  }
}
