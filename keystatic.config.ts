import { config, fields, collection, singleton, component } from '@keystatic/core';

// --- WSPÓLNE SCHEMATY (DRY) ---
const seoSchema = fields.object({
    description: fields.text({ label: 'Opis SEO / Meta Description', multiline: true }),
    ogImage: fields.image({
        label: 'Zdjęcie OpenGraph (Karta dla Facebook/LinkedIn)',
        directory: 'public/photos',
        publicPath: '/photos/',
        description: 'Zalecane wymiary: 1200x630. Rozszerzenie wep, jpg lub png.'
    })
}, { label: 'Baza SEO', description: 'Metadane strony dla wyszukiwarek' });

const heroSchema = fields.object({
    title: fields.text({ label: 'Tytuł główny' }),
    subtitle: fields.text({ label: 'Podtytuł (Opcjonalnie)' }),
    description: fields.text({ label: 'Krótki opis', multiline: true }),
}, { label: 'Sekcja wyświetlana u góry strony (Hero)' });

const faqSchema = fields.array(
    fields.object({
        question: fields.text({ label: 'Pytanie' }),
        answer: fields.text({ label: 'Odpowiedź', multiline: true })
    }),
    { label: 'Często zadawane pytania (FAQ)', itemLabel: props => props.fields.question.value }
);

// --- MARKDOC CUSTOM BLOCKS ---
const customComponents = {
    lawBox: component({
        label: 'Ramka Prawna (Cytat z ustawy)',
        schema: {
            sygnatura: fields.text({ label: 'Podstawa Prawna (np. Art. 4 Kodeksu cywilnego)' })
        },
        preview: (props) => null
    }),
    alertBox: component({
        label: 'Ważny Komunikat (Alert)',
        schema: {
            title: fields.text({ label: 'Tytuł komunikatu', defaultValue: 'Ważna informacja' }),
            type: fields.select({
                label: 'Typ komunikatu',
                options: [
                    { label: 'Informacja (Niebieski)', value: 'info' },
                    { label: 'Ostrzeżenie (Czerwony)', value: 'warning' },
                    { label: 'Sukces (Zielony)', value: 'success' }
                ],
                defaultValue: 'info'
            })
        },
        preview: (props) => null
    }),
    ctaButton: component({
        label: 'Przycisk CTA',
        schema: {
            text: fields.text({ label: 'Napis w przycisku', defaultValue: 'Dowiedz się więcej' }),
            href: fields.text({ label: 'Link (URL)' }),
            center: fields.checkbox({ label: 'Wyśrodkuj na stronie' })
        },
        preview: (props) => null
    })
};

