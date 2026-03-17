import { defineConfig } from "tinacms";

// Twoja konfiguracja TinaCMS oparta na dawnych modelach Keystatic

const seoSchema = {
  type: "object",
  name: "seo",
  label: "Baza SEO",
  fields: [
    { type: "string", name: "description", label: "Opis SEO / Meta Description", ui: { component: "textarea" } },
    { type: "image", name: "ogImage", label: "Zdjęcie OpenGraph" },
  ],
};

const heroSchema = {
  type: "object",
  name: "hero",
  label: "Sekcja Hero",
  fields: [
    { type: "string", name: "title", label: "Tytuł główny" },
    { type: "string", name: "subtitle", label: "Podtytuł" },
    { type: "string", name: "description", label: "Krótki opis", ui: { component: "textarea" } },
    { type: "image", name: "image", label: "Zdjęcie w tle" },
  ],
};

const faqSchema = {
  type: "object",
  list: true,
  name: "faq",
  label: "FAQ",
  ui: { itemProps: (item) => ({ label: item?.question }) },
  fields: [
    { type: "string", name: "question", label: "Pytanie" },
    { type: "string", name: "answer", label: "Odpowiedź", ui: { component: "textarea" } },
  ],
};

const customComponents = [
  {
    name: "LawBox",
    label: "Ramka Prawna",
    fields: [
      { name: "sygnatura", label: "Podstawa Prawna", type: "string" },
    ],
  },
  {
    name: "AlertBox",
    label: "Ważny Komunikat",
    fields: [
      { name: "title", label: "Tytuł", type: "string" },
      { name: "type", label: "Typ", type: "string", options: ["info", "warning", "success"] },
    ],
  },
  {
    name: "CTAButton",
    label: "Przycisk CTA",
    fields: [
      { name: "text", label: "Napis", type: "string" },
      { name: "href", label: "Link", type: "string" },
      { name: "center", label: "Wyśrodkuj", type: "boolean" },
    ],
  },
];

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "photos",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // 1. Singletony i Ustawienia (Zapisywane jako JSON)
      {
        name: "contact",
        label: "Kontakt i Ustawienia",
        path: "src/content/singletons",
        match: { include: "contact" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "phone", label: "Numer telefonu" },
          { type: "string", name: "email", label: "Adres e-mail" },
          { type: "string", name: "hours", label: "Godziny pracy" },
          { type: "string", name: "locations", label: "Lokalizacje" },
          {
            type: "object", name: "headerNav", label: "Pasek Nawigacji", list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [{ type: "string", name: "label", label: "Etykieta" }, { type: "string", name: "href", label: "Link" }]
          },
          {
            type: "object", name: "footerNav", label: "Linki (Stopka)", list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [{ type: "string", name: "label", label: "Etykieta" }, { type: "string", name: "href", label: "Link" }]
          }
        ]
      },
      {
        name: "homepage",
        label: "Strona Główna",
        path: "src/content/singletons",
        match: { include: "homepage" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema as any,
          {
            type: "object", name: "about", label: "Sekcja O Mnie",
            fields: [
              { type: "string", name: "description1", label: "Paragraf 1", ui: { component: "textarea" } },
              { type: "string", name: "description2", label: "Paragraf 2", ui: { component: "textarea" } }
            ]
          },
          faqSchema as any
        ]
      },
      {
        name: "pricing",
        label: "Cennik",
        path: "src/content/singletons",
        match: { include: "pricing" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema as any,
          {
            type: "object", name: "pricingList", label: "Pozycje w cenniku", list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: "string", name: "service", label: "Nazwa usługi" },
              { type: "string", name: "price", label: "Cena/Stawka" },
              { type: "string", name: "note", label: "Dodatkowa uwaga" }
            ]
          },
          { type: "string", name: "importantInfo", label: "Ważne informacje", list: true }
        ]
      },
      {
        name: "about", label: "O mnie (Podstrona)", path: "src/content/singletons", format: "json", match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema as any,
          { type: "string", name: "aboutParagraphs", label: "Treść", ui: { component: "textarea" } },
          {
            type: "object", name: "quote", label: "Cytat", fields: [
              { type: "string", name: "text", label: "Treść", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Autor" }
            ]
          }
        ]
      },
      {
        name: "toolsIndex", label: "Dział Narzędzi (Kalkulatory)", path: "src/content/singletons", format: "json", match: { include: "toolsIndex" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema as any
        ]
      },
      {
        name: "servicesIndex", label: "Dział Usług prawnych", path: "src/content/singletons", format: "json", match: { include: "servicesIndex" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema as any,
          faqSchema as any
        ]
      },
      // 2. Tresc bazy danych (Usługi, Blog, Narzędzia)
      {
        name: "services",
        label: "Usługi Prawne",
        path: "src/content/uslugi",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytuł Usługi", isTitle: true, required: true },
          seoSchema as any,
          heroSchema as any,
          {
            type: "object", name: "features", label: "Cechy", list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "icon", label: "Ikona" },
              { type: "string", name: "title", label: "Tytuł" },
              { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object", name: "steps", label: "Etapy działania", list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Tytuł" },
              { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } }
            ]
          },
          faqSchema as any,
          { type: "rich-text", name: "body", label: "Główna Treść", isBody: true, templates: customComponents as any }
        ]
      },
      {
        name: "post",
        label: "Blog",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytuł artykułu", isTitle: true, required: true },
          { type: "datetime", name: "publishDate", label: "Data publikacji" },
          { type: "reference", name: "author", label: "Autor", collections: ["author"] },
          { type: "string", name: "category", label: "Kategoria", options: ["Prawo rodzinne", "Prawo cywilne", "Prawo karne", "Prawo nieruchomości", "Prawo upadłościowe", "Odszkodowania", "Prawo gospodarcze", "Porady ogólne"] },
          { type: "reference", name: "relatedService", label: "Powiązana Usługa", collections: ["services"] },
          { type: "string", name: "description", label: "Krótki opis SEO", ui: { component: "textarea" } },
          { type: "image", name: "ogImage", label: "Zdjęcie artykułu" },
          { type: "string", name: "tags", label: "Tagi", list: true },
          { type: "boolean", name: "draft", label: "Szkic" },
          { type: "rich-text", name: "body", label: "Treść artykułu", isBody: true, templates: customComponents as any }
        ]
      },
      {
        name: "author",
        label: "Autorzy",
        path: "src/content/authors",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Imię i Nazwisko", isTitle: true, required: true },
          { type: "string", name: "role", label: "Stanowisko" },
          { type: "string", name: "bio", label: "Biogram", ui: { component: "textarea" } },
          { type: "string", name: "linkedin", label: "LinkedIn" },
          { type: "image", name: "photo", label: "Zdjęcie" },
        ]
      },
      {
        name: "toolsInfo",
        label: "Kalkulatory Prawne",
        path: "src/content/toolsInfo",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Tytuł", isTitle: true, required: true },
          { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } },
          { type: "string", name: "fraza", label: "Fraza kluczowa" },
          { type: "string", name: "icon", label: "Ikona (SVG)" },
          { type: "image", name: "image", label: "Grafika kalkulatora", ui: { component: "image" } } // ui.component image dla JSON storage z Tiny
        ]
      },
      {
        name: "legalpages",
        label: "Strony Prawne (np. Regulamin)",
        path: "src/content/legal",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytuł", isTitle: true, required: true },
          { type: "string", name: "lastUpdated", label: "Podtytuł / Ostatnia aktualizacja" },
          { type: "rich-text", name: "body", label: "Treść dokumentu", isBody: true, templates: customComponents as any }
        ]
      }
    ],
  },
});
