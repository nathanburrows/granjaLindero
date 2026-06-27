<?php
$is_es       = gl_lang() === 'es';
$label       = get_field('about_label')        ?: ($is_es ? 'Quiénes somos' : 'Who we are');
$title       = get_field('about_title')        ?: ($is_es ? 'Bienvenidos a La Granja Ecológica Lindero' : 'Welcome to La Granja Ecológica Lindero');
$body        = get_field('about_body')         ?: ($is_es ? 'Somos un espacio donde la naturaleza, la agricultura ecológica y el bienestar se encuentran.' : 'A space where nature, ecological farming, and wellbeing come together.');
$mission     = get_field('about_mission')      ?: '';
$m_link_text = get_field('about_mission_link') ?: 'Paz y Esperanza';
$m_link_url  = get_field('about_mission_url')  ?: 'https://www.pazyesperanza.org/pe/';
$impact      = get_field('about_impact_note')  ?: ($is_es ? 'El 30% de nuestros ingresos se destina directamente a los esfuerzos locales de Paz y Esperanza en Huánuco.' : '30% of our revenue goes directly to local Peace & Hope efforts in Huánuco.');
$vision      = get_field('about_vision')       ?: '';
$img_front   = get_field('about_img_front')    ?: get_template_directory_uri() . '/assets/images/hospedaje_hamaca_jardin.jpg';
$img_back    = get_field('about_img_back')     ?: get_template_directory_uri() . '/assets/images/animales_alpacas.jpg';
$s1v  = get_field('about_stat1')       ?: '4,100+'; $s1l = get_field('about_stat1_label') ?: ($is_es ? 'Visitantes felices' : 'Happy visitors');
$s2v  = get_field('about_stat2')       ?: '5+';    $s2l = get_field('about_stat2_label') ?: ($is_es ? 'Tipos de experiencias' : 'Experience types');
$s3v  = get_field('about_stat3')       ?: '1';     $s3l = get_field('about_stat3_label') ?: ($is_es ? 'Lugar inolvidable' : 'Unforgettable place');
$mission_label = $is_es ? 'Misión'  : 'Mission';
$vision_label  = $is_es ? 'Visión'  : 'Vision';
?>
<section id="nosotros" class="section section--stone">
  <div class="container">
    <div class="grid-2">

      <!-- Text -->
      <div>
        <span class="label-tag"><?php echo esc_html($label); ?></span>
        <h2 class="section-title"><?php echo esc_html($title); ?></h2>
        <p class="section-body"><?php echo esc_html($body); ?></p>

        <button class="about-link-btn" id="about-modal-trigger">
          <span class="about-link-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </span>
          <?php echo esc_html($mission_label . ' & ' . $vision_label); ?>
        </button>

        <div class="about-stats">
          <?php foreach ([[$s1v,$s1l],[$s2v,$s2l],[$s3v,$s3l]] as [$v,$l]): ?>
          <div class="about-stat">
            <div class="about-stat-value font-serif"><?php echo esc_html($v); ?></div>
            <div class="about-stat-label"><?php echo esc_html($l); ?></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Collage -->
      <div class="about-collage">
        <div class="about-img-back"  style="background-image:url('<?php echo esc_url($img_back); ?>')"></div>
        <div class="about-img-front" style="background-image:url('<?php echo esc_url($img_front); ?>')"></div>
        <div class="about-deco"></div>
      </div>

    </div>
  </div>
</section>

<!-- Mission / Vision Modal -->
<div class="modal-overlay hidden" id="about-modal" role="dialog" aria-modal="true">
  <div class="modal-box">
    <div class="modal-header">
      <div>
        <div class="modal-title font-serif">La Granja Ecológica Lindero</div>
        <div class="modal-sub"><?php echo esc_html($mission_label . ' & ' . $vision_label); ?></div>
      </div>
      <button class="modal-close" id="about-modal-close" aria-label="Close">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="modal-mission">
        <p class="modal-section-label"><?php echo esc_html($mission_label); ?></p>
        <p class="modal-text">
          <?php
          if ($mission && $m_link_text) {
              $parts = explode($m_link_text, $mission, 2);
              echo esc_html($parts[0]);
              echo '<a href="' . esc_url($m_link_url) . '" target="_blank" rel="noopener noreferrer" style="color:var(--green-700);font-weight:600;text-decoration:underline;text-underline-offset:2px">' . esc_html($m_link_text) . '</a>';
              echo esc_html($parts[1] ?? '');
          } else {
              echo esc_html($mission);
          }
          ?>
        </p>
      </div>

      <div class="modal-impact">
        <div class="modal-impact-num font-serif">30%</div>
        <p class="modal-impact-text"><?php echo esc_html($impact); ?></p>
      </div>

      <div class="modal-vision">
        <p class="modal-section-label"><?php echo esc_html($vision_label); ?></p>
        <p class="modal-text"><?php echo esc_html($vision); ?></p>
      </div>
    </div>
  </div>
</div>
