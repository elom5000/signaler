import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProblemes } from 'app/shared/model/problemes.model';
import { ProblemesService } from './problemes.service';

@Component({
  templateUrl: './problemes-delete-dialog.component.html'
})
export class ProblemesDeleteDialogComponent {
  problemes?: IProblemes;

  constructor(protected problemesService: ProblemesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.problemesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('problemesListModification');
      this.activeModal.close();
    });
  }
}
