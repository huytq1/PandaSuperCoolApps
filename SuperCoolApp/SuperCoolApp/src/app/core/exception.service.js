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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var toast_service_1 = require("./toast/toast.service");
var common_1 = require("../common/common");
var ExceptionService = (function () {
    function ExceptionService(toastService) {
        var _this = this;
        this.toastService = toastService;
        this.catchBadResponse = function (errorResponse) {
            var res = errorResponse;
            var body = res.json();
            var errMsg = body ?
                (body.error ? body.error : JSON.stringify(body)) :
                (res.statusText || 'unknown error');
            _this.toastService.activateError("Error: " + errMsg);
            return Observable_1.Observable.of(false);
        };
    }
    ExceptionService.prototype.handleError = function (errorResponse) {
        var errMsg;
        if (errorResponse instanceof http_1.Response) {
            var body = errorResponse.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = errorResponse.status + " - " + (errorResponse.statusText || 'unknown error') + " " + err;
        }
        else {
            errMsg = errorResponse.message ? errorResponse.message : errorResponse;
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ExceptionService.prototype.catchAndShowErrorResponse = function (errorResponse) {
        var res = errorResponse;
        var statusCode = res.status;
        var errMsg = '';
        switch (statusCode) {
            case 400:
                errMsg = common_1.Common.httpErrorMessage.status400;
                break;
            case 401:
                errMsg = common_1.Common.httpErrorMessage.status401;
                break;
            case 403:
                errMsg = common_1.Common.httpErrorMessage.status403;
                break;
            case 404:
                errMsg = common_1.Common.httpErrorMessage.status404;
                break;
            case 406:
                errMsg = common_1.Common.httpErrorMessage.status406;
                break;
            case 408:
                errMsg = common_1.Common.httpErrorMessage.status408;
                break;
            case 422:
                var headers = res.headers;
                var headerError = headers.get("errorcode");
                switch (headerError) {
                    case "UserIdNotSetUpInBOSS":
                        errMsg = common_1.Common.httpErrorMessage.status422UserIdNotSetUpInBOSS;
                        break;
                    case "UserIdNotAssociatedWithBranch":
                        errMsg = common_1.Common.httpErrorMessage.status422UserIdNotAssociatedWithBranch;
                        break;
                    case "UserBranchNotReconciled":
                        errMsg = common_1.Common.httpErrorMessage.status422UserBranchNotReconciled;
                        break;
                    case "Other":
                        errMsg = common_1.Common.httpErrorMessage.status422Other;
                        break;
                    default:
                        errMsg = common_1.Common.httpErrorMessage.status422Other;
                        break;
                }
                break;
            case 500:
                errMsg = common_1.Common.httpErrorMessage.status500;
                break;
            case 503:
                errMsg = common_1.Common.httpErrorMessage.status503;
                break;
            case 512:
                errMsg = common_1.Common.httpErrorMessage.status512;
                break;
            case 524:
                errMsg = common_1.Common.httpErrorMessage.status524;
                break;
            default:
                errMsg = common_1.Common.httpErrorMessage.unknownStatus;
                break;
        }
        this.toastService.activateError("" + errMsg);
        return Observable_1.Observable.of(false);
    };
    ;
    ExceptionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [toast_service_1.ToastService])
    ], ExceptionService);
    return ExceptionService;
}());
exports.ExceptionService = ExceptionService;
//# sourceMappingURL=exception.service.js.map