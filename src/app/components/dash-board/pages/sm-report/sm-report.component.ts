import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SysMonitoringService} from '../../../../../services/dataForTable/sys-monitoring.service';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import { Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';


export interface SupportMonitoring {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  agentCode: string;
  agentName: string;
  appState: boolean;
  appAction: string;
  branded: boolean;
  brandedAction: string;
  cashOut: boolean;
  collectStationery: boolean;
  collectStationeryNeed: string;
  latitude: string;
  longitude: string;
  phone: string;
  posAction: string;
  posState: boolean;
  registerAction: string;
  registerPic: string;
  registerState: boolean;
  support: boolean;
  supportNeed: string;
  troubleShooting: boolean;
  troubleShootingNeed: string;
}



@Component({
  selector: 'app-sm-report',
  templateUrl: './sm-report.component.html',
  styleUrls: ['./sm-report.component.scss']
})
export class SmReportComponent implements OnInit, AfterViewInit {

  supportData: SupportMonitoring[] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentCode', 'agentName', 'appState',
    'appAction', 'branded', 'brandedAction', 'cashOut', 'collectStationery', 'collectStationeryNeed', 'latitude',
    'longitude', 'phone', 'posAction', 'posState', 'registerAction', 'registerPic', 'registerState', 'support',
    'supportNeed', 'troubleShooting', 'troubleShootingNeed', 'userId', 'actions'];
  dataSource = new MatTableDataSource(this.supportData);
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  isLoading = true;
  searchingOn = false;


  constructor( private supportService: SysMonitoringService, private toast: ToastrService,
               public dialog: MatDialog) {
  }

  ngOnInit(): void { this.supportService.getMonitoring().subscribe(
    (monitorData: any) => {
      this.supportData = monitorData;
      this.dataSource = new MatTableDataSource(this.supportData);
      this.ngAfterViewInit();
      this.isLoading = !this.isLoading;

    },
    ((err: any) => console.log(err))
  );
  }
    ngAfterViewInit(): any{
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
      data: { row, component: EditSMComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.supportData);
        this.ngOnInit();
      }
    );
  }

  Delete(element: any): any {
    this.supportService.deleteSupport(element.id).subscribe(
      (deleted: any) => {
        const index = this.supportData.indexOf(element.id);
        this.supportData.splice(index, 1);
        this.dataSource = new MatTableDataSource<SupportMonitoring>(this.supportData);
        this.toast.success(deleted , 'done!');
      },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting Monitoring with id ' + ' ' + `${element.id}` , 'error');
      }
    );
  }
}


