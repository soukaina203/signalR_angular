import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formGroup!:FormGroup;
formBuilder=inject(FormBuilder);
dataService=inject(DataService);

  ngOnInit():void{
this.formGroup=this.formBuilder.group({
  name:['',Validators.required],
  desc:['',Validators.minLength(4)]
})

  }
  handleSubmit=()=>{
    const User = this.formGroup.value;
 this.dataService.addNote(User).subscribe((d)=>{
console.log(d)
 })

  }
}
