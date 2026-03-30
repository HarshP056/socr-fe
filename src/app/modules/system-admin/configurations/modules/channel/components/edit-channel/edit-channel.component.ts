import { Component, Inject, OnInit } from '@angular/core';
import { ChannelComponent } from '../../channel.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';
import { CommonService } from 'src/app/services';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
})
export class EditChannelComponent implements OnInit {
  selectedTab: number = 1;
  heading: any = 'Email';
  isWait: boolean = false;
  showOcrSection: boolean = false;
  channelsObject: any = {};
  rows: {
    fieldName: string;
    dataType: string;
    description: string;
    required: boolean;
    format: string;
  }[] = [
    {
      fieldName: '',
      dataType: '',
      description: '',
      required: false,
      format: '',
    },
  ];
  processTypes: any[] = [];
  modeTypes: any[] = [];
  supportedFiletype: any[] = [];

  constructor(
    private commonService: CommonService,
    private channalService: ChannelService,
    private dialogRef: MatDialogRef<ChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getModeType();
    this.getProcessoerType();
    this.getSupportedType();
    this.getChannelByid(this.data.id);
  }

  selectedType(val: any) {
    if (val.value === 'ocr') {
      this.showOcrSection = true;
    } else {
      this.showOcrSection = false;
    }
  }

  onTabchange(val: number) {
    this.selectedTab = val;
  }

  addRow() {
    this.rows.push({
      fieldName: '',
      dataType: '',
      description: '',
      required: false,
      format: '',
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  private getModeType() {
    this.commonService.getModeTypes().subscribe({
      next: (res: any) => {
        this.modeTypes = res;
      },
      error: (error) => {},
    });
  }

  private getProcessoerType() {
    this.commonService.getprocesserType().subscribe({
      next: (res: any) => {
        this.processTypes = res;
      },
      error: (error) => {},
    });
  }

  private getSupportedType() {
    this.commonService.getfiletypes().subscribe({
      next: (res: any) => {
        this.supportedFiletype = res;
      },
      error: (error) => {},
    });
  }

  private getChannelByid(id: any) {
    this.channalService.getByIdChannel(id).subscribe({
      next: (res: any) => {
        this.channelsObject = res;
        console.log(this.channelsObject);
      },
      error: (error) => {},
    });
  }

  submit() {
    this.isWait = true;
    this.updateObject();
    return;
  }

  private updateObject() {
    this.channalService.putChannel({ ...this.channelsObject }, this.data.id).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.dialogRef.close('success');
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

}
