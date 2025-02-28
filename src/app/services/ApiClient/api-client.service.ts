import { HttpClient, HttpResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AccountListResponse, AccountResponse, ApiResponseAdm_Type, CreateNewAccount, TokenResponse, UpdateAccountResponse } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiBaseUrl: string = 'http://localhost:4200/v1/c/';
  token: string = "";
  AuthHeader: { [header: string]: string | string[]; } = {};

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  login(id: string, password: string): Observable<HttpResponse<ApiResponseAdm_Type<TokenResponse>>> {
    return this.http.post<ApiResponseAdm_Type<TokenResponse>>(`${this.apiBaseUrl}auth`, { id, password }, { observe: 'response' })
  };


  getAllAccounts(): Observable<HttpResponse<ApiResponseAdm_Type<AccountListResponse>>> {

    this.token = this.cookies.get('contasTokenUser');
    this.AuthHeader = { 'Authorization': `Bearer ${this.token}` }

    return this.http.get<ApiResponseAdm_Type<AccountListResponse>>(this.apiBaseUrl, { headers: this.AuthHeader, observe: 'response' })
  }

  getAccountById(id: string): Observable<HttpResponse<ApiResponseAdm_Type<AccountResponse>>> {

    this.token = this.cookies.get('contasTokenUser');
    this.AuthHeader = { 'Authorization': `Bearer ${this.token}` }

    return this.http.get<ApiResponseAdm_Type<AccountResponse>>(`${this.apiBaseUrl}${id}`, { headers: this.AuthHeader, observe: 'response' })
  }

  UpdateAccountData(id: string, value: number, description: string, limit_date: string, is_paid: boolean): Observable<HttpResponse<ApiResponseAdm_Type<UpdateAccountResponse>>> {

    this.token = this.cookies.get('contasTokenUser');
    this.AuthHeader = { 'Authorization': `Bearer ${this.token}` }

    return this.http.put<ApiResponseAdm_Type<UpdateAccountResponse>>(`${this.apiBaseUrl}`, { id, value, description, limit_date, is_paid }, { headers: this.AuthHeader, observe: 'response' })
  }

  CreateNewAccount(value: number, description: string, limit_date: string, is_paid: boolean): Observable<HttpResponse<ApiResponseAdm_Type<CreateNewAccount>>> {

    this.token = this.cookies.get('contasTokenUser');
    this.AuthHeader = { 'Authorization': `Bearer ${this.token}` }

    return this.http.post<ApiResponseAdm_Type<CreateNewAccount>>(`${this.apiBaseUrl}`, { value, description, limit_date, is_paid }, { headers: this.AuthHeader, observe: 'response' })
  }
}