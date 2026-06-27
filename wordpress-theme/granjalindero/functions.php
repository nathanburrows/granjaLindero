<?php
/**
 * Granja Lindero — functions.php
 * Theme setup, scripts, ACF fields, Polylang strings, Elementor support.
 */

// ── ACF safety wrappers (never clash with ACF's own functions) ─
function gl_field($key, $post_id = false) {
    return function_exists('get_field') ? get_field($key, $post_id) : null;
}
function gl_fields($post_id = false) {
    return function_exists('get_fields') ? get_fields($post_id) : [];
}
function gl_rows($key, $post_id = false) {
    return function_exists('have_rows') ? have_rows($key, $post_id) : false;
}

// ── First-run page setup ───────────────────────────────────
add_action('init', 'gl_setup_pages');
function gl_setup_pages() {
    if (get_option('gl_pages_v3_created')) return;

    // Pages: [slug, title, template, lang]
    $pages = [
        ['granja-home',    'Home',                   '',                      'en'],
        ['inicio',         'Inicio',                  '',                      'es'],
        ['faq',            'FAQ',                    'page-faq.php',          'en'],
        ['preguntas',      'Preguntas frecuentes',   'page-faq.php',          'es'],
        ['volunteer',      'Volunteer',              'page-voluntarios.php',  'en'],
        ['voluntarios',    'Voluntarios',            'page-voluntarios.php',  'es'],
    ];

    $ids = [];
    foreach ($pages as [$slug, $title, $tpl, $lang]) {
        $existing = get_posts(['post_type'=>'page','post_status'=>'publish','name'=>$slug,'posts_per_page'=>1]);
        $id = $existing ? $existing[0]->ID : wp_insert_post(['post_title'=>$title,'post_name'=>$slug,'post_status'=>'publish','post_type'=>'page','post_content'=>'']);
        if (!is_wp_error($id)) {
            if ($tpl) update_post_meta($id, '_wp_page_template', $tpl);
            if (function_exists('pll_set_post_language')) pll_set_post_language($id, $lang);
            $ids[$slug] = $id;
        }
    }

    // Link translations for Polylang
    if (function_exists('pll_save_post_translations')) {
        if (!empty($ids['granja-home']) && !empty($ids['inicio']))
            pll_save_post_translations(['en' => $ids['granja-home'], 'es' => $ids['inicio']]);
        if (!empty($ids['faq']) && !empty($ids['preguntas']))
            pll_save_post_translations(['en' => $ids['faq'], 'es' => $ids['preguntas']]);
        if (!empty($ids['volunteer']) && !empty($ids['voluntarios']))
            pll_save_post_translations(['en' => $ids['volunteer'], 'es' => $ids['voluntarios']]);
    }

    // Set WordPress front page (EN default)
    $home_id = $ids['granja-home'] ?? 0;
    if ($home_id) {
        update_option('page_on_front', $home_id);
        update_option('show_on_front', 'page');
    }

    update_option('gl_pages_v3_created', true);
}

// ── Theme setup ────────────────────────────────────────────
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['script','style','comment-list','comment-form','search-form','gallery','caption']);
    add_theme_support('elementor');

    load_theme_textdomain('granjalindero', get_template_directory() . '/languages');

    register_nav_menus([
        'primary' => __('Primary Menu', 'granjalindero'),
    ]);
});

// ── Enqueue scripts & styles ───────────────────────────────
add_action('wp_enqueue_scripts', function () {
    // Google Fonts
    wp_enqueue_style(
        'granjalindero-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;800&display=swap',
        [], null
    );
    // Theme CSS
    wp_enqueue_style('granjalindero-style', get_template_directory_uri() . '/assets/css/theme.css', ['granjalindero-fonts'], '1.0.0');
    // Theme JS
    wp_enqueue_script('granjalindero-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0.0', true);

    // Pass data to JS
    wp_localize_script('granjalindero-main', 'GL', [
        'ajax_url'  => admin_url('admin-ajax.php'),
        'site_url'  => home_url('/'),
        'wa_number' => get_option('gl_wa_number', '51966721057'),
        'lang'      => function_exists('pll_current_language') ? pll_current_language() : 'es',
        'nonce'     => wp_create_nonce('gl_nonce'),
    ]);
});

