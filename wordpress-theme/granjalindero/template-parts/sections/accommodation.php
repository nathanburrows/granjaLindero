<?php
$is_es = gl_lang() === 'es';

$label      = gl_field('acc_label')    ?: ($is_es ? 'Hospedaje' : 'Lodging');
$cta_text   = gl_field('acc_cta')      ?: ($is_es ? 'Ver disponibilidad' : 'View availability');
$check_in   = gl_field('acc_check_in') ?: ($is_es ? 'Llegada: 14:00 – 15:30' : 'Check-in: 14:00 – 15:30');
$check_out  = gl_field('acc_check_out')?: ($is_es ? 'Salida: 08:00 – 11:00'  : 'Check-out: 08:00 – 11:00');
$book_note  = gl_field('acc_book_note')?: ($is_es
    ? 'Se requiere reserva con al menos 1 día de anticipación. No se aceptan reservas el mismo día.'
    : 'Booking required at least 1 day in advance. Same-day bookings not accepted.');
$rules_note = gl_field('acc_rules_note')?: ($is_es
    ? 'No se permiten mascotas · No se permite fumar · Silencio: 22:00 – 07:00'
    : 'No pets · No smoking · Quiet hours: 22:00 – 07:00');
$breakfast_addon  = gl_field('acc_breakfast_addon') ?: ($is_es ? 'Desayuno continental disponible' : 'Continental breakfast available');
$also_available   = $is_es ? 'También disponible en' : 'Also available in';
$cta_check        = $is_es ? 'Consultar disponibilidad' : 'Check availability';
$lbl_adults       = $is_es ? 'Adultos' : 'Adults';
$lbl_children     = $is_es ? 'Niños'   : 'Children';
$lbl_nights       = $is_es ? 'Noches'  : 'Nights';
$lbl_checkin      = $is_es ? 'Llegada' : 'Check-in';
$lbl_checkout     = $is_es ? 'Salida'  : 'Check-out';
$lbl_breakfast    = $is_es ? 'Agregar desayuno' : 'Add breakfast';
$lbl_by_dates     = $is_es ? 'Por fechas' : 'By dates';
$lbl_by_nights    = $is_es ? 'Por noches' : 'By nights';
$selected_txt     = $is_es ? 'Seleccionado' : 'Selected';

$buildings = gl_field('acc_buildings') ?: [];
if (empty($buildings)) {
    $buildings = $is_es ? [
        [
            'id'=>'bungalow', 'name'=>'Bungalow', 'subtitle'=>'Duerme entre la naturaleza',
            'description'=>'Bungalow privado rodeado de árboles frutales en el corazón de la granja. Acogedor y tranquilo, con baños privados, ropa de cama incluida y hervidor eléctrico.',
            'features'=>["WiFi gratuito","Baños privados con ducha","Ropa de cama y toallas","Hervidor eléctrico","Refrigeradora","Terraza y jardín","Restaurante en sitio","Área de juegos infantiles","Estacionamiento privado","Seguridad 24 horas"],
            'image_url'=>'',
        ],
        [
            'id'=>'casona', 'name'=>'Casona de Paz', 'subtitle'=>'Casa colonial de campo',
            'description'=>'Casa colonial de dos plantas en el corazón del valle de Tomaykichwa, a 45 minutos de Huánuco. Desayuno continental incluido. Perfecta para familias, parejas y grupos.',
            'features'=>["Desayuno continental incluido","WiFi gratuito","Estacionamiento privado","Restaurante en sitio","Terraza y jardín","Sala común con TV","Área de juegos infantiles","Cunas disponibles sin costo","Niños bienvenidos","Seguridad 24 horas"],
            'image_url'=>'',
        ],
    ] : [
        [
            'id'=>'bungalow', 'name'=>'Bungalow', 'subtitle'=>'Sleep surrounded by nature',
            'description'=>'Private bungalow surrounded by fruit trees in the heart of the farm. Cozy and peaceful, with private bathrooms, bed linen, and electric kettle.',
            'features'=>["Free WiFi","Private bathroom with shower","Bed linen & towels","Electric kettle","Refrigerator","Terrace & garden","On-site restaurant","Children's play area","Private parking","24-hour security"],
            'image_url'=>'',
        ],
        [
            'id'=>'casona', 'name'=>'Casona de Paz', 'subtitle'=>'Colonial country house',
            'description'=>'Two-story colonial house in the heart of the Tomaykichwa valley, 45 minutes from Huánuco. Continental breakfast included. Perfect for families, couples, and groups.',
            'features'=>["Continental breakfast included","Free WiFi","Private parking","On-site restaurant","Terrace & garden","Common room with TV","Children's play area","Cribs available free","Children welcome","24-hour security"],
            'image_url'=>'',
        ],
    ];
}

