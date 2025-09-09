import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from '../../../core/services/userService/user-services.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formModel!: FormGroup;
  myform!: FormGroup;
  @Input() isLogin: boolean = false
  @Output() isLoginChange = new EventEmitter<Boolean>()

  isSignup = false
  all_data: any = [];
  showPassword: boolean = false;
  showPassworda: boolean = false;
  showConfirmPassword: boolean = false;
  check:boolean=false;
  check1:boolean=false;
loading = false;
signupLoading = false;

  constructor(private FB_: FormBuilder, private us_: UserServicesService, private route: Router) {

    this.formModel = this.FB_.group({
      email: [null, Validators.required],
      password: [null, Validators.required]  
    })


    this.myform = this.FB_.group({
      nfa: [null, Validators.required],
      name: [null, Validators.required,],
      last_name: [null, Validators.required,],
      email: [null, Validators.required],
      pass: [null, Validators.required,],
      confirm: [null, Validators.required,],
      // mobile: [null,Validators.required,Validators.pattern('^{0-9}{10}$')],

    })
  }


  login() {

    const formData = new FormData();
  formData.append('password', this.formModel.get('password')?.value);
  formData.append('email', this.formModel.get('email')?.value);
  formData.append('role', "user"); // For a file input

   this.check=false;

  if(!this.formModel.get('password').value &&  !this.formModel.get('email').value){
     this.loading = true;
     setTimeout(() => {
       this.loading = false;
       //  alert("check true");
      }, 500);
      this.check=true;
     
      return;
  }
  this.loading = true;
setTimeout(() => {
  this.loading = false;
  // proceed with login logic
}, 2000);
    this.us_.userLogin(formData).subscribe({next:(res: any) => {
      this.us_.login(res.access_token,res.user.email,res.user.name,res.user.id);

      this.closeLogin();
      this.route.navigateByUrl('/home');},error: (err:any)=>{
      this.check1=true;
      }

    })

  }


  passwordMismatch: boolean = false;
  passwordTooShort:boolean=false;
  
  signUp() {
     this.signupLoading = true;

     setTimeout(() => {
    this.signupLoading = false;
  }, 2000);
    const formValue = this.myform.value; // use the correct form group

    const name = `${formValue.nfa} ${formValue.name} ${formValue.last_name}`;

    this.all_data = {
      name: name,
      email: formValue.email,
      password: formValue.pass,
      password_confirmation: formValue.confirm,
     
    };

 
// formValue.confirm === formValue.pass && formValue.pass.length === 6
 
const f = formValue.pass || '';  // Ensure it's a string

this.passwordMismatch = f !== formValue.confirm;
this.passwordTooShort = f.length !== 6;
    
    if ( !this.passwordMismatch && !this.passwordTooShort) {
      // this.passwordMismatch = false;

      console.log("This is the data:", this.all_data);

      this.us_.userRegister(this.all_data).subscribe((res: any) => {

        this.us_.login(res.access_token,res.user.email,res.user.name,res.user.id);
        
        this.closeLogin();

        this.route.navigateByUrl('/home');

      });
    } else {
     console.log("6 charactor",this.passwordTooShort);
     console.log("confire",this.passwordMismatch)
    }
  }



  ngOnInit(): void {

  }
  closeLogin() {
    this.isLoginChange.emit(false)
  }


  onsubmit() {

  }

  
          randorForgot(){
            console.log("check",this.isSignup);
            this.isLoginChange.emit(false)
          }

}
