import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
    moduleId: module.id,
    selector: 'waiting-spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit, AfterViewChecked {
    visible = false;

    private spinnerStateChanged: Subscription;

    constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: SpinnerState) => {
                this.visible = state.show;
                this.cdRef.detectChanges();
            });
    }

    ngAfterViewChecked() {
        //this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.spinnerStateChanged.unsubscribe();
    }
}