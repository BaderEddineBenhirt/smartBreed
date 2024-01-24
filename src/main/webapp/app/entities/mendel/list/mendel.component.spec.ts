import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MendelService } from '../service/mendel.service';

import { MendelComponent } from './mendel.component';

describe('Maladie Management Component', () => {
  let comp: MendelComponent;
  let fixture: ComponentFixture<MendelComponent>;
  let service: MendelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MendelComponent],
    })
      .overrideTemplate(MendelComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MendelComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MendelService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.mendel?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
  it('Should call mendel all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.mendel).toHaveBeenCalled();
    expect(comp.mendel?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
