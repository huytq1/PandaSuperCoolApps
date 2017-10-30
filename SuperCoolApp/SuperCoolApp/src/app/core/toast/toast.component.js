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
var toast_service_1 = require("./toast.service");
var ToastComponent = (function () {
    function ToastComponent(toastService) {
        var _this = this;
        this.toastService = toastService;
        this.defaults = {
            title: '',
            message: '',
            type: ''
        };
        this.type = { error: false, info: false, success: false, warning: false };
        this.toastSubscription = this.toastService.toastState.subscribe(function (toastMessage) {
            _this.activate(toastMessage.message, toastMessage.toastType);
        });
    }
    ToastComponent.prototype.activate = function (message, toastType, title) {
        if (message === void 0) { message = this.defaults.message; }
        if (title === void 0) { title = this.defaults.title; }
        this.title = title;
        this.type = {
            error: (toastType === 'error'),
            info: (toastType === 'info'),
            success: (toastType === 'success'),
            warning: (toastType === 'warning')
        };
        this.message = message;
        this.show();
    };
    ToastComponent.prototype.ngOnInit = function () {
        this.toastElement = document.getElementById('toast');
    };
    ToastComponent.prototype.ngOnDestroy = function () {
        this.toastSubscription.unsubscribe();
    };
    ToastComponent.prototype.show = function () {
        var _this = this;
        this.toastElement.style.display = "block";
        this.toastElement.style.opacity = 1;
        if (!this.type.error && !this.type.warning) {
            window.setTimeout(function () { return _this.hide(); }, 3000);
        }
    };
    ToastComponent.prototype.hide = function () {
        var _this = this;
        this.toastElement.style.opacity = 0;
        window.setTimeout(function () { return _this.toastElement.style.display = "none"; }, 400);
    };
    ToastComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'toast',
            templateUrl: 'toast.component.html',
            styleUrls: ['toast.component.css']
        }),
        __metadata("design:paramtypes", [toast_service_1.ToastService])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map