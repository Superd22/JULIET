import { environment } from './../../../../environments/environment';
import { HttpModule } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  private motr:string;

  constructor(private http: HttpModule) {

  }

  ngOnInit() {
    this.http.get(environment.julietAPI+'Default/welcome').subscribe(
      data => {
        var words = data.data.split(/\r?\n/);
        var n = Math.floor(Math.random() * (words.length));

        this.motr = words[n];
      }
    );
  }

}
