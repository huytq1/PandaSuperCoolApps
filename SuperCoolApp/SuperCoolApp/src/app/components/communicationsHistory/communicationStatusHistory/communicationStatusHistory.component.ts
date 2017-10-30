import { Component, OnInit, Input, Output, DoCheck, KeyValueDiffers, EventEmitter, Inject } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs/Subject";
import { Common } from "../../../common/common";

import { CommunicationsHistoryService } from '../../../services/communicationsHistory.service';
import { CommunicationDetail, CommunicationStatus } from "../../../models/communicationsHistory.model";
import { GridModule, SelectionEvent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';


@Component({
    moduleId: module.id,
    selector: 'communication-status-history',
    templateUrl: './communicationStatusHistory.component.html',
    styleUrls: ['./communicationStatusHistory.component.css'],
    providers: [CommunicationsHistoryService, DatePipe]
})
export class CommunicationStatusHistoryComponent implements OnInit {
    @Output() onLessViewClicked = new EventEmitter<boolean>(); 
   
    @Input() communicationDetail: CommunicationDetail;

    differ: any;
    statusHistoryList: Array<CommunicationStatus>;
    public gridView: GridDataResult;
    public sort: SortDescriptor[] = [];
    public skip: number = 0;
    public pageSize: number = 10;
    state: State = {
        skip: 0,
        take: 10,
        sort: [{ dir: "desc", field: "recipient" }]
    };
    recipient:string;
    mySelection: number[] = [0];
    indexRow: number = 0;
    previousSort: string = "desc";
    constructor(private differs: KeyValueDiffers, private datePipe: DatePipe) {
        this.differ = differs.find({}).create(null);
    }

    ngOnInit() {
    }

    ngDoCheck() {
        var summaryChanges = this.differ.diff(this.communicationDetail);
        if (summaryChanges) {
            this.statusHistoryList = this.formattedValues(this.communicationDetail.statusHistoryList);
            this.processTransactions();
            
        }
    }

    onSelect(event: any): void {
        if (event.selected) {
            this.indexRow = event.index;
            //let selectedRow = event.selectedRows[0];
            //this.selectedCommunicationSummary = selectedRow.dataItem;
            //this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
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
        this.gridView = process(this.statusHistoryList, this.state);
        //if (this.gridView.total > 0) {
        //    this.selectedCommunicationSummary = this.gridView.data[0];
        //    this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        //}
        this.state.sort[0].field = currentSortField;
    }

    private formattedValues(o: Array<CommunicationStatus>): Array<CommunicationStatus> {
        let res: Array<CommunicationStatus> = [];
        try {
            o.forEach((v: CommunicationStatus) => {

                let sentOnText: string = "";
                if (v.eventDate) {
                    sentOnText = this.formatDateTimeToString(v.eventDate);//this.datePipe.transform(v.eventDate, Common.dateFormat.ddMMyyyy);
                }
                Object.assign(v, {
                    sentOnText: sentOnText //,
                });
                res.push(v);
            });
        } catch (ex)
        {

        }
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

    on_VisibleChanged(data: any) {
        this.onLessViewClicked.emit(data);
    }
}