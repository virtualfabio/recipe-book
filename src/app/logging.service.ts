import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  lastLogging: string;

  constructor() { }
  
  printLog(message: string){
    console.log(message);
    console.log(this.lastLogging);
    this.lastLogging = message;
  }

}
