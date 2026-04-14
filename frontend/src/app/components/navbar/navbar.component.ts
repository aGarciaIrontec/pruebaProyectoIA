import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar" [class.scrolled]="scrolled()">
      <nav class="navbar__inner">
        <a routerLink="/" class="logo">ESCULTOR</a>
        <div class="nav-links">
          <div class="nav-drawer" [style.--drawer-open]="isDropdownOpen() ? '1' : '0'">
            <button class="nav-drawer__btn" (click)="toggleDropdown($event)" aria-label="Menú">
              <div class="hamburger" [class.is-active]="isDropdownOpen()">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            
            <div class="nav-drawer__overlay" 
                 [class.visible]="isDropdownOpen()" 
                 (click)="isDropdownOpen.set(false)"></div>
            
            <div class="nav-drawer__content" [class.open]="isDropdownOpen()">
              <button class="nav-drawer__close" (click)="isDropdownOpen.set(false)">&times;</button>
              <nav class="nav-drawer__nav">
                <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}"
                   class="nav-drawer__link" (click)="isDropdownOpen.set(false)">Inicio</a>
                <a routerLink="/trabajos" routerLinkActive="active-link"
                   class="nav-drawer__link" (click)="isDropdownOpen.set(false)">Trabajos</a>
                <a routerLink="/contacto" routerLinkActive="active-link"
                   class="nav-drawer__link" (click)="isDropdownOpen.set(false)">Contacto</a>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  scrolled = signal(false);
  isDropdownOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isDropdownOpen() && !target.closest('.nav-drawer__content')) {
      this.isDropdownOpen.set(false);
    }
  }
}
