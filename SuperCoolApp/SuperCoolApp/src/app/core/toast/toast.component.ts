import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

import { Subscription } from 'rxjs/Subscription'

@Component({
    moduleId: module.id,
    selector: 'toast',
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.css']
})
export class ToastComponent implements OnDestroy, OnInit {
    private defaults = {
        title: '',
        message: '',
        type: ''
    };
    private toastElement: any;
    private toastSubscription: Subscription;

    title: string;
    message: string;
    type = { error: false, info: false, success: false, warning: false };

    constructor(private toastService: ToastService) {
        this.toastSubscription = this.toastService.toastState.subscribe((toastMessage) => {
            this.activate(toastMessage.message, toastMessage.toastType);
        });
    }

    activate(message = this.defaults.message, toastType: string, title = this.defaults.title) {
        this.title = title;
        this.type = {
            error: (toastType === 'error'),
            info: (toastType === 'info'),
            success: (toastType === 'success'),
            warning: (toastType === 'warning')
        };
        this.message = message;
        this.show();
    }

    ngOnInit() {
        this.toastElement = document.getElementById('toast');
    }

    ngOnDestroy() {
        this.toastSubscription.unsubscribe();
    }

    private show() {
        this.toastElement.style.display = "block";
        this.toastElement.style.opacity = 1;
        if (!this.type.error && !this.type.warning) {
            window.setTimeout(() => this.hide(), 3000);
        }
    }

    private hide() {
        this.toastElement.style.opacity = 0;
        window.setTimeout(() => this.toastElement.style.display = "none", 400);
    }
}