export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://nextpoint.ma/#organization",
    "name": "Next Point Academy",
    "url": "https://nextpoint.ma",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nextpoint.ma/icon.png",
      "width": "192",
      "height": "192"
    },
    "sameAs": [
      "https://www.facebook.com/nextpointacademy",
      "https://www.instagram.com/nextpointacademy"
    ],
    "description": "L'Académie de Langues de Référence au Maroc. Formations d'excellence avec tuteurs natifs.",
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    "@id": "https://nextpoint.ma/#localbusiness",
    "name": "Next Point Academy Casablanca",
    "image": "https://nextpoint.ma/icon.png",
    "telePhone": "+212663068618",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "rue ibnou katir, résidence les perles de casablanca n1",
      "addressLocality": "Casablanca",
      "postalCode": "20250",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.5898",
      "longitude": "-7.6039"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    }
  };
}

export function generateCourseSchema(courseName: string, description: string, providerName: string = "Next Point Academy") {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": providerName,
      "sameAs": "https://nextpoint.ma"
    }
  };
}
