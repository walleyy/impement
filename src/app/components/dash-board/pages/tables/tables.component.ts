import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    ID: '20033',
    description: 'kajshdsjdlshalkdhalkhlkshdlkalskdlakdlkasslda',
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    ID: '200763',
    description: 'kajshdsjdlsjkjkjhkhkjhkhalkdhalkhlkshdlkalskdlakdlkasslda',
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    ID: '233',
    description: 'kajshdsjdls  lkhlkshdlkals  kdlakdlkasslda',
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    ID: '20863',
    description: 'kajshdls halkd halkhlkshd lskdlakdlkasslda',
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    ID: '267033',
    description: 'kajshdsjdlshalkdhalkhlksh    jksdjhfkdlfhldfdkfhdlkfhdlfkdhfldfhdlfhld dlkalskdlakdlkasslda',
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    ID: '206833',
    description: 'kajshdsjdlshalk ,dhalkhlkshdlkalsk ndmfndmfnd,fdmd  dlakdlkasslda',
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    ID: '2088733',
    description: 'kajshdsjdlshalk       dhalkhlkshd lkalskdlakdlkasslda',
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    ID: '200389893',
    description: 'kajshdsjdlshal kdhalkh lkshdl ,dfmdbf,dmfbdfdb,mbf,db,dbfdm,fbd,fmdbf,mdbf,dbfkalskdlakdlkasslda',
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    ID: '2008933',
    description: 'kajshdsjdlsha lkdhalkhlksh dlkalskjhjhfkjdhfkdjhfkdjhf dkdlakdlkasslda',
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    ID: '20037873',
    description: 'kajshdsjdlsha lkdhalkhlkshdlka lsdkfdlkfdkfdkfdkfdkfjdkfjdflskdlakdlkasslda',
  },
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  moduleId: module.id,
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit , AfterViewInit{
  search = new FormControl('');
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;


  ngOnInit(): any{
    console.log(ELEMENT_DATA);
  }

  ngAfterViewInit(): void{
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Delete(element: any): any {
  }

  openDetails(row: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '96%',
      data: { row : Array.of(row), component: DetailsComponent},
    });
  }

  openEdit(row: any): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row : Array.of(row), component: EditComponent},
    });
  }
}




@Component({
  selector: 'app-details',
  template: `
  <div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" style="width: 100%">

      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="weight">
        <th mat-header-cell *matHeaderCellDef> Weight </th>
        <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
        <th mat-header-cell *matHeaderCellDef> Symbol </th>
        <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
      </ng-container>
      <ng-container matColumnDef="ID">
        <th mat-header-cell *matHeaderCellDef> ID</th>
        <td mat-cell *matCellDef="let element"> {{element.ID}} </td>
      </ng-container>
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>`,
})
export class DetailsComponent implements  OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ID', 'description'];
  dataSource = new MatTableDataSource(this.data.row);

  ngOnInit(): void{
  }
}

@Component({
  selector: 'app-details',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center ">
  <mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput placeholder="name">
    <mat-hint>Hint</mat-hint>
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Weight</mat-label>
    <input matInput placeholder="weight">
    <mat-hint>Hint</mat-hint>
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Symbol</mat-label>
    <input matInput placeholder="Symbol">
    <mat-hint>Hint</mat-hint>
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>ID</mat-label>
    <input matInput placeholder="ID">
    <mat-hint>Hint</mat-hint>
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Description</mat-label>
    <textarea matInput></textarea>
  </mat-form-field>
</form>
  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditComponent implements  OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void{
  }
}
