import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the TranscDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/



@Injectable()
export class TranscDataProvider {

	dummy_investment = {
		"invest1" : [0.1, 3, -2, 1, 0.9], 
		"invest2" : [-1, 4, 2.5, 1.8, -1], 
		"invest3" : [-1, -1.2, -2.1, -1.2, -.5], 
	}
	dummy_accnum: string = "9400744229302574"
	api_url : string = "http://localhost:5000/todo/api/v1.0/get_transc?acc_num="

  constructor(public http: Http) {
    console.log('Hello TranscDataProvider Provider');
  }

  GetTransaction(acc_num: string):  Observable<any>{
		// TODO: Make sure loc_args has all fields and arguments
		let group_info_url : string = this.api_url + acc_num;
		return this.http.get(group_info_url) // ...using post request
						.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
	}

	GetInvest():  Promise<any>{
		return new Promise((resolve, reject) => {
		  resolve(this.dummy_investment);
		  console.log("Done");
		});	}
}
	