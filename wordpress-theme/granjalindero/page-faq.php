<?php
/**
 * Template Name: FAQ
 */
get_header();

$is_es = gl_lang() === 'es';
$label    = gl_field('faq_label')    ?: ($is_es ? 'Preguntas frecuentes' : 'Frequently asked questions');
$title    = gl_field('faq_title')    ?: ($is_es ? 'Todo lo que necesitas saber' : 'Everything you need to know');
$subtitle = gl_field('faq_subtitle') ?: ($is_es
    ? '¿Tienes dudas? Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, escríbenos por WhatsApp.'
    : 'Got questions? Here we answer the most common ones. If you can\'t find what you\'re looking for, message us on WhatsApp.');

$faq_items = gl_field('faq_items') ?: [];
if (empty($faq_items)) {
    $faq_items = $is_es ? [
        ['q'=>'¿Cuál es el horario de atención de La Granja Ecológica Lindero?','a'=>'Atendemos de miércoles a domingo de 9:00 am a 5:30 pm. Para grupos corporativos o eventos especiales podemos coordinar fechas fuera de este horario.'],
        ['q'=>'¿Qué operadores móviles tienen señal en la granja?','a'=>'Cuentan con señal los operadores BITEL, MOVISTAR y CLARO.'],
        ['q'=>'¿Cuál es el costo de entrada?','a'=>'¡El ingreso a La Granja Ecológica Lindero es gratuito! Solo se cobra una tarifa por el estacionamiento. Para conocer el costo actualizado, escríbenos por WhatsApp antes de tu visita.'],
        ['q'=>'¿Ofrecen descuentos?','a'=>'No aplicamos descuentos para estudiantes universitarios, docentes ni adultos mayores. Los precios de los paquetes ya incluyen todas las actividades correspondientes.'],
        ['q'=>'¿Cómo llegar a La Granja Ecológica Lindero?','a'=>'Estamos ubicados en la Carretera a Ambo km 2, a solo 10 minutos del centro de Huánuco, en el distrito de Tomaykichwa. Puedes llegar en auto particular, transporte público (colectivos hacia Ambo) o coordinar con nosotros un servicio de transporte privado.'],
        ['q'=>'¿Cómo puedo hacer una reserva?','a'=>'Puedes reservar directamente por WhatsApp al +51 966 721 057. Para grupos de más de 10 personas te recomendamos reservar con al menos 3 días de anticipación.'],
        ['q'=>'¿Qué incluye el paquete Half-Day?','a'=>'El paquete Half-Day incluye el tour vivencial con animales y un almuerzo típico de la región. Dura aproximadamente 4 horas.'],
        ['q'=>'¿Aceptan niños pequeños?','a'=>'¡Por supuesto! La granja está diseñada para toda la familia. Los niños disfrutan especialmente del contacto con los animales y las actividades en el huerto.'],
        ['q'=>'¿Qué ropa debo llevar?','a'=>'Recomendamos ropa abrigadora, zapatos cómodos para caminar, impermeable (especialmente entre octubre y abril) y bloqueador solar. La zona puede ser fresca, especialmente en las mañanas y tardes.'],
        ['q'=>'¿Hay estacionamiento disponible?','a'=>'Sí, contamos con estacionamiento seguro dentro de la granja para todo tipo de vehículos. Se cobra una tarifa por el estacionamiento — consúltanos por WhatsApp para el costo actualizado.'],
        ['q'=>'¿Aceptan tarjetas de crédito o solo efectivo?','a'=>'Aceptamos Yape y efectivo (soles) en el lugar. Para grupos grandes también podemos coordinar transferencia bancaria o PayPal con anticipación.'],
        ['q'=>'¿Se permiten mascotas?','a'=>'No. Por la seguridad de nuestra fauna y animales de granja, no se permite el ingreso de mascotas a ninguna área de La Granja Ecológica Lindero, incluyendo hospedaje, restaurante y áreas comunes.'],
    ] : [
        ['q'=>'What are the opening hours of La Granja Ecológica Lindero?','a'=>'We are open Wednesday to Sunday from 9:00 am to 5:30 pm. For corporate groups or special events we can arrange dates outside these hours.'],
        ['q'=>'Which mobile carriers have signal at the farm?','a'=>'BITEL, MOVISTAR, and CLARO all have signal at the farm.'],
        ['q'=>'What is the entrance fee?','a'=>'Admission to La Granja Ecológica Lindero is free! There is only a fee for parking. Message us on WhatsApp for the current parking cost before your visit.'],
        ['q'=>'Do you offer discounts?','a'=>'We do not apply discounts for university students, teachers, or senior citizens. Package prices already include all corresponding activities.'],
        ['q'=>'How do I get to La Granja Ecológica Lindero?','a'=>'We are located on the Ambo Highway km 2, just 10 minutes from central Huánuco, in the Tomaykichwa district. You can arrive by private car, public transport (shared taxis to Ambo), or coordinate private transport with us.'],
        ['q'=>'How can I make a booking?','a'=>'You can book directly on WhatsApp at +51 966 721 057. For groups of more than 10 people we recommend booking at least 3 days in advance.'],
        ['q'=>'What does the Half-Day package include?','a'=>'The Half-Day package includes the animal experiential tour and a typical regional lunch. Duration is approximately 4 hours.'],
        ['q'=>'Do you accept young children?','a'=>'Absolutely! The farm is designed for the whole family. Children especially enjoy interacting with the animals and garden activities.'],
        ['q'=>'What should I wear?','a'=>'We recommend warm clothing, comfortable walking shoes, a raincoat (especially October–April), and sunscreen. The area can be cool, especially in the mornings and evenings.'],
        ['q'=>'Is parking available?','a'=>'Yes, we have secure parking inside the farm for all types of vehicles. There is a parking fee — ask us on WhatsApp for the current cost.'],
        ['q'=>'Do you accept credit cards or cash only?','a'=>'We accept Yape and cash (soles) on site. For large groups we can also arrange bank transfer or PayPal in advance.'],
        ['q'=>'Are pets allowed?','a'=>'No. For the safety of our wildlife and farm animals, pets are not allowed in any area of La Granja Ecológica Lindero, including lodging, restaurant, and common areas.'],
    ];
}

