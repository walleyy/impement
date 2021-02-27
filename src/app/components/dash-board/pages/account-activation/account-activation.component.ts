import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AccountActivationService} from '../../../../../services/dataForTable/account-activation.service';

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

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'accountNo', 'customerName',
    'latitude', 'longitude', 'phone'];
  dataSource = new MatTableDataSource(this.accountActivation);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private accService: AccountActivationService) {
    this.accService.getAccountActData().subscribe(
      (acctData: any) => {
        this.accountActivation = acctData;
        this.dataSource = new MatTableDataSource(this.accountActivation);
      },
      ((err: any) => console.log(err))
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
