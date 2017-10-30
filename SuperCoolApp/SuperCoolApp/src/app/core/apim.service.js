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
var http_1 = require("@angular/http");
var ApimService = (function () {
    function ApimService(configSettings) {
        this.apiEndpoint = '';
        this.apiEndpoint = configSettings.apiEndpoint;
        this.setHeaders(configSettings);
        this.config = configSettings;
    }
    ApimService_1 = ApimService;
    ApimService.prototype.setConfig = function (configSettings) {
        return new ApimService_1(configSettings);
    };
    ApimService.prototype.setHeaders = function (config) {
        this.headers = new http_1.Headers();
        if (config.apiKey) {
            this.headers.append('Ocp-Apim-Subscription-Key', config.apiKey);
        }
        if (config.trace) {
            this.headers.append('Ocp-Apim-Trace', config.trace);
        }
        if (config.accept) {
            this.headers.append('Accept', config.accept);
        }
        if (config.contentType) {
            this.headers.append('Content-Type', config.contentType);
        }
    };
    ApimService.prototype.getHeaders = function () {
        // Get the token
        this.getToken();
        // Append token
        if (ApimService_1.token) {
            this.headers.set('Authorization', "Bearer " + ApimService_1.token);
            return this.headers;
        }
        else {
            return this.headers;
        }
    };
    ApimService.prototype.getToken = function () {
        console.log('call getToken...');
        this.config.getToken(function (token) {
            // Set the token variable
            ApimService_1.token = token;
        });
    };
    ApimService = ApimService_1 = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('configSettings')),
        __metadata("design:paramtypes", [Object])
    ], ApimService);
    return ApimService;
    var ApimService_1;
}());
exports.ApimService = ApimService;
//# sourceMappingURL=apim.service.js.map