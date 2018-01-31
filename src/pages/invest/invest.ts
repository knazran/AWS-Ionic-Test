import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import { TranscDataProvider } from '../../providers/providers';
/**
 * Generated class for the InvestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-invest',
  templateUrl: 'invest.html',
})
export class InvestPage {

  // O sweet child of mine
	@ViewChild('investing') investing;

	investChart: any;

	investments : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  						public transData: TranscDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestPage');
    this.transData.GetInvest().then((data)=>{
    	this.investments = data;

    	this.drawInvestGraph(this.investments);
    	return true
    })
  }


  // Giant scary code to draw charts. 
  // Charts are indeed scary
  drawInvestGraph(data: any){
  	this.investChart = new Chart(this.investing.nativeElement, {
        type: 'bar',
        data: {
            // DUMMY DATES. SERIOUSLY NEED BETTER DATASET
            labels: ["1/2/17", "1/3/17", "1/4/17", "1/5/17", "1/6/17"],
            datasets: [
              {
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: data["invest1"],
                  spanGaps: false,
              }
          ]
        },
        options: {
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                    		max : 5,
                    		min : -5,
                        beginAtZero:true
                    }
                }]
            },
            events: false,
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
          }
    });
  }
}