// ── Helper: WhatsApp URL ───────────────────────────────────
function gl_wa_url(string $message = ''): string {
    $number = get_option('gl_wa_number', '51966721057');
    return 'https://wa.me/' . $number . ($message ? '?text=' . rawurlencode($message) : '');
}

// ── Helper: current lang ───────────────────────────────────
function gl_lang(): string {
    return function_exists('pll_current_language') ? pll_current_language() : 'es';
}

// ── ACF: Register all field groups programmatically ────────
add_action('acf/init', 'gl_register_acf_fields');
function gl_register_acf_fields(): void {
    if (!function_exists('acf_add_local_field_group')) return;

    // ── SITE SETTINGS ──────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_settings',
        'title'    => 'Site Settings',
        'location' => [[ ['param'=>'options_page','operator'=>'==','value'=>'gl-settings'] ]],
        'fields'   => [
            ['key'=>'field_gl_wa','label'=>'WhatsApp Number','name'=>'gl_wa_number','type'=>'text','instructions'=>'Include country code, e.g. 51966721057'],
            ['key'=>'field_gl_fb','label'=>'Facebook URL','name'=>'gl_facebook','type'=>'url'],
            ['key'=>'field_gl_maps','label'=>'Google Maps URL','name'=>'gl_maps_url','type'=>'url'],
            ['key'=>'field_gl_address','label'=>'Address','name'=>'gl_address','type'=>'text'],
            ['key'=>'field_gl_phone','label'=>'Phone Display','name'=>'gl_phone','type'=>'text'],
        ],
    ]);

    // ── HERO ──────────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_hero',
        'title'    => 'Hero Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_hero_tagline',    'label'=>'Tagline',            'name'=>'hero_tagline',     'type'=>'text'],
            ['key'=>'field_hero_subtitle',   'label'=>'Subtitle',           'name'=>'hero_subtitle',    'type'=>'textarea','rows'=>2],
            ['key'=>'field_hero_cta_exp',    'label'=>'CTA — Experiences',  'name'=>'hero_cta_exp',     'type'=>'text'],
            ['key'=>'field_hero_cta_room',   'label'=>'CTA — Room',         'name'=>'hero_cta_room',    'type'=>'text'],
            ['key'=>'field_hero_badge',      'label'=>'Location Badge',     'name'=>'hero_badge',       'type'=>'text'],
            ['key'=>'field_hero_video',      'label'=>'Background Video',   'name'=>'hero_video',       'type'=>'file','mime_types'=>'mp4,webm'],
        ],
    ]);

    // ── ABOUT ─────────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_about',
        'title'    => 'About Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_about_label',          'label'=>'Label',              'name'=>'about_label',          'type'=>'text'],
            ['key'=>'field_about_title',          'label'=>'Title',              'name'=>'about_title',          'type'=>'text'],
            ['key'=>'field_about_body',           'label'=>'Body Text',          'name'=>'about_body',           'type'=>'textarea','rows'=>4],
            ['key'=>'field_about_mission',        'label'=>'Mission',            'name'=>'about_mission',        'type'=>'textarea','rows'=>4],
            ['key'=>'field_about_mission_link',   'label'=>'Mission Link Text',  'name'=>'about_mission_link',   'type'=>'text'],
            ['key'=>'field_about_mission_url',    'label'=>'Mission Link URL',   'name'=>'about_mission_url',    'type'=>'url'],
            ['key'=>'field_about_impact_note',    'label'=>'30% Impact Note',    'name'=>'about_impact_note',    'type'=>'textarea','rows'=>2],
            ['key'=>'field_about_vision',         'label'=>'Vision',             'name'=>'about_vision',         'type'=>'textarea','rows'=>4],
            ['key'=>'field_about_img_front',      'label'=>'Image Front',        'name'=>'about_img_front',      'type'=>'image','return_format'=>'url'],
            ['key'=>'field_about_img_back',       'label'=>'Image Back',         'name'=>'about_img_back',       'type'=>'image','return_format'=>'url'],
            ['key'=>'field_about_stat1',          'label'=>'Stat 1 Value',       'name'=>'about_stat1',          'type'=>'text'],
            ['key'=>'field_about_stat1_label',    'label'=>'Stat 1 Label',       'name'=>'about_stat1_label',    'type'=>'text'],
            ['key'=>'field_about_stat2',          'label'=>'Stat 2 Value',       'name'=>'about_stat2',          'type'=>'text'],
            ['key'=>'field_about_stat2_label',    'label'=>'Stat 2 Label',       'name'=>'about_stat2_label',    'type'=>'text'],
            ['key'=>'field_about_stat3',          'label'=>'Stat 3 Value',       'name'=>'about_stat3',          'type'=>'text'],
            ['key'=>'field_about_stat3_label',    'label'=>'Stat 3 Label',       'name'=>'about_stat3_label',    'type'=>'text'],
        ],
    ]);

    // ── EXPERIENCES ───────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_experiences',
        'title'    => 'Experiences Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_exp_label',    'label'=>'Label',    'name'=>'exp_label',    'type'=>'text'],
            ['key'=>'field_exp_title',    'label'=>'Title',    'name'=>'exp_title',    'type'=>'text'],
            ['key'=>'field_exp_subtitle', 'label'=>'Subtitle', 'name'=>'exp_subtitle', 'type'=>'text'],
            [
                'key'=>'field_exp_items','label'=>'Experiences','name'=>'exp_items','type'=>'repeater',
                'button_label'=>'Add Experience',
                'sub_fields'=>[
                    ['key'=>'field_exp_img',      'label'=>'Image',       'name'=>'img',      'type'=>'image','return_format'=>'url'],
                    ['key'=>'field_exp_subtitle2','label'=>'Subtitle',    'name'=>'subtitle', 'type'=>'text'],
                    ['key'=>'field_exp_title2',   'label'=>'Title',       'name'=>'title',    'type'=>'text'],
                    ['key'=>'field_exp_desc',     'label'=>'Description', 'name'=>'desc',     'type'=>'textarea','rows'=>3],
                ],
            ],
        ],
    ]);

    // ── PACKAGES ──────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_packages',
        'title'    => 'Packages Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_pkg_label',    'label'=>'Label',    'name'=>'pkg_label',    'type'=>'text'],
            ['key'=>'field_pkg_title',    'label'=>'Title',    'name'=>'pkg_title',    'type'=>'text'],
            ['key'=>'field_pkg_subtitle', 'label'=>'Subtitle', 'name'=>'pkg_subtitle', 'type'=>'text'],
            [
                'key'=>'field_pkg_items','label'=>'Packages','name'=>'pkg_items','type'=>'repeater',
                'button_label'=>'Add Package',
                'sub_fields'=>[
                    ['key'=>'field_pkg_img',      'label'=>'Image',          'name'=>'img',      'type'=>'image','return_format'=>'url'],
                    ['key'=>'field_pkg_badge',    'label'=>'Badge',          'name'=>'badge',    'type'=>'text'],
                    ['key'=>'field_pkg_title2',   'label'=>'Title',          'name'=>'title',    'type'=>'text'],
                    ['key'=>'field_pkg_subtitle2','label'=>'Subtitle',       'name'=>'subtitle', 'type'=>'text'],
                    ['key'=>'field_pkg_price',    'label'=>'Price',          'name'=>'price',    'type'=>'text'],
                    ['key'=>'field_pkg_features', 'label'=>'Features (one per line)','name'=>'features','type'=>'textarea','rows'=>4],
                ],
            ],
        ],
    ]);

    // ── ACCOMMODATION ─────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_accommodation',
        'title'    => 'Accommodation Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_acc_label',        'label'=>'Label',          'name'=>'acc_label',        'type'=>'text'],
            ['key'=>'field_acc_checkin',      'label'=>'Check-in Time',  'name'=>'acc_checkin',      'type'=>'text'],
            ['key'=>'field_acc_checkout',     'label'=>'Check-out Time', 'name'=>'acc_checkout',     'type'=>'text'],
            ['key'=>'field_acc_booking_note', 'label'=>'Booking Note',   'name'=>'acc_booking_note', 'type'=>'text'],
            ['key'=>'field_acc_rules',        'label'=>'House Rules',    'name'=>'acc_rules',        'type'=>'text'],
            [
                'key'=>'field_acc_buildings','label'=>'Buildings','name'=>'acc_buildings','type'=>'repeater',
                'button_label'=>'Add Building',
                'sub_fields'=>[
                    ['key'=>'field_acc_b_id',       'label'=>'ID (slug)',      'name'=>'id',       'type'=>'text'],
                    ['key'=>'field_acc_b_name',     'label'=>'Name',           'name'=>'name',     'type'=>'text'],
                    ['key'=>'field_acc_b_subtitle', 'label'=>'Subtitle',       'name'=>'subtitle', 'type'=>'text'],
                    ['key'=>'field_acc_b_desc',     'label'=>'Description',    'name'=>'desc',     'type'=>'textarea','rows'=>3],
                    ['key'=>'field_acc_b_features', 'label'=>'Features (one per line)','name'=>'features','type'=>'textarea','rows'=>5],
                    ['key'=>'field_acc_b_img',      'label'=>'Image',          'name'=>'img',      'type'=>'image','return_format'=>'url'],
                ],
            ],
            [
                'key'=>'field_acc_rooms','label'=>'Rooms','name'=>'acc_rooms','type'=>'repeater',
                'button_label'=>'Add Room',
                'sub_fields'=>[
                    ['key'=>'field_acc_r_building', 'label'=>'Building ID',    'name'=>'building_id','type'=>'text'],
                    ['key'=>'field_acc_r_title',    'label'=>'Room Name',      'name'=>'title',      'type'=>'text'],
                    ['key'=>'field_acc_r_desc',     'label'=>'Description',    'name'=>'desc',       'type'=>'textarea','rows'=>2],
                    ['key'=>'field_acc_r_features', 'label'=>'Amenities (one per line)','name'=>'features','type'=>'textarea','rows'=>5],
                    ['key'=>'field_acc_r_img',      'label'=>'Image',          'name'=>'img',        'type'=>'image','return_format'=>'url'],
                ],
            ],
        ],
    ]);

    // ── RESTAURANT ────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_restaurant',
        'title'    => 'Restaurant Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_rest_label',    'label'=>'Label',       'name'=>'rest_label',    'type'=>'text'],
            ['key'=>'field_rest_title',    'label'=>'Title',       'name'=>'rest_title',    'type'=>'text'],
            ['key'=>'field_rest_desc',     'label'=>'Description', 'name'=>'rest_desc',     'type'=>'textarea','rows'=>3],
            ['key'=>'field_rest_features', 'label'=>'Features (one per line)', 'name'=>'rest_features', 'type'=>'textarea','rows'=>4],
            ['key'=>'field_rest_img',      'label'=>'Main Image',  'name'=>'rest_img',      'type'=>'image','return_format'=>'url'],
        ],
    ]);

    // ── STORE ─────────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_store',
        'title'    => 'Store Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_store_label', 'label'=>'Label', 'name'=>'store_label', 'type'=>'text'],
            ['key'=>'field_store_title', 'label'=>'Title', 'name'=>'store_title', 'type'=>'text'],
            [
                'key'=>'field_store_items','label'=>'Products','name'=>'store_items','type'=>'repeater',
                'button_label'=>'Add Product',
                'sub_fields'=>[
                    ['key'=>'field_store_img',  'label'=>'Image',       'name'=>'img',  'type'=>'image','return_format'=>'url'],
                    ['key'=>'field_store_name', 'label'=>'Name',        'name'=>'name', 'type'=>'text'],
                    ['key'=>'field_store_desc', 'label'=>'Description', 'name'=>'desc', 'type'=>'textarea','rows'=>2],
                ],
            ],
        ],
    ]);

    // ── GROUPS ────────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_groups',
        'title'    => 'Groups Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_groups_label',    'label'=>'Label',       'name'=>'groups_label',    'type'=>'text'],
            ['key'=>'field_groups_title',    'label'=>'Title',       'name'=>'groups_title',    'type'=>'text'],
            ['key'=>'field_groups_subtitle', 'label'=>'Subtitle',    'name'=>'groups_subtitle', 'type'=>'textarea','rows'=>2],
            ['key'=>'field_groups_features', 'label'=>'Features (one per line)', 'name'=>'groups_features', 'type'=>'textarea','rows'=>5],
            ['key'=>'field_groups_img',      'label'=>'Image',       'name'=>'groups_img',      'type'=>'image','return_format'=>'url'],
        ],
    ]);

    // ── GALLERY ───────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_gallery',
        'title'    => 'Gallery Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_gal_label',  'label'=>'Label', 'name'=>'gal_label', 'type'=>'text'],
            ['key'=>'field_gal_title',  'label'=>'Title', 'name'=>'gal_title', 'type'=>'text'],
            ['key'=>'field_gal_images', 'label'=>'Images','name'=>'gal_images','type'=>'gallery','return_format'=>'array','min'=>1],
        ],
    ]);

    // ── TESTIMONIALS ──────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_testimonials',
        'title'    => 'Testimonials',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_testi_label', 'label'=>'Label', 'name'=>'testi_label', 'type'=>'text'],
            ['key'=>'field_testi_title', 'label'=>'Title', 'name'=>'testi_title', 'type'=>'text'],
            [
                'key'=>'field_testi_items','label'=>'Reviews','name'=>'testi_items','type'=>'repeater',
                'button_label'=>'Add Review',
                'sub_fields'=>[
                    ['key'=>'field_testi_name',  'label'=>'Name',   'name'=>'name',  'type'=>'text'],
                    ['key'=>'field_testi_stars', 'label'=>'Stars',  'name'=>'stars', 'type'=>'number','min'=>1,'max'=>5,'default_value'=>5],
                    ['key'=>'field_testi_text',  'label'=>'Review', 'name'=>'text',  'type'=>'textarea','rows'=>3],
                ],
            ],
        ],
    ]);

    // ── CONTACT ───────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_contact',
        'title'    => 'Contact Section',
        'location' => [[ ['param'=>'page_type','operator'=>'==','value'=>'front_page'] ]],
        'fields'   => [
            ['key'=>'field_contact_label',    'label'=>'Label',    'name'=>'contact_label',    'type'=>'text'],
            ['key'=>'field_contact_title',    'label'=>'Title',    'name'=>'contact_title',    'type'=>'text'],
            ['key'=>'field_contact_subtitle', 'label'=>'Subtitle', 'name'=>'contact_subtitle', 'type'=>'textarea','rows'=>2],
        ],
    ]);

    // ── FAQ PAGE ──────────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_faq',
        'title'    => 'FAQ Page',
        'location' => [[ ['param'=>'page_template','operator'=>'==','value'=>'page-faq.php'] ]],
        'fields'   => [
            ['key'=>'field_faq_label',    'label'=>'Label',    'name'=>'faq_label',    'type'=>'text'],
            ['key'=>'field_faq_title',    'label'=>'Title',    'name'=>'faq_title',    'type'=>'text'],
            ['key'=>'field_faq_subtitle', 'label'=>'Subtitle', 'name'=>'faq_subtitle', 'type'=>'text'],
            [
                'key'=>'field_faq_items','label'=>'Questions','name'=>'faq_items','type'=>'repeater',
                'button_label'=>'Add Question',
                'sub_fields'=>[
                    ['key'=>'field_faq_q','label'=>'Question','name'=>'q','type'=>'text'],
                    ['key'=>'field_faq_a','label'=>'Answer',  'name'=>'a','type'=>'textarea','rows'=>3],
                ],
            ],
        ],
    ]);

    // ── VOLUNTEER PAGE ────────────────────────────────────
    acf_add_local_field_group([
        'key'      => 'group_gl_volunteer',
        'title'    => 'Volunteer Page',
        'location' => [[ ['param'=>'page_template','operator'=>'==','value'=>'page-voluntarios.php'] ]],
        'fields'   => [
            ['key'=>'field_vol_label',      'label'=>'Label',         'name'=>'vol_label',      'type'=>'text'],
            ['key'=>'field_vol_title',      'label'=>'Title',         'name'=>'vol_title',      'type'=>'text'],
            ['key'=>'field_vol_subtitle',   'label'=>'Subtitle',      'name'=>'vol_subtitle',   'type'=>'textarea','rows'=>2],
            ['key'=>'field_vol_andemos_url','label'=>'Andemos URL',   'name'=>'vol_andemos_url','type'=>'url'],
            ['key'=>'field_vol_apply_body', 'label'=>'Apply Text',    'name'=>'vol_apply_body', 'type'=>'textarea','rows'=>3],
            ['key'=>'field_vol_offers',     'label'=>'What We Offer (one per line)','name'=>'vol_offers','type'=>'textarea','rows'=>5],
            ['key'=>'field_vol_requires',   'label'=>'Requirements (one per line)', 'name'=>'vol_requires','type'=>'textarea','rows'=>4],
            [
                'key'=>'field_vol_roles','label'=>'Roles','name'=>'vol_roles','type'=>'repeater',
                'button_label'=>'Add Role',
                'sub_fields'=>[
                    ['key'=>'field_vol_role_icon', 'label'=>'Icon (emoji)', 'name'=>'icon',  'type'=>'text'],
                    ['key'=>'field_vol_role_title','label'=>'Title',        'name'=>'title', 'type'=>'text'],
                    ['key'=>'field_vol_role_desc', 'label'=>'Description',  'name'=>'desc',  'type'=>'textarea','rows'=>2],
                ],
            ],
        ],
    ]);
}

