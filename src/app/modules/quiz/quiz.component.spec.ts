import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { signal } from '@angular/core';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizServiceMock: jasmine.SpyObj<QuizService>;

  beforeEach(async () => {
    quizServiceMock = jasmine.createSpyObj('QuizService', [
      'loadQuizQuestions'
    ]);

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: QuizService, useValue: quizServiceMock }
      ]
    }).compileComponents();

    (
      quizServiceMock as unknown as { quizQuestions: ReturnType<typeof signal> }
    ).quizQuestions = signal([]);

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
