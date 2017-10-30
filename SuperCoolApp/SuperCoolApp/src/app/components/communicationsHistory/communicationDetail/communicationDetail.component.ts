import { Component, OnInit, Input,Output, KeyValueDiffers, EventEmitter } from '@angular/core';
import { CommunicationDetail } from '../../../models/communicationsHistory.model';
import { DatePipe } from "@angular/common";
import { Common } from "../../../common/common";

@Component({
    moduleId: module.id,
    selector: 'communication-detail',
    templateUrl: './communicationDetail.component.html',
    styleUrls: ['./communicationDetail.component.css']
})
export class CommunicationDetailComponent implements OnInit {
    @Output() onMoreViewClicked = new EventEmitter<boolean>();
    @Input() communicationDetail: any;
    differ: any;
    isViewMore: boolean = true;
    public requestedOntext:string;
    public sentOnText:string;
    public generatedOnText:string;
    constructor(private differs: KeyValueDiffers, private datePipe: DatePipe) {
        this.differ = differs.find({}).create(null); }

    ngOnInit() {
    }


    ngDoCheck() {
        var summaryChanges = this.differ.diff(this.communicationDetail);
        if (summaryChanges) {
            this.formatDataforHistoryDetail();
        }
    }
    formatDataforHistoryDetail(): void {
        try {
            if (this.communicationDetail == null)
            {
                this.communicationDetail = new CommunicationDetail();
            }
            let formatCommunication: CommunicationDetail = new CommunicationDetail();
            let statusDateText = this.formatDateTimeToString(this.communicationDetail['statusDate']);
            this.communicationDetail['statusDateText'] = statusDateText;
            let sentOnText = this.formatDateTime(this.communicationDetail['sentOn'], Common.dateFormat.ddMMyyyy);
            this.communicationDetail['sentOnText'] = sentOnText;
            let generatedOnText = this.formatDateTimeToString(this.communicationDetail.generatedOn);
            this.communicationDetail['generatedOnText'] = generatedOnText;
            let requestedOntext = this.formatDateTimeToString(this.communicationDetail.requestedOn);
            this.communicationDetail['requestedOntext'] = requestedOntext;
            let isBundledText = this.communicationDetail['isBundled'] ? "Yes" : "No";
            this.communicationDetail['isBundledText'] = isBundledText;
        }
        catch (ex)
        {
            console.log("formatDataforHistoryDetail::: " + ex);
        }
    }

    formatDateTime(dateTime: any, format: string): string {
        let dateFormat: string = "";
        try {
            dateFormat = dateTime ? this.datePipe.transform(dateTime, format) : '';
        }
        catch (ex) {
            dateFormat = "";
        }

        return dateFormat;
    }

    formatDateTimeToString(dateTimeValue: any): string {
        let dateString = "";
        try {
            let dateTimeFormat = "dd/MM/yyyy hh:mm j"
            dateString = (this.datePipe.transform(dateTimeValue, dateTimeFormat)).indexOf("PM") > 0 ? " PM" : " AM";
            dateString = this.datePipe.transform(dateTimeValue, Common.dateFormat.ddMMyyyyHHMM) + dateString;
        }
        catch (ex)
        { }
        return dateString;
    }

    on_VisibleChanged(data:any)
    {
        this.isViewMore = !data;
        this.onMoreViewClicked.emit(data);
    }
}
