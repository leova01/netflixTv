import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css';
import { IVideoContent } from '../../models/video-content.interface';
import { CommonModule } from '@angular/common';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule,DescriptionPipe,ImagePipe,RouterModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css',
  animations:[
    trigger('fade',[
      transition('void => *',[
        style({opacity:0}),
        animate(300,style({opacity:1}))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit , AfterViewInit{

@Input() VideoContents: IVideoContent[] = [];
@Input() title!: string;
@ViewChild('swiperContainer') swiperContainer!: ElementRef
selectedContent: string | null = null;

constructor(){}


  ngAfterViewInit(): void {
    this.initSwiper();
  }

ngOnInit(): void {
    
}

private initSwiper() {
  return new Swiper(this.swiperContainer.nativeElement, {
    slidesPerView: 3,
    slidesPerGroup: 2,
    centeredSlides: false,
    loop: true,
    
    breakpoints: {
      600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 5,
        centeredSlides: false,
      },
      900: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1500: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1800: {
        slidesPerView: 5,
        slidesPerGroup: 4,
        spaceBetween: 5,
        centeredSlides: false,
      }
    },
  })
}


setHoverMovie(movie: IVideoContent) {
  this.selectedContent = movie.title ?? movie.name;
}

clearHoverMovie() {
  this.selectedContent = null;
}

}
