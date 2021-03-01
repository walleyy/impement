import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AccountOpeningService} from '../../../../../services/dataForTable/account-opening.service';


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
    'custTrained', 'custTrainedReason', 'formPic', 'kycDocsAvailable', 'kycDocsMissing', 'latitude', 'longitude', 'phone'];
  dataSource = new MatTableDataSource(this.accountOpening);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private accOpeningService: AccountOpeningService) {
    this.accOpeningService.getAccOpening().subscribe(
      (acctOpeningData: any) => {
        this.accountOpening = acctOpeningData;
        console.log(acctOpeningData);
        this.dataSource = new MatTableDataSource(this.accountOpening);
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
