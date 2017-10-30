import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastService } from './toast/toast.service';
import { Common } from '../common/common';


@Injectable()
export class ExceptionService {
    constructor(private toastService: ToastService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        let res = <Response>errorResponse;
        let body = res.json();
        let errMsg = body ?
            (body.error ? body.error : JSON.stringify(body)) :
            (res.statusText || 'unknown error');
        this.toastService.activateError(`Error: ${errMsg}`);
        return Observable.of(false);
    };

    handleError(errorResponse: Response | any) {
        let errMsg: string;
        if (errorResponse instanceof Response) {
            const body = errorResponse.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${errorResponse.status} - ${errorResponse.statusText || 'unknown error'} ${err}`;
        } else {
            errMsg = errorResponse.message ? errorResponse.message : errorResponse;
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    catchAndShowErrorResponse(errorResponse: any): Observable<boolean> {
        let res = <Response>errorResponse;
        let statusCode = res.status;
        let errMsg = '';
        switch (statusCode) {
            case 400:
                errMsg = Common.httpErrorMessage.status400;
                break;
            case 401:
                errMsg = Common.httpErrorMessage.status401;
                break;
            case 403:
                errMsg = Common.httpErrorMessage.status403;
                break;
            case 404:
                errMsg = Common.httpErrorMessage.status404;
                break;
            case 406:
                errMsg = Common.httpErrorMessage.status406;
                break;
            case 408:
                errMsg = Common.httpErrorMessage.status408;
                break;
            case 422:
                let headers: Headers = res.headers;
                let headerError = headers.get("errorcode");
                switch (headerError) {
                    case "UserIdNotSetUpInBOSS":
                        errMsg = Common.httpErrorMessage.status422UserIdNotSetUpInBOSS;
                        break;
                    case "UserIdNotAssociatedWithBranch":
                        errMsg = Common.httpErrorMessage.status422UserIdNotAssociatedWithBranch;
                        break;
                    case "UserBranchNotReconciled":
                        errMsg = Common.httpErrorMessage.status422UserBranchNotReconciled;
                        break;
                    case "Other":
                        errMsg = Common.httpErrorMessage.status422Other;
                        break;
                    default:
                        errMsg = Common.httpErrorMessage.status422Other;
                        break;
                }
                break;
            case 500:
                errMsg = Common.httpErrorMessage.status500;
                break;
            case 503:
                errMsg = Common.httpErrorMessage.status503;
                break;
            case 512:
                errMsg = Common.httpErrorMessage.status512;
                break;
            case 524:
                errMsg = Common.httpErrorMessage.status524;
                break;
            default:
                errMsg = Common.httpErrorMessage.unknownStatus;
                break;
        }
        this.toastService.activateError(`${errMsg}`);
        return Observable.of(false);
    };
}