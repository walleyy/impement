import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AccountOpeningService} from '../../../../../services/dataForTable/account-opening.service';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';


export interface AccountOpening {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  accountNo: string;
  accountType: number;
  custName: string;
  custTrained: number;
  custTrainedReason: string;
  formPic: string;
  kycDocsAvailable: string;
  kycDocsMissing: string;
  latitude: string;
  longitude: string;
  phone: string;
}
@Component({
  selector: 'app-account-opening',
  templateUrl: './account-opening.component.html',
  styleUrls: ['./account-opening.component.scss']
})
export class AccountOpeningComponent implements OnInit, AfterViewInit {

  accountOpening: AccountOpening[] = [];

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'accountNo', 'accountType', 'custName',
    'custTrained', 'custTrainedReason', 'formPic', 'kycDocsAvailable', 'kycDocsMissing', 'latitude', 'longitude', 'phone', 'action'];
  dataSource = new MatTableDataSource(this.accountOpening);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined ;
  isLoading = true;
  searchingOn = false;

  constructor(private accOpeningService: AccountOpeningService,
              public dialog: MatDialog, private toast: ToastrService) {}

  ngOnInit(): void {this.accOpeningService.getAccOpening().subscribe(
    (acctOpeningData: any) => {
      this.accountOpening = acctOpeningData;
      console.log(acctOpeningData);
      this.dataSource = new MatTableDataSource(this.accountOpening);
      this.ngAfterViewInit();
      this.isLoading = !this.isLoading;

    },
    ((err: any) => console.log(err))
  );
  }

  ngAfterViewInit(): void {
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
      data: { row, component: EditAOComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.accountOpening);
        this.ngOnInit();
      }
    );
  }

  Delete(element: any): any {
    this.accOpeningService.deleteAccOpening(element.id).subscribe(
      (deleted: any) => {
        const index = this.accountOpening.indexOf(element.id);
        this.accountOpening.splice(index, 1);
        this.dataSource = new MatTableDataSource<AccountOpening>(this.accountOpening);
        this.toast.success(deleted , 'done!');
      },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting Account ' + ' ' + `${element.id}` , 'error');
      }
    );
  }
}


@Component({
  selector: 'app-opening-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label></mat-label>
    <input matInput type="text" placeholder="account number" formControlName="accNo">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label></mat-label>
    <input matInput type="text" placeholder="account type" formControlName="accType">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>customer name</mat-label>
    <input matInput type="text" placeholder="customer name" formControlName="cName">
  </mat-form-field>

  <mat-label > is customer trained?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="cTrained">
    <mat-radio-button value="1">Yes</mat-radio-button>
    <mat-radio-button value="0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline">
    <mat-label>customer trained reason</mat-label>
    <input matInput type="text" placeholder="customer trained reason" formControlName="tReason">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>upload picture</mat-label>
    <input matInput type="text" placeholder="upload picture " formControlName="pic">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>kyc</mat-label>
    <input matInput type="text" placeholder="kyc" formControlName="kyc">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>kyc document missing</mat-label>
    <input matInput type="text" placeholder="kyc document missing" formControlName="kycMissing">
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
    <button mat-button  (click)="saveData( EditDetails.value.accNo ,EditDetails.value.accType , EditDetails.value.cName , EditDetails.value.cTrained ,
   EditDetails.value.tReason , EditDetails.value.pic , EditDetails.value.kyc , EditDetails.value.kycMissing , EditDetails.value.lat , EditDetails.value.longi,
   EditDetails.value.phon)">
      <mat-icon>save_alt</mat-icon>save
    </button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditAOComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    accNo: ['', Validators.required],
    accType: ['', Validators.required],
    cName: ['', Validators.required],
    cTrained: ['0', Validators.required],
    tReason: ['', Validators.required],
    pic: ['', Validators.required],
    kyc: ['', Validators.required],
    kycMissing: ['', Validators.required],
    lat: ['', Validators.required],
    longi: ['', Validators.required],
    phon: ['', Validators.required],
  });

  private updatedList: {
    id: bigint;
    createdAt: Date;
    updatedAt: Date;
    accountNo: string;
    accountType: number;
    custName: string;
    custTrained: number;
    custTrainedReason: string;
    formPic: string;
    kycDocsAvailable: string;
    kycDocsMissing: string;
    latitude: string;
    longitude: string;
    phone: string; } | undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private accService: AccountOpeningService, public toast: ToastrService
  ) {}

  ngOnInit(): void{}

  saveData(accNo: any, accType: number, cName: string, cTrained: number, tReason: string,
           pic: string, kyc: string, kycMissing: string, lat: string, longi: string, phon: string): any {
    this.updatedList = {
      id: this.data.row.id,
      createdAt: this.data.row.createdAt,
      updatedAt: this.data.updatedAt,
      accountNo: accNo,
      accountType: accType,
      custName: cName,
      custTrained: cTrained,
      custTrainedReason: tReason,
      formPic: pic,
      kycDocsAvailable: kyc,
      kycDocsMissing: kycMissing,
      latitude: lat,
      longitude: longi,
      phone: phon,
    };
    if (!this.EditDetails.valid){
      return;
    }
    this.accService.updateAccOpening(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated Account  ' + `${this.data.row.id}`, 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }
  clear(): any {
    this.EditDetails.reset();
  }
}
