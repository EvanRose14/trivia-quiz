import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

  getTriviaQuestion() {
    return this.http.get('http://localhost:3001/trivia/question');
  }
}
