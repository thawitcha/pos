import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private Http: HttpClient) {

  }
  get(uri: string) {
    return this.Http.get(environment + uri)
  }
  postdata(uri: string, data: any) {
    return this.Http.post(environment.base_url+ uri, data)
  }
}
