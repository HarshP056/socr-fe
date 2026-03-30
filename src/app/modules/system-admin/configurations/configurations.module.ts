import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationRoutingModule } from './configuration.routing';


@NgModule({
  declarations: [ConfigurationsComponent ],
  imports: [CommonModule, ConfigurationRoutingModule],
})
export class ConfigurationsModule {}
