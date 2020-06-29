import { Component, OnInit } from '@angular/core';
import { CarplateService } from '../../services/carplate.service';
import { Carplate, CarplatePaginated } from '../../models/Carplate';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-carplates',
  templateUrl: './carplates.component.html',
  styleUrls: ['./carplates.component.css']
})
export class CarplatesComponent implements OnInit {

  carplatePaginated: CarplatePaginated;
  carplates: Carplate[];

  errorBlock: Boolean = false;
  errorText: String = "";

  pageNumbers: Array<number>;
  items: Array<number> = [5, 10, 15]; // per page options
  sortOptions: Array<String> = ["name", "plate"];
  orderOptions: Array<String> = ["desc", "asc"];
  items_per_page:String;
  total:Number;
  page: String = "1";
  sortby:String = "name";
  orderby:String = "desc";
  filter:String = "";
  filterby:String = "name";
  query:String = "";

  DELETE_MODAL_TYPE:String = "Delete";
  CREATE_MODAL_TYPE:String = "Create";
  EDIT_MODAL_TYPE:String   = "Edit";

  constructor(
    private carplateService: CarplateService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carplateService.getCarplates(this.query).subscribe(res => {
      this.carplatePaginated = res;
      this.total = res.total;
      this.items_per_page = res.items_per_page.toString();
      this.page = res.page.toString();
      this.carplates = res.carplates;

      // pages number generating 
      let pagesTotal = Math.ceil(res.total/res.items_per_page); 
      this.pageNumbers = [...Array(pagesTotal).keys()].map(i => (i+1));
    });
  }

  // CUD methods
  deleteCarplate(val) {
    this.carplates = this.carplates.filter(c => c._id !== val._id)
    this.carplateService.deleteCarplate(val).subscribe();
  }

  addCarplate(val) {
    this.errorBlock = false; // hide previous error
    this.carplateService.addCarplate(val).subscribe(newCarplate => {
      this.carplates.push(newCarplate);
    },
    errorResponse => {
      this.errorBlock = true;
      this.errorText = errorResponse.error.error.message;
    });
  }

  updateCarplate(val) {
    this.carplates.find(c => {
      if(c._id === val._id){
        if(val.plate !== c.plate || val.name !== c.name){
          this.carplateService.updateCarplate(val).subscribe(() => {
              c.plate = val.plate;
              c.name = val.name;
          },
            errorResponse => {
            this.errorBlock = true;
            this.errorText = errorResponse.error.error.message;
          });
        }
      }
    });
  }

  // Modals logic
  removeCarplate({plate, name, _id}:Carplate) {
    let modalType = this.DELETE_MODAL_TYPE;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      plate, name, _id, modalType
    };

    const dialogRef = this.dialog.open(ModalComponent,
        dialogConfig);

    dialogRef.afterClosed().subscribe(
        val => {
          if(val && modalType === this.DELETE_MODAL_TYPE) {
            this.deleteCarplate(val);
          }
        }
    );
  }

  editCarplate({plate, name, _id}:Carplate) {
    let modalType = this.EDIT_MODAL_TYPE;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      plate, name, _id, modalType
    };

    const dialogRef = this.dialog.open(ModalComponent,
        dialogConfig);

    dialogRef.afterClosed().subscribe(
        val => {
          if(val && modalType === this.EDIT_MODAL_TYPE) {
            this.updateCarplate(val);
          }
        }
    );
  }

  createCarplate() {
    let modalType = this.CREATE_MODAL_TYPE;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      modalType
    };

    const dialogRef = this.dialog.open(ModalComponent,
        dialogConfig);

    dialogRef.afterClosed().subscribe(
        val => {
          if(val && modalType === this.CREATE_MODAL_TYPE){
            // create
            this.addCarplate(val);
          }
        }
    );
  }
  
  generateQuery() {
    this.query = "?" + "page="+this.page || "";
    this.query += "&items_per_page=" + this.items_per_page || "";
    this.query += "&sortby=" + this.sortby || "";
    this.query += "&orderby=" + this.orderby || "";
    this.query += "&filter=" + this.filter || "";
    this.query += "&filterby=" + this.filterby || "";

    this.carplateService.getCarplates(this.query).subscribe(res => {
      this.carplatePaginated = res;
      this.total = res.total;
      this.items_per_page = res.items_per_page.toString();
      this.page = res.page.toString();
      this.carplates = res.carplates;

      // pages number 
      let pagesTotal = Math.ceil(res.total/res.items_per_page); 
      this.pageNumbers = [...Array(pagesTotal).keys()].map(i => (i+1));
    });

    this.errorBlock = false; // hide previous error
  }

  filterItems(itemOpt){
    this.items_per_page = itemOpt;
    this.page = "1";
    this.generateQuery();
  }
  
  navigatePage(pageNumber){
    this.page = pageNumber;
    this.generateQuery();
  }

  sortItems(sortOption){
    this.sortby = sortOption;
    this.generateQuery();
  }

  orderItems(orderOption){
    this.orderby = orderOption;
    this.generateQuery();
  }

  searchKeyword(keyword) {
    this.filter = keyword;
    this.generateQuery();
  }
};
