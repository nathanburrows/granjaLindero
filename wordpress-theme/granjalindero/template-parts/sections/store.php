<?php
$is_es = gl_lang() === 'es';
$label       = get_field('store_label')       ?: ($is_es ? 'Tienda' : 'Store');
$title       = get_field('store_title')       ?: ($is_es ? 'Productos de la granja' : 'Farm products');
$subtitle    = get_field('store_subtitle')    ?: ($is_es ? 'Llévate un pedacito de la granja a casa' : 'Take a little piece of the farm home');
$description = get_field('store_description') ?: ($is_es
    ? 'En nuestra tienda encontrarás productos frescos elaborados en la granja. Lácteos, huevos y más — directamente del campo a tus manos.'
    : 'In our store you\'ll find fresh products made on the farm. Dairy, eggs, and more — straight from the farm to your hands.');
$cta = get_field('store_cta') ?: ($is_es ? 'Consultar productos' : 'Enquire about products');

$products = get_field('store_products') ?: [];
if (empty($products)) {
    $products = $is_es ? [
        ['name'=>'Leche fresca',    'detail'=>'Sin procesar, del día'],
        ['name'=>'Queso artesanal', 'detail'=>'Elaborado en la granja'],
        ['name'=>'Flan casero',     'detail'=>'Receta tradicional'],
        ['name'=>'Yogur natural',   'detail'=>'Sin conservantes'],
        ['name'=>'Huevos de campo', 'detail'=>'Gallinas libres'],
        ['name'=>'Otros productos', 'detail'=>'Según temporada'],
    ] : [
        ['name'=>'Fresh milk',      'detail'=>'Same-day, unprocessed'],
        ['name'=>'Artisan cheese',  'detail'=>'Made on the farm'],
        ['name'=>'Homemade flan',   'detail'=>'Traditional recipe'],
        ['name'=>'Natural yogurt',  'detail'=>'No preservatives'],
        ['name'=>'Free-range eggs', 'detail'=>'Free-roaming hens'],
        ['name'=>'Other products',  'detail'=>'Seasonal availability'],
    ];
}

$wa_msg = $is_es ? 'Me gustaría consultar sobre los productos de la tienda.' : 'I would like to enquire about your farm store products.';
$photos = [
    get_template_directory_uri() . '/assets/images/tienda_kiosco_fridge.jpg',
    get_template_directory_uri() . '/assets/images/tienda_queso.jpg',
    get_template_directory_uri() . '/assets/images/tienda_yogurt.jpg',
    get_template_directory_uri() . '/assets/images/tienda_huevos_frescos.jpg',
];
?>
<section id="tienda" class="section section--stone">
  <div class="container">
    <div style="text-align:center;max-width:700px;margin:0 auto 3rem">
      <span class="label-tag"><?php echo esc_html($label); ?></span>
      <h2 class="section-title font-serif"><?php echo esc_html($title); ?></h2>
      <p class="section-body" style="margin-bottom:0"><?php echo esc_html($subtitle); ?></p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start" class="grid-lg-2">
      <!-- Photos -->
      <div>
        <div style="border-radius:1rem;overflow:hidden;height:260px;background:url('<?php echo esc_url($photos[0]); ?>') center/cover;box-shadow:0 8px 32px rgba(0,0,0,.1);margin-bottom:1rem"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.75rem">
          <?php foreach (array_slice($photos, 1) as $p): ?>
          <div style="border-radius:.75rem;overflow:hidden;height:120px;background:url('<?php echo esc_url($p); ?>') center/cover;box-shadow:0 4px 16px rgba(0,0,0,.08)"></div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Products -->
      <div>
        <p style="color:var(--stone-600);font-size:1.05rem;line-height:1.8;margin-bottom:2.5rem"><?php echo esc_html($description); ?></p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:2.5rem">
          <?php foreach ($products as $p): ?>
          <div style="background:#fff;border-radius:.75rem;padding:.875rem 1rem;border:1px solid var(--stone-200);box-shadow:0 1px 4px rgba(0,0,0,.04)">
            <div style="font-weight:600;color:var(--stone-800);font-size:.9rem"><?php echo esc_html($p['name']); ?></div>
            <div style="color:var(--stone-400);font-size:.8rem;margin-top:.2rem"><?php echo esc_html($p['detail']); ?></div>
          </div>
          <?php endforeach; ?>
        </div>
        <a href="<?php echo esc_url(gl_wa_url($wa_msg)); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
          <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <?php echo esc_html($cta); ?>
        </a>
      </div>
    </div>
  </div>
</section>
