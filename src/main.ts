import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LocalStorageHelper } from './app/shared/helpers/local-storage-helper';
import { Guid } from './app/shared/helpers/guid';

import './app/shared/prototypes/date-prototype';
import './app/shared/prototypes/string-prototype';
import './app/shared/prototypes/number-prototype';

if (environment.production) {
  enableProdMode();
}

LocalStorageHelper.setDeviceId(Guid.newGuid());

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
