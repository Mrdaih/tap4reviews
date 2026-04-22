import { SITE } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.facebook],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.email,
        telephone: `+${SITE.whatsapp}`,
        contactType: "customer support",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: `+${SITE.whatsapp}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: "United Arab Emirates",
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

export function ProductJsonLd({
  name,
  description,
  price,
  image,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/pricing`,
    },
  };
  return <JsonLd data={data} />;
}
