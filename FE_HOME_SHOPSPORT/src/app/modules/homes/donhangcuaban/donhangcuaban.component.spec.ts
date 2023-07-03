/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonhangcuabanComponent } from './donhangcuaban.component';

describe('DonhangcuabanComponent', () => {
  let component: DonhangcuabanComponent;
  let fixture: ComponentFixture<DonhangcuabanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonhangcuabanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonhangcuabanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
