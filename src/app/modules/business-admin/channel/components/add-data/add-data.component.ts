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
  items:any = {
    field: '',
    value: '',
    type: '',
    regex: ''
  }
  fieldTypes = ['Fixed', 'Regular Expression']

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  ngOnInit(){
    this.items = {...this.data}
  }

  saveItemData(){
    this.onsubmit.emit({...this.items})
  }

  close() {
    this.onclose.emit();
  }
}
