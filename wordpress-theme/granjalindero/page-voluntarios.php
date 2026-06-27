<?php
/**
 * Template Name: Voluntarios
 */
get_header();

$is_es = gl_lang() === 'es';
$label    = get_field('vol_label')    ?: ($is_es ? 'Voluntariado & Pasantías' : 'Volunteering & Internships');
$title    = get_field('vol_title')    ?: ($is_es ? 'Haz un impacto real en Tomaykichwa' : 'Make a real impact in Tomaykichwa');
$subtitle = get_field('vol_subtitle') ?: ($is_es
    ? 'Trabaja en la granja, vive en la comunidad y forma parte de algo más grande — un proyecto que restaura vidas a través de la naturaleza.'
    : 'Work on the farm, live in the community, and be part of something bigger — a project that restores lives through nature.');
$andemos_url  = get_field('vol_andemos_url') ?: 'https://andemos.peaceandhopeinternational.org/es/inicio/';
$andemos_prog = $is_es ? 'Paz y Esperanza Internacional' : 'Peace & Hope International';
$andemos_name = $is_es ? 'Programa Andemos ↗' : 'Andemos Program ↗';
$why_cta      = $is_es ? '¿Por qué voluntariarse aquí?' : 'Why volunteer here?';

$roles = get_field('vol_roles') ?: [];
if (empty($roles)) {
    $roles = $is_es ? [
        ['icon'=>'🌱','title'=>'Agroecología y Huerto','desc'=>'Siembra, cuida y cosecha en nuestros huertos orgánicos. Aprende técnicas de agricultura ecológica de la mano de nuestro equipo.'],
        ['icon'=>'🐄','title'=>'Cuidado de Animales','desc'=>'Ayuda en el cuidado diario de vacas, alpacas, cuyes y aves de corral. Aprende sobre ganadería ecológica y bienestar animal.'],
        ['icon'=>'🧀','title'=>'Producción Artesanal','desc'=>'Participa en la elaboración de quesos, yogures, manjarblanco y otros productos naturales que vendemos en nuestra tienda.'],
        ['icon'=>'🤝','title'=>'Programas Comunitarios','desc'=>'Apoya las actividades y talleres que benefician a niños, jóvenes y familias de Tomaykichwa vinculados a los proyectos de Paz y Esperanza.'],
    ] : [
        ['icon'=>'🌱','title'=>'Agroecology & Garden','desc'=>'Plant, tend, and harvest in our organic gardens. Learn ecological farming techniques alongside our team.'],
        ['icon'=>'🐄','title'=>'Animal Care','desc'=>'Help with the daily care of cows, alpacas, guinea pigs, and poultry. Learn about ecological livestock farming and animal welfare.'],
        ['icon'=>'🧀','title'=>'Artisan Production','desc'=>'Participate in making cheeses, yogurts, caramel cream, and other natural products sold in our store.'],
        ['icon'=>'🤝','title'=>'Community Programs','desc'=>'Support the activities and workshops that benefit children, youth, and families in Tomaykichwa connected to Paz y Esperanza projects.'],
    ];
}

$offer_title = get_field('vol_offer_title') ?: ($is_es ? 'Qué ofrecemos' : 'What we offer');
$offers = get_field('vol_offers') ?: [];
if (empty($offers)) {
    $offers = $is_es ? [
        'Alojamiento en la granja (según disponibilidad)',
        'Alimentación con productos frescos de la granja',
        'Inmersión cultural en Tomaykichwa, Huánuco',
        'Carta de recomendación al finalizar',
        'Experiencia práctica en agroecología y empresa social',
    ] : [
        'On-farm accommodation (subject to availability)',
        'Meals with fresh farm produce',
        'Cultural immersion in Tomaykichwa, Huánuco',
        'Letter of recommendation upon completion',
        'Practical experience in agroecology and social enterprise',
    ];
}

