import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsSelectorComponent } from './colors-selector.component';

describe('SelectorComponent', () => {
  let component: ColorsSelectorComponent;
  let fixture: ComponentFixture<ColorsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorsSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
