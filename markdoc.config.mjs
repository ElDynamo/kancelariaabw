import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    tags: {
        lawBox: {
            render: component('./src/components/markdoc/LawBox.astro'),
            attributes: {
                sygnatura: { type: String, required: true }
            }
        },
        alertBox: {
            render: component('./src/components/markdoc/AlertBox.astro'),
            attributes: {
                title: { type: String, required: true },
                type: { type: String, default: 'info' }
            }
        },
        ctaButton: {
            render: component('./src/components/markdoc/CTAButton.astro'),
            attributes: {
                text: { type: String, required: true },
                href: { type: String, required: true },
                center: { type: Boolean, default: false }
            }
        }
    }
});