$rooms = gl_field('acc_rooms') ?: [];
if (empty($rooms)) {
    $rooms = $is_es ? [
        ['building_id'=>'bungalow','building'=>'Bungalow','title'=>'Habitación Matrimonial','description'=>'Bungalow privado con cama doble matrimonial, rodeado de árboles frutales. Hasta 2 personas.','features'=>["1 cama doble matrimonial","Hasta 2 huéspedes","Baño privado con ducha","Amenidades de baño gratuitas","Ropa de cama y toallas","Hervidor eléctrico","Refrigeradora","WiFi gratuito"],'image_url'=>''],
        ['building_id'=>'bungalow','building'=>'Bungalow','title'=>'Habitación Grupal','description'=>'Bungalow con 4 camas individuales en litera, ideal para grupos y familias. Hasta 4 personas.','features'=>["4 camas individuales (2 literas)","Hasta 4 huéspedes","Baño privado con ducha","Amenidades de baño gratuitas","Ropa de cama y toallas","Hervidor eléctrico","Armario y perchero","WiFi gratuito"],'image_url'=>''],
        ['building_id'=>'casona','building'=>'Casona de Paz','title'=>'Habitación Matrimonial','description'=>'Habitación doble en la Casona colonial con acceso a terraza y jardines. Hasta 2 personas.','features'=>["1 cama doble matrimonial","Hasta 2 huéspedes","Baño privado con ducha","Amenidades de baño gratuitas","Ropa de cama y toallas","Armario","Hervidor eléctrico","WiFi gratuito"],'image_url'=>''],
        ['building_id'=>'casona','building'=>'Casona de Paz','title'=>'Habitación Grupal','description'=>'Habitación con camas en litera en la Casona, perfecta para familias. Hasta 4 personas.','features'=>["4 camas individuales (2 literas)","Hasta 4 huéspedes","Baño privado con ducha","Amenidades de baño gratuitas","Ropa de cama y toallas","Hervidor eléctrico","Refrigeradora","WiFi gratuito"],'image_url'=>''],
    ] : [
        ['building_id'=>'bungalow','building'=>'Bungalow','title'=>'Double Room','description'=>'Private bungalow with double bed surrounded by fruit trees. Up to 2 guests.','features'=>["1 double bed","Up to 2 guests","Private bathroom with shower","Free toiletries","Bed linen & towels","Electric kettle","Refrigerator","Free WiFi"],'image_url'=>''],
        ['building_id'=>'bungalow','building'=>'Bungalow','title'=>'Group Room','description'=>'Bungalow with 4 bunk beds, ideal for small groups and families. Up to 4 guests.','features'=>["4 single beds (2 bunk beds)","Up to 4 guests","Private bathroom with shower","Free toiletries","Bed linen & towels","Electric kettle","Wardrobe & hangers","Free WiFi"],'image_url'=>''],
        ['building_id'=>'casona','building'=>'Casona de Paz','title'=>'Double Room','description'=>'Double room in the colonial Casona with access to terrace and gardens. Up to 2 guests.','features'=>["1 double bed","Up to 2 guests","Private bathroom with shower","Free toiletries","Bed linen & towels","Wardrobe","Electric kettle","Free WiFi"],'image_url'=>''],
        ['building_id'=>'casona','building'=>'Casona de Paz','title'=>'Group Room','description'=>'Room with bunk beds in the Casona, perfect for families and groups. Up to 4 guests.','features'=>["4 single beds (2 bunk beds)","Up to 4 guests","Private bathroom with shower","Free toiletries","Bed linen & towels","Electric kettle","Refrigerator","Free WiFi"],'image_url'=>''],
    ];
}

