import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface canComponentDeactivate {
  canDeactivateComponent: () =>
    | boolean
    | Observable<boolean>
    | Promise<boolean>;
}

export class canDeactiveComponentGuard
  implements CanDeactivate<canComponentDeactivate>
{
  canDeactivate(
    component: canComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      return component.canDeactivateComponent();
    }
}
