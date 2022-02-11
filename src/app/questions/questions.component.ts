import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  name: string = localStorage.getItem('name')!

  questionList: any = []
  currentQuestion: number = 0
  points: number = 0
  counter:any = 15;
  interval$: any;
  correctAnswer: number = 0
  inCorrectAnswer: number = 0
  progressPercentage: string = '0'
  isQuizCompleted: boolean = false;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {


    this.getQuestions()
    if(this.currentQuestion === this.questionList.length) {
      this.stopCounter()
    } 
  }

  nextQuestion() {

    this.currentQuestion++
    this.resetCounter()
  }
  previousQuestion() {
    this.resetCounter()
    this.currentQuestion--
  }

  getQuestions() {
    this.data.getAll().subscribe(
      (res: any) => {
        this.questionList = res.questions
        this.startCounter()
      }
    )
  }

  getProgressPercentage() {
    this.progressPercentage = ((this.currentQuestion/this.questionList.length)* 100).toString()
  }

  answer(currentQno: number, option: any) {
    if(currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter()
    }
    if(option.correct) {
      this.points += 10
      this.correctAnswer++
      setTimeout(() => {
        this.currentQuestion++
        this.resetCounter()
        this.getProgressPercentage()
      }, 500);

    } else {
      setTimeout(() => {
        this.currentQuestion++
        this.inCorrectAnswer++
        this.resetCounter()
        this.getProgressPercentage()
      }, 500);
      this.points -= 10;

    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(
      val => {
        this.counter--
        if(this.counter === 0) {
          this.currentQuestion++
          this.counter = 15
          this.points -= 10
        }
      }
    )
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 60000);
  }

  stopCounter() {
    this.interval$.unsubscribe()
    this.counter = 0

  }

  resetCounter() {
    this.stopCounter()
    this.counter = 15
    this.startCounter()
    

  }

  resetQuiz() {
    this.resetCounter()
    this.getQuestions()
    this.points = 0
    this.currentQuestion = 0
    localStorage.removeItem('name')
    this.router.navigate(['/'])
    
  }



}
