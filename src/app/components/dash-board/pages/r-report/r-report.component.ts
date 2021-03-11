import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RecruitmentService} from '../../../../../services/dataForTable/recruitment.service';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

export interface Recruitment {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  docsCollectDate: Date;
  kycDocsAvailable: boolean;
  latitude: string;
  location: string;
  longitude: string;
  phone: string;
  prospectName: string;
}

@Component({
  selector: 'app-r-report',
  templateUrl: './r-report.component.html',
  styleUrls: ['./r-report.component.scss']
})
export class RReportComponent implements OnInit , AfterViewInit{

  recruitData: Recruitment[] = [];
  isLoading = true;
  public toggleButton = false;
  private defaultsReport: {
    docsCollectDate: Date;
    kycDocsAvailable: boolean;
    kycDocslist: string;
    latitude: string;
    location: string;
    longitude: string;
    phone: string;
    prospectName: string;
  } | undefined;
  constructor(private recruitService: RecruitmentService, private  toast: ToastrService,
              public  dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'docsCollectionDate', 'kycDocAvailable', 'kycDocsList', 'latitude',
    'location', 'longitude', 'phone', 'prospectName', 'actions'];
  dataSource = new MatTableDataSource(this.recruitData);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined ;
  searchingOn = false;


  ngOnInit(): void {
    this.recruitData = this.recruitService.getRecruitData().subscribe(
    (recruitData: any) => {
      this.recruitData = recruitData;
      console.log(recruitData);
      this.dataSource = new MatTableDataSource(this.recruitData);
      this.ngAfterViewInit();
      this.isLoading = !this.isLoading;
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
    this.searchingOn = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEdit(row: any): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row, component: EditRComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.recruitData);
        this.ngOnInit();
      }
    );
  }

  Delete(element: any): any {
    this.recruitService.deleteRecruitment(element.id).subscribe(
      (deleted: any) => {
        const index = this.recruitData.indexOf(element.id);
        this.recruitData.splice(index, 1);
        this.dataSource = new MatTableDataSource<Recruitment>(this.recruitData);
        this.toast.success(deleted , 'done!');
      },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting recruitment ' + ' ' + `${element.id}` , 'error');
      }
    );
  }

  toggle(): boolean {
   return  this.toggleButton = !this.toggleButton;
  }

  create(): any {
    this.defaultsReport = {
      docsCollectDate: new Date(),
      kycDocsAvailable: false,
      kycDocslist: '',
      latitude: '',
      location: 'default',
      longitude: '',
      phone: '',
      prospectName: '',
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row: this.defaultsReport, component: EditRComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.recruitData);
        this.ngOnInit();
      }
    );
  }
}


@Component({
  selector: 'app-report-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="fill">
    <mat-label>Choose a date</mat-label>
    <input matInput [matDatepicker]="picker" placeholder="choose kyc collection date" formControlName="collectDate">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>


    <mat-label> Are all kyc Docs available</mat-label>
    <mat-radio-group aria-label="Select an option" formControlName="kycAvailable"  required>
      <mat-radio-button value="true"  (click)="availableView = 0" [(ngModel)]="availableView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="kycAvailable">Yes</mat-radio-button>
      <mat-radio-button value="false"  (click)="availableView = 1">No</mat-radio-button>
    </mat-radio-group>

  <mat-form-field appearance="outline" *ngIf="availableView">
    <mat-label>kyc docs missing list</mat-label>
    <input matInput type="text" placeholder="missing kycs" formControlName="kycDocsMissing">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>latitude</mat-label>
    <input matInput type="text" placeholder="latitude" formControlName="lat">
  </mat-form-field>

<mat-form-field appearance="outline">
    <mat-label>location</mat-label>
    <input matInput type="text" placeholder="location" formControlName="loc">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>longitude</mat-label>
    <input matInput type="text" placeholder="longitude" formControlName="longi">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>phone</mat-label>
    <input matInput  type="text" placeholder="phone" formControlName="phon">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>prospect name</mat-label>
    <input matInput  type="text" placeholder="prospect name" formControlName="pName">
  </mat-form-field>
</form>
<div  class="row">
  <div style="float: left">
    <button mat-button (click)="clear()">clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button *ngIf="noSaveBtn" (click)="saveData( EditDetails.value.collectDate ,EditDetails.value.kycAvailable ,EditDetails.value.kycDocsMissing, EditDetails.value.lat ,EditDetails.value.loc ,
   EditDetails.value.longi, EditDetails.value.phon,EditDetails.value.pName)">
      <mat-icon>save_alt</mat-icon>save
    </button>
    <button mat-button *ngIf="!noSaveBtn" (click)="createData( EditDetails.value.collectDate ,EditDetails.value.kycAvailable ,EditDetails.value.kycDocsMissing, EditDetails.value.lat ,EditDetails.value.loc ,
   EditDetails.value.longi, EditDetails.value.phon,EditDetails.value.pName)">
      <mat-icon>fiber_new</mat-icon>save
    </button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditRComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    collectDate: [this.data.row.docsCollectDate, Validators.required],
    kycAvailable: [this.data.row.kycDocsAvailable, Validators.required],
    kycDocsMissing: [this.data.row.kycDocsList],
    lat: [this.data.row.latitude, Validators.required],
    loc: [this.data.row.location, Validators.required],
    longi: [this.data.row.longitude, Validators.required],
    phon: [this.data.row.phone, Validators.required],
    pName: [this.data.row.prospectName, Validators.required],
  });

  private updatedList: {
    id: bigint;
    createdAt: Date;
    updatedAt: Date;
    docsCollectDate: Date;
    kycDocsAvailable: boolean;
    kycDocsList: string;
    latitude: string;
    location: string;
    longitude: string;
    phone: string;
    prospectName: string;
  } | undefined;
  noSaveBtn: any| undefined;
  availableView: any;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private rService: RecruitmentService, public toast: ToastrService
  ) {}

  ngOnInit(): void{
    this.noSaveBtn = true;
    if ( this.data.row.location === 'default') {
      this.noSaveBtn = false;
      this.EditDetails.reset();
      for (const name in this.EditDetails.controls) {
        if (this.EditDetails) {
          this.EditDetails.controls[name].setErrors(null);
        }
      }
    }
  }

  saveData(collectDate: Date, kycAvailable: boolean, kycDocsMissing: string, lat: string, loc: string, longi: string,
           phon: string, pName: string): any {
    this.updatedList = {
      id: this.data.row.id,
      createdAt: this.data.row.createdAt,
      updatedAt: this.data.updatedAt,
      docsCollectDate: collectDate,
      kycDocsAvailable: kycAvailable,
      kycDocsList: kycDocsMissing,
      latitude: lat,
      location: loc,
      longitude: longi,
      phone: phon,
      prospectName: pName,
    };
    if (!this.EditDetails.valid){
      return;
    }
    this.rService.updateRecruitment(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated Recruit  ' + `${this.data.row.id}`, 'Done');
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
  createData(collectDate: Date, kycAvailable: number, kycDocsMissing: string, lat: string, loc: string, longi: string,
             phon: string, pName: string): any {
    const createdList = {
      docsCollectDate: collectDate,
      kycDocsAvailable: kycAvailable,
      kycDocsList: kycDocsMissing,
      latitude: lat,
      location: loc,
      longitude: longi,
      phone: phon,
      prospectName: pName,
    };
    if (!this.EditDetails.valid){
      this.toast.warning('fill all required values to proceed');
      return;
    }
    this.rService.createRecruitment(createdList).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('created new Recruit  ', 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }

}
