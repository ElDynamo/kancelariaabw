// tina/config.ts
import { defineConfig } from "tinacms";
var seoSchema = {
  type: "object",
  name: "seo",
  label: "Baza SEO",
  fields: [
    { type: "string", name: "description", label: "Opis SEO / Meta Description", ui: { component: "textarea" } },
    { type: "image", name: "ogImage", label: "Zdj\u0119cie OpenGraph" }
  ]
};
var heroSchema = {
  type: "object",
  name: "hero",
  label: "Sekcja Hero",
  fields: [
    { type: "string", name: "title", label: "Tytu\u0142 g\u0142\xF3wny" },
    { type: "string", name: "subtitle", label: "Podtytu\u0142" },
    { type: "string", name: "description", label: "Kr\xF3tki opis", ui: { component: "textarea" } },
    { type: "image", name: "image", label: "Zdj\u0119cie w tle" }
  ]
};
var faqSchema = {
  type: "object",
  list: true,
  name: "faq",
  label: "FAQ",
  ui: { itemProps: (item) => ({ label: item?.question }) },
  fields: [
    { type: "string", name: "question", label: "Pytanie" },
    { type: "string", name: "answer", label: "Odpowied\u017A", ui: { component: "textarea" } }
  ]
};
var customComponents = [
  {
    name: "LawBox",
    label: "Ramka Prawna",
    fields: [
      { name: "sygnatura", label: "Podstawa Prawna", type: "string" }
    ]
  },
  {
    name: "AlertBox",
    label: "Wa\u017Cny Komunikat",
    fields: [
      { name: "title", label: "Tytu\u0142", type: "string" },
      { name: "type", label: "Typ", type: "string", options: ["info", "warning", "success"] }
    ]
  },
  {
    name: "CTAButton",
    label: "Przycisk CTA",
    fields: [
      { name: "text", label: "Napis", type: "string" },
      { name: "href", label: "Link", type: "string" },
      { name: "center", label: "Wy\u015Brodkuj", type: "boolean" }
    ]
  }
];
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "photos",
      publicFolder: "public"
    }
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
            type: "object",
            name: "headerNav",
            label: "Pasek Nawigacji",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [{ type: "string", name: "label", label: "Etykieta" }, { type: "string", name: "href", label: "Link" }]
          },
          {
            type: "object",
            name: "footerNav",
            label: "Linki (Stopka)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [{ type: "string", name: "label", label: "Etykieta" }, { type: "string", name: "href", label: "Link" }]
          }
        ]
      },
      {
        name: "homepage",
        label: "Strona G\u0142\xF3wna",
        path: "src/content/singletons",
        match: { include: "homepage" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema,
          {
            type: "object",
            name: "about",
            label: "Sekcja O Mnie",
            fields: [
              { type: "string", name: "description1", label: "Paragraf 1", ui: { component: "textarea" } },
              { type: "string", name: "description2", label: "Paragraf 2", ui: { component: "textarea" } }
            ]
          },
          faqSchema
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
          heroSchema,
          {
            type: "object",
            name: "pricingList",
            label: "Pozycje w cenniku",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: "string", name: "service", label: "Nazwa us\u0142ugi" },
              { type: "string", name: "price", label: "Cena/Stawka" },
              { type: "string", name: "note", label: "Dodatkowa uwaga" }
            ]
          },
          { type: "string", name: "importantInfo", label: "Wa\u017Cne informacje", list: true }
        ]
      },
      {
        name: "about",
        label: "O mnie (Podstrona)",
        path: "src/content/singletons",
        format: "json",
        match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema,
          { type: "string", name: "aboutParagraphs", label: "Tre\u015B\u0107", ui: { component: "textarea" } },
          {
            type: "object",
            name: "quote",
            label: "Cytat",
            fields: [
              { type: "string", name: "text", label: "Tre\u015B\u0107", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Autor" }
            ]
          }
        ]
      },
      {
        name: "toolsIndex",
        label: "Dzia\u0142 Narz\u0119dzi (Kalkulatory)",
        path: "src/content/singletons",
        format: "json",
        match: { include: "toolsIndex" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema
        ]
      },
      {
        name: "servicesIndex",
        label: "Dzia\u0142 Us\u0142ug prawnych",
        path: "src/content/singletons",
        format: "json",
        match: { include: "servicesIndex" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          heroSchema,
          faqSchema
        ]
      },
      // 2. Tresc bazy danych (Usługi, Blog, Narzędzia)
      {
        name: "services",
        label: "Us\u0142ugi Prawne",
        path: "src/content/uslugi",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytu\u0142 Us\u0142ugi", isTitle: true, required: true },
          seoSchema,
          heroSchema,
          {
            type: "object",
            name: "features",
            label: "Cechy",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "icon", label: "Ikona" },
              { type: "string", name: "title", label: "Tytu\u0142" },
              { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "steps",
            label: "Etapy dzia\u0142ania",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Tytu\u0142" },
              { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } }
            ]
          },
          faqSchema,
          { type: "rich-text", name: "body", label: "G\u0142\xF3wna Tre\u015B\u0107", isBody: true, templates: customComponents }
        ]
      },
      {
        name: "post",
        label: "Blog",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytu\u0142 artyku\u0142u", isTitle: true, required: true },
          { type: "datetime", name: "publishDate", label: "Data publikacji" },
          { type: "reference", name: "author", label: "Autor", collections: ["author"] },
          { type: "string", name: "category", label: "Kategoria", options: ["Prawo rodzinne", "Prawo cywilne", "Prawo karne", "Prawo nieruchomo\u015Bci", "Prawo upad\u0142o\u015Bciowe", "Odszkodowania", "Prawo gospodarcze", "Porady og\xF3lne"] },
          { type: "reference", name: "relatedService", label: "Powi\u0105zana Us\u0142uga", collections: ["services"] },
          { type: "string", name: "description", label: "Kr\xF3tki opis SEO", ui: { component: "textarea" } },
          { type: "image", name: "ogImage", label: "Zdj\u0119cie artyku\u0142u" },
          { type: "string", name: "tags", label: "Tagi", list: true },
          { type: "boolean", name: "draft", label: "Szkic" },
          { type: "rich-text", name: "body", label: "Tre\u015B\u0107 artyku\u0142u", isBody: true, templates: customComponents }
        ]
      },
      {
        name: "author",
        label: "Autorzy",
        path: "src/content/authors",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Imi\u0119 i Nazwisko", isTitle: true, required: true },
          { type: "string", name: "role", label: "Stanowisko" },
          { type: "string", name: "bio", label: "Biogram", ui: { component: "textarea" } },
          { type: "string", name: "linkedin", label: "LinkedIn" },
          { type: "image", name: "photo", label: "Zdj\u0119cie" }
        ]
      },
      {
        name: "toolsInfo",
        label: "Kalkulatory Prawne",
        path: "src/content/toolsInfo",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Tytu\u0142", isTitle: true, required: true },
          { type: "string", name: "desc", label: "Opis", ui: { component: "textarea" } },
          { type: "string", name: "fraza", label: "Fraza kluczowa" },
          { type: "string", name: "icon", label: "Ikona (SVG)" },
          { type: "image", name: "image", label: "Grafika kalkulatora", ui: { component: "image" } }
          // ui.component image dla JSON storage z Tiny
        ]
      },
      {
        name: "legalpages",
        label: "Strony Prawne (np. Regulamin)",
        path: "src/content/legal",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Tytu\u0142", isTitle: true, required: true },
          { type: "string", name: "lastUpdated", label: "Podtytu\u0142 / Ostatnia aktualizacja" },
          { type: "rich-text", name: "body", label: "Tre\u015B\u0107 dokumentu", isBody: true, templates: customComponents }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
