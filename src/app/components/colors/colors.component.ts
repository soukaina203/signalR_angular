import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent {
@Output () msgChange=new EventEmitter()
bg_change=(b:string)=>{
  this.msgChange.emit(b)
}
}
