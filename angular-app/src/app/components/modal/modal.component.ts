import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
// import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  modalTitle: String;
  modalType: String;
  plate: String;
  name: String;
  confirmBtnText: String;

  DELETE_MODAL_TYPE:String = "Delete";
  CREATE_MODAL_TYPE:String = "Create";
  EDIT_MODAL_TYPE:String   = "Edit";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) {
      _id,
      plate,
      name,
      modalType
    }) 
    {
      if(modalType === this.EDIT_MODAL_TYPE){
        this.modalTitle = "Edit a Carplate.";
        this.confirmBtnText = "Update";
        this.form = fb.group({
          _id: _id,
          plate: [plate, Validators.required],
          name: [name,Validators.required]
        });
      }
      else if(modalType === this.DELETE_MODAL_TYPE){
        this.modalTitle = "Delete a Carplate?";
        this.confirmBtnText = "Delete";
        this.plate = plate;
        this.name = name;
        this.form = fb.group({
          _id: _id,
          plate: [plate, Validators.required],
          name: [name,Validators.required]
        });
      }
      else if(modalType === this.CREATE_MODAL_TYPE){
        this.modalTitle = "Create a new Carplate.";
        this.confirmBtnText = "Create";
        this.form = fb.group({
          plate: [plate, Validators.required],
          name: [name,Validators.required]
        });
      }

      this.modalType = modalType;
    }

  ngOnInit() {
  }

  save() {
    if( 
        this.modalType !== this.DELETE_MODAL_TYPE
        &&
        (this.form.value.name && this.form.value.name.length >= 3 && this.form.value.name.length <= 30) 
          &&
        (this.form.value.name && this.form.value.plate.length === 6)
    )
    {
      this.dialogRef.close(this.form.value);
    }
    else if(this.modalType === this.DELETE_MODAL_TYPE) 
    {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
      this.dialogRef.close();
  }

}
