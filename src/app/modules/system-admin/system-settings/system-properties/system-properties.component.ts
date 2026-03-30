import { Component } from '@angular/core';
import { MessageUserService } from 'src/app/services';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-system-properties',
  templateUrl: './system-properties.component.html',
  styleUrls: ['./system-properties.component.scss']
})
export class SystemPropertiesComponent {
  property: any;

  constructor(
    private propertyService: PropertiesService,
    private messageSer: MessageUserService,
  ) { 
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.getSystemProperties();
  }

  getSystemProperties() {
    this.propertyService
      .getProperties()
      .subscribe((response: any) => {
        this.property = response;
      });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

}
