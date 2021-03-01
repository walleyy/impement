import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RecruitmentService} from '../../../../../services/dataForTable/recruitment.service';

export interface Recruitment {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  docsCollectDate: Date;
  kycDocsAvailable: number;
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

  recruitData: [] = [];

  constructor(private recruitService: RecruitmentService) {
    this.recruitData = recruitService.getRecruitData().subscribe(
      (recruitData: any) => {
        this.recruitData = recruitData;
        console.log(recruitData);
        this.dataSource = new MatTableDataSource(this.recruitData);
      },
      ((err: any) => console.log(err))
    );
  }

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'docsCollectionDate', 'kycDocAvailable', 'latitude',
    'location', 'longitude', 'phone', 'prospectName'];
  dataSource = new MatTableDataSource(this.recruitData);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;


  ngOnInit(): void {}

  ngAfterViewInit(): void{
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
