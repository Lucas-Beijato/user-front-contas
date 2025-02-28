import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiClientService } from '../../../services/ApiClient/api-client.service';

@Component({
  selector: 'app-new-account',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent {

  message: string = ""
  errorMessage: string = ""

  newAccountForm = new FormGroup({
    value: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    limit_date: new FormControl('', [Validators.required]),
    is_paid: new FormControl(false, [Validators.required])
  })

  constructor(private api: ApiClientService) { }

  CreateNewUser() {

    this.message = ""
    this.errorMessage = ""

    if (this.newAccountForm.valid) {
      if (this.newAccountForm.value.description && this.newAccountForm.value.is_paid !== null && this.newAccountForm.value.is_paid !== undefined && this.newAccountForm.value.limit_date && this.newAccountForm.value.value) {
        this.api.CreateNewAccount(this.newAccountForm.value.value, this.newAccountForm.value.description, this.newAccountForm.value.limit_date, this.newAccountForm.value.is_paid).subscribe({
          next: (data) => { console.log(data); this.message = "Nova conta criada!" },
          error: (error) => { console.log(error); this.errorMessage = "Erro ao criar a conta!" },
          complete: () => { console.log('complete') }
        })
      }
    }
  }
}
