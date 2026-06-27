<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php
$lang      = gl_lang();
$is_es     = $lang === 'es';
$wa_number = get_option('gl_wa_number', '51966721057');

// Nav labels (Polylang-aware fallbacks)
function gl_str(string $key, string $fallback): string {
    return function_exists('pll__') ? pll__($key) : $fallback;
}
?>

<nav id="gl-nav">
  <div class="nav-inner">

    <!-- Logo -->
    <a href="<?php echo home_url('/'); ?>" class="nav-logo">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg" alt="<?php bloginfo('name'); ?>">
    </a>

    <!-- Desktop primary links -->
    <div class="nav-links">
      <a href="<?php echo home_url('/#experiencias'); ?>"><?php echo $is_es ? 'Experiencias' : 'Experiences'; ?></a>
      <a href="<?php echo home_url('/#paquetes'); ?>"><?php echo $is_es ? 'Paquetes' : 'Packages'; ?></a>
      <a href="<?php echo home_url('/#hospedaje'); ?>"><?php echo $is_es ? 'Hospedaje' : 'Lodging'; ?></a>
      <a href="<?php echo home_url('/#restaurante'); ?>"><?php echo $is_es ? 'Restaurante' : 'Restaurant'; ?></a>
      <a href="<?php echo home_url('/#grupos'); ?>"><?php echo $is_es ? 'Grupos' : 'Groups'; ?></a>
      <a href="<?php echo home_url('/#contacto'); ?>"><?php echo $is_es ? 'Contacto' : 'Contact'; ?></a>

      <!-- More dropdown -->
      <div class="nav-more-wrap">
        <button class="nav-more-btn" id="nav-more-btn" aria-expanded="false">
          <?php echo $is_es ? 'Más' : 'More'; ?>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="nav-dropdown" id="nav-dropdown">
          <a href="<?php echo home_url('/#nosotros'); ?>"><?php echo $is_es ? 'Nosotros' : 'About'; ?></a>
          <a href="<?php echo home_url('/#tienda'); ?>"><?php echo $is_es ? 'Tienda' : 'Store'; ?></a>
          <a href="<?php echo home_url('/#galeria'); ?>"><?php echo $is_es ? 'Galería' : 'Gallery'; ?></a>
          <?php
          $faq_page = get_page_by_path('faq');
          $vol_page = get_page_by_path('voluntarios');
          if ($faq_page): ?>
            <a href="<?php echo get_permalink($faq_page); ?>" class="is-page"><?php echo $is_es ? 'Preguntas frecuentes' : 'FAQ'; ?></a>
          <?php endif;
          if ($vol_page): ?>
            <a href="<?php echo get_permalink($vol_page); ?>" class="is-page"><?php echo $is_es ? 'Voluntariado' : 'Volunteer'; ?></a>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <!-- Right actions -->
    <div class="nav-actions">
      <?php if (function_exists('pll_the_languages')): ?>
      <div class="lang-toggle">
        <?php pll_the_languages(['show_flags'=>0,'show_names'=>1,'dropdown'=>0,'raw'=>0,'display_names_in'=>'name']); ?>
      </div>
      <?php else: ?>
      <div class="lang-toggle">
        <button class="active">ES</button>
        <button>EN</button>
      </div>
      <?php endif; ?>

      <a href="<?php echo esc_url(gl_wa_url($is_es ? 'Hola, me gustaría hacer una reserva.' : 'Hi, I would like to make a booking.')); ?>"
         target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
        <?php echo $is_es ? 'Reservar' : 'Book Now'; ?>
      </a>
    </div>

    <!-- Hamburger -->
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div class="nav-mobile" id="nav-mobile">
    <a href="<?php echo home_url('/#nosotros'); ?>"><?php echo $is_es ? 'Nosotros' : 'About'; ?></a>
    <a href="<?php echo home_url('/#experiencias'); ?>"><?php echo $is_es ? 'Experiencias' : 'Experiences'; ?></a>
    <a href="<?php echo home_url('/#paquetes'); ?>"><?php echo $is_es ? 'Paquetes' : 'Packages'; ?></a>
    <a href="<?php echo home_url('/#hospedaje'); ?>"><?php echo $is_es ? 'Hospedaje' : 'Lodging'; ?></a>
    <a href="<?php echo home_url('/#restaurante'); ?>"><?php echo $is_es ? 'Restaurante' : 'Restaurant'; ?></a>
    <a href="<?php echo home_url('/#tienda'); ?>"><?php echo $is_es ? 'Tienda' : 'Store'; ?></a>
    <a href="<?php echo home_url('/#grupos'); ?>"><?php echo $is_es ? 'Grupos' : 'Groups'; ?></a>
    <a href="<?php echo home_url('/#galeria'); ?>"><?php echo $is_es ? 'Galería' : 'Gallery'; ?></a>
    <a href="<?php echo home_url('/#contacto'); ?>"><?php echo $is_es ? 'Contacto' : 'Contact'; ?></a>
    <?php if ($faq_page ?? null): ?>
    <a href="<?php echo get_permalink($faq_page); ?>"><?php echo $is_es ? 'Preguntas frecuentes' : 'FAQ'; ?></a>
    <?php endif;
    if ($vol_page ?? null): ?>
    <a href="<?php echo get_permalink($vol_page); ?>"><?php echo $is_es ? 'Voluntariado' : 'Volunteer'; ?></a>
    <?php endif; ?>
    <div class="nav-mobile-footer">
      <?php if (function_exists('pll_the_languages')): ?>
      <div class="lang-toggle"><?php pll_the_languages(['show_flags'=>0,'show_names'=>1]); ?></div>
      <?php endif; ?>
      <a href="<?php echo esc_url(gl_wa_url('')); ?>" target="_blank" rel="noopener noreferrer"
         class="btn btn--primary btn--sm">
        <?php echo $is_es ? 'Reservar' : 'Book Now'; ?>
      </a>
    </div>
  </div>
</nav>
