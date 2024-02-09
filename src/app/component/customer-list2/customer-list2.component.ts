import { Component, ViewChild, OnInit, DoCheck, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { CustomerSearch2Component } from '../customer-search2/customer-search2.component';
import { ApiCustomerService } from '../../service/api-customer.service';
import { CustomerSearch } from '../../model/customer-search';
import { CustomerDto } from '../../model/customer-dto';

// https://netbasal.com/converting-signals-to-observables-in-angular-what-you-need-to-know-971eacd3af2

@Component({
  selector: 'app-customer-list2',
  templateUrl: './customer-list2.component.html',
  styleUrls: ['./customer-list2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerList2Component implements OnInit, DoCheck, OnDestroy {
  @ViewChild('searchfield', { read: CustomerSearch2Component }) searchfield: CustomerSearch2Component;
  @ViewChild('mytable') table: any;
  search: CustomerSearch;
  page = 0;
  pagesize = 10;
  colord = 'id';
  coldir = 'asc';

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

  signalcount = signal<number>(0);
  signalrows = signal<CustomerDto[]>([]);

  constructor(private service: ApiCustomerService) {
    this.search = new CustomerSearch();
  }

  ngDoCheck() : void {
    console.log('CustomerList2Component: doCheck');
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
    this.signalcount.set(result.count);
    this.signalrows.set(result.items);
  }

  loadCusomerBySearch(): void {
    this.service.getCusomerBySearch(this.search, this.page, this.pagesize,
             this.colord, this.coldir).subscribe(response => {
      const result = response as any;
      this.signalcount.set(result.count);
      this.signalrows.set(result.items);
    });
  }

  ngOnDestroy(): void {

  }
}
