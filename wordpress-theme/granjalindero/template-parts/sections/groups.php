<?php
$is_es = gl_lang() === 'es';
$tag      = gl_field('grp_tag')      ?: ($is_es ? 'Grupos y Eventos' : 'Groups & Events');
$title    = gl_field('grp_title')    ?: ($is_es ? 'El espacio perfecto para tu grupo' : 'The perfect space for your group');
$subtitle = gl_field('grp_subtitle') ?: ($is_es
    ? 'Iglesias, colegios, empresas y familias encuentran en La Granja Lindero el lugar ideal para retiros, paseos y eventos al aire libre.'
    : 'Churches, schools, companies, and families find La Granja Lindero the ideal place for retreats, outings, and outdoor events.');
$cta_wa = gl_field('grp_cta') ?: ($is_es ? 'Consultar disponibilidad' : 'Check availability');

$pillars_title = $is_es ? 'Todo en un solo lugar' : 'All in one place';
$pillars = gl_field('grp_pillars') ?: [];
if (empty($pillars)) {
    $pillars = $is_es ? [
        ['title'=>'Experiencias','description'=>'Tour vivencial, talleres de horticultura terapéutica, recorridos educativos y noche de fogón — diseñados para grupos grandes.','image_url'=>''],
        ['title'=>'Hospedaje','description'=>'Bungalow y Casona disponibles para grupos. Capacidad para alojar a tu comunidad con comodidad en plena naturaleza.','image_url'=>''],
        ['title'=>'Espacios para Eventos','description'=>'Áreas verdes, gazebo y salones al aire libre para celebraciones, retiros espirituales y actividades grupales.','image_url'=>''],
    ] : [
        ['title'=>'Experiences','description'=>'Experiential tour, therapeutic horticulture workshops, educational circuits, and campfire nights — designed for large groups.','image_url'=>''],
        ['title'=>'Lodging','description'=>'Bungalow and Casona available for groups. Capacity to host your community comfortably surrounded by nature.','image_url'=>''],
        ['title'=>'Event Spaces','description'=>'Green areas, gazebo, and outdoor halls for celebrations, spiritual retreats, and group activities.','image_url'=>''],
    ];
}

$act_title = $is_es ? 'Áreas recreativas incluidas' : 'Included recreational areas';
$activities = gl_field('grp_activities') ?: [];
if (empty($activities)) {
    $activities = $is_es
        ? ['Voleibol','Fútbol','Área de picnic','Fogón nocturno','Senderos naturales','Interacción con animales']
        : ['Volleyball','Football','Picnic area','Campfire','Nature trails','Animal interaction'];
}

$groups_title = $is_es ? 'Ideal para' : 'Ideal for';
$group_types = gl_field('grp_types') ?: [];
if (empty($group_types)) {
    $group_types = $is_es
        ? ['Iglesias y comunidades','Colegios y universidades','Empresas y equipos','Familias y amigos']
        : ['Churches & communities','Schools & universities','Companies & teams','Families & friends'];
}
$grp_note = gl_field('grp_note') ?: ($is_es
    ? 'Coordinamos paquetes a medida según el tamaño y necesidades de tu grupo.'
    : 'We coordinate custom packages based on the size and needs of your group.');

$form_title    = $is_es ? 'Consultar disponibilidad' : 'Check availability';
$form_sub      = $is_es ? 'Escríbenos y coordinamos los detalles.' : 'Message us and we\'ll coordinate the details.';
$form_date_lbl = $is_es ? 'Fecha preferida' : 'Preferred date';
$form_ppl_lbl  = $is_es ? 'Número de personas' : 'Number of people';
$form_int_lbl  = $is_es ? '¿Qué les interesa?' : 'What are you interested in?';
$form_int_opts = $is_es
    ? ['Experiencias','Hospedaje','Evento especial','Todo incluido']
    : ['Experiences','Lodging','Special event','All-inclusive'];
$form_send     = $is_es ? 'Enviar consulta por WhatsApp' : 'Send enquiry via WhatsApp';

$pillar_imgs = [
    get_template_directory_uri() . '/assets/images/grupos_escuela.jpg',
    get_template_directory_uri() . '/assets/images/grupos_colegio1.jpg',
    get_template_directory_uri() . '/assets/images/grupos_iglesia.jpg',
];
$wa_num = get_option('gl_wa_number', '51966721057');
?>
<section id="grupos" class="section" style="background:var(--stone-950);color:#fff">
  <div class="container">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:4rem">
      <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($tag); ?></span>
      <h2 class="section-title section-title--white font-serif"><?php echo esc_html($title); ?></h2>
      <p style="color:var(--stone-400);font-size:1.1rem;max-width:640px;margin:0 auto;line-height:1.7"><?php echo esc_html($subtitle); ?></p>
    </div>

    <!-- Pillars -->
    <div style="margin-bottom:4rem">
      <p style="text-align:center;font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--stone-500);margin-bottom:2.5rem"><?php echo esc_html($pillars_title); ?></p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem">
        <?php foreach ($pillars as $pi => $pillar):
          $pimg = !empty($pillar['image_url']) ? esc_url($pillar['image_url']) : ($pillar_imgs[$pi] ?? $pillar_imgs[0]);
        ?>
        <div style="background:var(--stone-900);border:1px solid var(--stone-800);border-radius:1rem;overflow:hidden;transition:border-color .3s">
          <div style="height:200px;background:url('<?php echo $pimg; ?>') center/cover"></div>
          <div style="padding:1.5rem">
            <h3 style="font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.5rem"><?php echo esc_html($pillar['title']); ?></h3>
            <p style="color:var(--stone-400);font-size:.875rem;line-height:1.65"><?php echo esc_html($pillar['description']); ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Activities + Types -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;margin-bottom:4rem">
      <div style="background:var(--stone-900);border:1px solid var(--stone-800);border-radius:1rem;padding:2rem">
        <h3 style="font-size:1rem;font-weight:700;color:#fff;margin-bottom:1.5rem"><?php echo esc_html($act_title); ?></h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
          <?php foreach ($activities as $act): ?>
          <div style="background:rgba(255,255,255,.06);border-radius:.75rem;padding:.75rem 1rem;font-size:.875rem;color:rgba(255,255,255,.8)"><?php echo esc_html($act); ?></div>
          <?php endforeach; ?>
        </div>
      </div>
      <div style="background:var(--stone-900);border:1px solid var(--stone-800);border-radius:1rem;padding:2rem">
        <h3 style="font-size:1rem;font-weight:700;color:#fff;margin-bottom:1.5rem"><?php echo esc_html($groups_title); ?></h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
          <?php foreach ($group_types as $gt): ?>
          <div style="background:rgba(255,255,255,.06);border-radius:.75rem;padding:.75rem 1rem;font-size:.875rem;color:rgba(255,255,255,.8)"><?php echo esc_html($gt); ?></div>
          <?php endforeach; ?>
        </div>
        <p style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--stone-800);font-size:.8rem;color:var(--stone-500)"><?php echo esc_html($grp_note); ?></p>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center">
      <button class="btn btn--primary" id="grp-modal-open">
        <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <?php echo esc_html($cta_wa); ?>
      </button>
    </div>
  </div>
