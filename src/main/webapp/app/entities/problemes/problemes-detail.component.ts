import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProblemes } from 'app/shared/model/problemes.model';

@Component({
  selector: 'jhi-problemes-detail',
  templateUrl: './problemes-detail.component.html'
})
export class ProblemesDetailComponent implements OnInit {
  problemes: IProblemes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ problemes }) => (this.problemes = problemes));
  }

  previousState(): void {
    window.history.back();
  }
}
