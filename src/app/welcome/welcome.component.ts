import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef
  msg: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value)
    if(this.nameKey.nativeElement.value) {
      this.router.navigate(['/quiz'])
    }

    this.msg = 'Please Enter Your Name..'

  }

}
