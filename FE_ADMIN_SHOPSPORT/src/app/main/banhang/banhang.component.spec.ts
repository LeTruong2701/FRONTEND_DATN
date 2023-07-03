/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BanhangComponent } from './banhang.component';

describe('BanhangComponent', () => {
  let component: BanhangComponent;
  let fixture: ComponentFixture<BanhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
