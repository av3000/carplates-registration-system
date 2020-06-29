import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CarplateService } from '../../services/carplate.service';

import { Carplate } from 'src/app/models/Carplate';

@Component({
  selector: 'app-carplate-item',
  templateUrl: './carplate-item.component.html',
  styleUrls: ['./carplate-item.component.css']
})
export class CarplateItemComponent implements OnInit {
  @Input() carplate: Carplate;
  @Output() deleteCarplate: EventEmitter<Carplate> = new EventEmitter();
  constructor(private carplateService:CarplateService) { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      carplate: true
    };

    return classes;
  }

  onDelete(carplate) {
    this.deleteCarplate.emit(carplate);
  };

  onEdit(carplate) {
    console.log("onEdit not implemented yet");
    console.log(carplate);
  };

}
