import {AfterViewInit, Component, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {TaskService} from '../../../../../services/dataForTable/task-service.service';
import {ToastrService} from 'ngx-toastr';

export interface Task {
  id: number ;
  createdAt: number;
  updatedAt: number;
  name: string;
}


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  moduleId: module.id,
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit , AfterViewInit{
  tasks: Task[] = [];
  search = new FormControl('');
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'name', 'action'];
  dataSource = new MatTableDataSource<Task>(this.tasks);
  toggleButton = false;
  newItem = this.formBuilder.group({
    name: [''],
  });

  constructor(public dialog: MatDialog, private taskService: TaskService,
              public formBuilder: FormBuilder, public toast: ToastrService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  ngOnInit(): any{
    this.taskService.getTask().subscribe(
    (task: any) => {
      this.tasks = task;
      this.dataSource = new MatTableDataSource(this.tasks);
      this.ngAfterViewInit();
    },
    ((err: any) => console.log(err))
  );
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
    this.taskService.deleteTask(element.id).subscribe(
      (deleted: any) => {
        const index = this.tasks.indexOf(element.id);
        this.tasks.splice(index, 1);
        this.dataSource = new MatTableDataSource<Task>(this.tasks);
        this.toast.success(deleted , 'done!');
    },
      (err: { error: { response: string; }; }) => {
        this.toast.error('failed deleting task ' + ' ' + `${element.id}` , 'error');
      }
    );
  }

  openDetails(row: any): void {
    console.log(row);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '96%',
      data: { row : Array.of(row), component: DetailsComponent},
    });
  }

  openEdit(row: any): any {
     const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: { row, component: EditComponent},
      autoFocus : true,
      disableClose: true,
    });
     dialogRef.afterClosed().subscribe(
       results => {
         this.dataSource = new MatTableDataSource(this.tasks);
         this.ngOnInit();
       }
     );
  }

  toggle(): any {
this.toggleButton = !this.toggleButton;

  }

  createTask(value: any): any {
    this.taskService.createTask(value).subscribe(
      (results: any) => {
       console.log(results);
       alert('task created');
       window.location.reload();
      }
    );
  }
}




@Component({
  selector: 'app-details',
  template: `
  <div>
    <table mat-table id="edi" [dataSource]="dataSource" class="mat-elevation-z8" style=";table-layout:fixed;
    ;width: 100%">

      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="createdAt">
        <th mat-header-cell *matHeaderCellDef> createdAt </th>
        <td mat-cell *matCellDef="let element"> {{element.createdAt}} </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="updatedAt">
        <th mat-header-cell *matHeaderCellDef> updatedAt </th>
        <td mat-cell *matCellDef="let element"> {{element.updatedAt}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
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
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'name'];
  dataSource = new MatTableDataSource(this.data.row);

  ngOnInit(): void{
  }
}

@Component({
  selector: 'app-edit',
  template: `
<form ngForm  style="display: flex; flex-direction: column; justify-content: center;align-items: center " [formGroup]="EditDetails">
  <mat-form-field appearance="outline">
    <mat-label>name</mat-label>
    <textarea matInput  placeholder="name" formControlName="name"></textarea>
  </mat-form-field>
</form>
<div class="row">
  <div style="float: left">
    <button mat-button  (click)="clear()" >clear</button>
  </div>
  <span style="flex: 1 1 auto"></span>
  <div style="float: right" >
    <button mat-button  (click)="saveData(EditDetails.value)">
      <mat-icon>save_alt</mat-icon>save
    </button>
  </div>
</div>

  `,
  styleUrls: ['../../../../../assets/scss/others.scss']
})
export class EditComponent implements  OnInit{
  EditDetails = this.formBuilder.group({
  name: ['', Validators.required]
});

  private updatedList: {  id: number; name: string } | undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public  formBuilder: FormBuilder,
    private taskService: TaskService, public toast: ToastrService
  ) {}

  ngOnInit(): void{}

  saveData(value: any): any {
    this.updatedList = {
        id: this.data.row.id,
        name: value.name,
      };
    if (!this.EditDetails.valid){
      return;
    }
    this.taskService.updateTask(this.updatedList, this.data.row.id).subscribe(
      (result: any) => {
        console.log( result);
        this.toast.success('updated Task  ' + `${this.data.row.id}`, 'Done');
    },
      (err: any) => {
        this.toast.error(`${err}`, 'Err');
      });
  }
  clear(): any {
    this.EditDetails.reset();
  }
}
