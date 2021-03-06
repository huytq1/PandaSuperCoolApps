﻿import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

    public visible = false;
    private visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}
