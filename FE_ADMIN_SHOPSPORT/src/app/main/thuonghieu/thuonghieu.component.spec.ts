/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThuonghieuComponent } from './thuonghieu.component';

describe('ThuonghieuComponent', () => {
  let component: ThuonghieuComponent;
  let fixture: ComponentFixture<ThuonghieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuonghieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuonghieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
