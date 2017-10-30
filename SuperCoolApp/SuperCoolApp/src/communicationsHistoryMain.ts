import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CommunicationsHistoryAppModule } from './app/modules/communicationsHistory.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function main(configSettings: any, appContext: any) {
    platformBrowserDynamic([
        { provide: 'configSettings', useValue: configSettings },
        { provide: 'appContext', useValue: appContext }
    ]).bootstrapModule(CommunicationsHistoryAppModule);
}