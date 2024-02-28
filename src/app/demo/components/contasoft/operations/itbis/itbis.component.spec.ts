import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItbisComponent } from './itbis.component';

describe('ItbisComponent', () => {
  let component: ItbisComponent;
  let fixture: ComponentFixture<ItbisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItbisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItbisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
