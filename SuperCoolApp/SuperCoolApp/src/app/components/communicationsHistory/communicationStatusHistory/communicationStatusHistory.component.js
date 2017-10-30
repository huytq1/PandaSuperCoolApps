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
var common_1 = require("@angular/common");
var common_2 = require("../../../common/common");
var communicationsHistory_service_1 = require("../../../services/communicationsHistory.service");
var communicationsHistory_model_1 = require("../../../models/communicationsHistory.model");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var CommunicationStatusHistoryComponent = (function () {
    function CommunicationStatusHistoryComponent(differs, datePipe) {
        this.differs = differs;
        this.datePipe = datePipe;
        this.onLessViewClicked = new core_1.EventEmitter();
        this.sort = [];
        this.skip = 0;
        this.pageSize = 10;
        this.state = {
            skip: 0,
            take: 10,
            sort: [{ dir: "desc", field: "recipient" }]
        };
        this.mySelection = [0];
        this.indexRow = 0;
        this.previousSort = "desc";
        this.differ = differs.find({}).create(null);
    }
    CommunicationStatusHistoryComponent.prototype.ngOnInit = function () {
    };
    CommunicationStatusHistoryComponent.prototype.ngDoCheck = function () {
        var summaryChanges = this.differ.diff(this.communicationDetail);
        if (summaryChanges) {
            this.statusHistoryList = this.formattedValues(this.communicationDetail.statusHistoryList);
            this.processTransactions();
        }
    };
    CommunicationStatusHistoryComponent.prototype.onSelect = function (event) {
        if (event.selected) {
            this.indexRow = event.index;
            //let selectedRow = event.selectedRows[0];
            //this.selectedCommunicationSummary = selectedRow.dataItem;
            //this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        }
    };
    CommunicationStatusHistoryComponent.prototype.dataStateChange = function (state) {
        this.state = state;
        this.processTransactions();
    };
    CommunicationStatusHistoryComponent.prototype.pageChange = function (_a) {
        var skip = _a.skip, take = _a.take;
        this.mySelection = [skip];
        this.skip = skip;
        this.pageSize = take;
        this.processTransactions();
    };
    CommunicationStatusHistoryComponent.prototype.sortChange = function (sort) {
        this.state.sort = sort;
        this.processTransactions();
    };
    CommunicationStatusHistoryComponent.prototype.sortProcess = function (sort) {
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
    CommunicationStatusHistoryComponent.prototype.processTransactions = function () {
        var currentSortField = this.sortProcess(this.state.sort);
        this.gridView = kendo_data_query_1.process(this.statusHistoryList, this.state);
        //if (this.gridView.total > 0) {
        //    this.selectedCommunicationSummary = this.gridView.data[0];
        //    this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        //}
        this.state.sort[0].field = currentSortField;
    };
    CommunicationStatusHistoryComponent.prototype.formattedValues = function (o) {
        var _this = this;
        var res = [];
        try {
            o.forEach(function (v) {
                var sentOnText = "";
                if (v.eventDate) {
                    sentOnText = _this.formatDateTimeToString(v.eventDate); //this.datePipe.transform(v.eventDate, Common.dateFormat.ddMMyyyy);
                }
                Object.assign(v, {
                    sentOnText: sentOnText //,
                });
                res.push(v);
            });
        }
        catch (ex) {
        }
        return res;
    };
    CommunicationStatusHistoryComponent.prototype.formatDateTimeToString = function (dateTimeValue) {
        var dateString = "";
        try {
            var dateTimeFormat = "dd/MM/yyyy hh:mm j";
            dateString = (this.datePipe.transform(dateTimeValue, dateTimeFormat)).indexOf("PM") > 0 ? " PM" : " AM";
            dateString = this.datePipe.transform(dateTimeValue, common_2.Common.dateFormat.ddMMyyyyHHMM) + dateString;
        }
        catch (ex) { }
        return dateString;
    };
    CommunicationStatusHistoryComponent.prototype.on_VisibleChanged = function (data) {
        this.onLessViewClicked.emit(data);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CommunicationStatusHistoryComponent.prototype, "onLessViewClicked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", communicationsHistory_model_1.CommunicationDetail)
    ], CommunicationStatusHistoryComponent.prototype, "communicationDetail", void 0);
    CommunicationStatusHistoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'communication-status-history',
            templateUrl: './communicationStatusHistory.component.html',
            styleUrls: ['./communicationStatusHistory.component.css'],
            providers: [communicationsHistory_service_1.CommunicationsHistoryService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [core_1.KeyValueDiffers, common_1.DatePipe])
    ], CommunicationStatusHistoryComponent);
    return CommunicationStatusHistoryComponent;
}());
exports.CommunicationStatusHistoryComponent = CommunicationStatusHistoryComponent;
//# sourceMappingURL=communicationStatusHistory.component.js.map