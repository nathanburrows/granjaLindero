<?php
// When a static front page is configured, always show it — even when Polylang
// switches language and WordPress resolves the URL as "home" with no translation.
if (get_option('show_on_front') === 'page') {
    get_template_part('front-page');
} elseif (have_posts()) {
    get_header();
    while (have_posts()) {
        the_post();
        the_title('<h2>', '</h2>');
        the_excerpt();
    }
    get_footer();
}
