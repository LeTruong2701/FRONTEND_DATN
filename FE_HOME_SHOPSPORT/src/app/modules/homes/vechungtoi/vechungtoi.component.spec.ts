/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VechungtoiComponent } from './vechungtoi.component';

describe('VechungtoiComponent', () => {
  let component: VechungtoiComponent;
  let fixture: ComponentFixture<VechungtoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VechungtoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VechungtoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
