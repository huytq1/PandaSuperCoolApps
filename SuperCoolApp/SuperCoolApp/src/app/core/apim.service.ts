import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApimService {
    apiEndpoint: string = '';
    headers: Headers;
    static token: string;
    config: any;

    constructor( @Inject('configSettings') configSettings: any) {
        this.apiEndpoint = configSettings.apiEndpoint;
        this.setHeaders(configSettings);
        this.config = configSettings;
    }

    setConfig(configSettings: any) {
        return new ApimService(configSettings);
    }

    setHeaders(config: any) {
        this.headers = new Headers();
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
    }

    getHeaders(): any {

        // Get the token
        this.getToken();

        // Append token
        if (ApimService.token) {
            this.headers.set('Authorization', "Bearer " + ApimService.token);
            return this.headers;
        } else {
            return this.headers;
        }
    } 

    getToken(): any {

        console.log('call getToken...');

        this.config.getToken(function (token: string) {

            // Set the token variable
            ApimService.token = token;
        });
    }
}
