import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { AuthGuard } from './auth-guard.service';
import { canDeactiveComponentGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ServerResolverService } from './servers/server/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },

  {
    path: 'servers',
    component: ServersComponent,
    //canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      { path: ':id', component: ServerComponent , resolve : {server : ServerResolverService}},
      { path: ':id/edit', component: EditServerComponent ,
        canDeactivate: [canDeactiveComponentGuard]
      },
    ],
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {}
