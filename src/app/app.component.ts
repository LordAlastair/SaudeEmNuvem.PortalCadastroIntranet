/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: `

  <router-outlet>
  <div>
  <toaster-container [toasterconfig]="config1"></toaster-container>
</div>
  </router-outlet>
`,
})
export class AppComponent implements OnInit {
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
    timeout: 8000,
    limit: 8,
    showCloseButton: false,
    tapToDismiss: false,
  });

  constructor(private analytics: AnalyticsService, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
