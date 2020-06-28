import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-carplate',
  templateUrl: './form-carplate.component.html',
  styleUrls: ['./form-carplate.component.css']
})
export class FormCarplateComponent implements OnInit {
  @Output() addCarplate: EventEmitter<any> = new EventEmitter();

  plate: string;
  name: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const carplate = {
      plate: this.plate,
      name: this.name
    };

    this.addCarplate.emit(carplate);
  }
};
