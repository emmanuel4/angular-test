import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form!: FormGroup;
  id!:string | null;
  user: any = {
    name: '',
    lastname: '',
    age: 0,
    email: '',
    description: ''
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.id != null ? this.getUser(this.id) : null;
  }

  ngOnInit(): void {

  }

  getUser(id: string) {
    const promise = this.userService.getUser(id!);
    promise.then((result) => {
      if (result.exists()) {
        const {name, lastname, age, email, description} = result.data();
        this.form.patchValue({
          name,
          lastname,
          age,
          email,
          description
        })
      } else {
        this.openSnackBar('An error ocurred, try again later')
      }
    }).catch((error) => {
      console.error(error['code'])
      this.openSnackBar('An error ocurred, try again later')
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.email, Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  save(event: Event) {
    event.preventDefault();
    let data:User = {
      id: this.id != null ? this.id : Math.floor(Math.random())+this.form.value.name.replace(/\s/g, ''),
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      age: this.form.value.age,
      email: this.form.value.email,
      description: this.form.value.description
    }
    if (this.id !=null) {
      this.userService.updateUser(data)
      .then(() => {
        this.openSnackBar('User updated.')
        this.form.reset()
      }).catch((error) => {
        console.error(error['code']);
        this.openSnackBar('An error ocurred, try again later')
      })
    } else {
      this.userService.addUser(data)
      .then(() => {
        this.openSnackBar('User created.')
        this.form.reset()
      }).catch((error) => {
        console.error(error['code']);
        this.openSnackBar('An error ocurred, try again later')
      })
    }
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }
}
