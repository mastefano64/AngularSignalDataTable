import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, DoCheck, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
// import { ControlContainer, NgForm } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
//import { toObservable } from '@angular/core/rxjs-interop';

import { CustomerSearch } from '../../model/customer-search';
import { CustomerDto } from '../../model/customer-dto';
import { ApiCustomerService } from '../../service/api-customer.service';

@Component({
  selector: 'app-customer-search1',
  templateUrl: './customer-search1.component.html',
  styleUrls: ['./customer-search1.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerSearch1Component implements DoCheck, AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef | undefined;
  @Input() customersearch: CustomerSearch;
  @Input() page: number;
  @Input() pagesize: number;
  @Input() orderbycolumn: string;
  @Input() orderbydirection: string;

  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() minlenght = 6;
  @Input() debouncetime = 800;
  @Input() type: 'string' | 'integer' | 'decimal' = 'string';
  @Input() value = '';
  @Output() custresult = new EventEmitter<any>();

  public sub: Subscription;

  constructor(private service: ApiCustomerService) { }

  ngDoCheck() : void {
    console.log('CustomerSearch1Component: doCheck');
  }

  ngAfterViewInit(): void {
    this.sub = fromEvent(this.search?.nativeElement, 'keyup').pipe(
      map((event: any) => (event.target as HTMLInputElement).value.trim()),
      filter(text => text.length === 0 || text.length >= this.minlenght),
      debounceTime(this.debouncetime),
      distinctUntilChanged(),
      switchMap((value: string) => {
        this.customersearch.fulltext = value;
        return this.service.getCusomerBySearch(this.customersearch, this.page,
             this.pagesize, this.orderbycolumn, this.orderbydirection);
      }),
    ).subscribe(response => {
      this.custresult.emit(response);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
