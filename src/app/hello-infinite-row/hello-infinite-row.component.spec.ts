import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloInfiniteRowComponent } from './hello-infinite-row.component';

describe('HelloInfiniteRowComponent', () => {
  let component: HelloInfiniteRowComponent;
  let fixture: ComponentFixture<HelloInfiniteRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloInfiniteRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloInfiniteRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
