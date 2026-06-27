<?php
$is_es    = gl_lang() === 'es';
$tagline  = gl_field('hero_tagline')  ?: ($is_es ? 'Reconecta con la naturaleza' : 'Reconnect with nature');
$subtitle = gl_field('hero_subtitle') ?: ($is_es ? 'Vive una experiencia única en nuestra granja ecológica en el corazón de Huánuco, Perú.' : 'Live a unique experience at our ecological farm in the heart of Huánuco, Peru.');
$cta_exp  = gl_field('hero_cta_exp')  ?: ($is_es ? 'Reservar experiencia' : 'Book an experience');
$cta_room = gl_field('hero_cta_room') ?: ($is_es ? 'Reservar habitación' : 'Book a room');
$badge    = gl_field('hero_badge')    ?: 'Tomaykichwa · Huánuco · Perú';
$video    = gl_field('hero_video');
$video_url = $video ? $video['url'] : get_template_directory_uri() . '/assets/video/hero-bg.mp4';
?>
<section class="hero" id="inicio">
  <video id="hero-vid-a" class="hero-video on-top" src="<?php echo esc_url($video_url); ?>" autoplay muted playsinline></video>
  <video id="hero-vid-b" class="hero-video off-top" src="<?php echo esc_url($video_url); ?>" muted playsinline></video>

  <div class="hero-overlay"></div>

  <div class="hero-badge"><?php echo esc_html($badge); ?></div>

  <div class="hero-content">
    <h1 class="hero-title font-serif"><?php echo esc_html($tagline); ?></h1>
    <p class="hero-subtitle"><?php echo esc_html($subtitle); ?></p>
    <div class="hero-ctas">
      <a href="#experiencias" class="btn btn--primary"><?php echo esc_html($cta_exp); ?></a>
      <a href="#hospedaje"   class="btn btn--ghost"><?php echo esc_html($cta_room); ?></a>
    </div>
  </div>

  <div class="hero-scroll">
    <div class="hero-scroll-line"></div>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </div>
</section>
