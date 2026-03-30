import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MessageUserService,
  MiscService,
  OcrConfigService,
} from 'src/app/services';
import { ChannelService } from 'src/app/services/channel.service';
@Component({
  selector: 'app-create-ocr-profile',
  templateUrl: './create-ocr-profile.component.html',
  styleUrls: ['./create-ocr-profile.component.scss'],
})
export class CreateOcrProfileComponent {
  isWait: boolean = false;
  ocrProfileId: number;
  editMode: any = 'new';
  ocrProfileObject: any = {};
  constructor(
    private messageSer: MessageUserService,
    private router: Router,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private ocrConfigservice: OcrConfigService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.ocrProfileId = params.id;
      this.ocrProfileObject.engineType = 'FCI'
      if (this.ocrProfileId) {
        this.editMode = 'edit';
        this.getChannelByid();
      }
    });
  }

  private getChannelByid() {
    this.ocrConfigservice.getByIdOcrProfile(this.ocrProfileId).subscribe({
      next: (res: any) => {
        this.ocrProfileObject = res;
        // if (this.channelsObject.processorType === 'ocr') {
        //   this.showOcrSection = true;
        // }
      },
      error: (error) => {},
    });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
  onBack() {
    this.location.back();
  }

  submit() {
    this.isWait = true;
    if (this.editMode === 'edit') {
      this.updateObject();
    } else {
      this.postObject();
    }
    return;
  }
  private updateObject() {
    this.ocrConfigservice
      .putOcrProfile({ ...this.ocrProfileObject }, this.ocrProfileId)
      .subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.onBack();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }
  private postObject() {
    this.ocrConfigservice
      .postOcrProfile({ ...this.ocrProfileObject })
      .subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.onBack();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }
}
