import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  _apiUrl: string = environment.apiUrl + 'dataBrowser';

  constructor(private http: HttpClient,
      private apiQueryParams: ApiQueryParamsService,
      private messageService: MessageService,) {}

  getAllVendors(data: any) {
      return new Observable((observable) => {
        this.http
          .get(
            `${this._apiUrl}/vendor${this.apiQueryParams.get(data)}`
          )
          .subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
    }

    deleteVendor(id: string) {
      return this.http.delete(`${this._apiUrl}/vendor/${id}`);
    }


    saveVendor(data: any) {
      return this.http.post(`${this._apiUrl}/vendor`, data);
    }

    updateVendor(data: any, id:string) {
      return this.http.put(`${this._apiUrl}/vendor/${id}`, data);
    }

    getVendorById(id: string) {
      return this.http.get(`${this._apiUrl}/vendor/${id}`);
    }
    getVendorByVendorId(id: string) {
      return this.http.get(`${this._apiUrl}/vendorById/${id}`);
    }

    getAllPO(data: any) {
      return new Observable((observable) => {
        this.http
          .get(
            `${this._apiUrl}/purchaseOrder${this.apiQueryParams.get(data)}`
          )
          .subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
    }

    deletePO(id: string) {
      return this.http.delete(`${this._apiUrl}/purchaseOrder/${id}`);
    }


    savePO(data: any) {
      return this.http.post(`${this._apiUrl}/purchaseOrder`, data);
    }

    updatePO(data: any, id:string) {
      return this.http.put(`${this._apiUrl}/purchaseOrder/${id}`, data);
    }

    getPOById(id: string) {
      return this.http.get(`${this._apiUrl}/purchaseOrder/${id}`);
    }

    uploadVendorFile(data: any, logicalSystem: any) {
      return this.http.post(`${this._apiUrl}/upload/vendor/${logicalSystem}`, data);
    }

    uploadPOFile(data: any, logicalSystem: any) {
      return this.http.post(`${this._apiUrl}/upload/purchaseOrder/${logicalSystem}`, data);
    }

    syncPO() {
      return new Observable((observable) => {
        this.http
          .get(
            `${this._apiUrl}/poSync`
          )
          .subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
    }

    syncVendor() {
      return new Observable((observable) => {
        this.http
          .get(
            `${this._apiUrl}/vendorSync`
          )
          .subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
    }
    getVendorsForTypeAhead(data: any) {
      return this.http.get(`${this._apiUrl}/vendor${this.apiQueryParams.get(data)}`);
    }

}
