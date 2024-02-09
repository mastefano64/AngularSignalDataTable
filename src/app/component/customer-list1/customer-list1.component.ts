import { Component, ViewChild, OnInit, DoCheck, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { CustomerSearch1Component } from '../customer-search1/customer-search1.component';
import { ApiCustomerService } from '../../service/api-customer.service';
import { CustomerSearch } from '../../model/customer-search';
import { CustomerDto } from '../../model/customer-dto';

// https://netbasal.com/converting-signals-to-observables-in-angular-what-you-need-to-know-971eacd3af2
// https://medium.com/angular-in-depth/deep-dive-into-the-onpush-change-detection-strategy-in-angular-fab5e4da1d69

@Component({
  selector: 'app-customer-list1',
  templateUrl: './customer-list1.component.html',
  styleUrls: ['./customer-list1.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerList1Component implements OnInit, DoCheck, OnDestroy {
  @ViewChild('searchfield', { read: CustomerSearch1Component }) searchfield: CustomerSearch1Component;
  @ViewChild('mytable') table: any;
  search: CustomerSearch;
  count = 0;
  page = 0;
  pagesize = 10;
  colord = 'id';
  coldir = 'asc';
  rows;

  columns: [
    { name: 'Id' },
    { name: 'Name' },
    { name: 'Surname' },
    { name: 'Address' },
    { name: 'Cap' },
    { name: 'City' },
    { name: 'Province' },
    { name: 'Action' }
  ];

  constructor(private service: ApiCustomerService) {
    this.search = new CustomerSearch();
  }

  ngDoCheck() : void {
    console.log('CustomerList1Component: doCheck');
  }

  ngOnInit(): void {
    this.loadCusomerBySearch();
  }

  onPage(event): void {
    this.page = event.offset;
    // this.colord = event.sorts[0].prop;
    // this.coldir = event.sorts[0].dir;
    this.loadCusomerBySearch();
  }

  onSort(event): void {
    this.page = 0;
    this.colord = event.sorts[0].prop;
    this.coldir = event.sorts[0].dir;
    this.loadCusomerBySearch();
  }

  onSearchResult(result: any): void {
    this.count = result.count;
    this.rows = result.items;
  }

  loadCusomerBySearch(): void {
    this.service.getCusomerBySearch(this.search, this.page, this.pagesize,
             this.colord, this.coldir).subscribe(response => {
      const result = response as any;
      this.count = result.count;
      this.rows = result.items;
    });
  }

  ngOnDestroy(): void {

  }
}