</section>

<!-- Groups Modal -->
<div class="modal-overlay hidden" id="grp-modal" role="dialog" aria-modal="true">
  <div class="modal-box">
    <div class="modal-header">
      <div>
        <div class="modal-title font-serif"><?php echo esc_html($form_title); ?></div>
        <div class="modal-sub"><?php echo esc_html($form_sub); ?></div>
      </div>
      <button class="modal-close" id="grp-modal-close" aria-label="<?php echo $is_es ? 'Cerrar' : 'Close'; ?>">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label><?php echo esc_html($form_date_lbl); ?></label>
        <input type="date" id="grp-date" style="width:100%;border:1px solid var(--stone-200);border-radius:.75rem;padding:.75rem 1rem;font-size:.9rem;color:var(--stone-800);outline:none">
      </div>
      <div>
        <label style="display:block;font-size:.9rem;font-weight:600;color:var(--stone-700);margin-bottom:.5rem">
          <?php echo esc_html($form_ppl_lbl); ?>: <span id="grp-people-val" style="color:var(--green-600);font-weight:700">15</span>
        </label>
        <input type="range" min="5" max="200" step="5" value="15" id="grp-people-range" style="width:100%;accent-color:var(--green-600)">
        <div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--stone-400);margin-top:.25rem"><span>5</span><span>200</span></div>
      </div>
      <div>
        <label style="display:block;font-size:.9rem;font-weight:600;color:var(--stone-700);margin-bottom:.75rem"><?php echo esc_html($form_int_lbl); ?></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem" id="grp-interests">
          <?php foreach ($form_int_opts as $opt): ?>
          <button type="button" class="grp-interest-btn" data-opt="<?php echo esc_attr($opt); ?>"
                  style="padding:.65rem 1rem;border-radius:.75rem;border:1px solid var(--stone-200);background:#fff;font-size:.875rem;font-weight:500;color:var(--stone-600);cursor:pointer;transition:all .2s">
            <?php echo esc_html($opt); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>
      <a href="#" id="grp-wa-link" target="_blank" rel="noopener noreferrer" class="btn btn--primary" style="width:100%;justify-content:center">
        <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <?php echo esc_html($form_send); ?>
      </a>
    </div>
  </div>
</div>

<script>
(function(){
  var waNum = <?php echo json_encode(get_option('gl_wa_number','51966721057')); ?>;
  var isEs  = <?php echo json_encode($is_es); ?>;
  var interests = [];

  document.querySelectorAll('.grp-interest-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var opt = this.dataset.opt;
      if(interests.includes(opt)){
        interests = interests.filter(function(x){return x!==opt;});
        this.style.background='#fff'; this.style.color='var(--stone-600)'; this.style.borderColor='var(--stone-200)';
      } else {
        interests.push(opt);
        this.style.background='var(--green-600)'; this.style.color='#fff'; this.style.borderColor='var(--green-600)';
      }
      updateGrpLink();
    });
  });

  var rangeEl = document.getElementById('grp-people-range');
  var valEl   = document.getElementById('grp-people-val');
  if(rangeEl) rangeEl.addEventListener('input', function(){ valEl.textContent=this.value; updateGrpLink(); });

  function updateGrpLink(){
    var date   = (document.getElementById('grp-date')||{}).value || '';
    var people = (document.getElementById('grp-people-range')||{}).value || '15';
    var lines  = isEs
      ? ['Hola, me interesa hacer una reserva para un grupo.', date?'Fecha preferida: '+date:'', 'Número de personas: '+people, interests.length?'Intereses: '+interests.join(', '):'', '¿Pueden darme más información?']
      : ['Hi, I\'m interested in booking for a group.', date?'Preferred date: '+date:'', 'Number of people: '+people, interests.length?'Interests: '+interests.join(', '):'', 'Can you give me more information?'];
    var msg = lines.filter(Boolean).join('\n');
    var link = document.getElementById('grp-wa-link');
    if(link) link.href = 'https://wa.me/'+waNum+'?text='+encodeURIComponent(msg);
  }
  updateGrpLink();
  if(document.getElementById('grp-date')) document.getElementById('grp-date').addEventListener('change', updateGrpLink);
})();
</script>
