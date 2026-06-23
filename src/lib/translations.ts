export type Lang = "es" | "en";

export const t = {
  es: {
    nav: {
      about: "Nosotros",
      experiences: "Experiencias",
      accommodation: "Hospedaje",
      restaurant: "Restaurante",
      gallery: "Galería",
      store: "Tienda",
      groups: "Grupos",
      contact: "Contacto",
      reserve: "Reservar",
    },
    hero: {
      tagline: "Reconecta con la naturaleza",
      subtitle:
        "Vive una experiencia única en nuestra granja ecológica en el corazón de Huánuco, Perú.",
      ctaExperience: "Reservar experiencia",
      ctaRoom: "Reservar habitación",
    },
    about: {
      label: "Quiénes somos",
      title: "Bienvenidos a Granja Ecológica Lindero",
      body: "Somos un espacio donde la naturaleza, la agricultura ecológica y el bienestar se encuentran. Ubicados en Tomaykichwa, Huánuco, te invitamos a desconectarte del ruido de la ciudad y reconectarte con la tierra, los animales y tú mismo. Ofrecemos experiencias auténticas para familias, grupos y empresas.",
      stat1: "4,100+",
      stat1Label: "Visitantes felices",
      stat2: "5+",
      stat2Label: "Tipos de experiencias",
      stat3: "1",
      stat3Label: "Lugar inolvidable",
    },
    experiences: {
      label: "Lo que ofrecemos",
      title: "Experiencias únicas en la granja",
      subtitle:
        "Desde talleres creativos hasta recorridos educativos, tenemos algo especial para cada visitante.",
      bookCta: "Reservar experiencia",
      bookTitle: "Reserva tu experiencia",
      bookSubtitle: "Escríbenos por WhatsApp y coordinamos los detalles.",
      formDate: "Fecha preferida",
      formPeople: "Personas",
      items: [
        {
          id: "tour",
          title: "Tour Vivencial",
          subtitle: "Animal Friends",
          description:
            "Descubre la vida del campo en Tomaykichwa con nuestro Tour Animal Friends. Interactúa con los animales de la granja y aprende sobre el ecosistema rural.",
        },
        {
          id: "horticultura",
          title: "Horticultura Terapéutica",
          subtitle: "Talleres de bienestar",
          description:
            "Mascarillas naturales, kokedamas, suculentas, pigmentos naturales, estampado botánico y más. S/.50 por persona · Grupos de 7 a 15.",
        },
        {
          id: "educativo",
          title: "Recorridos Educativos",
          subtitle: "Aprende en la naturaleza",
          description:
            "Recorridos diseñados para colegios, familias y empresas. Aprende sobre agroecología, ganadería ecológica y vida sostenible.",
        },
        {
          id: "privado",
          title: "Sesión Especial",
          subtitle: "Arma tu experiencia",
          description:
            "Elige el taller que más te guste y arma tu sesión a medida para tu familia, amig@s o equipo de trabajo. Disponible con opción de almuerzo incluido.",
        },
        {
          id: "fogon",
          title: "Noche de Fogón",
          subtitle: "Bajo las estrellas",
          description:
            "Reúnete alrededor del fuego, asa alimentos al palo y comparte historias bajo el cielo andino. Una experiencia nocturna única para grupos y familias.",
        },
      ],
    },
    accommodation: {
      label: "Hospedaje",
      cta: "Ver disponibilidad",
      phone: "966 721 057",
      breakfastAddon: "+ Desayuno opcional disponible",
      alsoAvailable: "También disponible en",
      formCheckin: "Llegada",
      formCheckout: "Salida",
      formAdults: "Adultos",
      formChildren: "Niños",
      formGuests: "Huéspedes",
      formBookCta: "Consultar disponibilidad",
      formByDates: "Por fechas",
      formByNights: "Por noches",
      formNights: "Noches",
      formBreakfast: "Agregar desayuno",
      formBreakfastNote: "Desayuno incluido",
      formSelectDates: "Selecciona tus fechas para continuar",
      buildings: [
        {
          id: "bungalow",
          name: "Bungalow",
          subtitle: "Duerme entre la naturaleza",
          description: "Bungalow privado rodeado de árboles frutales. Acogedor, tranquilo y en plena naturaleza.",
          features: ["Baño privado", "Rodeado de naturaleza", "Ideal para familias", "Ambiente tranquilo"],
          img: "/images/hospedaje_cabana_bosque.jpg",
        },
        {
          id: "casona",
          name: "Casona",
          subtitle: "Nuestra casa colonial",
          description: "Casa colonial de dos plantas con terraza, jardines y vistas al campo de la granja.",
          features: ["Terraza compartida", "Vista al campo", "Ideal para grupos", "Ambiente familiar"],
          img: "/images/hospedaje_edificio_principal.jpg",
        },
      ],
      rooms: [
        {
          id: "bungalow-matrimonial",
          buildingId: "bungalow",
          building: "Bungalow",
          title: "Habitación Matrimonial",
          description: "Cama doble en bungalow privado, rodeado de árboles frutales y vista al jardín.",
          features: ["Cama doble", "Baño privado", "Vista al jardín"],
          img: "/images/hospedaje_habitacion_doble.jpg",
        },
        {
          id: "bungalow-litera",
          buildingId: "bungalow",
          building: "Bungalow",
          title: "Habitación Litera",
          description: "4 camas individuales en litera dentro del bungalow, ideal para grupos pequeños.",
          features: ["4 camas individuales", "Literas dobles", "Baño privado"],
          img: "/images/hospedaje_habitacion_twin.jpg",
        },
        {
          id: "casona-matrimonial",
          buildingId: "casona",
          building: "Casona",
          title: "Habitación Matrimonial",
          description: "Cama doble en La Casona colonial, con acceso a terraza y jardines de la granja.",
          features: ["Cama doble", "Terraza compartida", "Vista al jardín"],
          img: "/images/hospedaje_habitacion_doble.jpg",
        },
        {
          id: "casona-litera",
          buildingId: "casona",
          building: "Casona",
          title: "Habitación Litera",
          description: "4 camas individuales en litera en La Casona, perfecta para familias y grupos.",
          features: ["4 camas individuales", "Literas dobles", "Terraza compartida"],
          img: "/images/hospedaje_habitacion_twin.jpg",
        },
      ],
    },
    restaurant: {
      label: "Restaurante",
      title: "Sabores del campo",
      description:
        "Disfruta de nuestra cocina con platos típicos de la región, preparados con ingredientes frescos de nuestra propia granja. Una experiencia gastronómica auténtica en plena naturaleza.",
      features: [
        "Platos típicos regionales",
        "Ingredientes de la granja",
        "Mesas al aire libre",
        "Vista al campo",
      ],
    },
    store: {
      label: "Tienda",
      title: "Productos de la granja",
      subtitle: "Llévate un pedacito de la granja a casa",
      description:
        "En nuestra tienda encontrarás productos frescos elaborados en la granja. Lácteos, huevos y más — directamente del campo a tus manos.",
      products: [
        { name: "Leche fresca", detail: "Sin procesar, del día" },
        { name: "Queso artesanal", detail: "Elaborado en la granja" },
        { name: "Flan casero", detail: "Receta tradicional" },
        { name: "Yogur natural", detail: "Sin conservantes" },
        { name: "Huevos de campo", detail: "Gallinas libres" },
        { name: "Otros productos", detail: "Según temporada" },
      ],
      cta: "Consultar productos",
    },
    groups: {
      label: "Grupos",
      tag: "Grupos y Eventos",
      title: "El espacio perfecto para tu grupo",
      subtitle:
        "Iglesias, colegios, empresas y familias encuentran en Granja Lindero el lugar ideal para retiros, paseos y eventos al aire libre.",
      ctaWhatsapp: "Consultar disponibilidad",
      pillarsTitle: "Todo en un solo lugar",
      pillars: [
        {
          id: "experiencias",
          title: "Experiencias",
          description:
            "Tour vivencial, talleres de horticultura terapéutica, recorridos educativos y noche de fogón — diseñados para grupos grandes.",
        },
        {
          id: "hospedaje",
          title: "Hospedaje",
          description:
            "Bungalow y Casona disponibles para grupos. Capacidad para alojar a tu comunidad con comodidad en plena naturaleza.",
        },
        {
          id: "espacios",
          title: "Espacios para Eventos",
          description:
            "Áreas verdes, gazebo y salones al aire libre para celebraciones, retiros espirituales y actividades grupales.",
        },
      ],
      activitiesTitle: "Áreas recreativas incluidas",
      activities: [
        { label: "Voleibol" },
        { label: "Fútbol" },
        { label: "Área de picnic" },
        { label: "Fogón nocturno" },
        { label: "Senderos naturales" },
        { label: "Interacción con animales" },
      ],
      groupsTitle: "Ideal para",
      groupTypes: [
        { label: "Iglesias y comunidades" },
        { label: "Colegios y universidades" },
        { label: "Empresas y equipos" },
        { label: "Familias y amigos" },
      ],
      note: "Coordinamos paquetes a medida según el tamaño y necesidades de tu grupo.",
    },
    gallery: {
      label: "Galería",
      title: "Momentos en la granja",
      subtitle: "Un vistazo a nuestra vida campestre",
    },
    location: {
      label: "Cómo llegar",
      title: "Encuéntranos en Tomaykichwa",
      address: "Carretera a Ambo km 2, Huánuco, Perú",
      directions:
        "A 2 km del centro de Huánuco por la carretera a Ambo.",
      cta: "Ver en Google Maps",
    },
    contact: {
      label: "Contacto",
      title: "¿Listo para vivir la experiencia?",
      subtitle:
        "Escríbenos o llámanos para hacer tu reserva. Estamos disponibles para grupos familiares, escolares y corporativos.",
      phone1: "+51 966 721 057",
      whatsapp: "Escríbenos por WhatsApp",
      callNow: "Llamar ahora",
      hours: "Horarios de atención",
      hoursDetail: "Miércoles a Domingo · 9:00 am – 5:30 pm",
    },
    footer: {
      tagline: "Reconecta con la naturaleza en Huánuco, Perú.",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      about: "About",
      experiences: "Experiences",
      accommodation: "Lodging",
      restaurant: "Restaurant",
      gallery: "Gallery",
      store: "Store",
      groups: "Groups",
      contact: "Contact",
      reserve: "Book Now",
    },
    hero: {
      tagline: "Reconnect with nature",
      subtitle:
        "Live a unique experience at our ecological farm in the heart of Huánuco, Peru.",
      cta: "Discover more",
      ctaExperience: "Book an experience",
      ctaRoom: "Book a room",
    },
    about: {
      label: "Who we are",
      title: "Welcome to Granja Ecológica Lindero",
      body: "We are a space where nature, ecological farming, and well-being come together. Located in Tomaykichwa, Huánuco, we invite you to disconnect from the noise of the city and reconnect with the earth, the animals, and yourself. We offer authentic experiences for families, groups, and businesses.",
      stat1: "4,100+",
      stat1Label: "Happy visitors",
      stat2: "5+",
      stat2Label: "Types of experiences",
      stat3: "1",
      stat3Label: "Unforgettable place",
    },
    experiences: {
      label: "What we offer",
      title: "Unique experiences on the farm",
      subtitle:
        "From creative workshops to educational tours, we have something special for every visitor.",
      bookCta: "Book this experience",
      bookTitle: "Book your experience",
      bookSubtitle: "Message us on WhatsApp and we'll coordinate the details.",
      formDate: "Preferred date",
      formPeople: "People",
      items: [
        {
          id: "tour",
          title: "Experiential Tour",
          subtitle: "Animal Friends",
          description:
            "Discover rural life in Tomaykichwa with our Animal Friends Tour. Interact with farm animals and learn about the rural ecosystem.",
        },
        {
          id: "horticultura",
          title: "Therapeutic Horticulture",
          subtitle: "Wellness workshops",
          description:
            "Natural face masks, kokedamas, succulents, natural pigments, botanical stamping and more. S/.50 per person · Groups of 7 to 15.",
        },
        {
          id: "educativo",
          title: "Educational Tours",
          subtitle: "Learn in nature",
          description:
            "Tours designed for schools, families, and companies. Learn about agroecology, ecological livestock farming, and sustainable living.",
        },
        {
          id: "privado",
          title: "Special Session",
          subtitle: "Build your experience",
          description:
            "Choose the workshop you like most and build a custom session for your family, friends, or work team. Available with lunch option included.",
        },
        {
          id: "fogon",
          title: "Campfire Night",
          subtitle: "Under the stars",
          description:
            "Gather around the fire, roast food on sticks, and share stories under the Andean sky. A unique evening experience for groups and families.",
        },
      ],
    },
    accommodation: {
      label: "Lodging",
      cta: "See availability",
      phone: "966 721 057",
      breakfastAddon: "+ Optional breakfast available",
      alsoAvailable: "Also available at",
      formCheckin: "Check-in",
      formCheckout: "Check-out",
      formAdults: "Adults",
      formChildren: "Children",
      formGuests: "Guests",
      formBookCta: "Check availability",
      formByDates: "By dates",
      formByNights: "By nights",
      formNights: "Nights",
      formBreakfast: "Add breakfast",
      formBreakfastNote: "Breakfast included",
      formSelectDates: "Select your dates to continue",
      buildings: [
        {
          id: "bungalow",
          name: "Bungalow",
          subtitle: "Sleep surrounded by nature",
          description: "Private bungalow surrounded by fruit trees. Cozy, peaceful, and set in the heart of nature.",
          features: ["Private bathroom", "Surrounded by nature", "Perfect for families", "Peaceful environment"],
          img: "/images/hospedaje_cabana_bosque.jpg",
        },
        {
          id: "casona",
          name: "Casona",
          subtitle: "Our colonial farmhouse",
          description: "Two-story colonial house with a terrace, gardens, and views across the farm.",
          features: ["Shared terrace", "Farm views", "Ideal for groups", "Family atmosphere"],
          img: "/images/hospedaje_edificio_principal.jpg",
        },
      ],
      rooms: [
        {
          id: "bungalow-matrimonial",
          buildingId: "bungalow",
          building: "Bungalow",
          title: "Matrimonial Room",
          description: "Double bed in a private bungalow, surrounded by fruit trees and garden views.",
          features: ["Double bed", "Private bathroom", "Garden view"],
          img: "/images/hospedaje_habitacion_doble.jpg",
        },
        {
          id: "bungalow-litera",
          buildingId: "bungalow",
          building: "Bungalow",
          title: "Bunk Room",
          description: "4 twin bunk beds inside the bungalow, ideal for small groups.",
          features: ["4 twin beds", "Bunk beds", "Private bathroom"],
          img: "/images/hospedaje_habitacion_twin.jpg",
        },
        {
          id: "casona-matrimonial",
          buildingId: "casona",
          building: "Casona",
          title: "Matrimonial Room",
          description: "Double bed in the colonial La Casona, with access to the terrace and farm gardens.",
          features: ["Double bed", "Shared terrace", "Garden view"],
          img: "/images/hospedaje_habitacion_doble.jpg",
        },
        {
          id: "casona-litera",
          buildingId: "casona",
          building: "Casona",
          title: "Bunk Room",
          description: "4 twin bunk beds in La Casona, perfect for families and groups.",
          features: ["4 twin beds", "Bunk beds", "Shared terrace"],
          img: "/images/hospedaje_habitacion_twin.jpg",
        },
      ],
    },
    restaurant: {
      label: "Restaurant",
      title: "Flavors of the countryside",
      description:
        "Enjoy our kitchen with typical regional dishes, prepared with fresh ingredients from our own farm. An authentic gastronomic experience in the heart of nature.",
      features: [
        "Regional traditional dishes",
        "Farm-to-table ingredients",
        "Outdoor seating",
        "Countryside views",
      ],
    },
    store: {
      label: "Farm Store",
      title: "Farm Fresh Products",
      subtitle: "Take a piece of the farm home with you",
      description:
        "Our on-site store carries fresh products made right here at the farm. Dairy, eggs, and more — straight from the field to your hands.",
      products: [
        { name: "Fresh Milk", detail: "Unprocessed, same-day" },
        { name: "Artisan Cheese", detail: "Made on the farm" },
        { name: "Homemade Flan", detail: "Traditional recipe" },
        { name: "Natural Yogurt", detail: "No preservatives" },
        { name: "Free-range Eggs", detail: "Free-roaming hens" },
        { name: "Seasonal products", detail: "Ask on arrival" },
      ],
      cta: "Ask about products",
    },
    groups: {
      label: "Groups",
      tag: "Groups & Events",
      title: "The perfect space for your group",
      subtitle:
        "Churches, schools, companies, and families find in Granja Lindero the ideal place for retreats, outings, and open-air events.",
      ctaWhatsapp: "Check availability",
      pillarsTitle: "Everything in one place",
      pillars: [
        {
          id: "experiencias",
          title: "Experiences",
          description:
            "Experiential tour, therapeutic horticulture workshops, educational tours, and campfire nights — designed for large groups.",
        },
        {
          id: "hospedaje",
          title: "Lodging",
          description:
            "Bungalow and Casona available for groups. Capacity to comfortably house your community surrounded by nature.",
        },
        {
          id: "espacios",
          title: "Event Spaces",
          description:
            "Green areas, gazebo, and open-air spaces for celebrations, spiritual retreats, and group activities.",
        },
      ],
      activitiesTitle: "Recreational areas included",
      activities: [
        { label: "Volleyball" },
        { label: "Football (Soccer)" },
        { label: "Picnic area" },
        { label: "Campfire night" },
        { label: "Nature trails" },
        { label: "Animal interaction" },
      ],
      groupsTitle: "Ideal for",
      groupTypes: [
        { label: "Churches & communities" },
        { label: "Schools & universities" },
        { label: "Companies & teams" },
        { label: "Families & friends" },
      ],
      note: "We arrange custom packages based on the size and needs of your group.",
    },
    gallery: {
      label: "Gallery",
      title: "Moments on the farm",
      subtitle: "A glimpse into our rural life",
    },
    location: {
      label: "How to get here",
      title: "Find us in Tomaykichwa",
      address: "Carretera a Ambo km 2, Huánuco, Peru",
      directions:
        "2 km from downtown Huánuco on the Ambo highway.",
      cta: "View on Google Maps",
    },
    contact: {
      label: "Contact",
      title: "Ready to live the experience?",
      subtitle:
        "Write or call us to make your reservation. We are available for family, school, and corporate groups.",
      phone1: "+51 966 721 057",
      whatsapp: "Message us on WhatsApp",
      callNow: "Call now",
      hours: "Opening hours",
      hoursDetail: "Wednesday to Sunday · 9:00 am – 5:30 pm",
    },
    footer: {
      tagline: "Reconnect with nature in Huánuco, Peru.",
      rights: "All rights reserved.",
    },
  },
};
