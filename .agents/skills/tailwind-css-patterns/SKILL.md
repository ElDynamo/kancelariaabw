---
name: tailwind-css-patterns
description: Baza wiedzy o standardach i architekturze V4 w Tailwind (tj. nowe formaty @theme, customowe style, kompozycja utilities).
---

# Nowoczesne Wzorce Architektury (Tailwind CSS v4)

Ten skill dyktuje asystentowi sposób pracy nad plikami globalnego arkusza:

## 1. Hierarchia V4 w plikach global.css
Kiedy kompilujesz plik `.css`, utrzymuj wzorzec z poprawnym hoisting-iem PostCSS:
1. `@import "tailwindcss";`
2. Zewnętrzne definicje tematów środowiskowych (np. `@theme { --color-surface: var(--bg-surface); }`)
3. Globalne style resetów (np. `* { min-w-0; }`)
4. Komponenty wstrzyknięte `@layer components { .filter-pill-base { @apply flex ... border; } }`
5. Natywne style użytkowe za pomocą `@utility { ... }`

## 2. Utility-First vs Związki Tradycyjne
- Zawsze przerzucaj niepotrzebne tasiemce (tzw. string templates JS-owe) do `@layer components`, by zmniejszać rozmiar drzewa DOM i re-renderów.

## 3. Kompozycja Modułowa Scrollbarów
- Pasywne scrollbary używamy pod dyktatem Tailwinda przez `@utility scrollbar-thin`.
