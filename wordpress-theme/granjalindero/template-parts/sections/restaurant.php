<?php
$is_es = gl_lang() === 'es';
$label       = get_field('rest_label')       ?: ($is_es ? 'Restaurante' : 'Restaurant');
$title       = get_field('rest_title')       ?: ($is_es ? 'Sabores del campo' : 'Flavours of the farm');
$description = get_field('rest_description') ?: ($is_es
    ? 'Disfruta de nuestra cocina con platos típicos de la región, preparados con ingredientes frescos de nuestra propia granja. Una experiencia gastronómica auténtica en plena naturaleza.'
    : 'Enjoy our kitchen with typical regional dishes, prepared with fresh ingredients from our own farm. An authentic gastronomic experience in the heart of nature.');
$features = get_field('rest_features') ?: [];
if (empty($features)) {
    $features = $is_es
        ? ['Platos típicos regionales', 'Ingredientes de la granja', 'Mesas al aire libre', 'Vista al campo']
        : ['Regional typical dishes', 'Farm-fresh ingredients', 'Outdoor tables', 'Countryside views'];
}

$imgs = [
    get_template_directory_uri() . '/assets/images/restaurant_mesa_desayuno.jpg',
    get_template_directory_uri() . '/assets/images/restaurant_juane_plato.jpg',
    get_template_directory_uri() . '/assets/images/tienda_kiosco_menu.jpg',
    get_template_directory_uri() . '/assets/images/restaurant_pachamanca.jpg',
];
if ($custom = get_field('rest_images')) {
    $imgs = array_map('wp_get_attachment_url', array_column($custom,'ID')) ?: $imgs;
}
?>
<section id="restaurante" class="section section--dark">
  <div class="container">
    <div class="grid-2">
      <!-- Text -->
      <div>
        <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($label); ?></span>
        <h2 class="section-title section-title--white font-serif"><?php echo esc_html($title); ?></h2>
        <p style="color:rgba(255,255,255,.7);font-size:1.05rem;line-height:1.8;margin-bottom:2rem"><?php echo esc_html($description); ?></p>
        <div class="rest-features">
          <?php foreach ($features as $f): ?>
          <div class="rest-feature">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span><?php echo esc_html($f); ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Photo grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div style="border-radius:1rem;overflow:hidden;height:260px;background:url('<?php echo esc_url($imgs[0]); ?>') center/cover;box-shadow:0 8px 32px rgba(0,0,0,.25)"></div>
        <div style="border-radius:1rem;overflow:hidden;height:260px;margin-top:2rem;background:url('<?php echo esc_url($imgs[1]); ?>') center/cover;box-shadow:0 8px 32px rgba(0,0,0,.25)"></div>
        <div style="border-radius:1rem;overflow:hidden;height:200px;background:url('<?php echo esc_url($imgs[2]); ?>') center/cover;box-shadow:0 8px 32px rgba(0,0,0,.25)"></div>
        <div style="border-radius:1rem;overflow:hidden;height:200px;margin-top:-1rem;background:url('<?php echo esc_url($imgs[3]); ?>') center/cover;box-shadow:0 8px 32px rgba(0,0,0,.25)"></div>
      </div>
    </div>
  </div>
</section>
