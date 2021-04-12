import { Component, Inject, Injectable, InjectionToken, Injector } from '@angular/core';

const TOKEN = new InjectionToken<string>("string token", { providedIn: "root", factory: () => "from module"});
const A_TOKEN = new InjectionToken<A>("A");

@Injectable({providedIn: "root"})
class A {
  constructor (@Inject(TOKEN) tokenValue: string) {
    console.log(`tokenValue in A = ${tokenValue}`);
  }
}


@Injectable({providedIn: "root"})
class AGetter {
  constructor (private readonly injector: Injector) {}

  getA () {
    return this.injector.get(A);
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {provide: A_TOKEN, useFactory: (aGetter: AGetter) => aGetter.getA(), deps:[AGetter] },
    {provide: TOKEN, useValue: "from component"}
  ]
})
export class AppComponent {
  title = 'my-app';
  constructor (@Inject(A_TOKEN) a: A) {
  }
}