$img_bungalow = get_template_directory_uri() . '/assets/images/hospedaje_cabana_bosque.jpg';
$img_casona   = get_template_directory_uri() . '/assets/images/hospedaje_edificio_principal.jpg';
$img_room_dbl = get_template_directory_uri() . '/assets/images/hospedaje_habitacion_doble.jpg';
$img_room_twn = get_template_directory_uri() . '/assets/images/hospedaje_habitacion_twin.jpg';
?>
<section id="hospedaje" class="section section--dark">
  <div class="container">
    <div id="acc-panels">
      <?php foreach ($buildings as $bi => $b):
        $bid    = esc_attr($b['id'] ?? 'building-'.$bi);
        $bimg   = !empty($b['image_url']) ? esc_url($b['image_url']) : ($bi===0 ? $img_bungalow : $img_casona);
        $b_rooms = array_filter($rooms, fn($r)=> ($r['building_id'] ?? '') === ($b['id'] ?? ''));
      ?>
      <div class="acc-panel" data-panel="<?php echo $bid; ?>" style="<?php echo $bi>0 ? 'display:none' : ''; ?>">
        <div class="grid-2" style="margin-bottom:2.5rem">
          <!-- Image -->
          <div style="position:relative">
            <div class="acc-main-image" style="background-image:url('<?php echo $bimg; ?>')"></div>
            <div class="acc-main-badge">
              <div class="acc-main-badge-name"><?php echo esc_html($b['name']); ?></div>
              <div class="acc-main-badge-sub">Huánuco, Perú</div>
            </div>
          </div>

          <!-- Text -->
          <div>
            <span class="label-tag" style="color:var(--green-400)"><?php echo esc_html($label); ?></span>
            <h2 class="section-title section-title--white font-serif"><?php echo esc_html($b['name']); ?></h2>
            <p style="color:rgba(255,255,255,.5);font-size:1.15rem;font-weight:300;margin-bottom:1.25rem"><?php echo esc_html($b['subtitle']); ?></p>
            <p style="color:rgba(255,255,255,.75);font-size:1rem;line-height:1.75;margin-bottom:2rem"><?php echo esc_html($b['description']); ?></p>
            <div class="acc-features">
              <?php foreach ((array)($b['features'] ?? []) as $f): ?>
              <div class="acc-feature">
                <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                <?php echo esc_html($f); ?>
              </div>
              <?php endforeach; ?>
            </div>
            <button class="btn btn--primary acc-open-modal" data-building="<?php echo $bid; ?>">
              <?php echo esc_html($cta_text); ?>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:1rem;height:1rem"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Building selector -->
    <div class="acc-buildings" id="acc-buildings">
      <?php foreach ($buildings as $bi => $b):
        $bid  = esc_attr($b['id'] ?? 'building-'.$bi);
        $bimg = !empty($b['image_url']) ? esc_url($b['image_url']) : ($bi===0 ? $img_bungalow : $img_casona);
      ?>
      <button class="acc-building-btn<?php echo $bi===0 ? ' active' : ''; ?>" data-target="<?php echo $bid; ?>"
              style="background-image:url('<?php echo $bimg; ?>')">
        <div class="acc-building-overlay"></div>
        <div class="acc-building-label">
          <div class="acc-building-name"><?php echo esc_html($b['name']); ?></div>
          <div class="acc-building-sub"><?php echo esc_html($b['subtitle']); ?></div>
        </div>
        <?php if ($bi===0): ?>
        <div class="acc-selected-badge"><?php echo $selected_txt; ?></div>
        <?php endif; ?>
      </button>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Room Availability Modal -->
