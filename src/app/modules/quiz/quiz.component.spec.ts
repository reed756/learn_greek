import { vi, type MockedObject } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { signal } from '@angular/core';
import { SessionService } from '@services/session/session.service';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizServiceMock: MockedObject<QuizService>;
  let sessionServiceMock: MockedObject<SessionService>;

  beforeEach(async () => {
    quizServiceMock = {
      loadQuizQuestions: vi.fn().mockName('QuizService.loadQuizQuestions'),
      quizQuestions: signal([]),
      quizSession: signal({
        currentQuestionIdx: 0,
        score: 0,
        finished: false
      }),
      alphabet: signal(''),
      session: vi.fn().mockName('QuizService.session'),
      getQuizQuestion: vi.fn().mockName('QuizService.getQuizQuestion'),
      checkAnswer: vi.fn().mockName('QuizService.checkAnswer'),
      nextQuestion: vi.fn().mockName('QuizService.nextQuestion'),
      finishQuiz: vi.fn().mockName('QuizService.finishQuiz'),
      resetQuiz: vi.fn().mockName('QuizService.resetQuiz')
    } as unknown as MockedObject<QuizService>;
    sessionServiceMock = {
      getItem: vi.fn().mockName('SessionService.getItem'),
      setItem: vi.fn().mockName('SessionService.setItem'),
      removeItem: vi.fn().mockName('SessionService.removeItem')
    } as unknown as MockedObject<SessionService>;

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: QuizService, useValue: quizServiceMock },
        { provide: SessionService, useValue: sessionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
