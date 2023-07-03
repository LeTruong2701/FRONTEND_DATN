/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhoComponent } from './kho.component';

describe('KhoComponent', () => {
  let component: KhoComponent;
  let fixture: ComponentFixture<KhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
