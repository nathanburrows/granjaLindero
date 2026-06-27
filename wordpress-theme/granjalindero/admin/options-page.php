<?php
if (!defined('ABSPATH')) exit;

// ── Admin menu ─────────────────────────────────────────────────
add_action('admin_menu', function () {
    add_menu_page(
        'Site Content',
        'Site Content',
        'manage_options',
        'gl-content',
        'gl_content_page',
        'dashicons-admin-site-alt3',
        25
    );
});

// ── All editable option keys and their input types ─────────────
function gl_option_keys(): array {
    return [
        // General
        'gl_wa_number'            => 'text',
        'gl_phone'                => 'text',
        'gl_hours_es'             => 'text',
        'gl_hours_en'             => 'text',
        // Hero
        'gl_hero_tagline_es'      => 'text',
        'gl_hero_tagline_en'      => 'text',
        'gl_hero_subtitle_es'     => 'textarea',
        'gl_hero_subtitle_en'     => 'textarea',
        'gl_hero_cta_exp_es'      => 'text',
        'gl_hero_cta_exp_en'      => 'text',
        'gl_hero_cta_room_es'     => 'text',
        'gl_hero_cta_room_en'     => 'text',
        // About
        'gl_about_label_es'       => 'text',
        'gl_about_label_en'       => 'text',
        'gl_about_title_es'       => 'text',
        'gl_about_title_en'       => 'text',
        'gl_about_body_es'        => 'textarea',
        'gl_about_body_en'        => 'textarea',
        'gl_about_stat1'          => 'text',
        'gl_about_stat1_label_es' => 'text',
        'gl_about_stat1_label_en' => 'text',
        'gl_about_stat2'          => 'text',
        'gl_about_stat2_label_es' => 'text',
        'gl_about_stat2_label_en' => 'text',
        'gl_about_stat3'          => 'text',
        'gl_about_stat3_label_es' => 'text',
        'gl_about_stat3_label_en' => 'text',
        'gl_about_mission_es'     => 'textarea',
        'gl_about_mission_en'     => 'textarea',
        'gl_about_vision_es'      => 'textarea',
        'gl_about_vision_en'      => 'textarea',
        'gl_about_impact_note_es' => 'textarea',
        'gl_about_impact_note_en' => 'textarea',
        // Packages
        'gl_pkg_tag_es'           => 'text',
        'gl_pkg_tag_en'           => 'text',
        'gl_pkg_title_es'         => 'text',
        'gl_pkg_title_en'         => 'text',
        'gl_pkg_subtitle_es'      => 'textarea',
        'gl_pkg_subtitle_en'      => 'textarea',
        'gl_pkg_note_es'          => 'text',
        'gl_pkg_note_en'          => 'text',
        'gl_pkg_1_price'          => 'text',
        'gl_pkg_2_price'          => 'text',
        'gl_pkg_3_price'          => 'text',
        'gl_pkg_4_price'          => 'text',
        // Contact
        'gl_contact_label_es'     => 'text',
        'gl_contact_label_en'     => 'text',
        'gl_contact_title_es'     => 'text',
        'gl_contact_title_en'     => 'text',
        'gl_contact_subtitle_es'  => 'textarea',
        'gl_contact_subtitle_en'  => 'textarea',
    ];
}

