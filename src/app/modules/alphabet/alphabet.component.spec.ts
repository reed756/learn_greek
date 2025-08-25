/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AlphabetComponent } from './alphabet.component';

describe('AlphabetComponent', () => {
  let component: AlphabetComponent;
  let fixture: ComponentFixture<AlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML', () => {
    it('Should render a caption element with "Greek Alphabet" text', () => {
      const caption = fixture.nativeElement.querySelector('caption');
      expect(caption.textContent).toContain('Greek Alphabet');
    });
  });
});
