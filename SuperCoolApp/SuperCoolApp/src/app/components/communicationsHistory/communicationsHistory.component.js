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
var communicationsHistory_service_1 = require("../../services/communicationsHistory.service");
var communicationsHistory_model_1 = require("../../models/communicationsHistory.model");
var CommunicationsHistoryComponent = (function () {
    function CommunicationsHistoryComponent(communicationHistoryService) {
        this.communicationHistoryService = communicationHistoryService;
        this.initializationCommunicationDetail();
    }
    CommunicationsHistoryComponent.prototype.ngOnInit = function () {
    };
    CommunicationsHistoryComponent.prototype.on_CommunicationSummaryChanged = function (data) {
        this.communicationSummary = data;
        this.getCommunicationDetail();
    };
    CommunicationsHistoryComponent.prototype.initializationCommunicationDetail = function () {
        this.communicationDetail = new communicationsHistory_model_1.CommunicationDetail();
        this.communicationDetail['category'] = "";
        this.communicationDetail['recipient'] = "";
        this.communicationDetail['sentOnText'] = "";
        this.communicationDetail['requestedOntext'] = "";
        this.communicationDetail['generatedOnText'] = "";
        this.communicationDetail['commId'] = "";
        this.communicationDetail.documentList = [];
        this.communicationDetail.statusHistoryList = [];
    };
    CommunicationsHistoryComponent.prototype.getCommunicationDetail = function () {
        var _this = this;
        this.communicationHistoryService.getCommuincationDetail(this.communicationSummary.id, this.lanId)
            .subscribe(function (res) {
            if (res) {
                _this.communicationDetail = res;
                _this.communicationDetail['category'] = _this.communicationSummary.category;
                _this.communicationDetail['recipient'] = _this.communicationSummary.recipient;
                _this.communicationDetail['sentOn'] = _this.communicationSummary.sentOn;
                _this.communicationDetail['commId'] = _this.communicationSummary.id;
            }
            else {
                _this.initializationCommunicationDetail();
            }
        });
    };
    CommunicationsHistoryComponent.prototype.on_MoreViewClicked = function (data) {
        this.isShowDocumentList = data;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommunicationsHistoryComponent.prototype, "lanId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommunicationsHistoryComponent.prototype, "membershipId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommunicationsHistoryComponent.prototype, "personId", void 0);
    CommunicationsHistoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'communications-history',
            templateUrl: './communicationsHistory.component.html',
            styleUrls: ['./communicationsHistory.component.css'],
            providers: [communicationsHistory_service_1.CommunicationsHistoryService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [communicationsHistory_service_1.CommunicationsHistoryService])
    ], CommunicationsHistoryComponent);
    return CommunicationsHistoryComponent;
}());
exports.CommunicationsHistoryComponent = CommunicationsHistoryComponent;
//# sourceMappingURL=communicationsHistory.component.js.map