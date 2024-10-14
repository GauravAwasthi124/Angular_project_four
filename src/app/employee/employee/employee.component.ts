import { Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { ToggleserviceService } from 'src/app/services/toggle/toggleservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  employeeform!: FormGroup;
  errorMessage = signal('');
  message = signal('');
  displayedColumns: string[] = ['num','fname', 'userrole', 'email', 'edit', 'delete'];
  empdata: Array<{fname: string, lname: string, userrole: string, email: string, crtpassword: string, conpassword: string }> = [];
  editingIndex: number | null = null;
  constructor(private toggle:ToggleserviceService) {
    this.employeeform = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      userrole: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      newpassword: new FormControl('', Validators.required),
      conformpassword: new FormControl('', Validators.required)
    });
    merge(
      this.employeeform.get('email')!.statusChanges,
      this.employeeform.get('email')!.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    
  }
  ngOnInit(): void {
    this.loadData();  
  }

  // Check password
  checkpassword() {
    const newpassword = this.employeeform.get('newpassword')?.value;
    const conformpassword = this.employeeform.get('conformpassword')?.value;
    return newpassword === conformpassword;
  } 

  // Save form data to local storage
  saveData() {
    if (this.employeeform.valid) { 
      if (!this.checkpassword()) {
        this.message.set('Passwords do not match');
        return;
    }

      const employee = {
      fname: this.employeeform.get('fname')?.value,
      lname: this.employeeform.get('lname')?.value,
      email: this.employeeform.get('email')?.value,
      userrole: this.employeeform.get('userrole')?.value,
      crtpassword: this.employeeform.get('newpassword')?.value,
      conpassword: this.employeeform.get('conformpassword')?.value
    };

    if (this.editingIndex !== null) {
      this.empdata[this.editingIndex] = employee;
    } else {
      this.empdata.push(employee);
    }
      
    localStorage.setItem('employees', JSON.stringify(this.empdata));
    console.log('Data saved:', employee);
    this.showForm=false;
    // this.employeeform.reset();
    this.loadData();
    
    } else {
      this.message.set('Please Provide all fields');
        return;
  }
  }

  // Load data from local storage
  loadData() {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      this.empdata = JSON.parse(storedData);
    }
  }

  // Edit employee
  editEmployee(index: number) {
    const employee = this.empdata[index];
    this.employeeform.patchValue({
      fname: employee.fname,
      lname: employee.lname,
      userrole: employee.userrole,
      email: employee.email,
      newpassword: employee.conpassword,
      conformpassword: employee.crtpassword
    });
    this.editingIndex = index;
    this.showForm=true;
  }

  // Delete employee
  deleteEmployee(index: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empdata.splice(index, 1);
      localStorage.setItem('employees', JSON.stringify(this.empdata));
      console.log('Employee deleted at index:', index);
      this.loadData();
    }
  }

  // Update error message for email validation
  updateErrorMessage() {
    const emailControl = this.employeeform.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (emailControl?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }


  // Toggle password visibility
  hide = signal(true);
  hidetwo = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  clickEventSecond(event: MouseEvent) {
    this.hidetwo.set(!this.hidetwo());
    event.stopPropagation();
  }


  
  // Toggle form visibility
  showForm: boolean = false;
  toggleForm() {
    this.showForm = !this.showForm;
  }


  // Clear the form and reset error messages
    clearForm() {
      this.message.set('');      
      this.errorMessage.set('');
  }

}

