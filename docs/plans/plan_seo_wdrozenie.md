# Plan Wdrożenia Strategii SEO — Kancelaria Prawna ABW
> Źródło: „Plan SEO dla Kancelarii ABW Anna Jarczyńska" (marzec 2026)
> Status: Implementacja w toku

---

## Streszczenie dokumentu źródłowego

Dokument identyfikuje **5 filarów strategii SEO** dla kancelarii YMYL:

1. **Filar 1 — Local SEO** (Google Business Profile + NAP Consistency)
2. **Filar 2 — Silosowanie Tematyczne** (architektura URL + linkowanie wewnętrzne)
3. **Filar 3 — Topical Authority / Long Tail** (blog klastrowy + kalkulatory)
4. **Filar 4 — E-E-A-T** (autorytety, bio, certyfikaty, opinie)
5. **Filar 5 — Digital PR / Link Building** (Newsjacking, fora, cytaty eksperckie)

**Horyzont czasowy:** 6–9 miesięcy do widocznych wyników (Google Sandbox dla nowych domen).

---

## FILAR 1 — Local SEO i NAP Consistency

### Problem zidentyfikowany w dok.
- **Fragmentacja tożsamości cyfrowej** — SzukajRadcy.pl ma wpis z innym nazwiskiem (Anna Lemieszek) i adresem (ul. Jeleniogórska 3, Wrocław) zamiast Anna Jarczyńska, ul. Wiśniowa 3, Bielany Wrocławskie
- Domena `kancelariaabw.pl` i `konsultacja.info` były niedostępne (greenfield)
- Wiedza Grafu Google zdezorientowana sprzecznymi danymi NAP

### Zadania do wdrożenia

#### 1.1 Audyt NAP (Imię, Adres, Telefon)
- [ ] Sprawdzić i zaktualizować dane w: Google Business Profile, GoWork, LexSpace, SzukajRadcy.pl, OIRP Wrocław, PKT.pl, Panorama Firm, Yelp
- [ ] Kanoniczna wersja NAP: **Kancelaria Prawna ABW · Radca Prawny Anna Jarczyńska · ul. Wiśniowa 3 · 55-040 Bielany Wrocławskie · tel. 609 366 160**
- [ ] Usunąć lub poprosić o korektę wpisu z nazwiskiem Lemieszek

