<?php get_header(); ?>

<div style="padding:8rem 1.5rem 4rem;max-width:800px;margin:0 auto">
  <?php if (have_posts()): while (have_posts()): the_post(); ?>
  <h1 class="font-serif" style="font-size:2.5rem;font-weight:700;color:var(--stone-900);margin-bottom:1.5rem"><?php the_title(); ?></h1>
  <div style="color:var(--stone-600);font-size:1.05rem;line-height:1.8"><?php the_content(); ?></div>
  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
