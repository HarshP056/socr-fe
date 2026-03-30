import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit{
  faEnvelope = faEnvelope;
  user:any;
  
  constructor(private storageService: StorageService){}

  ngOnInit(){
    this.user = this.storageService.getUser();
  }
}
