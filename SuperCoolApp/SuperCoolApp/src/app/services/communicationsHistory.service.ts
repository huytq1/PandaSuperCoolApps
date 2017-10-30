import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Utils } from '../core/utils';
import { ApimService } from '../core/apim.service';
import { SpinnerService } from '../core/spinner/spinner.service';
import { ToastService } from '../core/toast/toast.service';
import { Common } from '../common/common';
import { ExceptionService } from '../core/exception.service';

import { CommunicationSummary, CommunicationDetail, CommunicationDocument } from '../models/communicationsHistory.model';

import 'rxjs/Rx';

@Injectable()
export class CommunicationsHistoryService {
    constructor(private http: Http,
        private toastService: ToastService,
        private apimService: ApimService,
        private spinnerService: SpinnerService,
        private exceptionService: ExceptionService) {

    }

    public getCommunicationSummary(membershipIdOrPersonIdQuery: string, lanId: string): Observable<any> {
        this.spinnerService.show();
        let headers = this.apimService.getHeaders();
        headers.append("LANId", lanId);
        return this.http.get(`${this.apimService.apiEndpoint}/ssp/communicationSummary?` + membershipIdOrPersonIdQuery,
            { headers: headers })
            .map((res: Response) => this.extractData<CommunicationSummary>(res))
            .catch((err) => this.exceptionService.catchAndShowErrorResponse(err))
            .finally(() => this.spinnerService.hide());
    }



    public getCommuincationDetail(communicationId: string, lanId: string): Observable<any> {
        this.spinnerService.show();
        let headers = this.apimService.getHeaders();
        headers.append("LANId", lanId);
        return this.http.get(`${this.apimService.apiEndpoint}/ssp/communicationDetails/${communicationId}`,
            { headers: headers })
            .map((res: Response) => this.extractData<CommunicationDetail>(res))
            .catch((err) => this.exceptionService.catchAndShowErrorResponse(err))
            .finally(() => this.spinnerService.hide());
    }

    public getCommunicationDocument(documentId: string, lanId: string): Observable<any> {
        this.spinnerService.show();
        let headers = this.apimService.getHeaders();
        headers.append("LANId", lanId);
        return this.http.get(`${this.apimService.apiEndpoint}/ssp/communicationDocument/${documentId}?src=NAS`,
            { headers: headers })
            .map((res: Response) => this.extractData<CommunicationDocument>(res))
            .catch((err) => this.exceptionService.catchAndShowErrorResponse(err))
            .finally(() => this.spinnerService.hide());
    }

    extractData<T>(res: Response) {
        let body = res.json ? res.json() : null;
        if (body) {
            body = (body['Data'] || body['data']);
        }
        return <T>(body || []);
    }
}