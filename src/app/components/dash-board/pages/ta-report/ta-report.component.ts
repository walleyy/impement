import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TrainActivationService} from '../../../../../services/dataForTable/train-activation.service';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

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

  trainingActivation: TrainingActivation[] = [];

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentName', 'deviceAction',
    'deviceAvailable', 'latitude', 'location', 'longitude', 'phone', 'courseId', 'userId', 'actions'];
  dataSource = new MatTableDataSource(this.trainingActivation);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined ;

  constructor(private trainActivation: TrainActivationService, private toast: ToastrService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.trainActivation.getTraining().subscribe(
    (trainData: any) => {
      this.trainingActivation = trainData;
      console.log(trainData);
      this.dataSource = new MatTableDataSource(this.trainingActivation);
      this.ngAfterViewInit();
    },
    ((err: any) => console.log(err))
  );
  }

  ngAfterViewInit(): void{
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }
    applyFilter(event: Event): any {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEdit(row: any): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row, component: EditTAComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.trainingActivation);
        this.ngOnInit();
      }
    );
  }

  Delete(element: any): any {
    this.trainActivation.deleteAccActivation(element.id).subscribe(
      (deleted: any) => {
        const index = this.trainingActivation.indexOf(element.id);
        this.trainingActivation.splice(index, 1);
        this.dataSource = new MatTableDataSource<TrainingActivation>(this.trainingActivation);
        this.toast.success(deleted , 'done!');
      },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting Training with id of ' + ' ' + `${element.id}` , 'error');
      }
    );
  }
}



@Component({
  selector: 'app-training-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label>account number</mat-label>
    <input matInput type="text" placeholder="account number" formControlName="agName">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>device action</mat-label>
    <input matInput type="text" placeholder="device action" formControlName="devAction">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>device available</mat-label>
    <input matInput type="text" placeholder="device available" formControlName="devAvailable">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>location</mat-label>
    <input matInput type="text" placeholder="location" formControlName="loc">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>course id</mat-label>
    <input matInput type="text" placeholder="course id" formControlName="cId">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>user id</mat-label>
    <input matInput type="text" placeholder="user id" formControlName="usrId">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>latitude</mat-label>
    <input matInput type="text" placeholder="latitude" formControlName="lat">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>longitude</mat-label>
    <input matInput type="text" placeholder="longitude" formControlName="longi">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>phone</mat-label>
    <input matInput  type="number" placeholder="phone" formControlName="phon">
  </mat-form-field>
</form>
<div class="row">
  <div style="float: left">
    <button mat-button  (click)="clear()">clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button  (click)="saveData( EditDetails.value.agName ,EditDetails.value.devAction ,EditDetails.value.devAvailable ,EditDetails.value.loc ,
  EditDetails.value.usrId ,EditDetails.value.cId , EditDetails.value.lat,EditDetails.value.longi, EditDetails.value.phon)">
      <mat-icon>save_alt</mat-icon>save
    </button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditTAComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    agName: ['', Validators.required],
    devAction: ['', Validators.required],
    devAvailable: ['', Validators.required],
    loc: ['', Validators.required],
    usrId: ['', Validators.required],
    cId: ['', Validators.required],
    lat: ['', Validators.required],
    longi: ['', Validators.required],
    phon: ['', Validators.required],
  });

  private updatedList: {
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
    userId: string; } | undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private trainService: TrainActivationService, public toast: ToastrService
  ) {}

  ngOnInit(): void{}

  saveData(agName: any, devAction: string, devAvailable: number, loc: string,
           cId: string, usrId: string, lat: string, longi: string, phon: string): any {
    this.updatedList = {
      id: this.data.row.id,
      createdAt: this.data.row.createdAt,
      updatedAt: this.data.updatedAt,
      agentName: agName,
      deviceAction: devAction,
      deviceAvailable: devAvailable,
      latitude: lat,
      location: loc,
      longitude: longi,
      phone: phon,
      courseId: cId,
      userId: usrId,
    };
    if (!this.EditDetails.valid){
      return;
    }
    this.trainService.updateTraining(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated Training with id  ' + `${this.data.row.id}`, 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }
  clear(): any {
    this.EditDetails.reset();
  }
}