$req_title = get_field('vol_req_title') ?: ($is_es ? 'Requisitos' : 'Requirements');
$requires = get_field('vol_requires') ?: [];
if (empty($requires)) {
    $requires = $is_es ? [
        'Compromiso mínimo de 2 semanas',
        'Actitud positiva y ganas de aprender',
        'Español básico (nivel conversacional recomendado)',
        'Disponibilidad para trabajo físico en exteriores',
    ] : [
        'Minimum 2-week commitment',
        'Positive attitude and eagerness to learn',
        'Basic Spanish (conversational level recommended)',
        'Availability for physical outdoor work',
    ];
}

$apply_title = get_field('vol_apply_title') ?: ($is_es ? 'Cómo postular' : 'How to apply');
$apply_body  = get_field('vol_apply_body')  ?: ($is_es
    ? 'El proceso de voluntariado está gestionado por el programa Andemos de Paz y Esperanza Internacional. Completa tu solicitud en su sitio web o escríbenos directamente por WhatsApp para coordinar tu llegada.'
    : 'The volunteer process is managed by the Andemos program of Paz y Esperanza Internacional. Complete your application on their website or message us directly on WhatsApp to coordinate your arrival.');
$apply_wa      = $is_es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp';
$apply_andemos = $is_es ? 'Solicitud en Andemos' : 'Apply at Andemos';
$wa_vol_msg    = $is_es
    ? 'Hola, me interesa el voluntariado en La Granja Ecológica Lindero.'
    : 'Hi, I\'m interested in volunteering at La Granja Ecológica Lindero.';
?>

<main style="min-height:100vh;background:var(--stone-50)">
  <!-- Hero -->
  <div class="page-hero">
    <span class="label-tag"><?php echo esc_html($label); ?></span>
    <h1 class="section-title font-serif" style="max-width:700px;margin:0 auto .75rem"><?php echo esc_html($title); ?></h1>
    <p style="margin-bottom:0"><?php echo esc_html($subtitle); ?></p>
    <a href="<?php echo esc_url($andemos_url); ?>" target="_blank" rel="noopener noreferrer" class="vol-andemos-badge">
      <div>
        <div class="vol-andemos-program"><?php echo esc_html($andemos_prog); ?></div>
        <div class="vol-andemos-name"><?php echo esc_html($andemos_name); ?></div>
      </div>
    </a>
  </div>

  <div style="max-width:900px;margin:0 auto;padding:4rem 1.5rem">

    <!-- Roles grid -->
    <section style="margin-bottom:4rem">
      <h2 class="font-serif" style="font-size:1.75rem;font-weight:700;color:var(--stone-900);margin-bottom:2rem"><?php echo esc_html($why_cta); ?></h2>
      <div class="vol-roles-grid">
        <?php foreach ($roles as $role): ?>
        <div class="vol-role-card">
          <div class="vol-role-icon"><?php echo esc_html($role['icon']); ?></div>
          <div class="vol-role-title"><?php echo esc_html($role['title']); ?></div>
          <p class="vol-role-desc"><?php echo esc_html($role['desc']); ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- Offer + Requirements -->
    <section class="vol-two-col">
      <div class="vol-offer-box">
        <div class="vol-box-title font-serif"><?php echo esc_html($offer_title); ?></div>
        <div class="vol-list">
          <?php foreach ($offers as $item): ?>
          <div class="vol-list-item">
            <div class="vol-check">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <?php echo esc_html($item); ?>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="vol-require-box">
        <div class="vol-box-title font-serif"><?php echo esc_html($req_title); ?></div>
        <div class="vol-list">
          <?php foreach ($requires as $item): ?>
          <div class="vol-list-item">
            <div class="vol-dot"></div>
            <?php echo esc_html($item); ?>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- Apply CTA -->
    <div class="vol-apply-box">
      <div class="vol-apply-title font-serif"><?php echo esc_html($apply_title); ?></div>
      <p class="vol-apply-body"><?php echo esc_html($apply_body); ?></p>
      <div class="vol-apply-btns">
        <a href="<?php echo esc_url(gl_wa_url($wa_vol_msg)); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
          <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <?php echo esc_html($apply_wa); ?>
        </a>
        <a href="<?php echo esc_url($andemos_url); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--dark">
          <?php echo esc_html($apply_andemos); ?> ↗
        </a>
      </div>
    </div>

  </div>
</main>

<?php get_footer(); ?>
