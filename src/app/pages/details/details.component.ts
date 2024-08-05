import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieServiceService } from '../../shared/services/movie-service.service';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from '../../shared/pipes/image.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports:[HeaderComponent,ImagePipe,CommonModule ],
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  MovieServiceService=inject(MovieServiceService);
  movie_id: any;
  
  constructor(
    private _route:ActivatedRoute
  ) { 

    this._route.params.subscribe(params => {

      this.movie_id = params['id'];
    });
  }


  Details: any;

  ngOnInit(): void {

  this.MovieServiceService.getDetails(this.movie_id).subscribe((data)=>{

    this.Details = data;
    console.log(this.Details);
  });

  }



}
