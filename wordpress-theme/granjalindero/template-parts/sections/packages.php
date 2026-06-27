<?php
$is_es = gl_lang() === 'es';
$tag      = gl_field('pkg_tag')      ?: ($is_es ? 'Paquetes y Precios'   : 'Packages & Pricing');
$title    = gl_field('pkg_title')    ?: ($is_es ? 'Elige tu plan perfecto' : 'Choose your perfect plan');
$subtitle = gl_field('pkg_subtitle') ?: ($is_es
    ? 'Desde una mañana hasta un fin de semana completo — tenemos el paquete ideal para ti.'
    : 'From a morning visit to a full weekend — we have the ideal package for you.');
$per_person = $is_es ? 'por persona' : 'per person';
$includes   = $is_es ? 'Incluye'     : 'Includes';
$cta_book   = $is_es ? 'Reservar este paquete' : 'Book this package';
$note       = gl_field('pkg_note') ?: ($is_es
    ? 'Precios en Soles peruanos (S/). Consulta disponibilidad por WhatsApp.'
    : 'Prices in Peruvian Soles (S/). Ask about availability on WhatsApp.');

$img = get_template_directory_uri() . '/assets/images/';
$pkg_photos = [
    [$img.'animales_alpacas.jpg',         $img.'restaurant_juane_plato.jpg',       $img.'actividades_cosecha_huerto.jpg'],
    [$img.'paisaje_sendero_montana.jpg',   $img.'restaurant_pachamanca.jpg',        $img.'animales_cuyes.jpg'],
    [$img.'hospedaje_cabana_bosque.jpg',   $img.'experiencias_fogon_noche.jpg',     $img.'hospedaje_habitacion_doble.jpg'],
    [$img.'experiencias_jardin_gazebo.jpg',$img.'experiencias_cuyes_granja.jpg',    $img.'hospedaje_edificio_principal.jpg'],
];

$pkg_prices = [
    get_option('gl_pkg_1_price', 'S/40'),
    get_option('gl_pkg_2_price', 'S/55'),
    get_option('gl_pkg_3_price', 'S/200'),
    get_option('gl_pkg_4_price', 'S/310'),
];

$packages = gl_field('pkg_items') ?: [];
if (empty($packages)) {
    $packages = $is_es ? [
        [
            'name'=>'Half-Day', 'price'=>$pkg_prices[0], 'highlight'=>false,
            'tagline'=>'La experiencia perfecta para una mañana', 'min_people'=>5,
            'includes'=>["Tour Animal Friends o Circuito Ecológico","Interacción con animales de la granja","Degustación de productos lácteos","Almuerzo: plato típico de la región"],
        ],
        [
            'name'=>'Full-Day', 'price'=>$pkg_prices[1], 'highlight'=>true,
            'tagline'=>'El día completo en la granja', 'min_people'=>5,
            'includes'=>["Tour Animal Friends","Tour Circuito Ecológico","Interacción con animales + degustación láctea","Almuerzo: plato típico de la región","Llévate una plantita del circuito"],
        ],
        [
            'name'=>'2 Días / 1 Noche', 'price'=>$pkg_prices[2], 'highlight'=>false,
            'tagline'=>'Una escapada completa en la naturaleza', 'min_people'=>2,
            'includes'=>["Tour Animal Friends + degustación láctea","Taller Conexión Verde (horticultura terapéutica)","Tour Circuito Ecológico","2 almuerzos + 1 cena + 1 desayuno","1 noche de hospedaje","Noche de fogón bajo las estrellas"],
        ],
        [
            'name'=>'3 Días / 2 Noches', 'price'=>$pkg_prices[3], 'highlight'=>false,
            'tagline'=>'La experiencia completa de Huánuco', 'min_people'=>2,
            'includes'=>["Todo lo incluido en 2D/1N","Visita a la Hacienda Cachigaga","Recorrido por atractivos turísticos cercanos","3 almuerzos + 2 cenas + 2 desayunos","2 noches de hospedaje","Actividades recreativas libres"],
        ],
    ] : [
        [
            'name'=>'Half-Day', 'price'=>$pkg_prices[0], 'highlight'=>false,
            'tagline'=>'The perfect experience for a morning', 'min_people'=>5,
            'includes'=>["Animal Friends Tour or Ecological Circuit Tour","Farm animal interaction","Dairy product tasting","Lunch: traditional regional dish"],
        ],
        [
            'name'=>'Full-Day', 'price'=>$pkg_prices[1], 'highlight'=>true,
            'tagline'=>'A full day on the farm', 'min_people'=>5,
            'includes'=>["Animal Friends Tour","Ecological Circuit Tour","Animal interaction + dairy tasting","Lunch: traditional regional dish","Take home a seedling"],
        ],
        [
            'name'=>'2 Days / 1 Night', 'price'=>$pkg_prices[2], 'highlight'=>false,
            'tagline'=>'A complete nature getaway', 'min_people'=>2,
            'includes'=>["Animal Friends Tour + dairy tasting","Conexión Verde Workshop (therapeutic horticulture)","Ecological Circuit Tour","2 lunches + 1 dinner + 1 breakfast","1 night lodging","Campfire night under the stars"],
        ],
        [
            'name'=>'3 Days / 2 Nights', 'price'=>$pkg_prices[3], 'highlight'=>false,
            'tagline'=>'The complete Huánuco experience', 'min_people'=>2,
            'includes'=>["Everything in 2D/1N","Visit to Hacienda Cachigaga","Nearby tourist attractions tour","3 lunches + 2 dinners + 2 breakfasts","2 nights lodging","Free recreational activities"],
        ],
    ];
}

