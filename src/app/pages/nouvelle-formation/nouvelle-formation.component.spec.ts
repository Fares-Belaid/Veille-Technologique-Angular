import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleFormationComponent } from './nouvelle-formation.component';

describe('NouvelleFormationComponent', () => {
  let component: NouvelleFormationComponent;
  let fixture: ComponentFixture<NouvelleFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelleFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
