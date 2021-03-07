import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AccountActivationService} from '../../../../../services/dataForTable/account-activation.service';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/dialog/dialog.component';

export interface AccountActivation {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  accountNo: string;
  custName: string;
  latitude: string;
  longitude: string;
  phone: string;
}


@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, AfterViewInit {

  accountActivation: AccountActivation[] = [];
  isLoading = true;
  searchingOn = false;
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'accountNo', 'customerName',
    'latitude', 'longitude', 'phone', 'action'];
  dataSource = new MatTableDataSource(this.accountActivation);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined ;

  constructor(private accService: AccountActivationService, public toast: ToastrService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {this.accService.getAccountActData().subscribe(
    (acctData: any) => {
      this.accountActivation = acctData;
      this.dataSource.data = this.accountActivation;
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
      data: { row, component: EditAAComponent},
      autoFocus : true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      results => {
        this.dataSource = new MatTableDataSource(this.accountActivation);
        this.ngOnInit();
      }
    );
  }

  Delete(element: any): any {
    this.accService.deleteAccActivation(element.id).subscribe(
      (deleted: any) => {
        const index = this.accountActivation.indexOf(element.id);
        this.accountActivation.splice(index, 1);
        this.dataSource = new MatTableDataSource<AccountActivation>(this.accountActivation);
        this.toast.success(deleted , 'done!');
      },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting Account ' + ' ' + `${element.id}` , 'error');
      }
    );
  }
}


@Component({
  selector: 'app-activation-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label> account number</mat-label>
    <input matInput type="text" placeholder="account number" formControlName="accNo">
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>customer name</mat-label>
    <input matInput type="text" placeholder="customer name" formControlName="cName">
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
    <button mat-button (click)="clear()">clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button  (click)="saveData( EditDetails.value.accNo ,EditDetails.value.cName , EditDetails.value.lat , EditDetails.value.longi, EditDetails.value.phon)">
      <mat-icon>save_alt</mat-icon>save
    </button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditAAComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
    accNo: ['', Validators.required],
    cName: ['', Validators.required],
    lat: ['', Validators.required],
    longi: ['', Validators.required],
    phon: ['', Validators.required],
  });

  private updatedList: { createdAt: Date; phone: string; accountNo: any;
  latitude: string; id: any; custName: string; updatedAt: Date; longitude: string; } | undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private accService: AccountActivationService, public toast: ToastrService
  ) {}

  ngOnInit(): void{}

  saveData(accNo: any, cName: string, lat: string, longi: string, phon: string): any {
    this.updatedList = {
      id: this.data.row.id,
      createdAt: this.data.row.createdAt,
      updatedAt: this.data.updatedAt,
      accountNo: accNo,
      custName: cName,
      latitude: lat,
      longitude: longi,
      phone: phon,
    };
    if (!this.EditDetails.valid){
      return;
    }
    this.accService.updateAccActivation(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated activation with id ' + `${this.data.row.id}`, 'Done');
      },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }
  clear(): any {
    this.EditDetails.reset();
  }
}
