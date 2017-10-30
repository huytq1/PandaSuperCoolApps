"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommunicationSummary = (function () {
    function CommunicationSummary() {
        this.id = "";
        this.membershipId = null;
        this.personId = null;
        this.recipient = "";
        this.category = ""; /* Membership or Person*/
        this.description = "";
        this.sentOn = null; /* UC0282 - dd/mm/yyyy hh:mm AM/PM format*/
        this.statusDate = "";
        this.requestedOn = null;
        this.communicationChannel = "";
    }
    return CommunicationSummary;
}());
exports.CommunicationSummary = CommunicationSummary;
var CommunicationDetail = (function (_super) {
    __extends(CommunicationDetail, _super);
    function CommunicationDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sourceId = "";
        _this.source = "";
        _this.generatedOn = null;
        _this.status = "";
        _this.detail = "";
        _this.sentTo = "";
        _this.sentBy = "";
        _this.isBundled = false;
        return _this;
    }
    return CommunicationDetail;
}(CommunicationSummary));
exports.CommunicationDetail = CommunicationDetail;
var CommunicationDocument = (function () {
    function CommunicationDocument() {
        this.documentId = "";
        this.communicationDocumentName = "";
        this.communicationDocumentMimeType = "";
        this.communicationDocumentLocation = "";
        this.communicationSmsText = "";
        this.communicationsDocumentAccessMode = ""; /* 0 = Document API call; 1 = External URL; 2 = SMS Text */
    }
    return CommunicationDocument;
}());
exports.CommunicationDocument = CommunicationDocument;
var DocumentAccessModeEnum = (function () {
    function DocumentAccessModeEnum() {
        this.value = "";
        this.Description = "";
    }
    return DocumentAccessModeEnum;
}());
exports.DocumentAccessModeEnum = DocumentAccessModeEnum;
var CommunicationData = (function () {
    function CommunicationData() {
        this.key = "";
    }
    return CommunicationData;
}());
exports.CommunicationData = CommunicationData;
var CommunicationStatusEvent = (function () {
    function CommunicationStatusEvent() {
        this.personGivenName = "";
        this.personFamilyName = "";
        this.recipient = ""; //PersonGivenName + PersonFamilyName 
        this.eventStatusDetail = "";
    }
    return CommunicationStatusEvent;
}());
exports.CommunicationStatusEvent = CommunicationStatusEvent;
var CommunicationStatus = (function (_super) {
    __extends(CommunicationStatus, _super);
    function CommunicationStatus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recipient = "";
        return _this;
    }
    return CommunicationStatus;
}(CommunicationStatusEvent));
exports.CommunicationStatus = CommunicationStatus;
var MergeItem = (function () {
    function MergeItem() {
    }
    return MergeItem;
}());
exports.MergeItem = MergeItem;
//# sourceMappingURL=communicationsHistory.model.js.map