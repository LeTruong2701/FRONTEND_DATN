/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhuyenmaiComponent } from './khuyenmai.component';

describe('KhuyenmaiComponent', () => {
  let component: KhuyenmaiComponent;
  let fixture: ComponentFixture<KhuyenmaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhuyenmaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhuyenmaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
