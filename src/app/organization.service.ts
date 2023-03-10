import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationUrl = 'http://14.160.91.174:1387/api/v1/admin/organization/'

  constructor(private http: HttpClient) { }

  getOrganizationList(page: number): Observable<any> {
    return this.http.get(this.organizationUrl + '?page=' + page)
  }

  addOrganization(name: string, code: string, taxCode: string, shortName: string, address: string, email: string, representative: string, position: string, size: string, phone: string, status: string): Observable<any> {
    return this.http.post(this.organizationUrl, {name , code, taxCode, shortName, address, email, representative, position, size, phone, status})
  }

  getOrganization(id: number): Observable<any> {
    const getUrl = this.organizationUrl + id;
    return this.http.get(getUrl)
  }

  updateOrganization(id: number, name: string, code: string, taxCode: string, shortName: string, address: string, email: string, representative: string, position: string, size: string, phone: string, stt: string): Observable<any> {
    const putUrl = this.organizationUrl + id;
    var status;
    if (stt === 'ACTIVE') {
      status = 1
    } else if (stt === 'IN_ACTIVE') {
      status = 0
    }
    return this.http.put(putUrl, {name, code, taxCode, shortName, address, email, representative, position, size, phone, status})
  }

  delOrganization(id: number): Observable<any> {
    const delUrl = this.organizationUrl + id;
    return this.http.delete(delUrl)
  }

  filterOrganization(representative: string, email: string, phone: string, stt: string, address: string): Observable<any> {
    var status;
    if (stt === 'ACTIVE') {
      status = 1
    } else if (stt === 'IN_ACTIVE') {
      status = 0
    } else {
      status = ''
    }
    const searchUrl = `${this.organizationUrl}/?representative=${representative}&email=${email}&phone=${phone}&status=${status}&address=${address}`;
    return this.http.get(searchUrl)
  }

  searchOrganization(name: string, code: string) {
    const searchUrl = `${this.organizationUrl}/?name=${name}&code=${code}`;
    return this.http.get(searchUrl)
  }

}
