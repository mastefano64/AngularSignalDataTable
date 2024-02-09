import { Component, Input, Output, EventEmitter, DoCheck, AfterViewInit, OnDestroy, signal, computed, ChangeDetectionStrategy } from '@angular/core';
// import { ControlContainer, NgForm } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { CustomerSearch } from '../../model/customer-search';
import { ApiCustomerService } from '../../service/api-customer.service';

@Component({
  selector: 'app-customer-search2',
  templateUrl: './customer-search2.component.html',
  styleUrls: ['./customer-search2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerSearch2Component implements DoCheck, AfterViewInit, OnDestroy {
  @Input() customersearch: CustomerSearch;
  @Input() page: number;
  @Input() pagesize: number;
  @Input() orderbycolumn: string;
  @Input() orderbydirection: string;

  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() minlenght = 16;
  @Input() debouncetime = 800;
  @Input() type: 'string' | 'integer' | 'decimal' = 'string';
  @Input() value = '';
  @Output() custresult = new EventEmitter<any>();

  public sub: Subscription;

  signalsearch = signal<string>('');
  computedsearch = computed(() => this.signalsearch());
  search$ = toObservable(this.signalsearch);

  constructor(private service: ApiCustomerService) { }

  ngDoCheck() : void {
    console.log('CustomerSearch2Component: doCheck');
  }

  ngAfterViewInit(): void {
    this.sub = this.search$.pipe(
      map(text => text.trim()),
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
