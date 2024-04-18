import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RepairDataSource } from '@app/services/repairs/repair.dataSource';
import { RepairService } from '@app/services/repairs/repair.service';
import { TableSearchParams } from '@app/graphql/schemas';

@Component({
  selector: 'app-repair-table',
  templateUrl: './repair-table.component.html',
  styleUrls: ['./repair-table.component.css']
})
export class RepairTableComponent implements OnInit {

  dataSource

  @Input() searchParams: TableSearchParams = {
    queryType: '',
    queryParams: ''
  }

  displayedColumns: string[] = [

  ]


  constructor(private repairService: RepairService) {
    this.dataSource = new RepairDataSource(this.repairService);

  }


  ngOnInit(): void {
      
  }
}
