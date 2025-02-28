import { Component } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Account_Type } from '../../../types';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accounts',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountList: Array<Account_Type> = [];
  loading: boolean = false;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.accountsService.getAllAccounts().subscribe({
      next: (res) => {
        if ('data' in res.body!) {
          this.accountList = res.body.data.accounts
        }

      },
      error: (error) => {
        console.log(error)
        this.loading = false
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
