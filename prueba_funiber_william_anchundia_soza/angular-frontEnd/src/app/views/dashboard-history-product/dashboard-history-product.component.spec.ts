import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHistoryProductComponent } from './dashboard-history-product.component';

describe('DashboardHistoryProductComponent', () => {
  let component: DashboardHistoryProductComponent;
  let fixture: ComponentFixture<DashboardHistoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHistoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHistoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
