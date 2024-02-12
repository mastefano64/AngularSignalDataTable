# AngularSignalDataTable

Currently the hot topic in the Angular ecosystem is "Signals". In addition to the examples visible online, I wondered if it would be possible to use them (signals) with one of the many datatables on the internet: I did some tests with ngx-datatable.

I immediately thought that this couldn't work, but to my great surprise I saw that it does. By setting the attributes within the template: [rows]="signalrows()" and count]="signalcount()". The table allows paging and sorting.

I also made a filter function in the "app-customer-search2" component. The text field is bound to a signal. In order to have the classic functions: filter(), debounceTime(), distinctUntilChanged(), switchMap(); I converted the search field signal into an Observable via the "toObservable()" method.

Everything seems to be working fine!

I created a project that uses modules, so I could disable zone.js (i would like to point out that the project uses Angular
Material. But if I disable zone.js some things don't work anymore.

Maybe because Angular Material like any graphics library (including ngx-datatable) requires zone.js to work.

**I did a similar test using Ag Grid (without Angular Material), everything works but if I disable zone.js the routing no longer works.**

Maybe they should release a new generation of libraries specifically designed to work with signals without zone.js.
