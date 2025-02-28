import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiClientService } from '../../../services/ApiClient/api-client.service';
import { AccountResponse, ApiResponseAdm_Type, UpdateAccountResponse } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(
    private api: ApiClientService
  ) { }

  GetAccountById(id: string): Observable<HttpResponse<ApiResponseAdm_Type<AccountResponse>>> {
    return this.api.getAccountById(id)
  }

  SaveChanges(id: string, value: number, description: string, limit_date: string, is_paid: boolean): Observable<HttpResponse<ApiResponseAdm_Type<UpdateAccountResponse>>> {
    return this.api.UpdateAccountData(id, value, description, limit_date, is_paid);
  }
}
