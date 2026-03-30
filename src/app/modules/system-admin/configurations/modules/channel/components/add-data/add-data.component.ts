import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
  @Input('data') data:any;
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  items = {
    field: '',
    value: '',
    type: '',
    regex: '',
    scope: ''
  }
  fieldTypes = [
  {
    name: "Fixed",value:"fixed"
  },
  {
    name: "Regex",value:"regex"
  }]
  scopeTypes=[
    { name: "Subject",value:"subject" },
    { name: "Body",value:"body" },
    { name: "From Email",value:"fromEmail" },
    { name: "File Name",value:"primaryFileName" }
  ]
  constructor(){
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  ngOnInit(){
    console.log(this.data)
  }

  saveItemData(){
    console.log(this.data)
    this.onsubmit.emit(this.data)
  }

  close() {
    this.onclose.emit();
  }
}
