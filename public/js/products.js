const products = [
    {
        id: "crossback-chairs",

        name: "Crossback Chairs",
        nameEs: "Sillas Crossback",

        category: "chairs",

        categoryLabel: "Chairs",
        categoryLabelEs: "Sillas",

        price: 3.50,
        unit: "chair",

        image: "public/img/products/123.jpg",
        alt: "Crossback chairs",

        description:
            "A timeless seating option for weddings, birthdays, corporate events and special celebrations.",

        descriptionEs:
            "Una opción de asiento atemporal para bodas, cumpleaños, eventos corporativos y celebraciones especiales.",

        details: [
            "Classic crossback design",
            "Suitable for indoor and outdoor events",
            "Available for individual rental"
        ],

        detailsEs: [
            "Diseño clásico Crossback",
            "Apto para eventos en interiores y exteriores",
            "Disponible para alquiler individual"
        ]
    },


    {
        id: "folding-chairs",

        name: "White Folding Chairs",
        nameEs: "Sillas plegables blancas",

        category: "chairs",

        categoryLabel: "Chairs",
        categoryLabelEs: "Sillas",

        price: 2.50,
        unit: "chair",

        image: "public/img/products/123.jpg",
        alt: "White folding chairs",

        description:
            "A practical and versatile seating option for gatherings, parties, ceremonies and community events.",

        descriptionEs:
            "Una opción práctica y versátil para reuniones, fiestas, ceremonias y eventos comunitarios.",

        details: [
            "Clean white finish",
            "Easy to arrange and transport",
            "Suitable for indoor and outdoor events"
        ],

        detailsEs: [
            "Acabado blanco limpio",
            "Fáciles de organizar y transportar",
            "Aptas para eventos en interiores y exteriores"
        ]
    },


    {
        id: "rectangular-tables",

        name: "Rectangular Tables",
        nameEs: "Mesas rectangulares",

        category: "tables",

        categoryLabel: "Tables",
        categoryLabelEs: "Mesas",

        price: 12.00,
        unit: "table",

        image: "public/img/products/123.jpg",
        alt: "Rectangular banquet table",

        description:
            "A versatile table option for dining, food service, displays and a wide range of event setups.",

        descriptionEs:
            "Una opción versátil para comidas, servicio de alimentos, exhibiciones y una amplia variedad de eventos.",

        details: [
            "Ideal for dining and buffet setups",
            "Works well for indoor and outdoor events",
            "Flexible arrangement options"
        ],

        detailsEs: [
            "Ideales para comidas y mesas de buffet",
            "Funcionan bien para eventos en interiores y exteriores",
            "Opciones flexibles de distribución"
        ]
    },


    {
        id: "round-tables",

        name: "Round Tables",
        nameEs: "Mesas redondas",

        category: "tables",

        categoryLabel: "Tables",
        categoryLabelEs: "Mesas",

        price: 14.00,
        unit: "table",

        image: "public/img/products/123.jpg",
        alt: "Round banquet table",

        description:
            "A classic round table design that creates a comfortable and social setup for celebrations and special events.",

        descriptionEs:
            "Un diseño clásico de mesa redonda que crea un ambiente cómodo y social para celebraciones y eventos especiales.",

        details: [
            "Great for guest seating",
            "Classic event layout",
            "Suitable for indoor and outdoor events"
        ],

        detailsEs: [
            "Ideales para sentar a los invitados",
            "Distribución clásica para eventos",
            "Aptas para eventos en interiores y exteriores"
        ]
    },


    {
        id: "event-tents",

        name: "Event Tents",
        nameEs: "Carpas para eventos",

        category: "tents",

        categoryLabel: "Tents",
        categoryLabelEs: "Carpas",

        price: 175.00,
        unit: "tent",

        image: "public/img/products/123.jpg",
        alt: "Event tent",

        description:
            "Create a comfortable covered space for outdoor celebrations, parties, gatherings and special events.",

        descriptionEs:
            "Crea un espacio cubierto y cómodo para celebraciones al aire libre, fiestas, reuniones y eventos especiales.",

        details: [
            "Provides covered event space",
            "Ideal for outdoor celebrations",
            "Size and availability may vary"
        ],

        detailsEs: [
            "Proporcionan un espacio cubierto para eventos",
            "Ideales para celebraciones al aire libre",
            "El tamaño y la disponibilidad pueden variar"
        ]
    },


    {
        id: "classic-bounce-house",

        name: "Classic Bounce House",
        nameEs: "Casa inflable clásica",

        category: "inflatables",

        categoryLabel: "Inflatables",
        categoryLabelEs: "Inflables",

        price: 150.00,
        unit: "rental",

        image: "public/img/products/123.jpg",
        alt: "Colorful bounce house",

        description:
            "A colorful inflatable attraction designed to bring extra fun and energy to birthday parties and family celebrations.",

        descriptionEs:
            "Una atracción inflable colorida diseñada para añadir diversión y energía a fiestas de cumpleaños y celebraciones familiares.",

        details: [
            "Fun for children's events",
            "Colorful classic design",
            "Outdoor setup recommended"
        ],

        detailsEs: [
            "Diversión para eventos infantiles",
            "Diseño clásico y colorido",
            "Se recomienda instalación al aire libre"
        ]
    },


    {
        id: "water-slide",

        name: "Water Slide",
        nameEs: "Tobogán de agua",

        category: "inflatables",

        categoryLabel: "Inflatables",
        categoryLabelEs: "Inflables",

        price: 225.00,
        unit: "rental",

        image: "public/img/products/123.jpg",
        alt: "Inflatable water slide",

        description:
            "A fun inflatable water attraction that brings an extra level of excitement to warm-weather celebrations.",

        descriptionEs:
            "Una divertida atracción inflable acuática que añade emoción a las celebraciones durante los días cálidos.",

        details: [
            "Great for summer events",
            "Designed for outdoor use",
            "Water access required"
        ],

        detailsEs: [
            "Ideal para eventos de verano",
            "Diseñado para uso al aire libre",
            "Requiere acceso a agua"
        ]
    },


    {
        id: "pop-up-canopy",

        name: "Pop-Up Canopy",
        nameEs: "Carpa plegable",

        category: "other",

        categoryLabel: "Other",
        categoryLabelEs: "Otros",

        price: 65.00,
        unit: "rental",

        image: "public/img/products/123.jpg",
        alt: "Outdoor pop-up canopy",

        description:
            "A convenient covered space for outdoor gatherings, food stations, vendor areas and smaller celebrations.",

        descriptionEs:
            "Un espacio cubierto y práctico para reuniones al aire libre, estaciones de comida, áreas para vendedores y celebraciones pequeñas.",

        details: [
            "Quick outdoor shade solution",
            "Great for food or activity areas",
            "Suitable for a variety of events"
        ],

        detailsEs: [
            "Solución rápida para proporcionar sombra al aire libre",
            "Ideal para áreas de comida o actividades",
            "Adecuada para una variedad de eventos"
        ]
    },


    {
        id: "event-cooler",

        name: "Event Cooler",
        nameEs: "Nevera para eventos",

        category: "other",

        categoryLabel: "Other",
        categoryLabelEs: "Otros",

        price: 35.00,
        unit: "rental",

        image: "public/img/products/123.jpg",
        alt: "Large event cooler",

        description:
            "A practical addition for keeping drinks and refreshments ready throughout your event.",

        descriptionEs:
            "Un complemento práctico para mantener bebidas y refrigerios disponibles durante todo el evento.",

        details: [
            "Useful for parties and gatherings",
            "Ideal for keeping refreshments accessible",
            "Convenient event accessory"
        ],

        detailsEs: [
            "Útil para fiestas y reuniones",
            "Ideal para mantener los refrigerios accesibles",
            "Accesorio práctico para eventos"
        ]
    }
];