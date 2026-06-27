<?php
$is_es = gl_lang() === 'es';
$label    = gl_field('exp_label')    ?: ($is_es ? 'Lo que ofrecemos' : 'What we offer');
$title    = gl_field('exp_title')    ?: ($is_es ? 'Experiencias únicas en la granja' : 'Unique experiences on the farm');
$subtitle = gl_field('exp_subtitle') ?: ($is_es
    ? 'Desde talleres creativos hasta recorridos educativos, tenemos algo especial para cada visitante.'
    : 'From creative workshops to educational tours, we have something special for every visitor.');
$book_cta = gl_field('exp_book_cta') ?: ($is_es ? 'Reservar experiencia' : 'Book this experience');
$wa_num   = get_option('gl_wa_number', '51966721057');

$items = gl_field('exp_items') ?: [];
if (empty($items)) {
    $items = $is_es ? [
        ['subtitle'=>'Animal Friends',            'title'=>'Tour Vivencial',       'description'=>'Conoce de cerca a las vacas, ovejas, alpacas, cuyes, gallinas y más animales que viven en la granja. Interactúa con ellos, aprende sobre su cuidado y la ganadería ecológica, y disfruta de una degustación de nuestros lácteos frescos: leche del día, queso artesanal y yogur natural.', 'image_url'=>''],
        ['subtitle'=>'Horticultura Terapéutica',  'title'=>'Taller Conexión Verde','description'=>'Un espacio de bienestar donde reconectarás con la naturaleza a través de la horticultura terapéutica. Crea tu propia mascarilla natural, arma un kokedama, trabaja con suculentas, pigmentos naturales o estampado botánico. S/.50 por persona.', 'image_url'=>''],
        ['subtitle'=>'Recorrido por la granja',   'title'=>'Circuito Ecológico',   'description'=>'Recorre los senderos verdes de la granja y descubre cómo funciona un ecosistema rural sostenible. Aprenderás sobre agroecología y vida en armonía con la naturaleza. ¡Te llevas una plantita de regalo!', 'image_url'=>''],
        ['subtitle'=>'Arma tu experiencia',       'title'=>'Sesión Especial',      'description'=>'Arma tu propia experiencia a medida combinando el Tour Animal Friends, el Taller Conexión Verde, el Circuito Ecológico y más. Perfecta para cumpleaños, corporativos o retiros familiares.', 'image_url'=>''],
        ['subtitle'=>'Bajo las estrellas',        'title'=>'Noche de Fogón',       'description'=>'Vive una noche mágica bajo el cielo andino de Tomaykichwa. Reúnete alrededor de la fogata, asa salchichas al palo, comparte historias y disfruta de la tranquilidad del campo. Incluida en los paquetes de hospedaje 2D/1N y 3D/2N.', 'image_url'=>''],
    ] : [
        ['subtitle'=>'Animal Friends',        'title'=>'Experiential Tour',        'description'=>'Meet cows, sheep, alpacas, guinea pigs, hens, and more animals that call the farm home. Interact with them, learn about ecological farming, and enjoy a tasting of fresh dairy products: same-day milk, artisan cheese, and natural yogurt.', 'image_url'=>''],
        ['subtitle'=>'Therapeutic Horticulture','title'=>'Conexión Verde Workshop','description'=>'A wellness experience where you reconnect with nature through therapeutic horticulture. Create your own natural face mask, make a kokedama, work with succulents, natural pigments, or botanical stamping. S/.50 per person.', 'image_url'=>''],
        ['subtitle'=>'Farm trail tour',       'title'=>'Ecological Circuit',        'description'=>'Walk the green trails of the farm and discover how a sustainable rural ecosystem works. You\'ll learn about agroecology and living in harmony with nature. Take home a seedling as a gift!', 'image_url'=>''],
        ['subtitle'=>'Build your experience', 'title'=>'Special Session',           'description'=>'Design your own custom experience by combining the Animal Friends Tour, Conexión Verde Workshop, Ecological Circuit, and more. Perfect for birthdays, corporate activities, or family retreats.', 'image_url'=>''],
        ['subtitle'=>'Under the stars',       'title'=>'Campfire Night',            'description'=>'Spend a magical evening under the Andean sky of Tomaykichwa. Gather around the campfire, roast sausages on sticks, share stories, and enjoy the peace of the countryside. Included in the 2D/1N and 3D/2N lodging packages.', 'image_url'=>''],
    ];
}

$bg_images = [
    get_template_directory_uri() . '/assets/images/animales_alpacas.jpg',
    get_template_directory_uri() . '/assets/images/actividades_cosecha_huerto.jpg',
    get_template_directory_uri() . '/assets/images/paisaje_sendero_montana.jpg',
    get_template_directory_uri() . '/assets/images/experiencias_jardin_gazebo.jpg',
    get_template_directory_uri() . '/assets/images/experiencias_fogon_noche.jpg',
];
?>
<section id="experiencias" class="section">
  <div class="container">
    <div style="text-align:center;max-width:700px;margin:0 auto 3rem">
      <span class="label-tag"><?php echo esc_html($label); ?></span>
      <h2 class="section-title font-serif"><?php echo esc_html($title); ?></h2>
      <p class="section-body" style="margin-bottom:0"><?php echo esc_html($subtitle); ?></p>
    </div>

    <div class="exp-grid">
      <?php foreach ($items as $i => $item):
        $img = !empty($item['image_url']) ? esc_url($item['image_url']) : ($bg_images[$i] ?? $bg_images[0]);
        $msg = $is_es
            ? 'Me gustaría reservar la experiencia: ' . $item['title']
            : 'I would like to book the experience: ' . $item['title'];
        $wa  = gl_wa_url($msg);
      ?>
      <div class="exp-card" data-exp="<?php echo $i; ?>">
        <div class="exp-img" style="background-image:url('<?php echo $img; ?>')"></div>
        <div class="exp-body">
          <div class="exp-subtitle"><?php echo esc_html($item['subtitle']); ?></div>
          <h3 class="exp-title font-serif"><?php echo esc_html($item['title']); ?></h3>
          <p class="exp-desc"><?php echo esc_html($item['description']); ?></p>
          <a href="<?php echo $wa; ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary exp-cta">
            <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <?php echo esc_html($book_cta); ?>
          </a>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <div style="text-align:center;margin-top:3rem">
      <a href="<?php echo esc_url(gl_wa_url($is_es ? 'Hola, me gustaría saber más sobre las experiencias.' : 'Hi, I would like to learn more about the experiences.')); ?>"
         target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        +51 966 721 057
      </a>
    </div>
  </div>
</section>
