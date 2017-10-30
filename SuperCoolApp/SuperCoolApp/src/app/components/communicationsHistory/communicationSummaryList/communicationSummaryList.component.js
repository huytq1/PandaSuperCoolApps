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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Subject_1 = require("rxjs/Subject");
var common_2 = require("../../../common/common");
var communicationsHistory_service_1 = require("../../../services/communicationsHistory.service");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var CommunicationSummaryListComponent = (function () {
    function CommunicationSummaryListComponent(appContext, communicationService, datePipe) {
        this.communicationService = communicationService;
        this.datePipe = datePipe;
        this.onCommunicationSummaryChanged = new core_1.EventEmitter();
        this.requests = new Subject_1.Subject();
        this.sort = [];
        this.skip = 0;
        this.isDisplayMe = true;
        this.pageSize = 10;
        this.state = {
            skip: 0,
            take: 6,
            sort: [{ dir: "desc", field: "statusDate" }]
        };
        this.isShowMembershipColumn = true;
        this.mySelection = [0];
        this.indexRow = 0;
        this.previousSort = "desc";
    }
    CommunicationSummaryListComponent.prototype.ngOnInit = function () {
        this.getCommunicationSummary();
    };
    CommunicationSummaryListComponent.prototype.getCommunicationSummary = function () {
        var _this = this;
        var queryString = "";
        if (this.membershipId && this.membershipId > 0) {
            this.isShowMembershipColumn = false;
            queryString = "membershipId=" + this.membershipId.toString();
        }
        if (this.personId && this.personId > 0) {
            if (queryString.length > 0) {
                queryString += "&personId=" + this.personId.toString();
            }
            else {
                queryString = "personId=" + this.personId.toString();
            }
        }
        this.communicationService.getCommunicationSummary(queryString, this.lanId)
            .subscribe(function (res) {
            if (res) {
                _this.communicationSummaryList = _this.formattedValues(res);
                _this.processTransactions();
            }
        });
    };
    CommunicationSummaryListComponent.prototype.onSelect = function (event) {
        if (event.selected) {
            this.indexRow = event.index;
            var selectedRow = event.selectedRows[0];
            this.selectedCommunicationSummary = selectedRow.dataItem;
            this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        }
    };
    CommunicationSummaryListComponent.prototype.dataStateChange = function (state) {
        this.state = state;
        this.processTransactions();
    };
    CommunicationSummaryListComponent.prototype.pageChange = function (_a) {
        var skip = _a.skip, take = _a.take;
        this.mySelection = [skip];
        this.skip = skip;
        this.pageSize = take;
        this.processTransactions();
    };
    CommunicationSummaryListComponent.prototype.sortChange = function (sort) {
        this.state.sort = sort;
        this.processTransactions();
    };
    CommunicationSummaryListComponent.prototype.sortProcess = function (sort) {
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
    CommunicationSummaryListComponent.prototype.processTransactions = function () {
        var currentSortField = this.sortProcess(this.state.sort);
        this.gridView = kendo_data_query_1.process(this.communicationSummaryList, this.state);
        if (this.gridView.total > 0) {
            this.selectedCommunicationSummary = this.gridView.data[0];
            this.onCommunicationSummaryChanged.emit(this.selectedCommunicationSummary);
        }
        this.state.sort[0].field = currentSortField;
    };
    CommunicationSummaryListComponent.prototype.refreshData = function () {
        this.state = {
            skip: 0,
            take: 6,
            sort: [{ dir: "desc", field: "sentOnText" }]
        };
        this.mySelection = [0];
        this.indexRow = 0;
        this.previousSort = "desc";
        this.getCommunicationSummary();
    };
    CommunicationSummaryListComponent.prototype.formattedValues = function (o) {
        var _this = this;
        var res = [];
        o.forEach(function (v) {
            var sentOnText = "";
            if (v.sentOn) {
                sentOnText = _this.formatDateTimeToString(v.sentOn); //this.datePipe.transform(v.sentOn, Common.dateFormat.ddMMyyyyHHMM);
            }
            var deliveryMethodDescription = _this.getdeliveryMethodName(v.communicationChannel);
            Object.assign(v, {
                sentOnText: sentOnText,
                deliveryMethodDescription: deliveryMethodDescription
            });
            res.push(v);
        });
        return res;
    };
    CommunicationSummaryListComponent.prototype.formatDateTimeToString = function (dateTimeValue) {
        var dateString = "";
        try {
            var dateTimeFormat = "dd/MM/yyyy hh:mm j";
            dateString = (this.datePipe.transform(dateTimeValue, dateTimeFormat)).indexOf("PM") > 0 ? " PM" : " AM";
            dateString = this.datePipe.transform(dateTimeValue, common_2.Common.dateFormat.ddMMyyyyHHMM) + dateString;
        }
        catch (ex) { }
        return dateString;
    };
    CommunicationSummaryListComponent.prototype.getdeliveryMethodName = function (enumValue) {
        var methodName = "";
        switch (enumValue) {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommunicationSummaryListComponent.prototype, "lanId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommunicationSummaryListComponent.prototype, "membershipId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommunicationSummaryListComponent.prototype, "personId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CommunicationSummaryListComponent.prototype, "onCommunicationSummaryChanged", void 0);
    CommunicationSummaryListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'communication-summary',
            templateUrl: './communicationSummaryList.component.html',
            styleUrls: ['./communicationSummaryList.component.css']
        }),
        __param(0, core_1.Inject('appContext')),
        __metadata("design:paramtypes", [Object, communicationsHistory_service_1.CommunicationsHistoryService, common_1.DatePipe])
    ], CommunicationSummaryListComponent);
    return CommunicationSummaryListComponent;
}());
exports.CommunicationSummaryListComponent = CommunicationSummaryListComponent;
//# sourceMappingURL=communicationSummaryList.component.js.map