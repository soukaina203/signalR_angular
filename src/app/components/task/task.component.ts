import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
@Input() task!:string;
@Output() taskDeleted = new EventEmitter<void>();

onDeleteClick=()=>{
this.taskDeleted.emit();
}
}
