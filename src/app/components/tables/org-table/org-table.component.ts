import { Component, Input, OnInit } from '@angular/core';
import { OrganizationDataSource } from '@app/services/orgs/organization.dataSource';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { TableSearchParams } from '@app/graphql/schemas';

@Component({
  selector: 'app-org-table',
  templateUrl: './org-table.component.html',
  styleUrls: ['./org-table.component.css']
})
export class OrgTableComponent implements OnInit {

  dataSource

  @Input() searchParams: TableSearchParams = {
    queryType: '',
    queryParams: '',
  }

  displayedColumns: string[] = [
    'orgName',
    'locations',
    'users'
  ];


  constructor(private orgService: OrganizationService) {
    this.dataSource = new OrganizationDataSource(this.orgService);

  }

  ngOnInit(): void {
      switch (this.searchParams.queryType) {
        case 'oneOrg': this.dataSource.loadOneOrg(this.searchParams.queryParams);
          break;
        default: this.dataSource.loadAllOrgs();
      }
  }

}
