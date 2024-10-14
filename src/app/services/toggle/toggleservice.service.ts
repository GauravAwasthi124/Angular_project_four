import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleserviceService {

  constructor() { }
  showForm: boolean = false;
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
