import { Component, inject } from '@angular/core';
import { User } from 'src/app/Models/User';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css']
})
export class ListNoteComponent {
Notes:User[]=[]
dataService=inject(DataService);

ngOnInit():void{
  this.Notes=this.dataService.data;
}
Delete=(name:string)=>{
this.dataService.removeNote(name).subscribe((d:any)=>{
this.Notes=d
})


}
}
