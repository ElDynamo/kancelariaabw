---
name: tailwindcss-advanced-layouts
description: Specjalistyczna wiedza o tworzeniu responsywnych, płynnych layoutów (Island, Bento, Container Queries, Grid) w środowisku Tailwind V4+.
---

# Zaawansowane układy z użyciem Tailwind CSS v4

Ten skill wzbogaca asystenta o precyzyjną wiedzę na temat logiki budowy zaawansowanych layoutów:

## 1. Wyspowe Układy (Island Layout / Bento)
- Wprowadziliśmy klasy takie jak `.island-card` w `@layer components`. Zawsze rozbijaj monolith UI na niezależne kafelki (wyspy).
- Wymagane utility: `bg-surface rounded-3xl shadow-sm border border-border/80`.
- Używaj `.bento-box` by zagwarantować gęsty layout w dashboardach.

## 2. Paski ułożenia na Grid/Flex
- Obiekty typu sidebar zbijaj flexem lub siatką bento i chroń przed nadmiarem rozciągnięć (`min-w-0`), oraz wymuszaj zawijanie.

## 3. Kompozycja kontenerów
- Unikaj twardych wrapperów typu `.app-container`. Pracuj na klasach natywnych Tailwind na poziomie widoku: np. `flex flex-col items-center min-h-[100dvh] w-full p-6`.
