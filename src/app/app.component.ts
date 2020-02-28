import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: '#eeeeee',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: '#ffffff',
        transform: 'translateX(0) scale(0.9)'
      })),
    //  transition('normal => highlighted', animate(500)),
      transition('normal <=> *', [
        style({
          backgroundColor: '#dddddd'
        }), 
        animate(800, style({
         'borderRadius' : '30px'
        })), animate(400)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  state = 'normal';
  title = 'recipe-book';
  //loadedFeature = 'recipe';

  constructor(private authService: AuthService, private loggingService: LoggingService){

  }

  ngOnInit(){
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }  


  onNavigate(feature: string){
    
    this.onAnimation();

    //this.loadedFeature = feature;
  }

  onAnimation(){
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
}
