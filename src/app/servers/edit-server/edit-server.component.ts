import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';
import { canComponentDeactivate} from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit,canComponentDeactivate{
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean  =false;
  update: any;
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}



  ngOnInit() {
    const serverId= +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = +params['allowEdit'] === 1 ? true : false;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved=true;
  }

  canDeactivateComponent(): boolean
  | Observable<boolean>
  | Promise<boolean>{
      if(!this.allowEdit) {
        return true;
      }
      if(!this.changesSaved && ( this.server.name !== this.serverName || this.server.status !== this.serverStatus)) {
        return confirm("changes not saved ! would you like to leave the page ?");
      } else {
        return true;
      }
  }
}
