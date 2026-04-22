import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar" [class.scrolled]="scrolled()">
      <nav class="navbar__inner">

        <!-- Desktop links -->
        <ul class="navbar__links">
          <li>
            <a routerLink="/" routerLinkActive="navbar__link--active"
               [routerLinkActiveOptions]="{exact: true}" class="navbar__link">Inicio</a>
          </li>
          <li>
            <a routerLink="/biografia" routerLinkActive="navbar__link--active"
               class="navbar__link">Biografía</a>
          </li>
          <li>
            <a routerLink="/trabajos" routerLinkActive="navbar__link--active"
               class="navbar__link">Trabajos</a>
          </li>
          <li>
            <a routerLink="/prensa" routerLinkActive="navbar__link--active"
               class="navbar__link">Prensa</a>
          </li>
          <li>
            <a routerLink="/contacto" routerLinkActive="navbar__link--active"
               class="navbar__link">Contacto</a>
          </li>
        </ul>

        <!-- Mobile hamburger -->
        <button class="navbar__burger" (click)="mobileOpen.update(v => !v)" aria-label="Menú">
          <span [class.open]="mobileOpen()"></span>
          <span [class.open]="mobileOpen()"></span>
          <span [class.open]="mobileOpen()"></span>
        </button>
      </nav>

      <!-- Mobile menu -->
      <div class="navbar__mobile" [class.navbar__mobile--open]="mobileOpen()">
        <a routerLink="/" routerLinkActive="navbar__link--active"
           [routerLinkActiveOptions]="{exact: true}" class="navbar__mobile-link"
           (click)="mobileOpen.set(false)">Inicio</a>
        <a routerLink="/biografia" routerLinkActive="navbar__link--active"
           class="navbar__mobile-link" (click)="mobileOpen.set(false)">Biografía</a>
          <a routerLink="/trabajos" routerLinkActive="navbar__link--active"
            class="navbar__mobile-link" (click)="mobileOpen.set(false)">Trabajos</a>
          <a routerLink="/prensa" routerLinkActive="navbar__link--active"
            class="navbar__mobile-link" (click)="mobileOpen.set(false)">Prensa</a>
          <a routerLink="/contacto" routerLinkActive="navbar__link--active"
            class="navbar__mobile-link" (click)="mobileOpen.set(false)">Contacto</a>
      </div>
    </header>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }
}

