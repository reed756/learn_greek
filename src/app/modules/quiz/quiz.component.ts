import { Component, inject, OnInit, Signal } from '@angular/core';
import { QuizService } from './quiz.service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { SessionService } from '@services/session/session.service';
import { QuizQuestion, QuizSession } from '@interfaces/question';

@Component({
  selector: 'app-quiz',
  imports: [QuizCardComponent, QuizResultsComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  protected quiz = inject(QuizService);
  protected session = inject(SessionService);

  protected readonly quizQuestions: Signal<QuizQuestion[]> =
    this.quiz.quizQuestions;
  protected readonly quizSession: Signal<QuizSession> = this.quiz.quizSession;

  ngOnInit(): void {
    const storedSession = this.session.getItem('quizSession');
    if (storedSession) {
      this.quiz.quizSession.set(JSON.parse(storedSession));
    }
  }
}
