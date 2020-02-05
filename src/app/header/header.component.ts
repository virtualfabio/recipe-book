import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //@Output() featureSelected = new EventEmitter<string>();

  constructor(private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  goTo(id: string){
    this.router.navigate(['/recipes', id, 'fabio']);
  }

  gotToTeste(id: number){
    this.router.navigate(['/recipes', id, 'xxxxx'], {queryParams: {teste4: 'aaaa'}});
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorageService.fetchRecipes();
  }

}
