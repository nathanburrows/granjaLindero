<?php
$is_es = gl_lang() === 'es';
$label    = get_field('contact_label')    ?: ($is_es ? 'Contacto' : 'Contact');
$title    = get_field('contact_title')    ?: ($is_es ? '¿Listo para vivir la experiencia?' : 'Ready to live the experience?');
$subtitle = get_field('contact_subtitle') ?: ($is_es
    ? 'Escríbenos o llámanos para hacer tu reserva. Estamos disponibles para grupos familiares, escolares y corporativos.'
    : 'Write or call us to make your booking. We\'re available for family, school, and corporate groups.');

$phone     = get_option('gl_phone', '+51 966 721 057');
$hours     = $is_es ? 'Horarios de atención' : 'Opening hours';
$hours_val = $is_es ? 'Miércoles a Domingo · 9:00 am – 5:30 pm' : 'Wednesday to Sunday · 9:00 am – 5:30 pm';
$wa_label  = $is_es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp';
$call_label= $is_es ? 'Llamar ahora' : 'Call now';
$book_now  = $is_es ? 'Reservar ahora' : 'Book now';
$wa_book_msg = $is_es ? 'Hola, me gustaría hacer una reserva.' : 'Hi, I would like to make a booking.';
$bg_img = get_template_directory_uri() . '/assets/images/animales_gallinas_campo.jpg';
?>
<section id="contacto" style="position:relative;padding:6rem 0;background:url('<?php echo esc_url($bg_img); ?>') center/cover fixed">
  <div style="position:absolute;inset:0;background:rgba(28,25,23,.82)"></div>
  <div class="container" style="position:relative;z-index:1;text-align:center">
    <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($label); ?></span>
    <h2 class="section-title section-title--white font-serif" style="font-size:clamp(2.5rem,6vw,4rem)"><?php echo esc_html($title); ?></h2>
    <p style="color:rgba(255,255,255,.6);font-size:1.1rem;max-width:580px;margin:0 auto 3rem;line-height:1.7"><?php echo esc_html($subtitle); ?></p>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;max-width:700px;margin:0 auto 2.5rem">
      <!-- WhatsApp -->
      <a href="<?php echo esc_url(gl_wa_url('')); ?>" target="_blank" rel="noopener noreferrer"
         style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:1.25rem;padding:1.5rem 1rem;text-align:center;transition:all .3s;display:block">
        <div style="width:2rem;height:2rem;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .75rem">
          <svg style="width:1rem;height:1rem;color:#fff" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
        <div style="color:#fff;font-weight:600;font-size:.9rem;margin-bottom:.3rem"><?php echo esc_html($wa_label); ?></div>
        <div style="color:rgba(255,255,255,.5);font-size:.8rem"><?php echo esc_html($phone); ?></div>
      </a>

      <!-- Call -->
      <a href="tel:<?php echo esc_attr(str_replace([' ', '+'],'',$phone)); ?>"
         style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:1.25rem;padding:1.5rem 1rem;text-align:center;transition:all .3s;display:block">
        <div style="width:2rem;height:2rem;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .75rem">
          <svg style="width:1rem;height:1rem;color:#fff" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"/></svg>
        </div>
        <div style="color:#fff;font-weight:600;font-size:.9rem;margin-bottom:.3rem"><?php echo esc_html($call_label); ?></div>
        <div style="color:rgba(255,255,255,.5);font-size:.8rem"><?php echo esc_html($phone); ?></div>
      </a>

      <!-- Hours -->
      <div style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:1.25rem;padding:1.5rem 1rem;text-align:center">
        <div style="width:2rem;height:2rem;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .75rem">
          <svg style="width:1rem;height:1rem;color:#fff" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div style="color:#fff;font-weight:600;font-size:.9rem;margin-bottom:.3rem"><?php echo esc_html($hours); ?></div>
        <div style="color:rgba(255,255,255,.5);font-size:.8rem"><?php echo esc_html($hours_val); ?></div>
      </div>
    </div>

    <a href="<?php echo esc_url(gl_wa_url($wa_book_msg)); ?>" target="_blank" rel="noopener noreferrer"
       class="btn btn--primary" style="font-size:1.2rem;padding:1.1rem 2.5rem;box-shadow:0 8px 32px rgba(34,197,94,.3)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:1.25rem;height:1.25rem"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      <?php echo esc_html($book_now); ?>
    </a>
  </div>
</section>