$cta_q  = $is_es ? '¿No encontraste tu respuesta?' : 'Didn\'t find your answer?';
$cta_sub= $is_es ? 'Escríbenos directamente y te respondemos en minutos.' : 'Message us directly and we\'ll reply in minutes.';
?>

<main style="min-height:100vh;background:var(--stone-50)">
  <div class="page-hero">
    <span class="label-tag"><?php echo esc_html($label); ?></span>
    <h1 class="section-title font-serif"><?php echo esc_html($title); ?></h1>
    <p><?php echo esc_html($subtitle); ?></p>
  </div>

  <div class="faq-list">
    <?php foreach ($faq_items as $i => $item): ?>
    <div class="faq-item" id="faq-<?php echo $i; ?>">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-<?php echo $i; ?>"
              onclick="glToggleFaq(this, 'faq-ans-<?php echo $i; ?>')">
        <span class="faq-question-text"><?php echo esc_html($item['q']); ?></span>
        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="faq-answer" id="faq-ans-<?php echo $i; ?>" role="region">
        <?php echo esc_html($item['a']); ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>

  <div class="faq-cta-box">
    <div class="faq-cta-inner">
      <p class="faq-cta-title"><?php echo esc_html($cta_q); ?></p>
      <p class="faq-cta-sub"><?php echo esc_html($cta_sub); ?></p>
      <a href="<?php echo esc_url(gl_wa_url('')); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        <svg class="wa-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
</main>

<?php get_footer(); ?>
