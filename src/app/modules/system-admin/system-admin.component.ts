import { Component } from '@angular/core';
import { MessageUserService } from 'src/app/services/message-user.service';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss'],
})
export class SystemAdminComponent {
  showSidebar: boolean = true;
  menu: any = [
    {
      name: 'Configurations',
      link: 'configurations',
      icon: './assets/images/database-info.png',
    },
    {
      name: 'AI Intelligence Hub',
      link: 'intelligence-hub',
      icon: './assets/images/database-info.png',
    },
    {
      name: 'Integrations',
      link: 'integrations',
      icon: './assets/images/puzzle-info.png',
    },
    {
      name: 'Logs',
      link: 'system-logs',
      icon: './assets/images/logs-info.svg',
    },
    {
      name: 'Settings',
      link: 'system-settings',
      icon: './assets/images/tools-info.png',
    }

    // {
    //   name: 'Test',
    //   link: 'test',
    //   icon: './assets/images/puzzle-info.png',
    // },
  ];
  constructor(private messageService: MessageUserService) {
    this.messageService.baSidebarSubject$.subscribe((val) => {
      this.showSidebar = val;
    });
  }

  ngOnInit() {}
}
