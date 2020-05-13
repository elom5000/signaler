import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SignalerTestModule } from '../../../test.module';
import { ProblemesUpdateComponent } from 'app/entities/problemes/problemes-update.component';
import { ProblemesService } from 'app/entities/problemes/problemes.service';
import { Problemes } from 'app/shared/model/problemes.model';

describe('Component Tests', () => {
  describe('Problemes Management Update Component', () => {
    let comp: ProblemesUpdateComponent;
    let fixture: ComponentFixture<ProblemesUpdateComponent>;
    let service: ProblemesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SignalerTestModule],
        declarations: [ProblemesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProblemesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProblemesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProblemesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Problemes(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Problemes();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
