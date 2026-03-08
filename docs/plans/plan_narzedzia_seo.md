# Plan: Mini-Narzędzia Prawne — SEO Content Strategy
> Stack: Vue 3 Island (`client:visible`) + Astro strona + JSON-LD `WebApplication` + artykuł SEO

---

## Struktura URL i filozofia

Każde narzędzie = **oddzielna strona Astro** z pełną treścią SEO + Vue Island z kalkulatorem.
Strony wchodzą pod `/narzedzia/[slug]`, z nadrzędną stroną `/narzedzia` linkującą do wszystkich.

```
/narzedzia                          ← hub strona (lista narzędzi, wewnętrzne linkowanie)
/narzedzia/kalkulator-alimentow     ← #1
/narzedzia/kalkulator-zachowku      ← #2
/narzedzia/oplaty-sadowe            ← #3
/narzedzia/przedawnienie-roszczen   ← #4
/narzedzia/koszty-rozwodu           ← #5
```

### Struktura każdej strony `/narzedzia/[slug].astro`
```
H1: "[Nazwa narzędzia] — Kalkulator Online 2025"
↓ Krótki intro (2 zdania, fraza kluczowa)
↓ ┌─────────────────────────────────────────┐
   │  [VUE ISLAND — kalkulator / formularz]  │  ← interaktywny, client:visible
   └─────────────────────────────────────────┘
↓ H2: "Jak obliczyć [X]? — wyjaśnienie metodologii"
↓ Treść: 600–900 słów (prawo PL, jak wylicza sąd, co wpływa)
↓ H2: "Często zadawane pytania" → FAQPage JSON-LD
↓ CTA: "Masz wątpliwości co do wyniku? Skontaktuj się z kancelarią"
```

**JSON-LD na każdej stronie:**
- `WebApplication` (typ narzędzia)
- `FAQPage` (pytania i odpowiedzi)
- `BreadcrumbList`

---

## Narzędzie #1 — Kalkulator Alimentów
**URL:** `/narzedzia/kalkulator-alimentow`
**Fraza główna:** `kalkulator alimentów` (880/mies.), `jak wyliczyć alimenty` (720/mies.)
**Frazy długoogonowe:** `alimenty kalkulator 2025`, `jak obliczyć alimenty na dziecko`

### Logika kalkulatora (Vue)
```
Inputs:
  - Dochód zobowiązanego (slider, PLN/mies.)
  - Wiek dziecka (0-2 / 3-6 / 7-12 / 13-17 / 18+)
  - Liczba dzieci (1-5)
  - Tryb opieki (naprzeminna / pełna opieka jednego rodzica)
  - Koszty dziecka (szacunkowe: edukacja, leczenie, zajęcia)

Outputs:
  - Szacunkowe alimenty wg sądu [MIN–MAX PLN/mies.]
  - % dochodu zobowiązanego
  - Disclaimer: "To orientacyjne wyliczenie. Sąd może zasądzić inną kwotę."
  - CTA: "Sprawdź swoje szanse — Umów konsultację"
```

### Metodologia (treść artykułu)
Polska ustawa KRiO art. 135 — standard odpowiedni do sytuacji majątkowej + usprawiedliwione potrzeby dziecka. Sądy orientacyjnie przyjmują 15–25% dochodu na jedno dziecko.

### FAQ (5 pytań → FAQPage JSON-LD)
1. Jak sąd oblicza alimenty?
2. Czy można zmienić alimenty po wyroku?
3. Co wlicza się do kosztów utrzymania dziecka?
4. Czy dochód z za granicy jest brany pod uwagę?
5. Co jeśli ojciec/matka ukrywa dochody?

**Wewnętrzne linki:** → `/uslugi/prawo-rodzinne` → `/blog/alimenty-na-dziecko-jak-uzyskac`

---

## Narzędzie #2 — Kalkulator Zachowku
**URL:** `/narzedzia/kalkulator-zachowku`
**Fraza główna:** `kalkulator zachowku` (590/mies.), `ile wynosi zachowek` (480/mies.)
**Frazy długoogonowe:** `jak obliczyć zachowek po rodzicach`, `zachowek od darowizny kalkulator`

### Logika kalkulatora (Vue)
```
Inputs:
  - Wartość majątku spadkowego (PLN)
  - Kim jesteś: zstępny / małżonek / rodzic (radio)  
  - Czy jesteś małoletni lub trwale niezdolny do pracy? (tak/nie)
  - Liczba uprawnionych do zachowku
  - Czy były darowizny za życia? (PLN, opcjonalne)

Outputs:
  - Twój zachowek: X PLN
  - Podstawa obliczenia: czysty spadek + darowizny = Y PLN
  - Udziały spadkowe ustawowe = Z
  - Disclaimer + CTA
```

