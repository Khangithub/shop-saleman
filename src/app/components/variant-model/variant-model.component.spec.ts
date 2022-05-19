import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantModelComponent } from './variant-model.component';

describe('VariantModelComponent', () => {
  let component: VariantModelComponent;
  let fixture: ComponentFixture<VariantModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
