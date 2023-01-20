import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormModel } from 'src/app/BaseTypes';

@Component({
  selector: 'list-content',
  template: `<form clrForm #form="ngForm" (ngSubmit)="onSubmit(form)">
      <clr-input-container>
        <label>Book Title</label>
        <input clrInput type="text" name="title" [(ngModel)] = "model.title"/>
      </clr-input-container>
      <clr-input-container>
        <label>Book Length Hours</label>
        <input clrInput type="number" name="hours" [(ngModel)] = "model.hours"/>
      </clr-input-container>
      <clr-input-container>
        <label>Book Length Minutes</label>
        <input clrInput type="number" name="minutes" [(ngModel)] = "model.minutes"/>
      </clr-input-container>
      <clr-input-container>
        <label>Author</label>
        <input clrInput type="text" name="author" [(ngModel)] = "model.author"/>
      </clr-input-container>
      <button name="save" class="btn btn-success" type="submit">Save</button> 
      <p>{{ model | json }}</p>
    </form>
  `,
})

export class FormExampleComponent_v1 {

  model: BookBasicFormModel_v1 = {title: "", hours:0, minutes:0, author: ""}

  @Input() public items: any[] | undefined;

  onSubmit(form: NgForm) {
    console.log("Form Submitted: " + form.value);
  }
}

export interface BookBasicFormModel_v1 extends FormModel {
  title: string;
  hours: number;
  minutes: number;
  author: string;
}