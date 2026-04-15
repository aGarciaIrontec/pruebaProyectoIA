import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__section">
            <h3 class="footer__title">ESCULTOR</h3>
            <p class="footer__description">
              Arte y escultura contemporánea.<br />
              Dando forma a las ideas desde el corazón de la materia.
            </p>
          </div>

          <!-- Navigation -->
          <div class="footer__section">
            <h4 class="footer__subtitle">Navegación</h4>
            <ul class="footer__list">
              <li><a routerLink="/" class="footer__link">Inicio</a></li>
              <li><a routerLink="/biografia" class="footer__link">Biografía</a></li>
              <li><a routerLink="/trabajos" class="footer__link">Trabajos</a></li>
              <li><a routerLink="/contacto" class="footer__link">Contacto</a></li>
            </ul>
          </div>

          <!-- Social Media -->
          <div class="footer__section">
            <h4 class="footer__subtitle">Redes Sociales</h4>
            <ul class="footer__list">
              <li><a href="https://instagram.com" target="_blank" class="footer__link">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" class="footer__link">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; {{ currentYear }} Escultor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
