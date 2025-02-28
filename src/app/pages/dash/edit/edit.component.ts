import { Component, OnInit } from '@angular/core';
import { EditService } from './edit.service';
import { ActivatedRoute } from '@angular/router';
import { Account_Type } from '../../../types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  account: Account_Type = { id: '', description: '', is_paid: false, limit_date: '', user_id: '', value: 0 }
  loadingUser: boolean = false;

  message: string = ""
  errorMessage: string = ""

  editForm = new FormGroup({
    value: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    limit_date: new FormControl('', [Validators.required]),
    is_paid: new FormControl(false, [Validators.required])
  })

  constructor(
    private editService: EditService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadingUser = true;
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.editService.GetAccountById(id).subscribe({
      next: (res) => {
        if ('data' in res.body!) {
          this.account = res.body.data.account
        }
      },
      error: (error) => { console.log(error) },
      complete: () => {
        this.editForm.patchValue({ value: this.account.value, description: this.account.description, is_paid: this.account.is_paid, limit_date: this.account.limit_date, })
        this.loadingUser = false;
      }
    })
  }

  saveChanges() {

    this.message = ""
    this.errorMessage = ""

    if (this.editForm.value.value && this.editForm.value.limit_date && this.editForm.value.description && this.editForm.value.is_paid !== null && this.editForm.value.is_paid !== undefined) {
      this.editService.SaveChanges(this.account.id, this.editForm.value.value, this.editForm.value.description, this.editForm.value.limit_date, this.editForm.value.is_paid).subscribe({
        next: (data) => {
          console.log(data)
          this.message = "Cliente atualizado!"
        },
        error: (error) => { console.log(error); this.errorMessage = "Erro ao atualizar o cliente!" },
        complete: () => { }
      })

    }
  }
}