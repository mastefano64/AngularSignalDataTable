import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

// https://blog.logrocket.com/angular-signals-vs-observables/

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit, OnDestroy {
  observable1 = new Observable((subscriber) => {
    subscriber.next('a1');
    subscriber.next('b1');
    subscriber.next('c1');
    setTimeout(() => {
      subscriber.next('d1');
      subscriber.complete();
    }, 1000);
  });

  signal1 = toSignal(this.observable1);

  observable2 = new Observable((subscriber) => {
    subscriber.next('a2');
    subscriber.next('b2');
    subscriber.next('c2');
    setTimeout(() => {
      subscriber.next('d2');
      subscriber.complete();
    }, 1000);
  });

  signal2 = toSignal(this.observable2);

  allsignal = computed(() => this.signal1() + ' ' +  this.signal2())

  constructor() { }

  ngOnInit() {
    this.observable1.subscribe((v) => console.log("received1: ", v));
    this.observable2.subscribe((v) => console.log("received2: ", v));
  }

  ngOnDestroy() {

  }
}