$min_label = $is_es ? 'Mín. %d personas' : 'Min. %d people';
$wa_num = get_option('gl_wa_number', '51966721057');
?>
<section id="paquetes" class="section section--dark">
  <div class="container">
    <div style="text-align:center;max-width:700px;margin:0 auto 3rem">
      <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($tag); ?></span>
      <h2 class="section-title section-title--white font-serif"><?php echo esc_html($title); ?></h2>
      <p style="color:rgba(255,255,255,.6);font-size:1.1rem"><?php echo esc_html($subtitle); ?></p>
    </div>

    <div class="packages-grid">
      <?php foreach ($packages as $i => $pkg):
        $is_highlight = !empty($pkg['highlight']);
        $min_p = intval($pkg['min_people'] ?? 1);
        $photos = $pkg_photos[$i] ?? [];
        $msg = $is_es
            ? "Hola, me interesa reservar el Paquete {$pkg['name']} ({$pkg['price']}/persona). ¿Pueden confirmar disponibilidad?"
            : "Hi, I'd like to book the {$pkg['name']} Package ({$pkg['price']}/person). Can you confirm availability?";
        $wa = gl_wa_url($msg);
      ?>
      <div class="pkg-card<?php echo $is_highlight ? ' pkg-card--highlight' : ''; ?>" style="<?php echo $is_highlight ? 'border-color:var(--green-600);box-shadow:0 12px 48px rgba(22,163,74,.25)' : ''; ?>">
        <?php if (!empty($photos)): ?>
        <div class="pkg-photos">
          <?php foreach ($photos as $ph): ?>
          <div class="pkg-photo" style="background-image:url('<?php echo esc_url($ph); ?>')"></div>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
        <div class="pkg-body">
          <span class="pkg-badge"><?php echo esc_html($pkg['tagline'] ?? $pkg['name']); ?></span>
          <div class="pkg-price"><?php echo esc_html($pkg['price']); ?> <span>/ <?php echo $per_person; ?></span></div>
          <?php if ($min_p > 1): ?>
          <p style="font-size:.8rem;color:rgba(255,255,255,.45);margin-bottom:1rem"><?php printf($min_label, $min_p); ?></p>
          <?php endif; ?>

          <p style="font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:<?php echo $is_highlight ? 'var(--green-300)' : 'rgba(255,255,255,.35)'; ?>;margin-bottom:.75rem"><?php echo $includes; ?></p>
          <div class="pkg-features">
            <?php foreach ((array)($pkg['includes'] ?? []) as $inc): ?>
            <div class="pkg-feature">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <?php echo esc_html($inc); ?>
            </div>
            <?php endforeach; ?>
          </div>

          <a href="<?php echo esc_url($wa); ?>" target="_blank" rel="noopener noreferrer"
             class="btn<?php echo $is_highlight ? ' btn--ghost' : ' btn--primary'; ?>"
             style="width:100%;margin-top:auto;padding-top:1.5rem;justify-content:center">
            <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <?php echo esc_html($cta_book); ?>
          </a>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <p style="text-align:center;color:rgba(255,255,255,.35);font-size:.875rem;margin-top:2.5rem"><?php echo esc_html($note); ?></p>
  </div>
</section>
