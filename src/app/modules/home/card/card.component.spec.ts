import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOptimizedImage } from '@angular/common';
import { provideRouter } from '@angular/router';
import { CardConfig } from '@interfaces/card';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let testConfig: CardConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, NgOptimizedImage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    testConfig = {
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'assets/test-image.png',
      linkText: '/test-path',
      link: 'Test Link'
    };
    fixture.componentRef.setInput('cardConfig', testConfig);
    // wait for initial data binding
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should set cardConfig correctly', () => {
      expect(component.cardConfig()).toEqual(testConfig);
    });
  });
});
