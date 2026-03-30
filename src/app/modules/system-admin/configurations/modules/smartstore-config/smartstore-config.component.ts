import { Component, OnInit } from '@angular/core';
import { SmartStoreService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { MessageUserService } from 'src/app/services/message-user.service';

@Component({
  selector: 'app-smartstore-config',
  templateUrl: './smartstore-config.component.html',
  styleUrls: ['./smartstore-config.component.scss'],
})
export class SmartstoreConfigComponent implements OnInit {
  smartStore: any = {
     id:'',
    authId:'',
    compId:'',
    contRep:'',
    expiration:'',
    pversion:'',
    system:'',
    secKey:'',
    serverURL:'',
  };
  createmartStore: any = {
    id:'',
    authId:'',
    compId:'',
    contRep:'',
    expiration:'',
    pversion:'',
    system:'',
    secKey:'',
    serverURL:'',
  };
  isWait: boolean = false;
  isDelete: boolean = false
  show:boolean = false;
  logicalSystemList:any[]=[]
  systemId:any;
  showSystemDetails:boolean = false
  showUpdateSystem: boolean = false
  constructor(
    private messageSer: MessageUserService,
    private smartStoreService: SmartStoreService,
    private logicalSystemService: LogicalSystemService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    console.log(this.smartStore)
    this.getLogicalSystems();
  }

  private getSmartStore(systemId:any) {
    this.smartStoreService.getSmartStoreCongif(systemId).subscribe({
      next: (res: any) => {
        if(res['result']){
          this.showSystemDetails=true;
          this.smartStore = res['result'];
          
        } else{
          this.showSystemDetails=false;
          this.smartStore={
            id:'',
            authId:'',
            compId:'',
            contRep:'',
            expiration:'',
            pversion:'',
            system:'',
            secKey:'',
            serverURL:'',
          }
        }
       // console.log(this.smartStore);
      },
      error: (error) => {
        this.showSystemDetails=false;
        this.smartStore={
          id:'',
          authId:'',
          compId:'',
          contRep:'',
          expiration:'',
          pversion:'',
          system:'',
          secKey:'',
          serverURL:'',
        }
      },
    });
  }

  submit() {
    this.updatesmartStore();
    return;
  }

  private updatesmartStore() {
    this.isWait = true;
    this.smartStoreService
      .putSmartStoreCongif({ ...this.smartStore },this.systemId)
      .subscribe({
        next: (res: any) => {
          this.getSmartStore(this.systemId);
          this.isWait = false;
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  };

   createConfig() {
    
    this.isWait = true;
    this.smartStoreService
      .createSmartStoreCongif({...this.createmartStore},this.systemId)
      .subscribe({
        next: (res: any) => {
          this.showUpdateSystem = false
          this.smartStore = {};
    this.showSystemDetails = false
    this.systemId = "";
          // this.getSmartStore(this.systemId);
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

  onChangeSystem(event:any){
   
    this.systemId = "";
    this.showSystemDetails=false;
    this.systemId= event.value
    if(!this.showUpdateSystem){
      this.smartStore={
        id:'',
        authId:'',
        compId:'',
        contRep:'',
        expiration:'',
        pversion:'',
        system:'',
        secKey:'',
        serverURL:'',
      }
      this.getSmartStore(this.systemId);
    }
  }

  getLogicalSystems() {
    this.logicalSystemService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.logicalSystemList = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  showCreateForm(){
    this.showUpdateSystem = true;
    this.smartStore = {};
    this.showSystemDetails = false
  }

  hideCreateForm(){
    this.showUpdateSystem = false
  }

  deleteConfig(){
    this.isDelete = true;
    this.smartStoreService
      .deleteSmartStoreCongif(this.systemId)
      .subscribe({
        next: (res: any) => {
          this.showUpdateSystem = false
          this.smartStore = {};
    this.showSystemDetails = false
    this.systemId = "";
          // this.getSmartStore(this.systemId);
          this.isDelete = false;
        },
        error: (err: any) => {
          this.isDelete = false;
        },
      });
  }
}


