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
  barcode: string;
}
interface Courses {
  value: string;
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
  public toggleButton = false;
  searchingOn = false;
  private defaultsTraining: {
    courseId: string;
    agentName: string;
    deviceAction: string;
    deviceAvailable: number;
    latitude: string;
    location: string;
    longitude: string;
    phone: string;
    barcode: string; } | undefined;
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

  toggle(): any {
    this.toggleButton = !this.toggleButton;
  }

  create(): any {
     this.defaultsTraining = {
       agentName: 'Agent name',
       deviceAction: '',
       deviceAvailable: 3,
       latitude: '',
       location: 'Enter location',
       longitude: '',
       phone: '',
       barcode: '',
       courseId: '0'
     };
     const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row: this.defaultsTraining, component: EditTAComponent},
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
}



@Component({
  selector: 'app-training-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label>Agent name</mat-label>
    <input matInput type="text" placeholder="account number" formControlName="agName"  required>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>phone</mat-label>
    <input matInput  type="number" placeholder="phone" formControlName="phon"  required>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>location</mat-label>
    <input matInput type="text" placeholder="location" formControlName="loc" required>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Tools of trade available?</mat-label>
    <mat-select disableRipple  formControlName="devAvailable" required>
      <mat-option value="1">Phone</mat-option>
      <mat-option value="2">Pos</mat-option>
      <mat-option value="3">Both</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>device action</mat-label>
    <input matInput type="text" placeholder="device action" formControlName="devAction"  >
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Module Trained</mat-label>
    <mat-select  formControlName="cId" required>
      <mat-option *ngFor="let c of courses" [value]="c.value">
        {{c.value}}
      </mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Barcode</mat-label>
    <input matInput type="text" placeholder="user id" formControlName="barcode"  required>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>latitude</mat-label>
    <input matInput type="text" placeholder="latitude" formControlName="lat">
  </mat-form-field>

  <mat-form-field appearance="outline" >
    <mat-label>longitude</mat-label>
    <input matInput type="text" placeholder="longitude" formControlName="longi">
  </mat-form-field>

</form>
<div class="row">
  <div style="float: left">
    <button mat-button  (click)="clear()">clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button *ngIf="noSaveBtn" (click)="saveData( EditDetails.value.agName ,EditDetails.value.devAction ,EditDetails.value.devAvailable ,EditDetails.value.loc ,
  EditDetails.value.usrId ,EditDetails.value.cId , EditDetails.value.lat,EditDetails.value.longi, EditDetails.value.phon, EditDetails.value.barcode)">
      <mat-icon>save_alt</mat-icon>save</button>
    <button mat-button *ngIf="!noSaveBtn" (click)="createData( EditDetails.value.agName ,EditDetails.value.devAction ,EditDetails.value.devAvailable ,EditDetails.value.loc ,
  EditDetails.value.usrId ,EditDetails.value.cId , EditDetails.value.lat,EditDetails.value.longi, EditDetails.value.phon, EditDetails.value.barcode)">
      <mat-icon>save_alt</mat-icon><mat-icon>fiber_new</mat-icon></button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditTAComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    agName: [this.data.row.agentName, Validators.required],
    devAction: [''],
    devAvailable: [this.data.row.deviceAvailable, Validators.required],
    loc: [this.data.row.location, Validators.required],
    barcode: [this.data.row.barcode, [ Validators.required]],
    cId: ['', Validators.required],
    lat: [this.data.row.latitude],
    longi: [this.data.row.longitude],
    phon: [this.data.row.phone, Validators.required],
  });

  private updatedList: {
    id: bigint;
    createdAt: Date;
    updatedAt: Date;
    courseId: string;
    agentName: string;
    deviceAction: string;
    deviceAvailable: number;
    latitude: string;
    location: string;
    longitude: string;
    phone: string;
    barcode: string; } | undefined;
    noSaveBtn: boolean | undefined;

  courses: Courses[] = [
    {value: 'PO'},
    {value: 'Role of agent user'},
    {value: 'POS transaction and common errors'},
    {value: 'Eazzy transaction'},
    {value: 'Account origination'},
    {value: 'kyc and identification'},
    {value: 'Fraud management & AML'},
    {value: 'Record keeping & archiving'},
    {value: 'Customer service'},
  ];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private trainService: TrainActivationService, public toast: ToastrService
  ) {}

  ngOnInit(): void{
    this.noSaveBtn = true;
    if ( this.data.row.agentName === 'Agent name') {
      this.noSaveBtn = false;
      this.EditDetails.reset();
      for (const name in this.EditDetails.controls) {
        if (this.EditDetails) {
          this.EditDetails.controls[name].setErrors(null);
        }
      }
    }
  }

  saveData(agName: string, devAction: string, devAvailable: number, loc: string,
           cId: string, usrId: string, lat: string, longi: string, phon: string, barcode: string): any {
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
      barcode,
      courseId: cId,
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
    for (const name in this.EditDetails.controls) {
      if (this.EditDetails) {
        this.EditDetails.controls[name].setErrors(null);
      }
    }
  }

  createData(agName: any, devAction: string, devAvailable: number, loc: string,
             cId: string, usrId: string, lat: string, longi: string, phon: string, barcode: string): any {
     const createdList = {
      agentName: agName,
      deviceAction: devAction,
      deviceAvailable: devAvailable,
      latitude: lat,
      location: loc,
      longitude: longi,
      phone: phon,
      courseId: cId,
       barcode
    };
     if (!this.EditDetails.valid){
       this.toast.warning('fill all required values to proceed');
       return;
    }
     this.trainService.createTraining(createdList).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('created new Training',  'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }
}