### Metodologia
Art. 991 KC — zachowek = 1/2 (lub 2/3 dla małoletnich/niezdolnych) udziału w dziedziczeniu ustawowym. Darowizny z 10 lat doliczane do masy.

### FAQ (5 pytań)
1. Od czego zależy wysokość zachowku?
2. Kiedy zachowek wynosi 2/3?
3. Czy można wydziedziczyć?
4. Jak darowizny wpływają na zachowek?
5. Kiedy przedawnia się roszczenie o zachowek?

**Wewnętrzne linki:** → `/uslugi/prawo-cywilne` → blog o dziedziczeniu

---

## Narzędzie #3 — Kalkulator Opłat Sądowych
**URL:** `/narzedzia/oplaty-sadowe`
**Fraza główna:** `opłata sądowa kalkulator` (390/mies.), `ile kosztuje pozew` (320/mies.)
**Frazy długoogonowe:** `opłata od pozwu o alimenty`, `opłata sądowa 2025`

### Logika kalkulatora (Vue)
```
Inputs:
  - Rodzaj sprawy (select):
      ○ Pozew majątkowy
      ○ Rozwód bez orzekania o winie
      ○ Rozwód z orzekaniem o winie
      ○ Alimenty
      ○ Podział majątku
      ○ Zachowek / spadek
  - Wartość przedmiotu sporu (jeśli majątkowy, PLN)

Outputs:
  - Opłata sądowa (PLN lub "stała 600 zł") wg art. 13 UKSC
  - Zwolnienie z opłat — kto może wnioskować?
  - Możliwe koszty dodatkowe (biegły, pełnomocnik)
  - Link do wniosku o zwolnienie z kosztów
```

### Metodologia
Ustawa o kosztach sądowych w sprawach cywilnych (UKSC). Stałe: rozwód = 600 zł, alimenty = 0 zł (powód zwolniony). Stosunkowe: 5% WPS, min 30 zł max 200 000 zł.

### FAQ
1. Kto jest zwolniony z opłat sądowych?
2. Ile kosztuje pozew o rozwód?
3. Czy alimenty są zimne z opłat?
4. Co to jest WPS i jak go określić?
5. Jak złożyć wniosek o zwolnienie z kosztów?

**Wewnętrzne linki:** → `/cennik` → `/uslugi/prawo-rodzinne` → `/uslugi/prawo-cywilne`

---

## Narzędzie #4 — Kalkulator Przedawnienia Roszczeń
**URL:** `/narzedzia/przedawnienie-roszczen`
**Fraza główna:** `kiedy przedawnia się dług` (820/mies.), `kalkulator przedawnienia` (290/mies.)
**Frazy długoogonowe:** `przedawnienie roszczenia umowa`, `termin przedawnienia długu 2025`

### Logika kalkulatora (Vue)
```
Inputs:
  - Rodzaj roszczenia (select):
      ○ Umowa cywilna (ogólna) → 6 lat
      ○ Umowa B2B / działal. gosp. → 3 lata
      ○ Wynagrodzenie za pracę → 3 lata
      ○ Delikt (szkoda) → 3 lata (20 lat jeśli zbrodnia)
      ○ Zachowek → 5 lat
      ○ Świadczenia okresowe (czynsz, alimenty) → 3 lata
  - Data wymagalności roszczenia (datepicker)
  - Czy było przerwanie biegu? (tak/nie + data)
  - Czy było zawieszenie? (tak/nie)

Outputs:
  - Data przedawnienia
  - Dni/miesięcy pozostało
  - Status: ✅ Nieprzedawnione / ⚠️ Wkrótce / ❌ Przedawnione
  - Ostrzeżenie jeśli < 3 miesiące
```

### Metodologia
KC art. 117–125 (nowelizacja 2018 — skrócenie z 10 do 6 lat dla roszczeń ogólnych, 3 lata dla B2B). Przerwanie biegu: wezwanie, pozew, uznanie długu. Sąd bierze pod uwagę z urzędu od 2018 r.

### FAQ
1. Kiedy dług się przedawnia?
2. Co przerywa bieg przedawnienia?
3. Czy sąd sprawdza przedawnienie z urzędu?
4. Czy można dochodzić przedawnionego długu?
5. Co robić gdy wierzyciel grozi pozwem o przedawniony dług?

**Wewnętrzne linki:** → `/uslugi/prawo-cywilne` → blog o przedawnieniu

