import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SignalerTestModule } from '../../../test.module';
import { ProblemesDetailComponent } from 'app/entities/problemes/problemes-detail.component';
import { Problemes } from 'app/shared/model/problemes.model';

describe('Component Tests', () => {
  describe('Problemes Management Detail Component', () => {
    let comp: ProblemesDetailComponent;
    let fixture: ComponentFixture<ProblemesDetailComponent>;
    const route = ({ data: of({ problemes: new Problemes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SignalerTestModule],
        declarations: [ProblemesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProblemesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProblemesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load problemes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.problemes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
