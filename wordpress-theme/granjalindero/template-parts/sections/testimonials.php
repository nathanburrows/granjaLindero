<?php
$is_es = gl_lang() === 'es';
$label = gl_field('testi_label') ?: ($is_es ? 'Lo que dicen' : 'What guests say');
$title = gl_field('testi_title') ?: ($is_es ? 'Experiencias reales' : 'Real experiences');
$items = gl_field('testi_items') ?: [];

if (empty($items)) {
    $items = [
        ['name'=>'Maleah','stars'=>5,'text'=>$is_es ? 'Un lugar escondido. Comida deliciosa directamente de la granja.' : 'A hidden gem. Delicious food straight from the farm.'],
        ['name'=>'María','stars'=>5,'text'=>$is_es ? 'Una experiencia increíble en la Granja Ecológica Lindero.' : 'An incredible experience at Lindero Organic Farm.'],
        ['name'=>'Nick','stars'=>5,'text'=>'Fantastic food and awesome environment!'],
    ];
}
?>
<section class="section testimonials-section">
  <div class="container" style="text-align:center">
    <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($label); ?></span>
    <h2 class="section-title section-title--white font-serif" style="margin-bottom:3rem"><?php echo esc_html($title); ?></h2>

    <div class="testimonial-track" id="testi-track">
      <?php foreach ($items as $i => $item): ?>
      <div class="testimonial-slide<?php echo $i === 0 ? ' active' : ''; ?>" data-index="<?php echo $i; ?>">
        <div class="testimonial-stars">
          <?php for ($s = 1; $s <= 5; $s++): ?>
          <svg fill="<?php echo $s <= intval($item['stars']) ? '#f59e0b' : 'none'; ?>" stroke="#f59e0b" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <?php endfor; ?>
        </div>
        <p class="testimonial-text">"<?php echo esc_html($item['text']); ?>"</p>
        <div class="testimonial-name"><?php echo esc_html($item['name']); ?></div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="testimonial-dots" id="testi-dots">
      <?php foreach ($items as $i => $_): ?>
      <button class="testimonial-dot<?php echo $i === 0 ? ' active' : ''; ?>" data-index="<?php echo $i; ?>" aria-label="Review <?php echo $i+1; ?>"></button>
      <?php endforeach; ?>
    </div>
  </div>
</section>