#### 1.2 Google Business Profile (GBP)
- [ ] Główna kategoria: **Kancelaria prawna** (nie ogólny „Prawnik")
- [ ] Kategorie dodatkowe: Radca prawny, Prawo rodzinne, Prawo upadłościowe, Odszkodowania
- [ ] Opis firmy (750 znaków): zawiera naturalne słowa kluczowe miejscowości
- [ ] Zdjęcia: min. 20 (zewnątrz biura, wnętrze, Anna Jarczyńska, logo)
- [ ] Posts GBP: 1–2 tygodniowo (artykuły blogowe, nowe narzędzia, zmiany w prawie)
- [ ] Pytania i odpowiedzi (Q&A): 5–10 pytań + odpowiedzi

#### 1.3 System pozyskiwania opinii Google
- [ ] Szablon wiadomości SMS/email po zakończeniu sprawy z **direct linkiem** do wystawiania opinii
- [ ] Strategia NLP w prośbie: "Będziemy wdzięczni za wzmiankę o rodzaju sprawy (np. upadłość konsumencka, podział majątku)..." — opinie zawierają słowa kluczowe
- [ ] Właściciel odpowiada na każdą opinię, wplatając: rodzaj sprawy + lokalizację (Bielany Wrocławskie)

**Implementacja techniczna:**
```
src/pages/opinie.astro  ← Landing page "Wystaw opinię"
scripts/review-template.md  ← szablony wiadomości
```

---

## FILAR 2 — Silosowanie Tematyczne (Architektura URL)

### Proponowana struktura z dokumentu

| Silos | Pillar Page URL | Główna fraza |
|-------|----------------|--------------|
| Upadłość | `/uslugi/upadlosc-konsumencka-wroclaw` | "upadłość konsumencka wrocław" |
| Odszkodowania | `/uslugi/odszkodowania-komunikacyjne-wroclaw` | "odszkodowania komunikacyjne wrocław" |
| Prawo rodzinne | `/uslugi/prawo-rodzinne-bielany-wroclawskie` | "prawo rodzinne bielany wrocławskie" |
| Nieruchomości | `/uslugi/prawo-nieruchomosci-wroclaw` | "prawo nieruchomości wrocław" |
| Obsługa firm | `/uslugi/obsluga-prawna-firm-wroclaw` | "obsługa prawna firm wrocław" |

### Zadania do wdrożenia

#### 2.1 Nowe strony Pillar (priorytet wg potencjału)

**ISTNIEJĄCE — do przebudowy/rozdzielenia:**
- [x] `/uslugi/prawo-rodzinne` — **DONE**, trzeba rozszerzyć do pełnej pillar page
- [ ] `/uslugi/prawo-cywilne` — za ogólna; rozbić na: nieruchomości, odszkodowania, umowy
- [ ] `/uslugi/prawo-karne` — utrzymać, rozszerzyć

**BRAKUJĄCE — do stworzenia:**
- [ ] `/uslugi/upadlosc-konsumencka-wroclaw` ← **PRIORYTET #1** (najwyższy wolumen)
- [ ] `/uslugi/odszkodowania-komunikacyjne-wroclaw` ← **PRIORYTET #2**
- [ ] `/uslugi/prawo-nieruchomosci-wroclaw` ← PRIORYTET #3
- [ ] `/uslugi/obsluga-prawna-firm-wroclaw` ← PRIORYTET #4

**Każda pillar page musi zawierać:**
```astro
- H1 z frazą geolokalną (np. "Upadłość konsumencka Wrocław")
- 800–1200 słów merytorycznych
- Breadcrumb + BreadcrumbList JSON-LD
- Service JSON-LD Schema
- FAQ (min. 5 pytań) + FAQPage JSON-LD
- CTA z tel. i formularzem
- Sekcja "Powiązane artykuły" (linkowanie do klastrów blogowych)
```

#### 2.2 Linkowanie wewnętrzne (PageRank Sculpting)
- [ ] Każdy artykuł blogowy z danego silosu → link do Pillar Page
- [ ] Anchor text precyzyjny, np. "sprawy o upadłość konsumencką we Wrocławiu"
- [ ] Zakaz cross-linkowania silosów (np. artykuł o upadłości nie linkuje do strony o nieruchomościach)
- [ ] Hub `/uslugi` → linki do wszystkich Pillar Pages

---

## FILAR 3 — Topical Authority i Blog Klastrowy

### Klastry blogowe zdefiniowane w dokumencie

#### Klaster: Upadłość Konsumencka
- [ ] `/blog/czy-ogloszenie-upadlosci-zatrzymuje-komornika`
- [ ] `/blog/koszty-upadlosci-konsumenckiej-wroclaw`
- [ ] `/blog/upadlosc-konsumencka-kiedy-jej-nie-oglosic`
- [ ] `/blog/syndyk-zajecie-dzialki-co-mozna-zrobic`
- [ ] `/blog/wplyw-upadlosci-na-alimenty`

#### Klaster: Odszkodowania
- [ ] `/blog/odszkodowanie-z-oc-sprawcy-jak-uzyskac`
- [ ] `/blog/szkoda-calkowita-wycena-prawnika`
- [ ] `/blog/zadoscuczynienie-za-bol-i-cierpienie-ile`

#### Klaster: Prawo Rodzinne (już częściowo zrobiony)
- [x] `alimenty-na-dziecko-jak-uzyskac` — DONE
- [ ] `/blog/podzial-majatku-po-rozwodzie-zasady`
- [ ] `/blog/jak-napisac-pozew-o-alimenty`
- [ ] `/blog/ustalenie-kontaktow-z-dzieckiem`

#### Klaster: Nieruchomości
- [ ] `/blog/bezumowne-korzystanie-z-lokalu-odszkodowanie`
- [ ] `/blog/nieuczciwy-najemca-jak-sie-bronic`

#### Klaster: Obsługa firm
- [ ] `/blog/zakladanie-spolki-z-oo-krok-po-kroku`
- [ ] `/blog/umowy-b2b-na-co-uwazac`

### Narzędzia SEO (mini-kalkulatory)
> **ZROBIONE:** Faza 6 — 5 kalkulatorów wdrożonych ✅

- [x] `/narzedzia/koszty-rozwodu`
- [x] `/narzedzia/kalkulator-alimentow`
- [x] `/narzedzia/kalkulator-zachowku`
- [x] `/narzedzia/oplaty-sadowe`
- [x] `/narzedzia/przedawnienie-roszczen`

**Brakujące kalkulatory (zidentyfikowane z dokumentu):**
- [ ] `/narzedzia/kalkulator-upadlosci` — wstępna kwalifikacja do upadłości konsumenckiej
- [ ] `/narzedzia/odszkodowanie-oc` — szacunek odszkodowania z OC sprawcy

### Standardy treści (z dokumentu)
- Minimalna długość artykułu: **1200–2000 słów**
- Każda sekcja odpowiada na JEDNĄ konkretną intencję
- Zawartość obowiązkowa: definicja prawna → procedura krok po kroku → FAQ (5 pyt.) → CTA
- Aktualizacja co 12 miesięcy (daty w frontmatter!)

---

## FILAR 4 — E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

### Zadania do wdrożenia

#### 4.1 Strona /o-mnie (rozbudowanie)
- [ ] Dane autorytetu: nr wpisu do OIRP Wrocław: **WR-3019**
- [ ] Lata doświadczenia, liczba prowadzonych spraw
- [ ] Link do weryfikacji na stronie OIRP: `https://oirp.wroclaw.pl/lista-radcow-prawnych`
- [ ] Odznaczenia branżowe, udział w konferencjach
- [ ] Zdjęcie profesjonalne (portrait, not stock photo — **DONE**)
- [ ] Schema: `Person` JSON-LD z `url`, `jobTitle`, `knowsAbout`, `memberOf`

#### 4.2 Autorstwo na blogu
- [ ] Każdy artykuł: widget "Autor: Anna Jarczyńska, Radca Prawny" + link do /o-mnie
- [ ] Schema `Article`/`BlogPosting` z `author` → `@type: Person`
- [ ] Datę publikacji i ostatniej aktualizacji widoczna na stronie (`dateModified`)

#### 4.3 Transparency (RODO / Polityki)
- [x] `/polityka-prywatnosci` — DONE
- [x] `/regulamin` — DONE
- [x] `/przetwarzanie-danych` — DONE

#### 4.4 Opinie (integracja z GBP)
- [ ] Sekcja "Opinie klientów" na stronie głównej (5–8 wyróżnionych)
- [ ] Ewentualnie widget Google Reviews (lub ręczna sekcja)
- [ ] Schema `AggregateRating` na pillar pages

---

## FILAR 5 — Digital PR i Link Building

### Strategie z dokumentu

#### 5.1 Newsjacking (reagowanie na zmiany w prawie)
**Jak działało:** Po nowej uchwale SN / nowelizacji → krótki komentarz ekspercki → wysłanie do redakcji Gazety Wrocławskiej, Infor, Rzeczpospolita → cytat z linkiem do kancelarii

**Implementacja:**
- [ ] Lista mediów do monitorowania: Gazeta Wrocławska, Infor.pl, Rzeczpospolita, prawo.pl
- [ ] Szablon "media pitch" (2-akapitowy komentarz ekspercki)
- [ ] Alert Google: "ustawa", "Sąd Najwyższy uchwała", "nowelizacja kodeksu"
- [ ] Cel: 1–2 cytaty z linkami miesięcznie

#### 5.2 Fora eksperckie
**Zidentyfikowane fora (z dokumentu):**
- `upadlosckonsumencka.org` — rejestracja konta eksperckiego
- Prawnik24.pl, Prawnik.pl, Forumprawne.org

**Zasada:** Merytoryczna odpowiedź + w konkluzji dyskretny link do artykułu blogowego kancelarii (nie do strony głównej).

#### 5.3 Katalogi branżowe (cytowanie NAP)
- [ ] LexSpace.pl — zaktualizować profil
- [ ] SzukajRadcy.pl — poprawić wpis (usuń Lemieszek)
- [ ] Prawnik24.pl — dodać profil
- [ ] OIRP Wrocław — zweryfikować dane

#### 5.4 Lokalne backlinki
- [ ] Izba Gospodarcza Bielany/Wrocław — sponsoring/wpis
- [ ] Lokalne media (wywiad z radcą o zmianach w prawie)
- [ ] Wpis na stronie urzędu gminy Kobierzyce/Bielany

---

## Mapa drogowa (Roadmap) — Harmonogram wdrożenia

```
MIESIĄC 1-2 (Marzec–Kwiecień 2026) — Fundament
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Filar 1: Audyt i naprawa NAP we wszystkich katalogach
[ ] Filar 1: Pełna optymalizacja GBP (kategorie, zdjęcia, Q&A)
[ ] Filar 1: Wdrożenie systemu pozyskiwania opinii
[ ] Filar 2: Stworzenie pillar /uslugi/upadlosc-konsumencka-wroclaw
[ ] Filar 4: Rozbudowanie strony /o-mnie z danymi E-E-A-T
[ ] Tech: robots.txt, sitemap.xml z nowymi URLami

MIESIĄC 2-3 (Kwiecień–Maj 2026) — Treść
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Filar 2: Pillar /uslugi/odszkodowania-komunikacyjne-wroclaw
[ ] Filar 3: 4 artykuły z klastra "Upadłość konsumencka"
[ ] Filar 3: 3 artykuły z klastra "Odszkodowania"
[ ] Filar 4: Widget autorski na wszystkich artykułach
[ ] Kalkulator: /narzedzia/kalkulator-upadlosci

MIESIĄC 3-4 (Maj–Czerwiec 2026) — Ekspansja
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Filar 2: Pillar /uslugi/prawo-nieruchomosci-wroclaw
[ ] Filar 2: Pillar /uslugi/obsluga-prawna-firm-wroclaw
[ ] Filar 3: 5 artykułów z klastrów "Nieruchomości" + "Firmy"
[ ] Filar 5: Rejestracja na forach + pierwsze 5 eksperckich odpowiedzi
[ ] Filar 5: Pierwsza akcja Newsjacking

MIESIĄC 4-6 (Czerwiec–Sierpień 2026) — Autorytety
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Filar 5: 2+ cytaty w mediach regionalnych z linkiem
[ ] Filar 3: Regularne 2 artykuły/mies. (utrzymanie)
[ ] Filar 1: Analiza wzrostu liczby opinii GBP
[ ] Lighthouse audit: Core Web Vitals ≥ 90 na wszystkich stronach
[ ] Pierwsze efekty z Google Sandbox (widoczność fraz long-tail)

MIESIĄC 6-9 (Wrzesień–Grudzień 2026) — Dominacja
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Monitorowanie pozycji frazy "upadłość konsumencka wrocław"
[ ] Rozszerzenie klastrów na nowe frazy (na bazie GSC)
[ ] AggregateRating na pillar pages (po zebraniu 20+ opinii)
[ ] Newsjacking: regularna aktywność (1/mies.)
```

---

## Metryki sukcesu (KPI)

| Metryka | Cel 6 mies. | Cel 12 mies. |
|---------|-------------|--------------|
| Opinie Google (liczba) | 15+ | 30+ |
| Opinie Google (średnia) | ≥ 4.7 | ≥ 4.8 |
| Pozycja "upadłość konsumencka wrocław" | Top 10 | Top 5 |
| Pozycja "radca prawny bielany wrocławskie" | Top 3 | #1 |
| Organic clicks/mies. | 300+ | 1000+ |
| Backlinki z domen zewnętrznych | 10+ | 30+ |
| Core Web Vitals (LCP) | < 2.5s | < 2.0s |

---

## Implementacja techniczna — co już mamy vs co brakuje

### ✅ Zrobione
- Astro 5 + Vue Islands + Tailwind v4 + JSON-LD
- Strony: główna, o-mnie, usługi (rodzinne, cywilne, karne), kontakt, blog, RODO
- 5 kalkulatorów SEO (/narzedzia/*)
- BreadcrumbList, FAQPage, LegalService, BlogPosting JSON-LD
- Google Sitemap (@astrojs/sitemap)
- Responsywność mobile (Layout Astro)
- Zdjęcia Anny Jarczyńskiej w hero + o-mnie

### 🔴 Brakuje (priorytetowe)
1. Pillar page `/uslugi/upadlosc-konsumencka-wroclaw`
2. Pillar page `/uslugi/odszkodowania-komunikacyjne-wroclaw`  
3. Naprawa fragmentacji NAP w zewnętrznych katalogach
4. Pełna optymalizacja GBP (kategorie specjalizacji)
5. Widget "Autor" na artykułach blogowych
6. Schema `Person` z linkiem do wpisu OIRP
7. Sekcja opinii klientów na stronie głównej
