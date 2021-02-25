import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TrainActivationService} from '../../../../../services/dataForTable/train-activation.service';

export interface TrainingActivation {
  id: bigint;
  created_at: Date;
  updated_at: Date;
  agent_name: string;
  device_action: string;
  device_available: number;
  latitude: string;
  location: string;
  longitude: string;
  phone: string;
  course_id: string;
  user_id: string;
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
    this.trainingActivation = trainActivation.getTraining();
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