---

## Narzędzie #5 — Kalkulator Kosztów Rozwodu
**URL:** `/narzedzia/koszty-rozwodu`
**Fraza główna:** `ile kosztuje rozwód` (1200/mies.), `koszty rozwodu w Polsce` (440/mies.)
**Frazy długoogonowe:** `ile kosztuje rozwód z adwokatem`, `koszty sądowe rozwód 2025`

### Logika kalkulatora (Vue)
```
Inputs:
  - Tryb rozwodu:
      ○ Bez orzekania o winie (szybszy, tańszy)
      ○ Z orzekaniem o winie (dłuższy)
  - Czy są dzieci? → ustalenie opieki + alimenty?
  - Czy jest podział majątku? (tak/nie + szacunkowa wartość)
  - Reprezentacja prawna: sam / adwokat / radca prawny

Outputs:
  Tabela szacunkowych kosztów:
  - Opłata sądowa: 600 zł (zwrot 300 zł przy ugodzie)
  - Honorarium prawnika: [przedział PLN]  
  - Ewentualny biegły (psycholog, majątek): [PLN]
  - Opłata od podziału majątku: 1000 / 500 zł (zgodny)
  RAZEM: min–max PLN
  
  + Timeline: szacowany czas postępowania
  + Disclaimer + CTA
```

### FAQ
1. Ile kosztuje sprawa o rozwód bez adwokata?
2. Czy można odzyskać opłatę sądową?
3. Ile trwa rozwód w Polsce?
4. Czy zawsze trzeba iść do sądu?
5. Czy mediacja obniża koszty?

**Wewnętrzne linki:** → `/uslugi/prawo-rodzinne` → `/kontakt` → kalkulator alimentów

---

## Architektura plików

```
src/
├── components/
│   └── tools/                          ← nowy folder
│       ├── AlimonyCalculator.vue       ← #1
│       ├── InheritanceCalculator.vue   ← #2
│       ├── CourtFeesCalculator.vue     ← #3
│       ├── StatuteLimitationsCalc.vue  ← #4
│       └── DivorceCalculator.vue       ← #5
└── pages/
    └── narzedzia/
        ├── index.astro                 ← hub strona
        ├── kalkulator-alimentow.astro
        ├── kalkulator-zachowku.astro
        ├── oplaty-sadowe.astro
        ├── przedawnienie-roszczen.astro
        └── koszty-rozwodu.astro
```

---

## SEO: Wewnętrzne Linkowanie

```
Strona główna
    └── /narzedzia (sekcja "Darmowe narzędzia")
            ├── /narzedzia/kalkulator-alimentow
            │       └── /uslugi/prawo-rodzinne
            │       └── /blog/alimenty-na-dziecko-jak-uzyskac
            ├── /narzedzia/kalkulator-zachowku
            │       └── /uslugi/prawo-cywilne
            ├── /narzedzia/oplaty-sadowe
            │       └── /cennik
            ├── /narzedzia/przedawnienie-roszczen
            │       └── /uslugi/prawo-cywilne
            └── /narzedzia/koszty-rozwodu
                    └── /narzedzia/kalkulator-alimentow (cross-link!)
                    └── /uslugi/prawo-rodzinne
```

**Kluczowe:** każdy artykuł bloga powinien linkować do odpowiedniego narzędzia
(np. artykuł `alimenty-na-dziecko-jak-uzyskac.md` → link do kalkulatora alimentów).

---

## Priorytety implementacji

| Kolejność | Narzędzie | Uzasadnienie |
|-----------|-----------|--------------|
| 1. | Kalkulator kosztów rozwodu | Najwyższy wolumen frazy "ile kosztuje rozwód" |
| 2. | Kalkulator alimentów | Bezpośrednie prawo rodzinne = core usługa |
| 3. | Opłaty sądowe | Wspólna dla wszystkich spraw, cross-narzędzie |
| 4. | Kalkulator zachowku | Prawo cywilne, dobry wolumen |
| 5. | Przedawnienie roszczeń | Najbardziej techniczne, unikalne |

---

## Komponenty współdzielone (do stworzenia)

```astro
<!-- src/components/tools/ToolDisclaimer.astro -->
<!-- Standardowy disclaimer prawny pod każdym kalkulatorem -->

<!-- src/components/tools/ToolCTA.astro -->
<!-- Spójne CTA pod każdym wynikiem kalkulatora -->

<!-- src/components/tools/ToolResult.astro -->
<!-- Wyróżnione pole z wynikiem (navy box + złoty tekst) -->
```
