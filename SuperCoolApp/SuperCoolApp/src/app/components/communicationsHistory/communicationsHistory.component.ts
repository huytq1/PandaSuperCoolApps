import { Component, OnInit, Input, Output, DoCheck, KeyValueDiffers, EventEmitter,Inject } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs/Subject";
import { Common } from "../../common/common";

import { CommunicationsHistoryService } from '../../services/communicationsHistory.service';
import { CommunicationSummary,CommunicationDetail,CommunicationDocument } from "../../models/communicationsHistory.model";
import { GridModule, SelectionEvent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';


@Component({
    moduleId: module.id,
    selector: 'communications-history',
    templateUrl: './communicationsHistory.component.html',
    styleUrls: ['./communicationsHistory.component.css'],
    providers: [CommunicationsHistoryService, DatePipe]
})
export class CommunicationsHistoryComponent implements OnInit {
    
    @Input() lanId: string;
    @Input() membershipId: number;
    @Input() personId: number;
    communicationDetail: CommunicationDetail;
    communicationSummary: CommunicationSummary;
    isShowDocumentList: boolean;
    constructor(private communicationHistoryService: CommunicationsHistoryService ) {
        this.initializationCommunicationDetail();
    }
    ngOnInit() {
    }

    public on_CommunicationSummaryChanged(data: any)
    {
        this.communicationSummary = data;
        this.getCommunicationDetail();
    }

    initializationCommunicationDetail()
    {
        this.communicationDetail = new CommunicationDetail();
        this.communicationDetail['category'] = "";
        this.communicationDetail['recipient'] = "";
        this.communicationDetail['sentOnText'] = "";
        this.communicationDetail['requestedOntext'] = "";
        this.communicationDetail['generatedOnText'] = "";
        this.communicationDetail['commId'] = "";
        this.communicationDetail.documentList = [];
        this.communicationDetail.statusHistoryList = [];
    }
    getCommunicationDetail()
    {
        this.communicationHistoryService.getCommuincationDetail(this.communicationSummary.id, this.lanId)
            .subscribe((res) => {
                if (res) {
                    this.communicationDetail = res;
                    this.communicationDetail['category'] = this.communicationSummary.category;
                    this.communicationDetail['recipient'] = this.communicationSummary.recipient;
                    this.communicationDetail['sentOn'] = this.communicationSummary.sentOn;
                    this.communicationDetail['commId'] = this.communicationSummary.id;
                }
                else
                {
                    this.initializationCommunicationDetail();
                }
            });
    }
    on_MoreViewClicked(data: any)
    {
        this.isShowDocumentList = data;
    }
    

}
