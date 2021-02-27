import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TrainActivationService} from '../../../../../services/dataForTable/train-activation.service';

export interface TrainingActivation {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  agentName: string;
  deviceAction: string;
  deviceAvailable: number;
  latitude: string;
  location: string;
  longitude: string;
  phone: string;
  courseId: string;
  userId: string;
}


@Component({
  selector: 'app-ta-report',
  templateUrl: './ta-report.component.html',
  styleUrls: ['./ta-report.component.scss']
})
export class TaReportComponent implements OnInit, AfterViewInit {

  trainingActivation: [] = [];

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentName', 'deviceAction',
    'deviceAvailable', 'latitude', 'location', 'longitude', 'phone', 'courseId', 'userId'];
  dataSource = new MatTableDataSource(this.trainingActivation);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;

  constructor(private trainActivation: TrainActivationService) {
    this.trainActivation.getTraining().subscribe(
      (trainData: any) => {
        this.trainingActivation = trainData;
        console.log(trainData);
        this.dataSource = new MatTableDataSource(this.trainingActivation);
      },
      ((err: any) => console.log(err))
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
    applyFilter(event: Event): any {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
