export const SITE = {
  name: "Tap4Reviews",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tap4reviews.com",
  description:
    "NFC-powered Google review cards built for UAE restaurants. Tap, review, grow.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
  email: "hello@tap4reviews.com",
  address: { locality: "Dubai", region: "Dubai", country: "AE" },
  social: {
    instagram: "https://instagram.com/tap4reviews",
    facebook: "https://facebook.com/tap4reviews",
    linkedin: "https://linkedin.com/company/tap4reviews",
  },
} as const;

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
