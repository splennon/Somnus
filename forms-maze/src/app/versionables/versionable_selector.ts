import { Injectable } from '@angular/core';
import { HookParser, HookPosition, HookValue, HookComponentData, HookBindings, HookFinder } from 'ngx-dynamic-hooks';
import * as forms from ".";

@Injectable({ 
    providedIn: 'root' 
})
export class VersionableSelector implements HookParser {

    constructor(private hookFinder: HookFinder) {
        /* Todo create a collection of key names */
        // Object.keys(forms).forEach(e => console.log(e));
    }

    public findHooks(content: string, context: any): Array<HookPosition> {
        const hookRegex = /(?:##\s{0,3}[a-zA-Z0-9-_]+\s{0,3}##)/gm;
        return this.hookFinder.findStandaloneHooks(content, hookRegex);
    }

    public loadComponent(hookId: number, hookValue: HookValue, context: any, childNodes: Array<Element>): HookComponentData {
        if(hookValue.openingTag.includes("container")){
            return {
                component: forms["WizardComponent_1_0_0"]
            };
        } else {
            return {
                component: forms["WizardComponent_2_0_0"]
            };
        }
    }

    public getBindings(hookId: number, hookValue: HookValue, context: any): HookBindings {
        /*
         * This method extracts data from the the selector tags such as attributes, but
         * thus functionality is not currently needed
         */
        return {
            inputs: {
                /*
                 * inputs to the creted component
                 */
            }
        };
    }
}