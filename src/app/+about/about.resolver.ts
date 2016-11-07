import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AboutResolver implements Resolve<any> {

  constructor(protected http: Http) {}

  resolve(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    return this.http.get('/assets/data/about.json')
      .map(res => res.json())
      .catch(err => { return Observable.throw(err); });
  }
}

// an array of services to resolve routes with data
export const ABOUT_RESOLVER_PROVIDERS = [
  AboutResolver
];