export default config({
    storage: {
        kind: 'local',
    },
    ui: {
        navigation: {
            'Globalne Ustawienia': ['contact'],
            'Strony Statyczne': ['homepage', 'about', 'pricing', 'servicesIndex', 'blogIndex', 'toolsIndex'],
            'Strony Prawne': ['privacyPolicy', 'termsOfService', 'dataProcessing'],
            'Baza Treści': ['services', 'blog', 'toolsInfo', 'authors'],
            'Zarządzanie Stroną': ['deployPage']
        }
    },
    singletons: {
        deployPage: singleton({
            label: 'Aktualizacja Strony (Deploy)',
            path: 'src/content/singletons/deployPage',
            format: { data: 'json' },
            schema: {
                instruction: fields.text({
                    label: 'Instrukcja',
                    defaultValue: 'Kliknięcie poniższego przycisku spowoduje kompilację nowo dodanych treści i opublikowanie ich na środowisku produkcyjnym.',
                    multiline: true
                }),
                deployUrl: fields.url({
                    label: 'Adres wyzwalacza (Webhook URL)',
                    defaultValue: '/api/build',
                    validation: { isRequired: true }
                })
            }
        }),
        homepage: singleton({
            label: 'Strona Główna (Wizytówka)',
            path: 'src/content/singletons/homepage',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
                about: fields.object({
                    description1: fields.text({ label: 'O mnie - Paragraf 1', multiline: true }),
                    description2: fields.text({ label: 'O mnie - Paragraf 2', multiline: true }),
                }, { label: 'Sekcja O Mnie' }),
                faq: faqSchema
            }
        }),
        about: singleton({
            label: 'O mnie (Podstrona)',
            path: 'src/content/singletons/about',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
                aboutParagraphs: fields.text({ label: 'Treść (Akapity opisowe)', description: 'Główny tekst życiorysu.', multiline: true }),
                quote: fields.object({
                    text: fields.text({ label: 'Treść cytatu', multiline: true }),
                    author: fields.text({ label: 'Autor cytatu' })
                }, { label: 'Złoty Cytat' })
            }
        }),
        pricing: singleton({
            label: 'Cennik (Podstrona)',
            path: 'src/content/singletons/pricing',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
                pricingList: fields.array(
                    fields.object({
                        service: fields.text({ label: 'Nazwa usługi' }),
                        price: fields.text({ label: 'Cena/Stawka' }),
                        note: fields.text({ label: 'Dodatkowa uwaga (opcjonalnie)' })
                    }),
                    { label: 'Pozycje w cenniku', itemLabel: props => props.fields.service.value }
                ),
                importantInfo: fields.array(fields.text({ label: 'Punkt informacyjny' }), { label: 'Ważne informacje (Wypunktowanie)', itemLabel: props => props.value })
            }
        }),
        contact: singleton({
            label: 'Kontakt i Globalne',
            path: 'src/content/singletons/contact',
            format: { data: 'json' },
            schema: {
                phone: fields.text({ label: 'Numer telefonu' }),
                email: fields.text({ label: 'Adres e-mail' }),
                hours: fields.text({ label: 'Godziny pracy' }),
                locations: fields.text({ label: 'Lokalizacje' }),
                headerNav: fields.array(fields.object({
                    label: fields.text({ label: 'Etykieta' }),
                    href: fields.text({ label: 'Odnośnik (URL)' }),
                }), { label: 'Pasek Nawigacji (Header)', itemLabel: props => props.fields.label.value }),
                footerNav: fields.array(fields.object({
                    label: fields.text({ label: 'Etykieta' }),
                    href: fields.text({ label: 'Odnośnik (URL)' }),
                }), { label: 'Przydatne Linki Prawne (Stopka)', itemLabel: props => props.fields.label.value })
            }
        }),
        servicesIndex: singleton({
            label: 'Usługi Prawne (Zbiorcza)',
            path: 'src/content/singletons/servicesIndex',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
                faq: faqSchema
            }
        }),
        blogIndex: singleton({
            label: 'Blog (Strona zbiorcza)',
            path: 'src/content/singletons/blogIndex',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
            }
        }),
        toolsIndex: singleton({
            label: 'Narzędzia (Strona zbiorcza)',
            path: 'src/content/singletons/toolsIndex',
            format: { data: 'json' },
            schema: {
                hero: heroSchema,
            }
        }),
        privacyPolicy: singleton({
            label: 'Polityka prywatności',
            path: 'src/content/legal/privacyPolicy',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Tytuł główny', defaultValue: 'Polityka prywatności' }),
                lastUpdated: fields.text({ label: 'Podtytuł (np. data aktualizacji)', defaultValue: 'Ostatnia aktualizacja: marzec 2026' }),
                content: fields.markdoc({ label: 'Treść dokumentu', extension: 'mdoc', components: customComponents as any }),
            }
        }),
        termsOfService: singleton({
            label: 'Regulamin',
            path: 'src/content/legal/termsOfService',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Tytuł główny', defaultValue: 'Regulamin' }),
                lastUpdated: fields.text({ label: 'Podtytuł', defaultValue: 'Regulamin świadczenia usług drogą elektroniczną...' }),
                content: fields.markdoc({ label: 'Treść dokumentu', extension: 'mdoc', components: customComponents as any }),
            }
        }),
        dataProcessing: singleton({
            label: 'Przetwarzanie danych (RODO)',
            path: 'src/content/legal/dataProcessing',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Tytuł główny', defaultValue: 'Przetwarzanie danych osobowych' }),
                lastUpdated: fields.text({ label: 'Podtytuł', defaultValue: 'Klauzula informacyjna zgodna z art. 13 RODO' }),
                content: fields.markdoc({ label: 'Treść dokumentu', extension: 'mdoc', components: customComponents as any }),
            }
        })
    },
    collections: {
        authors: collection({
            label: 'Redakcja (Autorzy)',
            slugField: 'name',
            path: 'src/content/authors/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Imię i Nazwisko' } }),
                role: fields.text({ label: 'Stanowisko / Tytuł (np. Radca Prawny)' }),
                bio: fields.text({ label: 'Krótki Biogram', multiline: true }),
                linkedin: fields.url({ label: 'Link do profilu LinkedIn (Opcjonalnie)' }),
                photo: fields.image({
                    label: 'Zdjęcie profilowe',
                    directory: 'public/authors',
                    publicPath: '/authors/'
                })
            }
        }),
        services: collection({
            label: 'Usługi Prawne',
            slugField: 'title',
            previewUrl: '/uslugi/{slug}',
            path: 'src/content/uslugi/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Nazwa SEO (np. Prawo rodzinne Wrocław)' } }),
                seo: seoSchema,
                hero: heroSchema,
                features: fields.array(
                    fields.object({
                        icon: fields.text({ label: 'Ikona (Emoji)', description: 'Opcjonalna ikona.' }),
                        title: fields.text({ label: 'Tytuł cechy/usługi' }),
                        desc: fields.text({ label: 'Opis', multiline: true })
                    }),
                    { label: 'Cechy / Zakres prac (opcjonalne)', itemLabel: props => props.fields.title.value }
                ),
                faq: faqSchema,
                steps: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Tytuł kroku' }),
                        desc: fields.text({ label: 'Opis kroku', multiline: true })
                    }),
                    { label: 'Kroki / Etapy działania (opcjonalne)', itemLabel: props => props.fields.title.value }
                ),
                content: fields.mdx({
                    label: 'Rozszerzony Opis Usługi (Główna Treść)',
                }),
            }
        }),
        blog: collection({
            label: 'Blog (Artykuły Prawnicze)',
            slugField: 'title',
            previewUrl: '/blog/{slug}',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({
                    name: {
                        label: 'Tytuł artykułu',
                        description: 'Zalecane słowa kluczowe (H1)',
                    },
                }),
                publishDate: fields.date({
                    label: 'Data publikacji',
                }),
                author: fields.relationship({
                    label: 'Autor',
                    collection: 'authors',
                    validation: { isRequired: true }
                }),
                category: fields.select({
                    label: 'Kategoria',
                    options: [
                        { label: 'Prawo rodzinne', value: 'Prawo rodzinne' },
                        { label: 'Prawo cywilne', value: 'Prawo cywilne' },
                        { label: 'Prawo karne', value: 'Prawo karne' },
                        { label: 'Prawo nieruchomości', value: 'Prawo nieruchomości' },
                        { label: 'Prawo upadłościowe', value: 'Prawo upadłościowe' },
                        { label: 'Odszkodowania', value: 'Odszkodowania' },
                        { label: 'Prawo gospodarcze', value: 'Prawo gospodarcze' },
                        { label: 'Porady ogólne', value: 'Porady ogólne' },
                    ],
                    defaultValue: 'Prawo rodzinne',
                }),
                relatedService: fields.relationship({
                    label: 'Powiązana Usługa (Cross-Selling CTA)',
                    collection: 'services',
                    description: 'Wybierz stronę z ofertą, do jakiej dąży ten artykuł.',
                }),
                description: fields.text({
                    label: 'Krótki opis (SEO Description / do listingu)',
                    multiline: true,
                }),
                ogImage: fields.image({
                    label: 'Zdjęcie artykułu (OpenGraph SEO)',
                    directory: 'public/photos',
                    publicPath: '/photos/'
                }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    {
                        label: 'Tagi',
                        itemLabel: props => props.value
                    }
                ),
                draft: fields.checkbox({
                    label: 'Szkic (ukryj przed publikacją)',
                    defaultValue: false,
                }),
                content: fields.mdx({
                    label: 'Treść artykułu',
                }),
            },
        }),
        toolsInfo: collection({
            label: 'Karty Kalkulatorów',
            slugField: 'title',
            path: 'src/content/toolsInfo/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Tytuł kalkulatora', description: 'np. "Kalkulator kosztów rozwodu"' } }),
                desc: fields.text({ label: 'Krótki opis', multiline: true }),
                fraza: fields.text({ label: 'Wyróżniony tag / fraza (np. "ile kosztuje rozwód")' }),
                icon: fields.text({ label: 'Kod SVG (ikona, klasa text-gold)', multiline: true }),
                image: fields.image({
                    label: 'Grafika reklamowa dla kalkulatora',
                    directory: 'public/tools',
                    publicPath: '/tools/'
                })
            }
        })
    },
});
