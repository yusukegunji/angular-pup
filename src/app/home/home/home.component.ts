import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private fns: AngularFireFunctions) { }

  ngOnInit(): void {
  }

  getData(): void {
    const callable = this.fns.httpsCallable('getRaseData');
    callable({})
      .toPromise()
      .then((data) => {
        this.data = data;
        console.log(data);

      });
  }

}