// ── Page renderer ──────────────────────────────────────────────
function gl_content_page() {
    if (!current_user_can('manage_options')) wp_die('No permission.');

    $saved = false;
    if (!empty($_POST) && check_admin_referer('gl_save_content', '_gl_nonce')) {
        foreach (gl_option_keys() as $key => $type) {
            $raw = $_POST[$key] ?? '';
            $val = ($type === 'textarea') ? sanitize_textarea_field($raw) : sanitize_text_field($raw);
            update_option($key, $val, false);
        }
        $saved = true;
    }

    $tab  = sanitize_key($_GET['tab'] ?? 'general');
    $tabs = [
        'general'  => 'General',
        'hero'     => 'Hero',
        'about'    => 'About',
        'packages' => 'Packages',
        'contact'  => 'Contact',
    ];
    ?>
    <div class="wrap">
    <h1 style="display:flex;align-items:center;gap:.5rem">
        <span style="font-size:1.4rem">🌿</span> Site Content
    </h1>
    <p style="color:#666;margin-top:-.5rem">Edit text shown on the website. Changes go live immediately after saving. Leave a field blank to use the built-in default.</p>

    <?php if ($saved): ?>
    <div class="notice notice-success is-dismissible"><p><strong>Saved!</strong> Changes are live on the site.</p></div>
    <?php endif; ?>

    <nav class="nav-tab-wrapper wp-clearfix" style="margin-bottom:0">
    <?php foreach ($tabs as $key => $label): ?>
        <a href="?page=gl-content&tab=<?php echo esc_attr($key); ?>"
           class="nav-tab<?php echo $tab === $key ? ' nav-tab-active' : ''; ?>">
            <?php echo esc_html($label); ?>
        </a>
    <?php endforeach; ?>
    </nav>

    <form method="post" style="background:#fff;border:1px solid #ccd0d4;border-top:none;padding:1.5rem 2rem 2rem;margin-bottom:2rem">
    <?php wp_nonce_field('gl_save_content', '_gl_nonce'); ?>

    <?php if ($tab === 'general'): ?>

        <h2>General Settings</h2>
        <p style="color:#666">These apply to the whole site.</p>
        <table class="form-table" role="presentation">
            <tr>
                <th scope="row">WhatsApp Number</th>
                <td>
                    <?php gl_opt_input('gl_wa_number', 'text', '51966721057'); ?>
                    <p class="description">Digits only with country code. Example: <code>51966721057</code></p>
                </td>
            </tr>
            <tr>
                <th scope="row">Phone (display)</th>
                <td><?php gl_opt_input('gl_phone', 'text', '+51 966 721 057'); ?></td>
            </tr>
            <tr>
                <th scope="row">Opening Hours — Español</th>
                <td><?php gl_opt_input('gl_hours_es', 'text', 'Miércoles a Domingo · 9:00 am – 5:30 pm'); ?></td>
            </tr>
            <tr>
                <th scope="row">Opening Hours — English</th>
                <td><?php gl_opt_input('gl_hours_en', 'text', 'Wednesday to Sunday · 9:00 am – 5:30 pm'); ?></td>
            </tr>
        </table>

    <?php elseif ($tab === 'hero'): ?>

        <h2>Hero Section</h2>
        <?php gl_bilingual_row('Main headline', 'hero_tagline', 'text',
            'Reconecta con la naturaleza', 'Reconnect with nature'); ?>
        <?php gl_bilingual_row('Subtitle', 'hero_subtitle', 'textarea',
            'Vive una experiencia única en nuestra granja ecológica en el corazón de Huánuco, Perú.',
            'Live a unique experience at our ecological farm in the heart of Huánuco, Peru.'); ?>
        <?php gl_bilingual_row('Button — Book experience', 'hero_cta_exp', 'text',
            'Reservar experiencia', 'Book an experience'); ?>
        <?php gl_bilingual_row('Button — Book room', 'hero_cta_room', 'text',
            'Reservar habitación', 'Book a room'); ?>

    <?php elseif ($tab === 'about'): ?>

        <h2>About Section</h2>
        <?php gl_bilingual_row('Section label', 'about_label', 'text',
            'Quiénes somos', 'Who we are'); ?>
        <?php gl_bilingual_row('Title', 'about_title', 'text',
            'Bienvenidos a La Granja Ecológica Lindero', 'Welcome to La Granja Ecológica Lindero'); ?>
        <?php gl_bilingual_row('Body text', 'about_body', 'textarea',
            'Somos un espacio donde la naturaleza, la agricultura ecológica y el bienestar se encuentran.',
            'A space where nature, ecological farming, and wellbeing come together.'); ?>

        <hr style="margin:1.5rem 0">
        <h3 style="margin-bottom:.25rem">Stats</h3>
        <p style="color:#666;font-size:.9rem">Numbers are language-neutral; labels are translated.</p>
        <?php gl_stat_rows(1, '4,100+', 'Visitantes felices', 'Happy visitors'); ?>
        <?php gl_stat_rows(2, '5+',     'Tipos de experiencias', 'Experience types'); ?>
        <?php gl_stat_rows(3, '1',      'Lugar inolvidable', 'Unforgettable place'); ?>

        <hr style="margin:1.5rem 0">
        <h3>Mission &amp; Vision</h3>
        <p style="color:#666;font-size:.9rem">These appear in the pop-up modal. Leave blank to hide.</p>
        <?php gl_bilingual_row('Mission', 'about_mission', 'textarea', '', ''); ?>
        <?php gl_bilingual_row('Vision',  'about_vision',  'textarea', '', ''); ?>
        <?php gl_bilingual_row('Impact note (30%)', 'about_impact_note', 'textarea',
            'El 30% de nuestros ingresos se destina directamente a los esfuerzos locales de Paz y Esperanza en Huánuco.',
            '30% of our revenue goes directly to local Peace & Hope efforts in Huánuco.'); ?>

    <?php elseif ($tab === 'packages'): ?>

        <h2>Packages &amp; Pricing</h2>

        <h3>Section Text</h3>
        <?php gl_bilingual_row('Label', 'pkg_tag', 'text',
            'Paquetes y Precios', 'Packages & Pricing'); ?>
        <?php gl_bilingual_row('Title', 'pkg_title', 'text',
            'Elige tu plan perfecto', 'Choose your perfect plan'); ?>
        <?php gl_bilingual_row('Subtitle', 'pkg_subtitle', 'textarea',
            'Desde una mañana hasta un fin de semana completo — tenemos el paquete ideal para ti.',
            'From a morning visit to a full weekend — we have the ideal package for you.'); ?>
        <?php gl_bilingual_row('Footer note', 'pkg_note', 'text',
            'Precios en Soles peruanos (S/). Consulta disponibilidad por WhatsApp.',
            'Prices in Peruvian Soles (S/). Ask about availability on WhatsApp.'); ?>

        <hr style="margin:1.5rem 0">
        <h3>Package Prices</h3>
        <p style="color:#666;font-size:.9rem">Prices apply to both languages.</p>
        <table class="form-table" role="presentation">
            <tr>
                <th scope="row">Half-Day</th>
                <td><?php gl_opt_input('gl_pkg_1_price', 'text', 'S/40'); ?></td>
            </tr>
            <tr>
                <th scope="row">Full-Day</th>
                <td><?php gl_opt_input('gl_pkg_2_price', 'text', 'S/55'); ?></td>
            </tr>
            <tr>
                <th scope="row">2 Days / 1 Night</th>
                <td><?php gl_opt_input('gl_pkg_3_price', 'text', 'S/200'); ?></td>
            </tr>
            <tr>
                <th scope="row">3 Days / 2 Nights</th>
                <td><?php gl_opt_input('gl_pkg_4_price', 'text', 'S/310'); ?></td>
            </tr>
        </table>

    <?php elseif ($tab === 'contact'): ?>

        <h2>Contact Section</h2>
        <?php gl_bilingual_row('Section label', 'contact_label', 'text',
            'Contacto', 'Contact'); ?>
        <?php gl_bilingual_row('Title', 'contact_title', 'text',
            '¿Listo para vivir la experiencia?', 'Ready to live the experience?'); ?>
        <?php gl_bilingual_row('Subtitle', 'contact_subtitle', 'textarea',
            'Escríbenos o llámanos para hacer tu reserva. Estamos disponibles para grupos familiares, escolares y corporativos.',
            "Write or call us to make your booking. We're available for family, school, and corporate groups."); ?>

    <?php endif; ?>

    <div style="margin-top:1.5rem"><?php submit_button('Save Changes', 'primary', 'submit', false); ?></div>
    </form>
    </div>
    <?php
}

