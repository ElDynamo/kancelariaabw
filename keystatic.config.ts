import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        blog: collection({
            label: 'Blog (Artykuły Prawnicze)',
            slugField: 'title',
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
                author: fields.text({
                    label: 'Autor',
                    defaultValue: 'Anna Jarczyńska',
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
                description: fields.text({
                    label: 'Krótki opis (SEO Description / do listingu)',
                    multiline: true,
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
                content: fields.markdoc({
                    label: 'Treść artykułu',
                }),
            },
        }),
    },
});
