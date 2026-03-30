import { Component, OnInit } from '@angular/core';
import { MessageUserService } from 'src/app/services';
import { SystemSettingsService } from 'src/app/services/system-settings.service';

@Component({
  selector: 'app-open-ai-config',
  templateUrl: './open-ai-config.component.html',
  styleUrls: ['./open-ai-config.component.scss']
})
export class OpenAiConfigComponent implements OnInit {

  openAi: any = {};
  isWait: boolean = false;
  show:boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private systemSettingService: SystemSettingsService) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.getOpenAi();
  }

  private getOpenAi(id = 'OpenApiConfig') {
    this.systemSettingService.getSystemConfig(id).subscribe({
      next: (res: any) => {
        this.openAi = res;
      },
      error: (error) => {},
    });
  }

  submit() {
    this.updatesmartStore();
    return;
  }

  private updatesmartStore(id = 'OpenApiConfig') {
    this.isWait = true;
    this.systemSettingService
      .putSystemConfig( id, {...this.openAi })
      .subscribe({
        next: (res: any) => {
          this.getOpenAi();
          this.isWait = false;
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