// ── Helpers ────────────────────────────────────────────────────

function gl_bilingual_row(string $label, string $key, string $type, string $default_es, string $default_en): void {
    echo '<table class="form-table" role="presentation"><tr>';
    echo '<th scope="row">' . esc_html($label) . '</th>';
    echo '<td><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">';
    foreach (['es' => 'Español', 'en' => 'English'] as $lang => $lang_label) {
        $default = $lang === 'es' ? $default_es : $default_en;
        echo '<div>';
        echo '<p style="margin:0 0 4px;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">' . esc_html($lang_label) . '</p>';
        gl_opt_input('gl_' . $key . '_' . $lang, $type, $default);
        echo '</div>';
    }
    echo '</div></td></tr></table>';
}

function gl_stat_rows(int $n, string $default_val, string $default_label_es, string $default_label_en): void {
    echo '<table class="form-table" role="presentation">';
    echo '<tr><th scope="row">Stat ' . $n . ' — Value</th>';
    echo '<td>';
    gl_opt_input('gl_about_stat' . $n, 'text', $default_val);
    echo '</td></tr>';
    echo '<tr><th scope="row">Stat ' . $n . ' — Label</th><td>';
    echo '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">';
    foreach (['es' => [$default_label_es, 'Español'], 'en' => [$default_label_en, 'English']] as $lang => [$def, $lang_label]) {
        echo '<div>';
        echo '<p style="margin:0 0 4px;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">' . esc_html($lang_label) . '</p>';
        gl_opt_input('gl_about_stat' . $n . '_label_' . $lang, 'text', $def);
        echo '</div>';
    }
    echo '</div></td></tr></table>';
}

function gl_opt_input(string $key, string $type, string $default): void {
    $val = get_option($key, '');
    $attrs = 'name="' . esc_attr($key) . '" placeholder="' . esc_attr($default) . '"';
    if ($type === 'textarea') {
        echo '<textarea ' . $attrs . ' rows="3" class="large-text">' . esc_textarea($val) . '</textarea>';
    } else {
        echo '<input type="text" ' . $attrs . ' value="' . esc_attr($val) . '" class="regular-text">';
    }
}
