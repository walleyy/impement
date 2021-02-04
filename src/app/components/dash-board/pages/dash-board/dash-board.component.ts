import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Chart from 'chart.js';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SmReportComponent} from '../sm-report/sm-report.component';
import {MatDialog} from '@angular/material/dialog';
import {TaReportComponent} from '../ta-report/ta-report.component';
import {RReportComponent} from '../r-report/r-report.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  moduleId: module.id,
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  public canvas: any;
  public ctx: any;
  public chartColor: string | undefined;
  public chartHours: any;



  ngOnInit(): any{
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartHours');
    this.ctx = this.canvas.getContext('2d');

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          borderColor: '#6bd098',
          backgroundColor: '#6bd098',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
          {
            borderColor: '#f17e5d',
            backgroundColor: '#f17e5d',
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
          },
          {
            borderColor: '#fcc468',
            backgroundColor: '#fcc468',
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: '#9f9f9f',
              beginAtZero: false,
              maxTicksLimit: 5,
              // padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: '#ccc',
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: 'transparent',
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: '#9f9f9f'
            }
          }]
        },
      }
    });
  }

  openDialogSM(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '96%',
      data: { component: SmReportComponent }
    });
  }

  openDialogTA(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '96%',
      data: { component: TaReportComponent }
    });
  }

  openDialogR(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '96%',
      data: { component: RReportComponent }
    });
  }
}
