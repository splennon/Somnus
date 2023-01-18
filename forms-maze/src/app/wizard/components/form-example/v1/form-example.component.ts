import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-content',
  template: `
    <form clrForm>
      <clr-input-container>
        <label>Field 1 label</label>
        <input clrInput type="text" name="example" />
      </clr-input-container>
      <clr-input-container>
        <label>Field 2 label</label>
        <input clrInput type="text" name="example" />
      </clr-input-container>
    </form>
  `,
})
export class FormExampleComponent_v1 {
  @Input() public items: any[] | undefined;
}