// ── ACF options page ───────────────────────────────────────
add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Site Settings',
            'menu_title' => 'Site Settings',
            'menu_slug'  => 'gl-settings',
            'capability' => 'edit_posts',
            'icon_url'   => 'dashicons-admin-settings',
        ]);
    }
});

// ── Polylang: register UI strings ─────────────────────────
add_action('init', function () {
    if (!function_exists('pll_register_string')) return;
    $strings = [
        'nav_experiences'   => 'Experiences',
        'nav_packages'      => 'Packages',
        'nav_accommodation' => 'Lodging',
        'nav_restaurant'    => 'Restaurant',
        'nav_groups'        => 'Groups',
        'nav_contact'       => 'Contact',
        'nav_more'          => 'More',
        'nav_about'         => 'About',
        'nav_store'         => 'Store',
        'nav_gallery'       => 'Gallery',
        'nav_faq'           => 'FAQ',
        'nav_volunteer'     => 'Volunteer',
        'nav_reserve'       => 'Book Now',
        'footer_tagline'    => 'Reconnect with nature in Huánuco, Peru.',
        'footer_rights'     => 'All rights reserved.',
        'btn_book_now'      => 'Book Now',
        'btn_see_avail'     => 'See availability',
        'btn_wa_contact'    => 'Message on WhatsApp',
    ];
    foreach ($strings as $name => $default) {
        pll_register_string($name, $default, 'granjalindero');
    }
});

// ── Disable WordPress emoji (clean output) ────────────────
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// ── Clean up wp_head ──────────────────────────────────────
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
