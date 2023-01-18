import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from "@angular/router";

export class NoRouteReuseStrategy extends BaseRouteReuseStrategy {

    override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) { return false; } 
}