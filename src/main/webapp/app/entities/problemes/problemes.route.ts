import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProblemes, Problemes } from 'app/shared/model/problemes.model';
import { ProblemesService } from './problemes.service';
import { ProblemesComponent } from './problemes.component';
import { ProblemesDetailComponent } from './problemes-detail.component';
import { ProblemesUpdateComponent } from './problemes-update.component';

@Injectable({ providedIn: 'root' })
export class ProblemesResolve implements Resolve<IProblemes> {
  constructor(private service: ProblemesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProblemes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((problemes: HttpResponse<Problemes>) => {
          if (problemes.body) {
            return of(problemes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Problemes());
  }
}

export const problemesRoute: Routes = [
  {
    path: '',
    component: ProblemesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'signalerApp.problemes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProblemesDetailComponent,
    resolve: {
      problemes: ProblemesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'signalerApp.problemes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProblemesUpdateComponent,
    resolve: {
      problemes: ProblemesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'signalerApp.problemes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProblemesUpdateComponent,
    resolve: {
      problemes: ProblemesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'signalerApp.problemes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
