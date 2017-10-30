import { Component, Inject } from '@angular/core';
import { CommunicationsHistoryService } from "../../services/communicationsHistory.service";

@Component({
    moduleId: module.id,
    selector: 'communications-history-app',
    styleUrls: ['paymentPendingApp.component.css'],
    template: `
    <communications-history [membershipId]="membershipId" [lanId]="lanId" [sessionId]="sessionId" (onPostMessage)="onRecievePost($event)" >Loading Payment Pending...</communications-history>
    <waiting-spinner></waiting-spinner>
    <toast></toast>
    `,
    providers: [CommunicationsHistoryService]
})
export class CommunicationsHistoryAppComponent {
    membershipId: number;
    sessionId: string;
    lanId: string = "";
    persionId: string = "";
    constructor( @Inject('appContext') appContext: any, private paymentService: CommunicationsHistoryService) {
        this.membershipId = appContext.membershipId;
        this.lanId = appContext.lanId;
        this.sessionId = appContext.sessionId;
        this.persionId = appContext.personId;
    }

    onRecievePost(data: any) {
        var parentWindow = parent;
        do {
            parentWindow.postMessage(data, "*");
            parentWindow = parentWindow.parent;
        } while (parentWindow !== window.top);
    }
}