import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TranscDataProvider {

	//DUMMY DATA .....again
	dummy_investment = {
		"invest1" : [0.1, 3, -2, 1, 0.9], 
		"invest2" : [-1, 4, 2.5, 1.8, -1], 
		"invest3" : [-1, -1.2, -2.1, -1.2, -.5], 
	}
	dummy_accnum: string = "2631004218431511"
	api_url : string = "http://localhost:5000/todo/api/v1.0/get_transc?acc_num="

  constructor(public http: Http) {
    console.log('Hello TranscDataProvider Provider');
  }

  //Get transactions from our Flask server
  // TODO: Host the Flask server on a EC2 in AWS. 
  // But seriously no time. I'm sorry Judges :(((
  GetTransaction(acc_num: string):  Observable<any>{
		let group_info_url : string = this.api_url + acc_num;
		return this.http.get(group_info_url) 
						.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
	}

	//Pseudo endpoint. Once we have API to serve investment data, it will be called here
	GetInvest():  Promise<any>{
		return new Promise((resolve, reject) => {
		  resolve(this.dummy_investment);
		  console.log("Done");
		});	}
}
	