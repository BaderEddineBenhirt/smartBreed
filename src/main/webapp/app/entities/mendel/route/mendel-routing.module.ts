import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MendelComponent } from '../list/mendel.component';

 
import { MendelRoutingResolveService } from './mendel-routing-resolve.service';

const mendelRoute: Routes = [
  {
    path: '',
    component: MendelComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MendelComponent,
    resolve: {
      mendel: MendelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(mendelRoute)],
  exports: [RouterModule],
})
export class MendelRoutingModule {}
