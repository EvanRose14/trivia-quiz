import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { TriviaQuestion } from 'src/app/models/trivia-question';
import { TriviaService } from 'src/app/services/trivia/trivia.service';

@Component({
  selector: 'trivia-question',
  templateUrl: './trivia-question.component.html',
  styleUrls: ['./trivia-question.component.scss']
})
export class TriviaQuestionComponent implements OnInit {

  loading: boolean = false;
  question: TriviaQuestion = {
    question: 'Hello World!',
    correct_answer: 'A',
    incorrect_answers: ['B','C','D']
  };
  answers: string[] = [];

  constructor(private trivia: TriviaService) { }

  ngOnInit(): void {
    this.fetchTriviaQuestion();
  }

  fetchTriviaQuestion() {
    this.loading = true;
    this.trivia.getTriviaQuestion().subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log('data',data);
        data.results.map((q: TriviaQuestion) => {
          this.question = q;
          this.answers = [...q.incorrect_answers, q.correct_answer];
        })
      },
      error: (e: any) => {
        this.loading = false;
        console.log(e);
      },
      complete: () => {

      }
    });
  }
}
