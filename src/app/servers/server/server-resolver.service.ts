import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';


export interface Server {
  id: number; name: string; status: string
}
@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<Server> {

  constructor(private serverService: ServersService, private route: ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
    return this.serverService.getServer(+route.params['id'])
  }
}
