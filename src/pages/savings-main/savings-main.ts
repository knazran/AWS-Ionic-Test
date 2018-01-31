import { Component, ViewChild } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { Observable }      from "rxjs/Rx";
import { Chart } from 'chart.js';

import { SavingsDetailsPage } from '../savings-details/savings-details'
import { TranscDataProvider } from '../../providers/providers';

/*
Controller for the Savings page. This is the first thing user
sees when they login
*/

@Component({
  selector: 'page-tasks',
  templateUrl: 'savings-main.html'
})
export class SavingsMainPage {

  @ViewChild('savingsCanvas') savingsCanvas;
  
  public refresher: any; //refresher object for pull to refresh
  public transc : any //transaction object. IMPROVEMENT: Should enforce strong typed object

  savingsChart: any; //Chart object

  //Page specific data
  weekly_savings : number = 0;
  all_time_savings : number = 0;
  highest_day_savings : number = 0;

  // Dummy structure because of absence of datetime
  weekly_savings_arr : Array<number> = [0, 0, 0, 0, 0, 0, 0] 

  // Dummy number for start of the week and end of the week 
  // Due to dataset not having real date times
  start_of_the_week : number = 1000; 
  end_of_the_week : number = 40000;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public transData: TranscDataProvider) {
    // Initialize the page
    // Improvement: Move to ionViewLoaded
    this.getTransactions().then(() =>{
      this.calculateStats();
      this.drawSavingsGraph(this.weekly_savings_arr);
    });
  }

  // Pull to refresh logic
  refreshData(refresher) {
    this.refresher = refresher;
    this.getTransactions().then(() =>{
      // Should destroy the graph first but its static so its cool
      this.calculateStats();
    });
  }

  // Go to Saving Details page. Pass the obtained transaction data to save a GET request
  goToSavingDetails() {
    // Why bother saving money when you can't save yourself? *thinking*
    this.navCtrl.push(SavingsDetailsPage, {transc: this.transc});
  }

  //Calculate the stats into weekly and all time stats
  //Datetime absences force us to pool up 
  calculateStats(){
    for (let trans of this.transc) {
      let amount = Number(trans.transc_amnt);
      console.log(amount)
      if (trans.datetime >= this.start_of_the_week && trans.datetime <= this.end_of_the_week){
        this.weekly_savings += amount;
        // Sigh, we wish we have better datasets
        // IMPROVEMENT: should make our own datetime and append to data set but oh well
        this.weekly_savings_arr[trans.datetime % 7] = amount;
      }
      this.all_time_savings += amount;
    }
    // Some clean up and formatting
    this.all_time_savings = Number(this.all_time_savings.toPrecision(2))
    this.weekly_savings = Number(this.weekly_savings.toPrecision(2))
    this.highest_day_savings = Math.max.apply(null, this.weekly_savings_arr);
    console.log(this.weekly_savings_arr)
  }

  // Get transaction data from our local server
  getTransactions() : Promise<any>{
    let acc_num = "2631004218431511" //Dummy data for now
    return new Promise((resolve, reject) => {
      // The Redbull ladies are super cute
      this.transData.GetTransaction(acc_num).subscribe(
         data => {
           // TODO Process data
           this.transc = data[acc_num];
           console.log(this.transc)

           //Tell refresher objects that we are done
           if (this.refresher) {
             this.refresher.complete();
           }
           resolve();
           return true;
         },
         error => {
           console.error("Error: Can't contact server");
           return Observable.throw(error);
         }
      );
      console.log("Done")
    });
  }

  // Giant scary code to draw our savings bar chart
  drawSavingsGraph(data: Array<number>){
    this.savingsChart = new Chart(this.savingsCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        max: this.highest_day_savings * 1.5,
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

            //To put up the ringgit numbers on the bars
            animation: {
                duration: 1,
                onComplete: function () {
                    let chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                    // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        let meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            let data = dataset.data[index];                            
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            }
          }
    });
  }
}
