import { Router } from '@angular/router';
import { MovieService } from '../../SERVICES/movie.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as Handsontable from 'handsontable';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-inicio',
  template: `
  <div id="eliminar">
    <button (click)="eliminar()" [disabled]=btnEliminarDisabled  class="btn btn-danger" id="btnEliminar">Eliminar</button>&nbsp;
    <button (click)="modificar()" [disabled]=btnModificarDisabled type="button" class="btn btn-success" id="btnModificar">Modificar</button>
  </div>
  <br>
  <div (click)="saved($event)">
    <hot-table
      [data]="data"
      [colHeaders]="true"
      [rowHeaders]="true"
      height="auto"
      width="auto"
      [columnSorting]= "true"
      [manualColumnMove]="true"
      [manualColumnResize]="true"
      licenseKey="non-commercial-and-evaluation"
      [hotId]='id'
      >
        <hot-column data="movie_id" [readOnly]="true" title="Movie Id"></hot-column>
        <hot-column data="title" title="Title"></hot-column>
        <hot-column data="cast" title="Cast" width='179' ></hot-column>
        <hot-column data="crew" title="crew"></hot-column>/>
        <hot-column type="checkbox" title="check" checkedTemplate="yes"></hot-column>/>
      </hot-table>
  </div>
  <br>
  `,
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  dataset: any = [];
  datos: any = [];
  data = [];
  id = "myTable";



  //variable disabled
  btnEliminarDisabled = true;
  btnModificarDisabled = true;

  constructor(private MovieService: MovieService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.listarMovies()

  }

  listarMovies() {
    let pasarData: any = [];
    let parsecast = '';
    let parsecrew = '';
    this.MovieService.getMovie().subscribe(
      res => {
        this.datos = res;
        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.cast != '[]') {
            parsecast = JSON.parse(element.cast)[0].name
          }
          if (element.crew != '[]') {
            parsecrew = JSON.parse(element.crew)[0].name
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
        // console.log("datos... ", JSON.parse(this.datos[0].crew))

        //console.log("datos... ", this.dataset)

      },

      error => console.log("Error al consultar movies" + error)
    )

  }

  //delete 
  eliminar() {
    if (window.confirm("Do you really want to Delete?")) {

      this.MovieService.deleteMovie(402515).subscribe(
        res => {
          console.log("Movie eliminada");
          this.listarMovies();
          this.router.navigate(['/inicio'])
          alert("Record deleted")
        },
        error => console.log("error al eliminar ", error)

      );
    } else {
      alert("Record not deleted , Thanks for Visiting!");
    }



    console.log("eliminar")
  }

  modificar() {
    this.btnEliminarDisabled = true;
    this.btnModificarDisabled = true;
    this.router.navigate(['/edit/433715']);
  }

  saved(e: any) {
    this.btnEliminarDisabled = false;
    this.btnModificarDisabled = false;

    let idRequerido = document.querySelector(".htDimmed");
    //console.log("idRequerido ", idRequerido);

    const el = this.renderer.selectRootElement('.htDimmed');
    const p = this.renderer.setAttribute(el, 'example', '');
    console.log("e ", e);



  }




}
