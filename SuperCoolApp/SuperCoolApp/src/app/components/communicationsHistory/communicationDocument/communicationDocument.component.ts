import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';

import {CommunicationsHistoryService } from '../../../services/communicationsHistory.service';

import { GridModule, SelectionEvent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';
import {PopupModule } from '@progress/kendo-angular-popup';
import { CommunicationDetail, CommunicationDocument } from '../../../models/communicationsHistory.model';

@Component({
    moduleId: module.id,
  selector: 'communication-documents',
  templateUrl: './communicationDocument.component.html',
  styleUrls: ['./communicationDocument.component.css'],
  providers: [CommunicationsHistoryService]
})
export class CommunicationDocumentComponent implements OnInit {
    @Input() communicationDetail: CommunicationDetail;
    @Input() lanId: string;
    documentList: Array<CommunicationDocument> = new Array<CommunicationDocument>();
    differ: any;

    public  gridView: GridDataResult;
    private sort: SortDescriptor[] = [];
    skip: number = 0;
    isDisplayMe: boolean = true;
    pageSize: number = 10;
    state: State = {
        skip: 0,
        take: 6,
        sort: [{ dir: "desc", field: "sentOnText" }]
    };
    mySelection: number[] = [0];
    //private indexRow: number = 0;
    public title:string;
    previousSort: string = "desc";

    messagePopup = "";
    isShowPopup: boolean = false;

    constructor(private differs: KeyValueDiffers, private communicationService: CommunicationsHistoryService) {
        this.differ = differs.find({}).create(null);
    }
    

  ngOnInit() {
  }
  ngDoCheck() {
      var summaryChanges = this.differ.diff(this.communicationDetail);
      if (summaryChanges) {
          this.documentList = this.communicationDetail.documentList;
          this.processTransactions();
      }
  }

  onSelect(event: any): void {
      if (event.selected) {
          //this.indexRow = event.index;
          let selectedRow = event.selectedRows[0];
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
      this.gridView = process(this.documentList, this.state);
      this.state.sort[0].field = currentSortField;
  }

  on_HyperlinkClicked(data: any)
  {
      let dataItem: CommunicationDocument = data;
      switch (dataItem.communicationsDocumentAccessMode)
      {
          case "2": // SMS Message
              this.messagePopup = dataItem.communicationSmsText;
              this.isShowPopup = true;
              break;
          case "1": // External URL
              window.open("http://members.bupa.com.au/m?v=" + dataItem.documentId);
              break;
          default: //API document
              //this.communicationService.getCommunicationDocument(dataItem.documentId, this.lanId)
              //    .subscribe((res) => {

              //        window.open(dataItem.url);
              //    });
              window.open(dataItem.communicationDocumentLocation);
              break;
      }
  }
  on_PopupClosed(data:any)
  {
      if (data === "cancel")
      {
          this.messagePopup = "";
          this.isShowPopup = false;
      }
  }
}
