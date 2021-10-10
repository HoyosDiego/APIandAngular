import { error } from '@angular/compiler/src/util';
import { Movie, MovieService } from './../../SERVICES/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  movie_id: any;
  dataset: any = [];
  datos: any = [];
  data = [];
  movie: Movie = {
    title: '',
    cast: '',
    crew: ''
  }
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private MovieService: MovieService,
    private activateRoute: ActivatedRoute) {

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
    this.movie_id = this.activateRoute.snapshot.params.id;

    console.log("id... ", this.movie_id)
    this.listarMovies(this.movie_id);
  }

  listarMovies(id_entrada: any) {
    let pasarData: any = [];
    let parsecast = '';
    let parsecrew = '';

    console.log("llega")
    this.MovieService.getMovieid(id_entrada).subscribe(
      res => {
        this.datos = res;
        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          this.registerform = this.formBuilder.group({
            title: [element.title]
          })
          if (element.cast != '[]') {
            this.registerCrew = this.formBuilder.group({
              id: [JSON.parse(element.crew)[0].id],
              job: [JSON.parse(element.crew)[0].job],
              name: [JSON.parse(element.crew)[0].name],
              gender: [JSON.parse(element.crew)[0].gender],
              credit_id: [JSON.parse(element.crew)[0].credit_id],
              department: [JSON.parse(element.crew)[0].department]
            })
          }
          if (element.crew != '[]') {
            this.registerCast = this.formBuilder.group({
              id: [JSON.parse(element.cast)[0].id],
              name: [JSON.parse(element.cast)[0].name],
              order: [JSON.parse(element.cast)[0].order],
              cast_id: [JSON.parse(element.cast)[0].cast_id],
              character: [JSON.parse(element.cast)[0].character],
              credit_id: [JSON.parse(element.cast)[0].credit_id]
            })
          }
          pasarData = {
            movie_id: element.movie_id,
            title: element.title,
            cast: parsecast,
            crew: parsecrew
          }
          this.dataset.push(pasarData)
          this.data = this.dataset;
        }
        console.log("datos... ", JSON.parse(this.datos[0].crew))

        //console.log("datos... ", this.dataset)

      },

      error => console.log("Error al consultar movies" + error)
    )

  }

  submit() {
    console.log("edicion ",this.registerform.value.title)
    this.movie = {
      title: this.registerform.value.title,
      cast: '[' + JSON.stringify(this.registerCast.value) + ']', //[this.registerCast.value],
      crew: '[' + JSON.stringify(this.registerCrew.value) + ']'//[this.registerCast.value]
    }
    this.MovieService.editMovie(this.movie_id, this.movie).subscribe(
      res => {
        console.log("modificacion exitosa! " + res)
      },
      error => console.log("error al actualizar " + error)
    )
    this.router.navigate(['/inicio'])
  }

}