@Component({
  selector: 'app-monitoring-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline" disabled="!editObject">
    <mat-label>agent code</mat-label>
    <input matInput type="text" placeholder="agent code"   formControlName="agCode">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>agent name</mat-label>
    <input matInput type="text" placeholder="agent name" formControlName="agName">
  </mat-form-field>

  <mat-label >is Eazzy App in a good condition?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="state">
    <mat-radio-button (click)="eazzyView = 1" value="true" [(ngModel)]="eazzyView"  [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="choice" >Yes</mat-radio-button>
    <mat-radio-button  (click)="eazzyView = 0" value="false">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline" *ngIf="!eazzyView">
    <mat-label>appAction</mat-label>
    <input matInput type="text" placeholder="appAction" formControlName="action" >
  </mat-form-field>

  <mat-label >Agent is branded?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="brand">
    <mat-radio-button value="true"  (click)="brandView  = 1" [(ngModel)]="brandView"  [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="brander">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="brandView  = 0" >No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!brandView" >
    <mat-label>branded Action</mat-label>
    <input matInput type="text" placeholder="brandedAction" formControlName="brandAction">
  </mat-form-field>

  <mat-label >Cash out transaction process understanding?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="cOut">
    <mat-radio-button value="true">Yes</mat-radio-button>
    <mat-radio-button value="false">No</mat-radio-button>
  </mat-radio-group>

  <mat-label >Collect of stationery</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="stationary">
    <mat-radio-button value="true" (click)="stationaryView  = 1" [(ngModel)]="stationaryView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="stationary0">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="stationaryView  = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!stationaryView">
    <mat-label>collect Stationery Need</mat-label>
    <input matInput type="text" placeholder="collect Stationery Need" formControlName="stationaryNeed">
  </mat-form-field>

  <mat-label >Pos in good condition</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="pState">
    <mat-radio-button value="true" (click)="posView  = 1" [(ngModel)]="posView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="stationary1">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="posView  = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!posView">
    <mat-label>pos action</mat-label>
    <input matInput type="text" placeholder="posAction" formControlName="pAction">
  </mat-form-field>

  <mat-label > is transaction filled and registered?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="rState">
    <mat-radio-button value="true" (click)="regView  = 1" [(ngModel)]="regView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="regView">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="regView  = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!regView">
    <mat-label>picture existing</mat-label>
    <input matInput type="text" placeholder="registerPic" formControlName="rPic">
  </mat-form-field>
  <div  *ngIf="!regView">
    <div class="row">
      <div class="col-8">
        <label class="btn btn-default p-0">
          <input [disabled]="!noImage" type="file" (change)="selectFile($event)" />
        </label>
      </div>

      <div class="col-4">
        <button class="btn btn-success btn-sm" [disabled]="!selectedFiles" (click)="upload()">
          Upload
        </button>
      </div>
    </div>

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
    <img [src]="imageBlobUrl"
         alt="{{this.data.row.registerPic}}"
         *ngIf="!isImageLoading; else noImageFound">
    <ng-template #noImageFound>
      <img src="../../../../../assets/images/FallbackImage.png" alt="FallbackImage">
    </ng-template>
  </div>
  <mat-form-field appearance="outline">
    <mat-label>register action</mat-label>
    <input matInput type="text" placeholder="registerAction" formControlName="rAction">
  </mat-form-field>

  <mat-label>sales and marketing support</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="sup">
    <mat-radio-button value="true" (click)="marketView  = 1" [(ngModel)]="marketView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="market">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="marketView  = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!marketView" >
    <mat-label>support needed</mat-label>
    <input matInput type="text" placeholder="support need" formControlName="suNeed">
  </mat-form-field>

  <mat-label> is troubleshooting needed?</mat-label>
  <mat-radio-group aria-label="Select an option" formControlName="tShooting">
    <mat-radio-button value="true"  (click)="tShootView = 1" [(ngModel)]="tShootView" [ngModelOptions]="{standalone: true}"  ngDefaultControl  name="market">Yes</mat-radio-button>
    <mat-radio-button value="false"  (click)="tShootView = 0">No</mat-radio-button>
  </mat-radio-group>

  <mat-form-field appearance="outline"  *ngIf="!tShootView">
    <mat-label>troubleshooting</mat-label>
    <input matInput type="text" placeholder="troubleshooting" formControlName="tShootNeed">
  </mat-form-field>

<!--  <mat-form-field appearance="outline">-->
<!--    <mat-label>user</mat-label>-->
<!--    <input matInput type="text" placeholder="user" formControlName="usr">-->
<!--  </mat-form-field>-->

  <mat-form-field appearance="outline">
    <mat-label>latitude</mat-label>
    <input matInput type="text" placeholder="latitude" formControlName="lat">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>longitude</mat-label>
    <input matInput type="text" placeholder="longitude"  formControlName="longi">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>agent phone number</mat-label>
    <input matInput  type="tel" maxlength="13" placeholder="phone" formControlName="phon">
  </mat-form-field>
</form>

<div class="row">
  <div style="float: left" >
    <button mat-button  (click)="alterObject()">Toggle edit</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button  (click)="saveData( EditDetails.value.agCode , EditDetails.value.agName , EditDetails.value.state , EditDetails.value.action , EditDetails.value.brand ,
   EditDetails.value.brandAction, EditDetails.value.cOut,EditDetails.value.stationary, EditDetails.value.stationaryNeed, EditDetails.value.pAction, EditDetails.value.pState ,
    EditDetails.value.rAction,EditDetails.value.rPic , EditDetails.value.rState , EditDetails.value.sup , EditDetails.value.lat, EditDetails.value.longi,
     EditDetails.value.suNeed, EditDetails.value.tShooting, EditDetails.value.tShootNeed, EditDetails.value.phon)">
      <mat-icon>save_alt</mat-icon>save
    </button>
    <button mat-button (click)="clear()">clear</button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditSMComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
  agCode: [ this.data.row.agentCode, Validators.required],
  agName: [this.data.row.agentName, Validators.required],
  state: [this.data.row.appState, Validators.required],
  action: [this.data.row.appAction],
  brand: [this.data.row.branded, Validators.required],
  brandAction: [this.data.row.brandedAction],
  cOut: [this.data.row.cashOut, Validators.required],
  stationary: [this.data.row.collectStationery, Validators.required],
  stationaryNeed: [this.data.row.collectStationeryNeed],
  pAction: [this.data.row.appAction],
  pState: [this.data.row.appState, Validators.required],
  rAction: [this.data.row.registerAction],
  rPic: [this.data.row.registerPic],
  rState: [this.data.row.registerState, Validators.required],
  sup: [this.data.row.support, Validators.required],
  suNeed: [this.data.row.supportNeed],
  tShooting: [this.data.row.troubleShooting, Validators.required],
  tShootNeed: [this.data.row.troubleShootingNeed],
  usr: [this.data.row.user.id, Validators.required],
  lat: [this.data.row.latitude, Validators.required],
  longi: [this.data.row.longitude, Validators.required],
  phon: [this.data.row.phone, [Validators.required, Validators.maxLength(10)]],
});
// file service
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
// variables
  eazzyView: any;
  brandView: any;
  editObject = false;
  stationaryView: any;
  posView: any;
  marketView: any;
  tShootView: any;
  regView: any;
  isImageLoading: boolean | undefined;
  noImage: any;
  private updatedList: {
    id: bigint;
    createdAt: Date;
    updatedAt: Date;
    agentCode: string;
    agentName: string;
    appState: boolean;
    appAction: string;
    branded: boolean;
    brandedAction: string;
    cashOut: boolean;
    collectStationery: boolean;
    collectStationeryNeed: string;
    latitude: string;
    longitude: string;
    phone: string;
    posAction: string;
    posState: boolean;
    registerAction: string;
    registerPic: string;
    registerState: boolean;
    support: boolean;
    supportNeed: string;
    troubleShooting: boolean;
    troubleShootingNeed: string;
    } | undefined;
  filName: {
    filename: any
  }| undefined;
  imageBlobUrl: string | ArrayBuffer | null = null;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private smService: SysMonitoringService, public toast: ToastrService
  ) {}

  ngOnInit(): void{
    this.EditDetails.disable();
    this.noImage = false;
    this.isImageLoading = true;
    this.filName = {
      filename: 'support_forms/3afad6d5-8dd4-4862-a38b-7cedaa49a9ae.jpg'
    };

    this.smService.getBlobThumbnail(this.filName)
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

  saveData(agCode: string, agName: string, state: boolean, action: string, brand: boolean, brandAction: string, cOut: boolean,
           stationary: boolean, stationaryNeed: string, pAction: string, pState: boolean, rAction: string, rPic: string,
           rState: boolean, sup: boolean, lat: string, longi: string, suNeed: string, tShooting: boolean, tShootNeed: string,
           phon: string): any {
    this.updatedList = {
      id: this.data.row.id,
      createdAt: this.data.row.createdAt,
      updatedAt: this.data.row.updatedAt,
      agentCode: agCode,
      agentName: agName,
      appState: state,
      appAction: action,
      branded: brand,
      brandedAction: brandAction,
      cashOut: cOut,
      collectStationery: stationary,
      collectStationeryNeed: stationaryNeed,
      latitude: lat,
      longitude: longi,
      phone: phon,
      posAction: pAction,
      posState: pState,
      registerAction: rAction,
      registerPic: rPic,
      registerState: rState,
      support: sup,
      supportNeed: suNeed,
      troubleShooting: tShooting,
      troubleShootingNeed: tShootNeed,
    };
    if (!this.EditDetails.valid){
      return;
    }
    console.log(this.updatedList);
    this.smService.updateSupport(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated Monitoring with id  ' + `${this.data.row.id}`, 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }

  clear(): any {
    this.EditDetails.reset();
  }

  alterObject(): any {
    if (this.EditDetails.disabled){
      this.noImage =  true;
      return  this.EditDetails.enable();
    }
    if ( this.EditDetails.enabled){
      this.noImage =  false;
      return this.EditDetails.disable();
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
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

  createImageFromBlob(image: Blob): any {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

