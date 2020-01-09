import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(feature: string){
    console.log(feature)
    this.featureSelected.emit(feature);
  }

  goTo(id: string){
    this.router.navigate(['/recipes', id, 'fabio']);
  }

}
