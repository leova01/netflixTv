import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { fromEvent } from 'rxjs';
import { env } from 'node:process';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  cursorActivo:number = 1;
  

   actualizarCursorActivo(nuevoIndice:number,cursor:NodeListOf<HTMLAnchorElement>) {

    // Asegurar que el índice esté dentro de los límites
    nuevoIndice = Math.max(0, Math.min(nuevoIndice, cursor.length - 1));
  
    // Eliminar la clase 'active' del enlace actual
    console.log(cursor);
    cursor[this.cursorActivo].classList.remove('active');
  
    // Agregar la clase 'active' al nuevo enlace
    cursor[nuevoIndice].classList.add('active');
  
    // Actualizar el índice activo
    this.cursorActivo = nuevoIndice;

  }


  public DOM: any = fromEvent(document.body, 'keydown').subscribe(
    (event: any) => {
        let cursor = document.querySelectorAll('a');
        //console.log(cursor);
      if (event.key === 'ArrowRight') {
        this.actualizarCursorActivo(this.cursorActivo + 1,cursor);
      } else if (event.key === 'ArrowLeft') {
        this.actualizarCursorActivo(this.cursorActivo - 1,cursor);
      } else if (event.key ===  'Enter'){
        cursor[this.cursorActivo].click();
      } else if(event.key ===  'Backspace'){
        this.router.navigate(['/']);
      }
      
      else if (event.key === 'ArrowUp'){
        
      } else if (event.key === 'ArrowDown'){
      
    }

  }
  );
}
