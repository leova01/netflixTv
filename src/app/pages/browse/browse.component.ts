import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieServiceService } from '../../shared/services/movie-service.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, fromEvent, map } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ImagePipe } from '../../shared/pipes/image.pipe';
import { DescriptionPipe } from '../../shared/pipes/description.pipe';
import Swiper from 'swiper';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    MovieCarouselComponent,
    HeaderComponent,
    CommonModule,
    RouterModule,
    ImagePipe,
    DescriptionPipe,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BrowseComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;

  MovieServiceService = inject(MovieServiceService);

  constructor(private router: Router) {}
 
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  SectionsArray: (string[] | IVideoContent[])[] = [];
  CatalogoArray:any[] = [];
  cursorActivoHorizontal: number = 2;
  cursorActivoVertical: number = 0;
  cuentaClicks = 0;
  currentSlide=0;
  navItems = [
    'All',
    'Movies',
    'TV Shows',
    'Now Playing',
    'Popular',
    'Top Rated',
    'Upcoming',
  ];
  onlyMovies: IVideoContent[] = [];
  
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
        },
      },
    });
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }

  actualizarAlturaCursorActivo(
    nuevoIndiceAltura: number,
    cursorAltura: NodeListOf<HTMLElement>
  ) {
    // Buscar el elemento en el DOM que tenga la clase 'activeH'
    const activeHElement = document.querySelector('.activeH');

    activeHElement?.classList.remove('activeH');

    // Asegurar que el índice esté dentro de los límites
    nuevoIndiceAltura = Math.max(
      0,
      Math.min(nuevoIndiceAltura, cursorAltura.length - 1)
    );

    // Eliminar la clase 'active' del enlace actual

    cursorAltura[this.cursorActivoVertical].classList.remove('activeV');

    // Agregar la clase 'active' al nuevo enlace
    cursorAltura[nuevoIndiceAltura].classList.add('activeV');

    // Actualizar el índice activo
    this.cursorActivoVertical = nuevoIndiceAltura;

    const activeVElement: any = document.querySelector('.activeV');

    //encontrar elemento activo horizontal

    if (
      activeVElement &&
      activeVElement.children[this.cursorActivoHorizontal]
    ) {
      const activeChild = activeVElement.children[
        this.cursorActivoHorizontal
      ] as HTMLElement;
      activeChild.classList.add('activeH'); // Agregar la clase deseada
    }

    this.cuentaClicks = 0;
    let disminuirFocus = document.querySelector('.creceporEnter');
    if(disminuirFocus){
      disminuirFocus!.classList.remove('creceporEnter');
    }
  }

  actualizarCursorActivo(nuevoIndice: number, cursor: NodeListOf<Element>) {
    // Asegurar que el índice esté dentro de los límites
    nuevoIndice = Math.max(0, Math.min(nuevoIndice, cursor.length - 1));

    // Eliminar la clase 'active' del enlace actual

    cursor[this.cursorActivoHorizontal].classList.remove('activeH');

    // Agregar la clase 'active' al nuevo enlace
    cursor[nuevoIndice].classList.add('activeH');

    // Actualizar el índice activo
    this.cursorActivoHorizontal = nuevoIndice;

    this.cuentaClicks = 0;

    let disminuirFocus = document.querySelector('.creceporEnter');
    if(disminuirFocus){
      disminuirFocus!.classList.remove('creceporEnter');
    }
    


  }

  public DOM: any = fromEvent(document.body, 'keydown').subscribe(
    (event: any) => {
      let cursorH = document.querySelectorAll('section.activeV a');
      let cursorV = document.querySelectorAll('section');

      if (event.key === 'ArrowRight') {
        this.actualizarCursorActivo(this.cursorActivoHorizontal + 1, cursorH);
        //movimiento de scroll
      } 
      
      else if (event.key === 'ArrowLeft') {
        this.actualizarCursorActivo(this.cursorActivoHorizontal - 1, cursorH);
      } 
      
      else if (event.key === 'Enter') {
        const activeHElement = document.querySelector('.activeH');
        console.log(activeHElement);
        this.cuentaClicks++;

        if (this.cuentaClicks == 1) {


          if (activeHElement) {

            if (activeHElement.classList.contains('seleccion')) {

              let movie = this.SectionsArray[this.cursorActivoVertical][this.cursorActivoHorizontal];
              
              if (typeof movie !== 'string') {
                this.setHoverMovie(movie);
                activeHElement.classList.add('creceporEnter');
                
              }
            }
            else if(activeHElement.classList.contains('seleccion2')){
              (cursorH[this.cursorActivoHorizontal] as HTMLElement).click();
            }
            
            
            else {
              console.log('NO VALIDO');
              this.cuentaClicks--;
            }
          }
        }  
        else if (this.cuentaClicks == 2) {
          (cursorH[this.cursorActivoHorizontal] as HTMLElement).click();
        }

       
      }
      
      else if (event.key === 'Backspace') {
        this.router.navigate(['/']);
      }
      
      else if (event.key === 'ArrowUp') {
        this.actualizarAlturaCursorActivo(
          this.cursorActivoVertical - 1,
          cursorV
        );
      }
      
      else if (event.key === 'ArrowDown') {
        this.actualizarAlturaCursorActivo(
          this.cursorActivoVertical + 1,
          cursorV
        );

        window.scrollBy(0, 200); // Desplazamiento de 200px hacia abajo

      }

      //console.log(cursorH)
      //console.log(cursorV)
       console.log(`this.cursorActivoHorizontal: ${this.cursorActivoHorizontal}`);
       console.log(`this.cursorActivoVertical: ${this.cursorActivoVertical}`);
    }
  );

  enterPress(event: any) {
    console.log(event);
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnInit(): void {
    let cursorV = document.querySelectorAll('section');
    this.actualizarAlturaCursorActivo(this.cursorActivoVertical - 1, cursorV);
    
    this.navItems.unshift('logo');
    this.SectionsArray = [...this.SectionsArray, this.navItems];


    this.MovieServiceService.getMovies().subscribe((data) => {
      this.movies = data.results;
      this.onlyMovies = this.movies;

      this.SectionsArray = [...this.SectionsArray, this.movies];


      const chunkSize = 4;
      const moviesChunks = [];
      for (let i = 0; i < this.movies.length; i += chunkSize) {
        const chunk = this.movies.slice(i, i + chunkSize);
        moviesChunks.push(chunk);
      }
      
      this.CatalogoArray = [...this.CatalogoArray, ...moviesChunks];

    });

    this.MovieServiceService.getTvShows().subscribe((data: any) => {

      this.tvShows = data.results;
      this.SectionsArray = [...this.SectionsArray, this.tvShows];

      const chunkSize = 4;
      const moviesChunks = [];
      for (let i = 0; i < this.tvShows.length; i += chunkSize) {
        const chunk = this.tvShows.slice(i, i + chunkSize);
        moviesChunks.push(chunk);
      }
      
      this.CatalogoArray = [...this.CatalogoArray, ...moviesChunks];

    });

    // this.MovieServiceService.getNowPlayingMovies().subscribe((data: any) => {

    //   this.nowPlayingMovies = data.results;
    //   this.SectionsArray = [...this.SectionsArray, this.nowPlayingMovies];
    // }
    // );

    // this.MovieServiceService.getPopularMovies().subscribe((data: any) => {

    //   this.popularMovies = data.results;
    //   this.SectionsArray = [...this.SectionsArray, this.popularMovies];
    // });

    // this.MovieServiceService.getTopRated().subscribe((data: any) => {

    //   this.topRatedMovies = data.results;
    //   this.SectionsArray = [...this.SectionsArray, this.topRatedMovies];
    // });

    // this.MovieServiceService.getUpcomingMovies().subscribe((data: any) => {

    //   this.upcomingMovies = data.results;
    //   this.SectionsArray = [...this.SectionsArray, this.upcomingMovies];
    // }
    // );
    
    

  }



  
}
