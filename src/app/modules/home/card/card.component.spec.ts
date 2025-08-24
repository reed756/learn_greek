import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOptimizedImage } from '@angular/common';
import { provideRouter } from '@angular/router';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, NgOptimizedImage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    const testConfig = {
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'assets/test-image.png',
      linkText: '/test-path',
    };
    fixture.componentRef.setInput('cardConfig', testConfig);
    // wait for initial data binding
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
