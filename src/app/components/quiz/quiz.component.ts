import { Component, OnInit } from '@angular/core';
import  quiz_questions from "../../../assets/data/quiz_questions.json";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  title: string = ""
  questions: any
  questionSelected: any
  answers: string[] = []
  answerSelected: string = ""
  questionIndex: number = 0
  questionMaxIndex: number = 0
  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false
      this.title = quiz_questions.title
      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(choice: string) {
    this.answers.push(choice)
    this.nextStep()
  }

 async nextStep() {
    this.questionIndex++
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (arr.filter(a => a === prev).length > arr.filter(a => a === curr).length) {
        return prev
      } else {
        return curr
      }

    })
    return result
  }

}
