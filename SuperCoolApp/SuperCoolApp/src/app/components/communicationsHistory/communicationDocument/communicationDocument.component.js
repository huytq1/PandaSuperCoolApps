"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var communicationsHistory_service_1 = require("../../../services/communicationsHistory.service");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var communicationsHistory_model_1 = require("../../../models/communicationsHistory.model");
var CommunicationDocumentComponent = (function () {
    function CommunicationDocumentComponent(differs, communicationService) {
        this.differs = differs;
        this.communicationService = communicationService;
        this.documentList = new Array();
        this.sort = [];
        this.skip = 0;
        this.isDisplayMe = true;
        this.pageSize = 10;
        this.state = {
            skip: 0,
            take: 6,
            sort: [{ dir: "desc", field: "sentOnText" }]
        };
        this.mySelection = [0];
        this.previousSort = "desc";
        this.messagePopup = "";
        this.isShowPopup = false;
        this.differ = differs.find({}).create(null);
    }
    CommunicationDocumentComponent.prototype.ngOnInit = function () {
    };
    CommunicationDocumentComponent.prototype.ngDoCheck = function () {
        var summaryChanges = this.differ.diff(this.communicationDetail);
        if (summaryChanges) {
            this.documentList = this.communicationDetail.documentList;
            this.processTransactions();
        }
    };
    CommunicationDocumentComponent.prototype.onSelect = function (event) {
        if (event.selected) {
            //this.indexRow = event.index;
            var selectedRow = event.selectedRows[0];
        }
    };
    CommunicationDocumentComponent.prototype.dataStateChange = function (state) {
        this.state = state;
        this.processTransactions();
    };
    CommunicationDocumentComponent.prototype.pageChange = function (_a) {
        var skip = _a.skip, take = _a.take;
        this.mySelection = [skip];
        this.skip = skip;
        this.pageSize = take;
        this.processTransactions();
    };
    CommunicationDocumentComponent.prototype.sortChange = function (sort) {
        this.state.sort = sort;
        this.processTransactions();
    };
    CommunicationDocumentComponent.prototype.sortProcess = function (sort) {
        var currentSortField = sort[0].field;
        var sortDescriptor = sort[0];
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
    };
    CommunicationDocumentComponent.prototype.processTransactions = function () {
        var currentSortField = this.sortProcess(this.state.sort);
        this.gridView = kendo_data_query_1.process(this.documentList, this.state);
        this.state.sort[0].field = currentSortField;
    };
    CommunicationDocumentComponent.prototype.on_HyperlinkClicked = function (data) {
        var dataItem = data;
        switch (dataItem.communicationsDocumentAccessMode) {
            case "2":// SMS Message
                this.messagePopup = dataItem.communicationSmsText;
                this.isShowPopup = true;
                break;
            case "1":// External URL
                window.open("http://members.bupa.com.au/m?v=" + dataItem.documentId);
                break;
            default://API document
                //this.communicationService.getCommunicationDocument(dataItem.documentId, this.lanId)
                //    .subscribe((res) => {
                //        window.open(dataItem.url);
                //    });
                window.open(dataItem.communicationDocumentLocation);
                break;
        }
    };
    CommunicationDocumentComponent.prototype.on_PopupClosed = function (data) {
        if (data === "cancel") {
            this.messagePopup = "";
            this.isShowPopup = false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", communicationsHistory_model_1.CommunicationDetail)
    ], CommunicationDocumentComponent.prototype, "communicationDetail", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommunicationDocumentComponent.prototype, "lanId", void 0);
    CommunicationDocumentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'communication-documents',
            templateUrl: './communicationDocument.component.html',
            styleUrls: ['./communicationDocument.component.css'],
            providers: [communicationsHistory_service_1.CommunicationsHistoryService]
        }),
        __metadata("design:paramtypes", [core_1.KeyValueDiffers, communicationsHistory_service_1.CommunicationsHistoryService])
    ], CommunicationDocumentComponent);
    return CommunicationDocumentComponent;
}());
exports.CommunicationDocumentComponent = CommunicationDocumentComponent;
//# sourceMappingURL=communicationDocument.component.js.map