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
var communicationsHistory_model_1 = require("../../../models/communicationsHistory.model");
var common_1 = require("@angular/common");
var common_2 = require("../../../common/common");
var CommunicationDetailComponent = (function () {
    function CommunicationDetailComponent(differs, datePipe) {
        this.differs = differs;
        this.datePipe = datePipe;
        this.onMoreViewClicked = new core_1.EventEmitter();
        this.isViewMore = true;
        this.differ = differs.find({}).create(null);
    }
    CommunicationDetailComponent.prototype.ngOnInit = function () {
    };
    CommunicationDetailComponent.prototype.ngDoCheck = function () {
        var summaryChanges = this.differ.diff(this.communicationDetail);
        if (summaryChanges) {
            this.formatDataforHistoryDetail();
        }
    };
    CommunicationDetailComponent.prototype.formatDataforHistoryDetail = function () {
        try {
            if (this.communicationDetail == null) {
                this.communicationDetail = new communicationsHistory_model_1.CommunicationDetail();
            }
            var formatCommunication = new communicationsHistory_model_1.CommunicationDetail();
            var statusDateText = this.formatDateTimeToString(this.communicationDetail['statusDate']);
            this.communicationDetail['statusDateText'] = statusDateText;
            var sentOnText = this.formatDateTime(this.communicationDetail['sentOn'], common_2.Common.dateFormat.ddMMyyyy);
            this.communicationDetail['sentOnText'] = sentOnText;
            var generatedOnText = this.formatDateTimeToString(this.communicationDetail.generatedOn);
            this.communicationDetail['generatedOnText'] = generatedOnText;
            var requestedOntext = this.formatDateTimeToString(this.communicationDetail.requestedOn);
            this.communicationDetail['requestedOntext'] = requestedOntext;
            var isBundledText = this.communicationDetail['isBundled'] ? "Yes" : "No";
            this.communicationDetail['isBundledText'] = isBundledText;
        }
        catch (ex) {
            console.log("formatDataforHistoryDetail::: " + ex);
        }
    };
    CommunicationDetailComponent.prototype.formatDateTime = function (dateTime, format) {
        var dateFormat = "";
        try {
            dateFormat = dateTime ? this.datePipe.transform(dateTime, format) : '';
        }
        catch (ex) {
            dateFormat = "";
        }
        return dateFormat;
    };
    CommunicationDetailComponent.prototype.formatDateTimeToString = function (dateTimeValue) {
        var dateString = "";
        try {
            var dateTimeFormat = "dd/MM/yyyy hh:mm j";
            dateString = (this.datePipe.transform(dateTimeValue, dateTimeFormat)).indexOf("PM") > 0 ? " PM" : " AM";
            dateString = this.datePipe.transform(dateTimeValue, common_2.Common.dateFormat.ddMMyyyyHHMM) + dateString;
        }
        catch (ex) { }
        return dateString;
    };
    CommunicationDetailComponent.prototype.on_VisibleChanged = function (data) {
        this.isViewMore = !data;
        this.onMoreViewClicked.emit(data);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CommunicationDetailComponent.prototype, "onMoreViewClicked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommunicationDetailComponent.prototype, "communicationDetail", void 0);
    CommunicationDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'communication-detail',
            templateUrl: './communicationDetail.component.html',
            styleUrls: ['./communicationDetail.component.css']
        }),
        __metadata("design:paramtypes", [core_1.KeyValueDiffers, common_1.DatePipe])
    ], CommunicationDetailComponent);
    return CommunicationDetailComponent;
}());
exports.CommunicationDetailComponent = CommunicationDetailComponent;
//# sourceMappingURL=communicationDetail.component.js.map