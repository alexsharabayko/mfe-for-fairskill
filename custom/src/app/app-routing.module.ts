import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExternalComponent} from './external/external.component';

const routes: Routes = [
  {
    path: 'app-1',
    component: ExternalComponent,
    data: {
      name: 'app-vue-1',
      url: 'http://localhost:4201/app-vue-1.js',
      deps: [
        'http://localhost:4201/external-apps-vendor.js',
      ],
    },
  },
  {
    path: 'app-2',
    component: ExternalComponent,
    data: {
      name: 'app-vue-2',
      url: 'http://localhost:4201/app-vue-2.js',
      deps: [
        'http://localhost:4201/external-apps-vendor.js',
      ],
    },
  },
  {
    path: 'app-3',
    component: ExternalComponent,
    data: {
      name: 'app-vue-3',
      url: 'http://localhost:4201/app-vue-3.js',
      deps: [
        'http://localhost:4201/external-apps-vendor.js',
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
