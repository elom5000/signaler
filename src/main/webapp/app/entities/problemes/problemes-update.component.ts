import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProblemes, Problemes } from 'app/shared/model/problemes.model';
import { ProblemesService } from './problemes.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAgence } from 'app/shared/model/agence.model';
import { AgenceService } from 'app/entities/agence/agence.service';

type SelectableEntity = IUser | IAgence;

@Component({
  selector: 'jhi-problemes-update',
  templateUrl: './problemes-update.component.html'
})
export class ProblemesUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  agences: IAgence[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    numeroIp: [null, [Validators.required]],
    user: [],
    agence: []
  });

  constructor(
    protected problemesService: ProblemesService,
    protected userService: UserService,
    protected agenceService: AgenceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ problemes }) => {
      this.updateForm(problemes);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.agenceService.query().subscribe((res: HttpResponse<IAgence[]>) => (this.agences = res.body || []));
    });
  }

  updateForm(problemes: IProblemes): void {
    this.editForm.patchValue({
      id: problemes.id,
      libelle: problemes.libelle,
      numeroIp: problemes.numeroIp,
      user: problemes.user,
      agence: problemes.agence
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const problemes = this.createFromForm();
    if (problemes.id !== undefined) {
      this.subscribeToSaveResponse(this.problemesService.update(problemes));
    } else {
      this.subscribeToSaveResponse(this.problemesService.create(problemes));
    }
  }

  private createFromForm(): IProblemes {
    return {
      ...new Problemes(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      numeroIp: this.editForm.get(['numeroIp'])!.value,
      user: this.editForm.get(['user'])!.value,
      agence: this.editForm.get(['agence'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProblemes>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
