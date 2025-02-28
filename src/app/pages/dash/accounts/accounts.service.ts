import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../services/ApiClient/api-client.service';
import { Observable } from 'rxjs';
import { AccountListResponse, ApiResponseAdm_Type } from '../../../types';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private api: ApiClientService
  ) { }

  getAllAccounts(): Observable<HttpResponse<ApiResponseAdm_Type<AccountListResponse>>> {
    return this.api.getAllAccounts()
  }

}
