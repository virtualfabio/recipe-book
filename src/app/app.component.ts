import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
export class AppComponent {
  state = 'normal';
  title = 'recipe-book';
  //loadedFeature = 'recipe';

  onNavigate(feature: string){
    
    this.onAnimation();

    //this.loadedFeature = feature;
  }

  onAnimation(){
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
}
