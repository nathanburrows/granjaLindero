<?php
$is_es = gl_lang() === 'es';
$label    = get_field('gal_label')    ?: ($is_es ? 'Galería' : 'Gallery');
$title    = get_field('gal_title')    ?: ($is_es ? 'Momentos en la granja' : 'Moments on the farm');
$subtitle = get_field('gal_subtitle') ?: ($is_es ? 'Un vistazo a nuestra vida campestre' : 'A glimpse of our farm life');

$acf_gallery = get_field('gal_images');
if ($acf_gallery) {
    $photos = array_map(function($img){ return $img['url']; }, $acf_gallery);
} else {
    $base = get_template_directory_uri() . '/assets/images/';
    $photos = [
        $base . 'paisaje_estrellas_noche.jpg',
        $base . 'hospedaje_cabana_bosque.jpg',
        $base . 'animales_alpacas.jpg',
        $base . 'hospedaje_edificio_principal.jpg',
        $base . 'animales_ovejas.jpg',
        $base . 'experiencias_cuyes_granja.jpg',
        $base . 'animales_ternero_biberon.jpg',
        $base . 'experiencias_caminata_mirador.jpg',
        $base . 'animales_cuyes.jpg',
        $base . 'experiencias_fogon_noche.jpg',
        $base . 'animales_gallinas_campo.jpg',
        $base . 'tienda_kiosco_fridge.jpg',
        $base . 'tienda_huevos_frescos.jpg',
        $base . 'animales_vaca_comedero.jpg',
        $base . 'actividades_cosecha_huerto.jpg',
        $base . 'paisaje_sendero_montana.jpg',
        $base . 'animales_ternero.jpg',
        $base . 'experiencias_jardin_gazebo.jpg',
        $base . 'experiencias_fogon_salchichas.jpg',
        $base . 'restaurant_juane_plato.jpg',
        $base . 'restaurant_pachamanca.jpg',
        $base . 'actividades_arado_bueyes.jpg',
        $base . 'tienda_horno_lena.jpg',
        $base . 'restaurant_juane_envuelto.jpg',
    ];
}
// Show up to 12 in the grid, all available for lightbox
$grid_photos = array_slice($photos, 0, 12);
?>
<section id="galeria" class="section section--stone">
  <div class="container">
    <div style="text-align:center;margin-bottom:2.5rem">
      <span class="label-tag"><?php echo esc_html($label); ?></span>
      <h2 class="section-title font-serif"><?php echo esc_html($title); ?></h2>
      <p class="section-body" style="margin-bottom:0"><?php echo esc_html($subtitle); ?></p>
    </div>

    <div class="gallery-grid" id="gallery-grid">
      <?php foreach ($grid_photos as $i => $src): ?>
      <div class="gallery-item" data-index="<?php echo $i; ?>"
           style="background-image:url('<?php echo esc_url($src); ?>')" role="button" tabindex="0"
           aria-label="<?php echo $is_es ? 'Ver foto '.($i+1) : 'View photo '.($i+1); ?>"></div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Lightbox -->
<div class="lightbox hidden" id="gallery-lightbox">
  <img src="" alt="" id="lightbox-img">
  <button class="lightbox-close" id="lightbox-close" aria-label="<?php echo $is_es ? 'Cerrar' : 'Close'; ?>">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  </button>
  <button id="lightbox-prev" style="position:absolute;left:1.5rem;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.12);width:3rem;height:3rem;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;border:none;cursor:pointer">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <button id="lightbox-next" style="position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.12);width:3rem;height:3rem;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;border:none;cursor:pointer">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
  </button>
  <div style="position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.1);color:#fff;font-size:.875rem;padding:.35rem 1rem;border-radius:9999px" id="lightbox-counter"></div>
</div>

<script>
(function(){
  var photos = <?php echo json_encode(array_values($photos)); ?>;
  var current = 0;
  var lb = document.getElementById('gallery-lightbox');
  var img = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightbox-counter');

  function open(i){ current=((i%photos.length)+photos.length)%photos.length; img.src=photos[current]; counter.textContent=(current+1)+' / '+photos.length; lb.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.add('hidden'); document.body.style.overflow=''; }

  document.querySelectorAll('.gallery-item').forEach(function(el){
    el.addEventListener('click',function(){ open(parseInt(this.dataset.index)); });
    el.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(parseInt(this.dataset.index)); } });
  });

  document.getElementById('lightbox-close').addEventListener('click', close);
  document.getElementById('lightbox-prev').addEventListener('click', function(){ open(current-1); });
  document.getElementById('lightbox-next').addEventListener('click', function(){ open(current+1); });
  lb.addEventListener('click', function(e){ if(e.target===lb) close(); });

  document.addEventListener('keydown', function(e){
    if(lb.classList.contains('hidden')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') open(current-1);
    if(e.key==='ArrowRight') open(current+1);
  });
})();
</script>
