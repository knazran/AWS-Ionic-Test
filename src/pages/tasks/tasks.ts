import { Component, ViewChild } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { Observable }      from "rxjs/Rx";
import { Chart } from 'chart.js';

import { TranscDataProvider } from '../../providers/providers';

declare var AWS: any;

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  @ViewChild('savingsCanvas') savingsCanvas;
  
  public items: any;
  public refresher: any;
  public transc : any

  savingsChart: any;

  weekly_savings : number = 0;
  all_time_savings : number = 0;
  highest_day_savings : number = 0;
  //Dummy data because of absence of datetime
  weekly_savings_arr : Array<number> = [0, 0, 0, 0, 0, 0, 0] 

  // Dummy number for start of the week and end of the week 
  // Due to dataset not having real date times
  start_of_the_week : number = 1000; 
  end_of_the_week : number = 40000;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public transData: TranscDataProvider) {
    this.getTransactions().then(() =>{
      this.calculateStats();
      this.drawSavingsGraph(this.weekly_savings_arr);
    });
  }

  refreshData(refresher) {
    this.refresher = refresher;
    this.getTransactions().then(() =>{
      this.calculateStats();
    });
  }

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
            animation: {
                duration: 1,
                onComplete: function () {
                    let chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
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

  calculateStats(){
    for (let trans of this.transc) {
      let amount = Number(trans.transc_amnt);
      console.log(amount)
      if (trans.datetime >= this.start_of_the_week && trans.datetime <= this.end_of_the_week){
        this.weekly_savings += amount;
        this.weekly_savings_arr[trans.datetime % 7] = amount;
      }
      this.all_time_savings += amount;
    }
    this.all_time_savings = Number(this.all_time_savings.toPrecision(2))
    this.weekly_savings = Number(this.weekly_savings.toPrecision(2))
    this.highest_day_savings = Math.max.apply(null, this.weekly_savings_arr);
    console.log(this.weekly_savings_arr)
  }

  getTransactions() : Promise<any>{
    let acc_num = "5762180859277883" //Dummy data for now
    return new Promise((resolve, reject) => {
      this.transData.GetTransaction(acc_num).subscribe(
         data => {
           // TODO Process data
           this.transc = data[acc_num];
           console.log(this.transc)
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
}
