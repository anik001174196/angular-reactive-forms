import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';
import { isString } from 'util';


function ratingRange(min: number, max:number) : ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null  => {
       
        if (!!c.value   && (isNaN(c.value)||(c.value < min || c.value > max))) {
            return {'range': true};
        };
        return null;
    };
}

function emailMatcher(c: AbstractControl) : {[key: string]: boolean} | null {
    let emailControl = c.get('email');
    let confirmEmailControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmEmailControl.pristine) return null;
    if (emailControl.value === confirmEmailControl.value) return null;

    return {'match': true};
}



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
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            }, {validator: emailMatcher}),
            sendCatalog: true,
            phone:'',
            notification: 'email',
            rating: ['', ratingRange(1,5)]
        });
        
        
       
    }


    setNotificaiton(notifyVia: string) {
        const phoneControl = this.customerForm.get('phone');
        const emailControl = this.customerForm.get('email');
        if(notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
            emailControl.clearValidators();
        } else {
            phoneControl.clearValidators();
            emailControl.setValidators(Validators.required);
        }
        phoneControl.updateValueAndValidity();
        emailControl.updateValueAndValidity();
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
           sendCatalog: false,
           phone:''
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
