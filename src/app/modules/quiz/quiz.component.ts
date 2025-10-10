import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  protected quiz = inject(QuizService);

  protected readonly quizQuestions = this.quiz.quizQuestions;

  ngOnInit(): void {
    this.quiz.loadQuizQuestions(10);
  }
}
