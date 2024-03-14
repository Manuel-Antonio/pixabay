import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImageComponent } from './search-image.component';

describe('SearchImageComponent', () => {
  let component: SearchImageComponent;
  let fixture: ComponentFixture<SearchImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchImageComponent]
    });
    fixture = TestBed.createComponent(SearchImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