<div class="modal-overlay hidden" id="acc-modal" role="dialog" aria-modal="true">
  <div class="modal-box room-modal">
    <div class="modal-header">
      <div>
        <div class="modal-title font-serif" id="acc-modal-title"><?php echo esc_html($buildings[0]['name'] ?? ''); ?></div>
        <div class="modal-sub">La Granja Ecológica Lindero · Huánuco, Perú</div>
      </div>
      <button class="modal-close" id="acc-modal-close" aria-label="<?php echo $is_es ? 'Cerrar' : 'Close'; ?>">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Check-in/out info -->
    <div style="padding:1rem 1.75rem;border-bottom:1px solid var(--stone-100)">
      <div class="room-modal-info">
        <?php foreach ([$check_in, $check_out] as $chip): ?>
        <span class="room-info-chip">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <?php echo esc_html($chip); ?>
        </span>
        <?php endforeach; ?>
      </div>
      <p class="room-booking-note"><?php echo esc_html($book_note); ?></p>
      <p class="room-rules"><?php echo esc_html($rules_note); ?></p>
    </div>

    <!-- Booking form -->
    <div class="booking-form">
      <div class="mode-toggle">
        <button class="mode-btn active" data-mode="dates"><?php echo $lbl_by_dates; ?></button>
        <button class="mode-btn" data-mode="nights"><?php echo $lbl_by_nights; ?></button>
      </div>

      <div id="mode-dates">
        <div class="form-row">
          <div class="form-group">
            <label><?php echo $lbl_checkin; ?></label>
            <input type="date" id="acc-checkin">
          </div>
          <div class="form-group">
            <label><?php echo $lbl_checkout; ?></label>
            <input type="date" id="acc-checkout">
          </div>
        </div>
      </div>
      <div id="mode-nights" style="display:none">
        <div class="form-row">
          <div class="form-group">
            <label><?php echo $lbl_checkin; ?></label>
            <input type="date" id="acc-checkin-n">
          </div>
          <div class="form-group" style="display:flex;flex-direction:column;justify-content:flex-end">
            <label><?php echo $lbl_nights; ?></label>
            <div class="stepper">
              <button class="stepper-btn" id="nights-dec">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
              </button>
              <span class="stepper-val" id="nights-val">2</span>
              <button class="stepper-btn" id="nights-inc">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
            <p id="effective-checkout" style="font-size:.75rem;color:var(--stone-400);margin-top:.4rem"></p>
          </div>
        </div>
      </div>

      <div class="guests-row">
        <div class="guest-group">
          <label><?php echo $lbl_adults; ?></label>
          <div class="stepper">
            <button class="stepper-btn" id="adults-dec"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>
            <span class="stepper-val" id="adults-val">2</span>
            <button class="stepper-btn" id="adults-inc"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg></button>
          </div>
        </div>
        <div class="guest-group">
          <label><?php echo $lbl_children; ?></label>
          <div class="stepper">
            <button class="stepper-btn" id="children-dec"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>
            <span class="stepper-val" id="children-val">0</span>
            <button class="stepper-btn" id="children-inc"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg></button>
          </div>
        </div>
      </div>

      <label class="breakfast-toggle" id="breakfast-toggle">
        <div class="toggle-switch" id="breakfast-switch">
          <div class="toggle-knob"></div>
        </div>
        <span class="toggle-label"><?php echo $lbl_breakfast; ?> <span>— <?php echo esc_html($breakfast_addon); ?></span></span>
      </label>
    </div>

    <!-- Rooms -->
    <div style="padding:1.5rem 1.75rem">
      <?php foreach ($buildings as $bi => $b):
        $bid     = esc_attr($b['id'] ?? 'building-'.$bi);
        $b_rooms = array_values(array_filter($rooms, fn($r)=>($r['building_id']??'')===($b['id']??'')));
        $bimg    = !empty($b['image_url']) ? esc_url($b['image_url']) : ($bi===0 ? $img_bungalow : $img_casona);
        $other_buildings = array_filter($buildings, fn($ob)=>($ob['id']??'')!==($b['id']??''));
      ?>
      <div class="acc-modal-rooms" data-building-rooms="<?php echo $bid; ?>" style="<?php echo $bi>0 ? 'display:none' : ''; ?>">
        <div class="rooms-grid">
          <?php foreach ($b_rooms as $room):
            $rimg = !empty($room['image_url'])
                ? esc_url($room['image_url'])
                : (str_contains($room['title']??'', 'Matrimon') || str_contains($room['title']??'', 'Double') ? $img_room_dbl : $img_room_twn);
          ?>
          <div class="room-card">
            <div class="room-img" style="background-image:url('<?php echo $rimg; ?>')"></div>
            <div class="room-body">
              <div class="room-title font-serif"><?php echo esc_html($room['title']); ?></div>
              <p class="room-desc"><?php echo esc_html($room['description']); ?></p>
              <div class="room-features">
                <?php foreach ((array)($room['features'] ?? []) as $rf): ?>
                <div class="room-feature">
                  <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <?php echo esc_html($rf); ?>
                </div>
                <?php endforeach; ?>
              </div>
              <a href="#" class="btn btn--primary btn--sm acc-room-wa"
                 data-building="<?php echo esc_attr($b['name']); ?>"
                 data-room="<?php echo esc_attr($room['title']); ?>"
                 style="width:100%;justify-content:center;margin-top:auto">
                <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <?php echo $cta_check; ?>
              </a>
            </div>
          </div>
          <?php endforeach; ?>
        </div>

        <?php foreach ($other_buildings as $ob):
          $ob_bid   = esc_attr($ob['id'] ?? '');
          $ob_img   = !empty($ob['image_url']) ? esc_url($ob['image_url']) : ($ob['id']==='bungalow' ? $img_bungalow : $img_casona);
          $ob_rooms = array_values(array_filter($rooms, fn($r)=>($r['building_id']??'')===($ob['id']??'')));
        ?>
        <div class="acc-other-building">
          <div class="acc-other-header" style="background-image:url('<?php echo $ob_img; ?>')">
            <div class="acc-other-header-overlay"></div>
            <div class="acc-other-header-text">
              <p class="acc-other-label"><?php echo $also_available; ?></p>
              <div class="acc-other-name font-serif"><?php echo esc_html($ob['name']); ?></div>
              <div class="acc-other-sub"><?php echo esc_html($ob['subtitle']); ?></div>
            </div>
          </div>
          <div class="acc-other-rooms">
            <?php foreach ($ob_rooms as $room):
              $rimg = !empty($room['image_url'])
                  ? esc_url($room['image_url'])
                  : (str_contains($room['title']??'', 'Matrimon') || str_contains($room['title']??'', 'Double') ? $img_room_dbl : $img_room_twn);
            ?>
            <div class="room-card">
              <div class="room-img" style="background-image:url('<?php echo $rimg; ?>')"></div>
              <div class="room-body">
                <div class="room-title font-serif"><?php echo esc_html($room['title']); ?></div>
                <p class="room-desc"><?php echo esc_html($room['description']); ?></p>
                <div class="room-features">
                  <?php foreach (array_slice((array)($room['features'] ?? []), 0, 4) as $rf): ?>
                  <div class="room-feature">
                    <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    <?php echo esc_html($rf); ?>
                  </div>
                  <?php endforeach; ?>
                </div>
                <a href="#" class="btn btn--outline btn--sm acc-room-wa"
                   data-building="<?php echo esc_attr($ob['name']); ?>"
                   data-room="<?php echo esc_attr($room['title']); ?>"
                   style="width:100%;justify-content:center;margin-top:auto">
                  <?php echo $cta_check; ?>
                </a>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
