import { Movie, MovieService } from './../../SERVICES/movie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  movie: Movie = {
    title: '',
    cast: '',
    crew: ''
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private MovieService: MovieService) {

  }
  registerCast = this.formBuilder.group({
    id: [''],
    name: [''],
    order: [''],
    cast_id: [''],
    character: [''],
    credit_id: ['']
  })
  registerCrew = this.formBuilder.group({
    id: [''],
    job: [''],
    name: [''],
    gender: [''],
    credit_id: [''],
    department: ['']
  })
  registerform = this.formBuilder.group({
    title: ['']
  })

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
  }

  submit() {
    this.movie = {
      title: this.registerform.value.title,
      cast: '[' + JSON.stringify(this.registerCast.value) + ']', //[this.registerCast.value],
      crew: '[' + JSON.stringify(this.registerCrew.value) + ']'//[this.registerCast.value]
    }
    this.MovieService.addMovie(this.movie).subscribe();
    this.router.navigate(['/inicio'])
  }

}
