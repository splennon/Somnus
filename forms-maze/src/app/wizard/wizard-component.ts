import {
    Component,
    Input,
    QueryList,
    Type,
    ViewChildren,
    ViewContainerRef,
  } from '@angular/core';

  import { Router, ActivatedRoute, ParamMap } from '@angular/router';

  import * as configs from './configs/index';
  
  @Component({
    selector: 'wizard',
    template: `
  <div *ngFor="let slot of storedConfigData">
    <div class="header" (click)="onHeaderClick(slot.id)">
      <i
        class="fa"
      ></i>
      {{ slot.header }}
    </div>
    <div class="content" [hidden]="!slot.open">
      <p *ngIf="!slot.content.componentType">{{ slot.content.text }}</p>
      <div *ngIf="slot.content.componentType">
        <ng-template #slotTemplate></ng-template>
      </div>
    </div>
  </div>
  <clr-modal [clrModalOpen]="modalVersionSelector" [clrModalClosable]="false">
    <h3 class="modal-title">Which version would you like?</h3>
    <div class="modal-body">
      <p>Please specify which version you would like to
        build by query param (?version=) or as @Input
        version, or use one of these links:</p>
      <ul>
        <li *ngFor="let ver of versions">
          <a [routerLink]="[]" [queryParams]="{version: ver}">
            {{ ver }}
          </a>
        </li>
      </ul>
    </div>
  </clr-modal>
  `,
    styles: [`:host {
        width: 95%;
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translate(-50%, -0%);
      }
      
      .header {
        border: solid 1px black;
        padding: 0.25rem 0.75rem;
        display: flex;
        align-items: center;
      }
      
      .fa {
        width: 1rem;
        margin-right: 0.5rem;
        color: gray;
      }
      
      .content {
        border: solid 1px gray;
        border-top: none;
        padding: 0.5rem;
      }
      `],
  })
  export class WizardComponent {

    @Input() public version!: keyof typeof configs;
    
    storedConfigData!: any[];
    modalVersionSelector: boolean = false;
    versions: string[];
  
    constructor(
      private route: ActivatedRoute,
    ) {
      this.versions = Object.keys(configs);
    }

    @ViewChildren('slotTemplate', { read: ViewContainerRef })
    public slotTemplates!: QueryList<ViewContainerRef>;
  
    public ngOnInit(): void {
      this.storedConfigData = configs[this.version];
      this.route.queryParams.subscribe(params => {
        this.version = params['version'];
        if (this.versions.includes(this.version)) {
          this.storedConfigData = configs[this.version];
          this.modalVersionSelector = false;
        } else {
          this.modalVersionSelector = true;
        }

      });
    }

    public ngAfterViewInit(): void {
      /*
       * SlotTemplates will not be fully populated at this point, but we need to create components
       * therein, so we defer to the end of the current microtask loop. If you'd prefer to defer to
       * the next change detection microloop use this instead of a Promise:
       * setTimeout(() => {...})
       */
      Promise.resolve().then(() =>
      {
        let i = 0;
        this.storedConfigData.forEach((slot) => {
          if (slot.content.componentType) {
            const comp = this.slotTemplates
              .get(i++)!
              .createComponent(slot.content.componentType as Type<any>);
            Object.keys(slot.content.inputs).forEach(
              (key) => (comp.instance[key] = slot.content.inputs[key])
            );
          }
        });
      });
    }
  
    public onHeaderClick(id: number) {
      const slotClicked = this.storedConfigData.find((slot: { id: number; }) => slot.id === id);
      slotClicked!.open = !slotClicked!.open;
    }
  }
  