import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarplateService } from '../../services/carplate.service';
import { Carplate, CarplatePaginated } from '../../models/Carplate';

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
  items_per_page:String;
  total:Number;
  page: String;
  sortby:String;
  query:String = "";

  constructor(
    private carplateService: CarplateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carplateService.getCarplates(this.query).subscribe(res => {
      console.log(res);
      this.carplatePaginated = res;
      this.total = res.total;
      this.items_per_page = res.items_per_page.toString();
      this.page = res.page.toString();
      this.carplates = res.carplates;
      // pages number 
      let pagesTotal = Math.ceil(res.total/res.items_per_page); 
      this.pageNumbers = [...Array(pagesTotal).keys()].map(i => (i+1));
    });
  }

  deleteCarplate(carplate:Carplate) {
    this.carplates = this.carplates.filter(c => c._id !== carplate._id)
    this.carplateService.deleteCarplate(carplate).subscribe();
  }

  addCarplate(carplate:Carplate) {
    this.errorBlock = false; // hide previous error
    this.carplateService.addCarplate(carplate).subscribe(newCarplate => {
      this.carplates.push(newCarplate);
    },
    errorResponse => {
      console.log(errorResponse.error.error.message);
      this.errorBlock = true;
      this.errorText = errorResponse.error.error.message;
    });
  }
  
  generateQuery() {
    this.query = "?" + "page="+this.page || "";
    this.query += "&items_per_page=" + this.items_per_page || "";
    this.query += "&sortby=" + this.
    console.log("query: " + this.query);

    this.carplateService.getCarplates(this.query).subscribe(res => {
      console.log(res);
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
    console.log("itemOpt: " + itemOpt);
    this.items_per_page = itemOpt;
    this.page = "1";
    this.generateQuery();
  }
  
  navigatePage(pageNumber){
    this.page = pageNumber;
    this.generateQuery();
  }

  sortItems(option){
    console.log("sortby option: " + option);
    this.sortby = option;
    this.generateQuery();
  }
};
