/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiasanphamComponent } from './giasanpham.component';

describe('GiasanphamComponent', () => {
  let component: GiasanphamComponent;
  let fixture: ComponentFixture<GiasanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiasanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
