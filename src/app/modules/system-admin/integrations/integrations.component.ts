import { Component, TemplateRef, ViewChild } from '@angular/core';
import moment from 'moment';
import { ChannelService, MessageUserService } from 'src/app/services';
import { ExternalService } from 'src/app/services/external.service';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent {

  @ViewChild('restAPIDataSyncModal', { static: false })
  restAPIDataSyncModal: BasicModalComponent;
    
  @ViewChild('restAPIDataSync', { static: false })
  restAPIDataSync: TemplateRef<any>;

  restAPIService: any = ['INDECAB', 'HOTELBILL', 'Other']

  restAPIQueryParams: any = {
    channelId: '',
    date: ''
  }
  maxDate = new Date();
  date : any;
  restAPIType : string = '';
  isWait:boolean=false;
  channels : any[]=[]
  constructor(
    private messageSer: MessageUserService,
    private externalService: ExternalService,
    private channelService : ChannelService
  ) {
    // this.messageSer.appSidebar = false;
  }

  openRestAPI() {
     this.restAPIQueryParams = {
      channelId: '',
      date: ''
    }
    this.restAPIType = ''
    this.date = ''
    this.restAPIDataSyncModal.templateRef = this.restAPIDataSync;
    this.restAPIDataSyncModal.show();
    this.getAllChannels();
  }

  close() {
    this.restAPIDataSyncModal.hide();
    this.restAPIQueryParams = {
      channelId: '',
      date: ''
    }
    this.restAPIType = ''
    this.date = ''
  }

  private getAllChannels() {
    this.channelService.getCannelByPage({ limit: 50, order: '-usernameId', page: 1}).subscribe({
      next: (res: any) => {
        this.channels = res['content'];
      },
      error: (err: any) => {
      },
    });
  }

  submit(){
    if(this.restAPIQueryParams.date){
        this.restAPIQueryParams.date = moment(this.restAPIQueryParams.date).format('YYYY-MM-DD');
    }
    if(this.restAPIType === 'INDECAB'){
      this.externalService.getIndecabSync(this.restAPIQueryParams).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.close();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      })
    }
    else {
      this.externalService.getHotelbillSync(this.restAPIQueryParams).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.close();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      })
    }
  }

  onDateRangeSelected(event:any) {
      console.log(event)
      this.date = event
      if(this.date){
          this.restAPIQueryParams.date = moment(this.date)
          .endOf('day')
          .toISOString();
      }
      console.log(this.restAPIQueryParams)
    }

  removeDate() {
    this.restAPIQueryParams.date = '';
    this.date= '';
  }

}
