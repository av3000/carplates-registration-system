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
  errorBlock: boolean;
  errorText: string;
  currentPage: string;
  pageNumbers: Array<number>;

  constructor(
    private carplateService: CarplateService,
    private route: ActivatedRoute
  ) { }

  // items_per_page: number;
  // total: number;
  // page: number;
  // carplates: Array<Carplate>;

  ngOnInit() {
    this.carplateService.getCarplates().subscribe(res => {
      // console.log(res);
      this.carplatePaginated = res;
      this.carplates = res.carplates;
      // pages number 
      let pagesTotal = Math.ceil(res.total/res.items_per_page); 
      this.pageNumbers = [...Array(pagesTotal).keys()];
    });
  }

  deleteCarplate(carplate:Carplate) {
    console.log("delete me");
    this.carplates = this.carplates.filter(c => c._id !== carplate._id)
    this.carplateService.deleteCarplate(carplate).subscribe();
  }

  addCarplate(carplate:Carplate) {
    console.log("add me");
    this.carplateService.addCarplate(carplate).subscribe(newCarplate => {
      this.carplates.push(newCarplate);
    },
    errorResponse => {
      console.log(errorResponse.error.error.message);
      this.errorBlock = true;
      this.errorText = errorResponse.error.error.message;
    }
    );
  }

};
