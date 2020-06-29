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
  @Output() editCarplate: EventEmitter<Carplate> = new EventEmitter();
  @Output() removeCarplate: EventEmitter<Carplate> = new EventEmitter();
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
    this.removeCarplate.emit(carplate);
  };

  onEdit(carplate) {
    this.editCarplate.emit(carplate);
  };

}
