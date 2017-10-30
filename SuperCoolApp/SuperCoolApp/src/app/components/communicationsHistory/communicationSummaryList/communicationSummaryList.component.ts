import { Component, OnInit, Input, Output, DoCheck, KeyValueDiffers, EventEmitter, Inject } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs/Subject";
import { Common } from "../../../common/common";

import { CommunicationsHistoryService } from '../../../services/communicationsHistory.service';
import { CommunicationSummary, CommunicationDetail, CommunicationDocument } from "../../../models/communicationsHistory.model";
import { GridModule, SelectionEvent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';

@Component({
  moduleId: module.id,
  selector: 'communication-summary',
  templateUrl: './communicationSummaryList.component.html',
  styleUrls: ['./communicationSummaryList.component.css']
})
export class CommunicationSummaryListComponent implements OnInit {
    @Input() lanId: string;
    @Input() membershipId: number;
    @Input() personId: number;
    @Output() onCommunicationSummaryChanged = new EventEmitter<CommunicationSummary>();
    private requests = new Subject<number>();
    private gridView: GridDataResult;
    private sort: SortDescriptor[] = [];
    skip: number = 0;
    isDisplayMe: boolean = true;
    pageSize: number = 10;
    state: State = {
        skip: 0,
        take: 6,
        sort: [{ dir: "desc", field: "statusDate" }]
    };
    isShowMembershipColumn: boolean = true;
    mySelection: number[] = [0];
    private indexRow: number = 0;
    previousSort: string = "desc";
    selectedCommunicationSummary: CommunicationSummary;
    communicationSummaryList: Array<CommunicationSummary>;
    constructor( @Inject('appContext') appContext: any, private communicationService: CommunicationsHistoryService, private datePipe: DatePipe) {

    }

    ngOnInit() {
        this.getCommunicationSummary()
    }

    private getCommunicationSummary() {
        let queryString = "";
        if (this.membershipId && this.membershipId > 0) {
            this.isShowMembershipColumn = false;
            queryString = "membershipId=" + this.membershipId.toString();
        }
        if (this.personId && this.personId > 0) {
            if (queryString.length > 0) {
                queryString += "&personId=" + this.personId.toString();
            }
            else
            {
                queryString = "personId=" + this.personId.toString();
            }
        }
        this.communicationService.getCommunicationSummary(queryString, this.lanId)
            .subscribe((res) => {
                if (res) {
                    this.communicationSummaryList = this.formattedValues(res);
                    this.processTransactions();
                }
            });
    }
    onSelect(event: any): void {
        if (event.selected) {
            this.indexRow = event.index;
            let selectedRow = event.selectedRows[0];
            this.selectedCommunicationSummary = selectedRow.dataItem;
            this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        }
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.processTransactions();
    }
    pageChange({ skip, take }: PageChangeEvent): void {
        this.mySelection = [skip];
        this.skip = skip;
        this.pageSize = take;
        this.processTransactions();
    }

    sortChange(sort: SortDescriptor[]): void {
        this.state.sort = sort;
        this.processTransactions();
    }

    sortProcess(sort: SortDescriptor[]): string {
        let currentSortField = sort[0].field;
        let sortDescriptor = sort[0];
        if (typeof (sortDescriptor.dir) == "undefined") {
            sort[0].dir = this.previousSort == "desc" ? "asc" : "desc";
        }
        switch (sortDescriptor.field) {
            case "sentOnText":
                sort[0].field = "sentOn";
                break;
        }
        this.previousSort = sort[0].dir;
        return currentSortField;
    }
    private processTransactions() {
        let currentSortField = this.sortProcess(this.state.sort);
        this.gridView = process(this.communicationSummaryList, this.state);
        if (this.gridView.total > 0) {
            this.selectedCommunicationSummary = this.gridView.data[0];
            this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        }
        this.state.sort[0].field = currentSortField;
    }
    refreshData() {
        this.state = {
            skip: 0,
            take: 6,
            sort: [{ dir: "desc", field: "sentOnText" }]
        };
        this.mySelection = [0];
        this.indexRow = 0;
        this.previousSort = "desc";
        this.getCommunicationSummary();
    }

    private formattedValues(o: Array<CommunicationSummary>): Array<CommunicationSummary> {
        let res: Array<CommunicationSummary> = [];
        o.forEach((v: CommunicationSummary) => {

            let sentOnText: string = "";
            if (v.sentOn) {
                sentOnText = this.formatDateTimeToString(v.sentOn);//this.datePipe.transform(v.sentOn, Common.dateFormat.ddMMyyyyHHMM);
            }
            let deliveryMethodDescription = this.getdeliveryMethodName(v.communicationChannel);
            Object.assign(v, {
                sentOnText: sentOnText,
                deliveryMethodDescription: deliveryMethodDescription
            });
            res.push(v);
        });

        return res;
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

    getdeliveryMethodName(enumValue:string): string
    {
        let methodName = "";
       
        switch (enumValue)  //PDF=1, SMS=2, Email=3, Direct Mail=4
        {
            case "1":
                methodName = "PDF";
                break;
            case "2":
                methodName = "SMS";
                break;
            case "3":
                methodName = "Email";
                break;
            case "4":
                methodName = "Direct Mail";
                break;
            default:
                methodName = "Email";
                break;
        }
        return methodName;
    }

}
