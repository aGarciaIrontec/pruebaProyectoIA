import { Component, OnInit, inject, signal } from '@angular/core';
import { HomeService } from '@services/home.service';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [],
  template: `
    <div class="bio-page">

      <!-- HERO ─────────────────────────────────── -->
      <section class="bio-hero">
        <div class="bio-hero__inner">

          <div class="bio-hero__image-col">
            @if (artistImage()) {
              <img class="bio-hero__img" [src]="artistImage()" alt="Retrato de la escultora" />
            } @else {
              <div class="bio-hero__img-placeholder"></div>
            }
          </div>

          <div class="bio-hero__text-col">
            <p class="bio-hero__eyebrow">Escultor · País Vasco</p>
            <h1 class="bio-hero__name">Jesús<br>Lizaso</h1>
            <div class="bio-hero__divider"></div>
            <p class="bio-hero__lead">
              La piedra no es el fin, sino el comienzo del diálogo.
              A través de formas puras y tensiones orgánicas, Jesús Lizaso
              construye un lenguaje escultórico que oscila entre la geometría
              y la naturaleza, entre la fuerza y la delicadeza.
            </p>
            <div class="bio-hero__stats">
              <div class="bio-stat">
                <span class="bio-stat__num">+30</span>
                <span class="bio-stat__label">años de trayectoria</span>
              </div>
              <div class="bio-stat">
                <span class="bio-stat__num">50+</span>
                <span class="bio-stat__label">exposiciones</span>
              </div>
              <div class="bio-stat">
                <span class="bio-stat__num">10+</span>
                <span class="bio-stat__label">premios y reconocimientos</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- STATEMENT ──────────────────────────────── -->
      <section class="bio-statement">
        <div class="bio-statement__inner">
          <blockquote class="bio-statement__quote">
            "La escultura es el arte de quitar.<br>
            Cada golpe revela lo que siempre<br>
            estuvo dentro de la piedra."
          </blockquote>
        </div>
      </section>

      <!-- BIO TEXTO ─────────────────────────────── -->
      <section class="bio-text">
        <div class="bio-text__inner">
          <div class="bio-text__col bio-text__col--label">
            <span class="bio-label">Trayectoria</span>
          </div>
          <div class="bio-text__col bio-text__col--body">
            <p>
              Jesús Lizaso nació en el País Vasco, tierra de tradición artesanal profunda
              e identidad cultural arraigada. Desde joven encontró en la escultura el
              medio más honesto para expresar su visión del mundo: una visión marcada
              por la tensión entre la materia bruta y la forma soñada.
            </p>
            <p>
              Formado en las disciplinas del cincel y la piedra, su obra evolucionó
              desde el figurativismo inicial hacia un lenguaje propio que combina
              abstracción y referencia orgánica. El bronce, el acero corten y la piedra
              caliza son los interlocutores con los que Lizaso dialoga en cada pieza.
            </p>
            <p>
              Sus esculturas de gran formato, presentes en espacios públicos del País Vasco
              y otras regiones, demuestran una capacidad excepcional para integrar la obra
              en el paisaje, como si siempre hubiera pertenecido a ese lugar. Cada instalación
              es una conversación silenciosa entre el arte y el territorio.
            </p>
          </div>
        </div>
      </section>

      <!-- TIMELINE ─────────────────────────────── -->
      <section class="bio-timeline">
        <div class="bio-timeline__inner">
          <div class="bio-timeline__header">
            <span class="bio-label">Hitos</span>
            <h2 class="bio-timeline__title">Una vida<br>en la piedra</h2>
          </div>
          <div class="timeline">
            @for (item of timelineItems; track item.year; let last = $last) {
              <div class="timeline__item" [class.timeline__item--last]="last">
                <div class="timeline__year-col">
                  <span class="timeline__year">{{ item.year }}</span>
                </div>
                <div class="timeline__spine">
                  <div class="timeline__dot"></div>
                  @if (!last) { <div class="timeline__line"></div> }
                </div>
                <div class="timeline__body">
                  <h3 class="timeline__title">{{ item.title }}</h3>
                  <p class="timeline__desc">{{ item.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- PILARES ──────────────────────────────── -->
      <section class="bio-pillars">
        <div class="bio-pillars__inner">
          <div class="bio-pillars__header">
            <span class="bio-label bio-label--light">El estudio</span>
            <h2 class="bio-pillars__title">Lo que define su obra</h2>
          </div>
          <div class="bio-pillars__grid">
            <div class="pillar">
              <div class="pillar__num">01</div>
              <h3 class="pillar__title">Forma y territorio</h3>
              <p class="pillar__desc">
                Sus esculturas no se imponen al paisaje: lo interpretan.
                Cada obra nace del análisis del entorno donde va a vivir,
                integrándose en él como si siempre hubiera estado.
              </p>
            </div>
            <div class="pillar">
              <div class="pillar__num">02</div>
              <h3 class="pillar__title">Materia y memoria</h3>
              <p class="pillar__desc">
                La piedra guarda el tiempo. El bronce guarda la transformación.
                Lizaso elige sus materiales como quien elige las palabras de un poema:
                con precisión y con conciencia del peso que cargan.
              </p>
            </div>
            <div class="pillar">
              <div class="pillar__num">03</div>
              <h3 class="pillar__title">Escala y presencia</h3>
              <p class="pillar__desc">
                De la pieza de taller a la escultura monumental, su obra mantiene
                la misma tensión interna. El tamaño no define la escala: la define
                la capacidad de interpelar al que mira.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  artistImage = signal<string | null>(null);

  timelineItems = [
    { year: '1990s', title: 'Formación artística', description: 'Estudios de Bellas Artes y especialización en escultura. Los primeros contactos con la piedra y el bronce definen su vocación.' },
    { year: '2000', title: 'Primeras exposiciones', description: 'Muestra colectiva en el País Vasco. La crítica reconoce una voz propia: síntesis entre la abstracción y la forma natural.' },
    { year: '2005', title: 'Obra en espacio público', description: 'Primeras instalaciones de gran formato integradas en el paisaje urbano y natural del País Vasco.' },
    { year: '2010', title: 'Proyección nacional', description: 'Exposiciones individuales en galerías españolas. Su obra alcanza colecciones privadas e institucionales.' },
    { year: '2015', title: 'Escultura monumental', description: 'Serie de piezas de gran escala en acero corten y bronce patinado. Diálogo entre industria y naturaleza.' },
    { year: '2020', title: 'Premio Euskadi de Escultura', description: 'Reconocimiento de la Comunidad Autónoma del País Vasco a una trayectoria consistente y de referencia.' },
    { year: 'Hoy', title: 'Obra en curso', description: 'Nuevas series en piedra caliza y bronce, presentes en ferias y exposiciones internacionales de arte contemporáneo.' },
  ];

  ngOnInit(): void {
    this.homeService.get().subscribe({
      next: (res) => {
        if (res.data?.artist_image) {
          this.artistImage.set(this.homeService.getImageUrl(res.data.artist_image.url));
        }
      }
    });
  }
}
