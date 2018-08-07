import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent  implements OnInit{
    
    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
          //  lastName:{value:'n/a', disabled: true},
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            sendCatalog: true
        });
        
        
       
    }
     
    save() {
        console.log(this.customerForm);
     
     //   console.log('Saved: ' + JSON.stringify(customerForm.value));
    }

    populateTestData() : void{
       this.customerForm.setValue({
           firstName: 'Anik',
           lastName: 'Saha',
           email: 'anik.sahaa@fundserv.com',
           sendCatalog: false
       });
    }

    populateTestDataPatChValue() : void{ 
        this.customerForm.patchValue({
            firstName: 'Anik',
            lastName: 'Saha',
            
            sendCatalog: false
        });
     }
 }
