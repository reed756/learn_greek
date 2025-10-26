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
  let quizServiceMock: jasmine.SpyObj<QuizService>;
  let sessionServiceMock: jasmine.SpyObj<SessionService>;

  beforeEach(async () => {
    quizServiceMock = jasmine.createSpyObj('QuizService', [
      'loadQuizQuestions'
    ]);
    sessionServiceMock = jasmine.createSpyObj('SessionService', [
      'getItem',
      'setItem',
      'removeItem'
    ]);

    // Add both signals to the mock
    Object.assign(quizServiceMock, {
      quizQuestions: signal([]),
      quizSession: signal({
        currentQuestionIdx: 0,
        score: 0,
        finished: false
      })
    });

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: QuizService, useValue: quizServiceMock },
        { provide: SessionService, useValue: sessionServiceMock }
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
