<?php
// Redirect to front page if no specific page is requested
if (is_home() && !is_front_page()) {
    get_header();
    // Standard blog loop fallback
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_title('<h2>', '</h2>');
            the_excerpt();
        }
    }
    get_footer();
} else {
    // Fall back to front-page display
    get_template_part('front-page');
}
