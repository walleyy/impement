import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AccountOpeningService} from '../../../../../services/dataForTable/account-opening.service';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {SysMonitoringService} from '../../../../../services/dataForTable/sys-monitoring.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';


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
export interface AccType {
  account: string;
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
  public toggleButton = false;
 private openingDefaults: {
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
 } | undefined;
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

  toggle(): any {
    this.toggleButton = !this.toggleButton;
  }

  create(): any {
    this.openingDefaults = {
      accountNo: '',
        accountType: 1,
        custName: 'defaults',
        custTrained: 0,
        custTrainedReason: '',
        formPic: '',
        kycDocsAvailable: '',
        kycDocsMissing: '',
        latitude: '',
        longitude: '',
        phone: '',
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row: this.openingDefaults, component: EditAOComponent},
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
}

@Component({
  selector: 'app-opening-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label>Account number</mat-label>
    <input matInput type="text" placeholder="account number" formControlName="accNo">
  </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Account type</mat-label>
      <mat-select  name="account"  formControlName="accType">
        <mat-option *ngFor="let acc of accounts" [value]="acc.account">
          {{acc.account}}
        </mat-option>
      </mat-select>
    </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>customer name</mat-label>
    <input matInput type="text" placeholder="customer name" formControlName="cName">
  </mat-form-field>

  <mat-label > is customer trained?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="cTrained">
    <mat-radio-button value="true"  (click)="trainView = 1" [(ngModel)]="trainView" [ngModelOptions]="{standalone: true}"  ngDefaultControl>Yes</mat-radio-button>
    <mat-radio-button value="false"   (click)="trainView = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!trainView">
    <mat-label>customer not trained reason</mat-label>
    <input matInput type="text" placeholder="customer trained reason" formControlName="tReason">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>upload picture</mat-label>
    <input matInput type="text" placeholder="upload picture " formControlName="pic">
  </mat-form-field>
  <div  >
    <div class="row"  *ngIf="!noUploadBtn">
      <div class="col-8">
        <label class="btn btn-default p-0">
          <input [disabled]="!noImage" type="file" (change)="selectFile($event)"  accept="image/*" />
        </label>
      </div>

      <div class="col-4">
        <button class="btn btn-success btn-sm" [disabled]="!selectedFiles" (click)="uploading()">
          Upload
        </button>
      </div>
    </div>
    <img [src]="imageSrc" *ngIf="imageSrc" style="height: 300px; width:500px">
    <div *ngIf="currentFile" class="progress my-3">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        attr.aria-valuenow="{{ progress }}"
        aria-valuemin="0"
        aria-valuemax="100"
        [ngStyle]="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <div *ngIf="message" class="alert alert-secondary" role="alert">{{ message }}</div>
  </div>
  <div *ngIf="!noImage">
    <img [src]="imageBlobUrl"  style="height: 300px; width:500px"
         alt="{{this.data.row.registerPic}}"
         *ngIf="!isImageLoading; else noImageFound">
    <ng-template #noImageFound>
      <img src="../../../../../assets/images/FallbackImage.png" alt="FallbackImage"  style="height: 100px ;width:150px" >
    </ng-template>
  </div>

  <mat-label >Are all  KYC documents available?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="kyc"  required>
    <mat-radio-button value="true" (click)="kycView  = 1" [(ngModel)]="kycView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="kycview">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="kycView  = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline" *ngIf="!kycView">
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
    <input matInput  type="text" placeholder="phone" formControlName="phon">
  </mat-form-field>
</form>
<div class="row">
  <div style="float: left">
    <button mat-button  (click)="clear()"><mat-icon>clear</mat-icon>clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button *ngIf="noSaveBtn" (click)="saveData( EditDetails.value.accNo ,EditDetails.value.accType , EditDetails.value.cName , EditDetails.value.cTrained ,
   EditDetails.value.tReason , EditDetails.value.pic , EditDetails.value.kyc , EditDetails.value.kycMissing , EditDetails.value.lat , EditDetails.value.longi,
   EditDetails.value.phon)">
      <mat-icon>save_alt</mat-icon>save</button>
    <button mat-button *ngIf="!noSaveBtn" (click)="createData( EditDetails.value.accNo ,EditDetails.value.accType , EditDetails.value.cName , EditDetails.value.cTrained ,
   EditDetails.value.tReason , EditDetails.value.pic , EditDetails.value.kyc , EditDetails.value.kycMissing , EditDetails.value.lat , EditDetails.value.longi,
   EditDetails.value.phon)">
      <mat-icon>fiber_new</mat-icon>save</button>
  </div>
</div>
  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditAOComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    accNo: [this.data.row.accountNo, Validators.required],
    accType: [this.data.row.accountType, Validators.required],
    cName: [this.data.row.custName, Validators.required],
    cTrained: [this.data.row.custTrained, Validators.required],
    tReason: [this.data.row.custTrainedReason],
    pic: [this.data.row.registerPic, Validators.required],
    kyc: [this.data.row.kycDocsAvailable, Validators.required],
    kycMissing: [this.data.row.kycDocsMissing],
    lat: [this.data.row.latitude, Validators.required],
    longi: [this.data.row.longitude, Validators.required],
    phon: [this.data.row.phone, Validators.required],
  });

  accounts: AccType[] = [
    {account: 'SB152'},
    {account: 'SB117'}
  ];
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
  public noSaveBtn: boolean | undefined;
  trainView: number |undefined;
  // file service
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  noImage: any ;
  imageSource: string | undefined;
  public isImageLoading: boolean |undefined;
  public imageSrc: string | undefined;
  imageBlobUrl: string | ArrayBuffer | null = null;
  private imageLocation: any | undefined;
  noUploadBtn: any;
  kycView: number| undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private accService: AccountOpeningService, public toast: ToastrService, private  smService: SysMonitoringService
  ) {}

  ngOnInit(): void{
    this.noSaveBtn = true;
    this.noImage = false;
    this.isImageLoading = true;
    this.noUploadBtn = true;
    const filName = {
      filename: this.data.row.formPic
    };
    if ( this.data.row.custName === 'defaults') {
      this.noSaveBtn = false;
      this.noImage = true;
      this.noUploadBtn = false;
      this.EditDetails.reset();
      for (const name in this.EditDetails.controls) {
        if (this.EditDetails) {
          this.EditDetails.controls[name].setErrors(null);
        }
      }
      return;
    }
    this.smService.getBlobThumbnail(filName)
      .subscribe((val: Blob) => {
          this.createImageFromBlob(val);
          this.isImageLoading = false;
        },
        (err: any) => {
          console.log(err);
          this.isImageLoading = true;
        },
      );
  }

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
      this.toast.warning('fill all required values to proceed');
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
    for (const name in this.EditDetails.controls) {
      if (this.EditDetails) {
        this.EditDetails.controls[name].setErrors(null);
      }
    }
  }

  createData(accNo: any, accType: number, cName: string, cTrained: number, tReason: string,
             pic: string, kyc: string, kycMissing: string, lat: string, longi: string, phon: string): any {
    const createdList = {
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
      this.toast.warning('fill all required values to proceed');
      return;
    }
    console.log(createdList);
    this.accService.createAccOpening(createdList).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('Account creation is succeeded ', 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
      }}
  }

  createImageFromBlob(image: Blob): any {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  uploading(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.smService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            if (event.body !== undefined){
              this.imageLocation = event.body;
              this.EditDetails.patchValue({pic: event.body}, {emitEvent: false, onlySelf: true, });
              this.EditDetails.valueChanges.subscribe().unsubscribe();

            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }
}
