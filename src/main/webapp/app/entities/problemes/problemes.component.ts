import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProblemes } from 'app/shared/model/problemes.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProblemesService } from './problemes.service';
import { ProblemesDeleteDialogComponent } from './problemes-delete-dialog.component';

@Component({
  selector: 'jhi-problemes',
  templateUrl: './problemes.component.html'
})
export class ProblemesComponent implements OnInit, OnDestroy {
  problemes: IProblemes[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected problemesService: ProblemesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.problemes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.problemesService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProblemes[]>) => this.paginateProblemes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.problemes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProblemes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProblemes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProblemes(): void {
    this.eventSubscriber = this.eventManager.subscribe('problemesListModification', () => this.reset());
  }

  delete(problemes: IProblemes): void {
    const modalRef = this.modalService.open(ProblemesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.problemes = problemes;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProblemes(data: IProblemes[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.problemes.push(data[i]);
      }
    }
  }
}
