# Logika Prawna Kalkulatorów — Specyfikacja Techniczna
> Podstawy prawne zweryfikowane. Stan prawny: marzec 2025.

---

## Kalkulator #1 — Alimenty

### Podstawa prawna
- **KRiO art. 135 § 1** — zakres świadczeń alimentacyjnych zależy od:
  1. Usprawiedliwionych potrzeb uprawnionego (dziecka)
  2. Zarobkowych i majątkowych możliwości zobowiązanego
- **KRiO art. 135 § 2** — wykonywanie osobistych starań przez rodzica sprawującego opiekę może stanowić część świadczenia alimentacyjnego
- **KRiO art. 138** — zmiana stosunków uzasadnia zmianę wyroku

### Ważna uwaga prawna
**W Polsce NIE istnieje stały wzór procentowy.** Sąd zawsze decyduje indywidualnie. Tablice alimentacyjne Ministerstwa Sprawiedliwości (opublikowane 2022) mają charakter **wyłącznie orientacyjny** i nie są prawnie wiążące. Kalkulator pokazuje szacunkowy przedział, nie gwarantowaną kwotę.

### Orientacyjne przedziały z orzecznictwa (2024/2025)
| Sytuacja | Szacunkowy zakres miesięcznie |
|----------|------------------------------|
| Dochód zobowiązanego 3 000–5 000 zł netto | 700–1 200 zł / dziecko |
| Dochód 5 000–8 000 zł netto | 1 200–2 000 zł / dziecko |
| Dochód 8 000–15 000 zł netto | 2 000–4 000 zł / dziecko |
| Opieka naprzemienna (równy podział) | -30% do -50% vs. pełna opieka |

### Logika kalkulatora (pseudokod)
```
INPUT:
  dochodNetto       : number (PLN/mies.)
  wiekDziecka       : enum (0-2, 3-6, 7-12, 13-17, 18+)
  liczbaDzieci      : number (1-5)
  opiekaNaprzemienna: boolean

CONSTANTS (wg tablic MS + orzecznictwo):
  wspolczynnikWiekowy = {
    '0-2':  0.22,  // niemowlę: wyższe koszty pielęgnacji
    '3-6':  0.20,
    '7-12': 0.20,
    '13-17':0.22,  // wyższe koszty edukacji, hobby
    '18+':  0.20   // student
  }

CALCULATION:
  podstawa      = dochodNetto × wspolczynnikWiekowy[wiekDziecka]
  alimentyBruto = podstawa × (1 / liczbaDzieci × 1.15)
    // korekta +15% za każde kolejne dziecko (niższy koszt jednostkowy)
  
  redukcja      = opiekaNaprzemienna ? 0.40 : 0
  alimentyMin   = alimentyBruto × (1 - redukcja) × 0.85
  alimentyMax   = alimentyBruto × (1 - redukcja) × 1.25

OUTPUT:
  "Szacunkowe alimenty: {alimentyMin} – {alimentyMax} zł/mies."
  "~{round(alimentyBruto/dochodNetto×100)}% Twoich możliwości zarobkowych"
  "Świadczenie 800+ nie zmniejsza alimentów (KRiO art. 135 § 3)"
```

### Czynniki zwiększające (do zaznaczenia przez użytkownika)
- Dziecko z niepełnosprawnością (+30–50%)
- Wysoki standard życia zobowiązanego (+20–40%)
- Koszty leczenia/rehabilitacji (+indywidualnie)
- Prywatna szkoła/uczelnia (+indywidualnie)

---

## Kalkulator #2 — Zachowek

### Podstawa prawna
- **KC art. 991 § 1** — zachowek = ułamek × udział ustawowy × substrat zachowku
- **KC art. 992** — przy ustalaniu udziału pomija się osoby wydziedziczone i zrzekające się
- **KC art. 993–995** — co wchodzi do substratu: czysty spadek + darowizny + zapisy windykacyjne
- **KC art. 994** — zasada 10 lat: darowizny na osoby niespadkobierców/nieuprawnione sprzed >10 lat = nie doliczamy
- **KLUCZOWE z orzecznictwa**: darowizny na RZECZ SPADKOBIERCÓW I UPRAWNIONYCH DO ZACHOWKU doliczamy BEZ LIMITU CZASOWEGO
- **KC art. 1007** — przedawnienie: 5 lat od ogłoszenia testamentu / dowiedzenia się o otwarciu spadku

### Ułamki zachowku (art. 991)
| Kto uprawniony | Ułamek |
|----------------|--------|
| Zstępny pełnoletni zdolny do pracy | **1/2** udziału ustawowego |
| Zstępny małoletni LUB trwale niezdolny do pracy | **2/3** udziału ustawowego |
| Małżonek (pełnoletni, zdolny) | **1/2** udziału ustawowego |
| Małżonek trwale niezdolny do pracy | **2/3** udziału ustawowego |
| Rodzic (jeśli uprawniony) | **1/2** udziału ustawowego |

### Udziały ustawowe (KC art. 931–935)
```
// Grupy dziedziczenia:
// Małżonek + dzieci: każde dziecko tyle samo, małżonek = 1/4 ale min 25%
// Przykład: małżonek + 2 dzieci → małżonek 1/4, każde dziecko 3/8
// Bez dzieci: małżonek + rodzice → małżonek 1/2, każdy rodzic 1/4
// Bez rodziny: dalsi krewni
```

### Logika kalkulatora (pseudokod)
```
INPUT:
  wartoscSpadku        : number (PLN, aktywa - pasywa = "czysty" spadek)
  wartoscDarowizn      : number (PLN, darowizny doliczane do masy)
  ktoJestesRelacja     : enum ('zstepny', 'malzonek', 'rodzic')
  czyMaloletnilubNiezdolny: boolean
  liczbaZstepnych      : number (ile dzieci/wnuków dziedziczy)
  czyMalzonekDziedzicy : boolean

CALCULATION:
  substrat = wartoscSpadku + wartoscDarowizn

  // Ustal udział ustawowy wg KRiO
  if (ktoJestesRelacja === 'zstepny' && czyMalzonekDziedzicy) {
    udzialUstawowy = (1 - 0.25) / liczbaZstepnych  // 3/4 dla dzieci łącznie
    // małżonek dostaje 1/4
  } else if (ktoJestesRelacja === 'zstepny' && !czyMalzonekDziedzicy) {
    udzialUstawowy = 1 / liczbaZstepnych
  } else if (ktoJestesRelacja === 'malzonek') {
    udzialUstawowy = liczbaZstepnych > 0 ? 0.25 : 0.50
  } else if (ktoJestesRelacja === 'rodzic') {
    udzialUstawowy = czyMalzonekDziedzicy ? 0.25 : 0.50
  }

  ulamekZachowku = czyMaloletnilubNiezdolny ? (2/3) : (1/2)
  zachowek = substrat × udzialUstawowy × ulamekZachowku

OUTPUT:
  "Twój zachowek wynosi: {zachowek} zł"
  "Substrat zachowku: {substrat} zł"
  "Twój udział ustawowy: {udzialUstawowy×100}%"
  "Zastosowany ułamek: {ulamekZachowku} (art. 991 KC)"
  "Roszczenie przedawnia się: {today + 5 lat}"
```

---

## Kalkulator #3 — Opłaty Sądowe

### Podstawa prawna
- **UKSC — Ustawa z 28 lipca 2005 r. o kosztach sądowych w sprawach cywilnych**
- Nowelizacja **weszła w życie 23 września 2025 r.** — obniżono maksimum opłaty stosunkowej z 200 000 do **100 000 zł**

### Tabela opłat stałych (art. 26–31 UKSC)
| Rodzaj sprawy | Opłata |
|---------------|--------|
| Rozwód, separacja | **600 zł** (zwrot 300 zł przy ugodzie) |
| Pozew o alimenty (powód) | **0 zł** — zwolnienie z mocy prawa (art. 96 ust. 1 pkt 2) |
| Pozew o alimenty (pozwany) | 5% WPS, nie mniej niż 30 zł |
| Podział majątku (zgodny) | **300 zł** |
| Podział majątku (sporny) | **1 000 zł** |
| Zniesienie współwłasności (zgodne) | **300 zł** |
| Zniesienie współwłasności (sporne) | **1 000 zł** |
| Stwierdzenie nabycia spadku | **100 zł** |
| Dział spadku (zgodny) | **300 zł** |
| Dział spadku (sporny) | **1 000 zł** |

### Opłata stosunkowa (art. 13 UKSC)
```
WPS ≤ 20 000 zł → opłata stała wg tabeli (30–1000 zł)
WPS > 20 000 zł → 5% WPS, min 30 zł, MAX 100 000 zł (od IX 2025)
```

### Tabela stała dla WPS ≤ 20 000 zł
| Wartość przedmiotu sporu | Opłata |
|--------------------------|--------|
| do 500 zł | 30 zł |
| 501–1 500 zł | 100 zł |
| 1 501–4 000 zł | 200 zł |
| 4 001–7 500 zł | 400 zł |
| 7 501–10 000 zł | 500 zł |
| 10 001–15 000 zł | 750 zł |
| 15 001–20 000 zł | 1 000 zł |

### Logika kalkulatora (pseudokod)
```
INPUT:
  rodzajSsprawy : enum (ROZWOD_BEZ_WINY, ROZWOD_Z_WINA, ALIMENTY_POWOD,
                        ALIMENTY_POZWANY, PODZIAL_ZGODNY, PODZIAL_SPORNY,
                        ZNIES_WLASN_ZGODNE, ZNIES_WLASN_SPORNE,
                        ZACHOWEK, INNE_MAJATKOWE)
  wps           : number (PLN, wartość przedmiotu sporu)

function obliczOplate(rodzajSsprawy, wps):
  switch(rodzajSsprawy):
    ROZWOD_BEZ_WINY: return { oplata: 600, info: 'Zwrot 300 zł jeśli ugoda' }
    ROZWOD_Z_WINA:   return { oplata: 600, info: 'Brak zwrotu przy orzekaniu o winie' }
    ALIMENTY_POWOD:  return { oplata: 0, info: 'Powód zwolniony z mocy prawa (art. 96 ust. 1 pkt 2 UKSC)' }
    ALIMENTY_POZWANY:return stosunkowa(wps)
    PODZIAL_ZGODNY:  return { oplata: 300 }
    PODZIAL_SPORNY:  return { oplata: 1000 }
    ZACHOWEK/INNE:   return stosunkowa(wps)

function stosunkowa(wps):
  if wps <= 500:    return 30
  if wps <= 1500:   return 100
  if wps <= 4000:   return 200
  if wps <= 7500:   return 400
  if wps <= 10000:  return 500
  if wps <= 15000:  return 750
  if wps <= 20000:  return 1000
  return min(wps × 0.05, 100000)  // max 100 000 zł od IX 2025
```

---

## Kalkulator #4 — Przedawnienie Roszczeń

### Podstawa prawna
- **KC art. 117** — upływ terminu = roszczenie przedawnione
- **KC art. 118** (po nowelizacji z 9 VII 2018 r.):
  - Termin ogólny: **6 lat** (wcześniej 10 lat)
  - Roszczenia o świadczenia okresowe + roszczenia z działalności gosp.: **3 lata**
  - Koniec terminu: **ostatni dzień roku kalendarzowego** (31 XII), jeśli termin ≥ 2 lata
- **KC art. 119** — terminy przedawnienia nie mogą być skracane/przedłużane przez czynność prawną
- **KC art. 123** — przerwanie biegu: pozew, ugoda przed sądem/mediatorem, uznanie długu
- **KC art. 121** — zawieszenie: siła wyższa, brak zdolności procesowej
- **Od 2018 r.**: sąd uwzględnia przedawnienie **z urzędu** w sprawach z konsumentami

### Tabela terminów przedawnienia
| Rodzaj roszczenia | Termin | Podstawa |
|-------------------|--------|----------|
| Ogólny (cywilny, np. umowa pożyczki) | **6 lat** + 31 XII | KC art. 118 |
| Umowy B2B / działalność gospodarcza | **3 lata** + 31 XII | KC art. 118 |
| Świadczenia okresowe (czynsz, odsetki, bieżące alimenty) | **3 lata** + 31 XII | KC art. 118 |
| Zaległe alimenty (poszczególne raty) | **3 lata** | KC art. 118 |
| Delikt (szkoda, NNW) — od dowiedzenia się | **3 lata** | KC art. 4421 § 1 |
| Delikt — od zdarzenia (max) | **10 lat** | KC art. 4421 § 1 |
| Delikt będący zbrodnią | **20 lat** | KC art. 4421 § 2 |
| Zachowek | **5 lat** od ogłoszenia testamentu | KC art. 1007 |
| Roszczenia z umowy sprzedaży konsumenckiej | **6 lat** | KC art. 118 |
| Wierzytelności stwierdzone prawomocnym wyrokiem | **6 lat** | KC art. 125 |

### Logika kalkulatora (pseudokod)
```
INPUT:
  rodzajRoszczenia  : enum (wybór z tabeli)
  dataWymagalnosci  : Date
  czyPrzerwanie     : boolean
  dataPrzerwania    : Date | null
  czyZawieszone     : boolean
  okresBezCzynnosci : number (miesiące zawieszenia)

CALCULATION:
  terminLat = TERMINY[rodzajRoszczenia]  // z tabeli
  
  if (czyPrzerwanie && dataPrzerwania) {
    // Bieg zaczyna się OD NOWA od daty przerwania
    dataStart = dataPrzerwania
  } else {
    dataStart = dataWymagalnosci
  }
  
  dataPrzedawnienia = dataStart + terminLat lat
  
  // Zaokrąglenie do 31.XII jeśli termin >= 2 lata (KC art. 118 zd. 2)
  if (terminLat >= 2) {
    dataPrzedawnienia = new Date(dataPrzedawnienia.getFullYear(), 11, 31)
  }
  
  // Uwzględnienie zawieszenia
  if (czyZawieszone) {
    dataPrzedawnienia += okresBezCzynnosci miesięcy
  }
  
  today = new Date()
  dniPozostalo = (dataPrzedawnienia - today) / 86400000

OUTPUT:
  dataPrzedawnienia: "31 grudnia {rok}"
  status:
    dniPozostalo > 90  → ✅ "Nieprzedawnione — pozostało {dniPozostalo} dni"
    dniPozostalo 1-90  → ⚠️ "PILNE — przedawnienie za {dniPozostalo} dni!"
    dniPozostalo <= 0  → ❌ "Roszczenie przedawnione ({|dniPozostalo|} dni temu)"
```

---

## Kalkulator #5 — Koszty Rozwodu

### Podstawa prawna
- **UKSC art. 26 ust. 1 pkt 1** — opłata sądowa od pozwu o rozwód: **600 zł**
- **UKSC art. 79 ust. 1 pkt 1** — zwrot połowy opłaty (300 zł) przy uprawomocnieniu się wyroku orzekającego rozwód bez orzekania o winie lub przy zawarciu ugody
- **Rozporządzenie MS z 22 X 2015 r.** — minimalne stawki honorariów radców prawnych/adwokatów

### Minimalne stawki radcy/adwokata (Rozp. MS)
| Rodzaj sprawy | Minimalna stawka |
|---------------|-----------------|
| Rozwód bez dzieci | **720 zł** (§ 8 pkt 90 Rozp.) |
| Rozwód z dziećmi (opieka) | **1 080 zł** |
| Podział majątku w ramach sprawy | wg WPS |

> **W praktyce** (rynkowe honoraria Wrocław 2025):
> - Sprawa niesporna: 3 000–6 000 zł
> - Sprawa o winie / sporna: 5 000–15 000 zł
> - Podział majątku: +2 000–8 000 zł

### Logika kalkulatora (pseudokod)
```
INPUT:
  trybRozwodu        : enum (BEZ_WINY, Z_WINA)
  saDzieci           : boolean
  sporOpieka         : boolean  // jeśli są dzieci
  podjalMajatku      : boolean
  wartoscMajatku     : number   // PLN
  reprezentacja      : enum (SAM, RADCA_TANI, RADCA_SREDNI, RADCA_PREMIUM)

CONSTANTS:
  WYCENA_RADCY = {
    SAM:          0,
    RADCA_TANI:   { min: 3000, max: 5000 },
    RADCA_SREDNI: { min: 5000, max: 8000 },
    RADCA_PREMIUM:{ min: 8000, max: 15000 }
  }

CALCULATION:
  // 1. Opłata sądowa
  oplataSadowa = 600
  zwrotOplaty = (trybRozwodu === BEZ_WINY) ? 300 : 0
  oplataNetto = oplataSadowa - zwrotOplaty

  // 2. Honorarium prawnika
  honorarium = WYCENA_RADCY[reprezentacja]
  if (saDzieci && sporOpieka) honorarium.min += 1500; honorarium.max += 3000
  
  // 3. Biegły psycholog (jeśli spór o dzieci)
  bieglyPsycholog = (saDzieci && sporOpieka) ? { min: 700, max: 2500 } : 0
  
  // 4. Podział majątku
  podzialOplata = podjalMajatku
    ? (sporOpieka ? 1000 : 300)  // sporny vs zgodny
    : 0
  bieglyMajatkowy = podjalMajatku
    ? { min: 1000, max: 5000 }
    : 0
  
  TOTAL_MIN = oplataNetto + honorarium.min + bieglyPsycholog.min + podzialOplata + bieglyMajatkowy.min
  TOTAL_MAX = oplataSadowa + honorarium.max + bieglyPsycholog.max + podzialOplata + bieglyMajatkowy.max

  // 5. Timeline
  czas = {
    BEZ_WINY_BEZ_DZIECI:  '2–4 miesiące',
    BEZ_WINY_Z_DZIECMI:   '4–8 miesięcy',
    Z_WINA_BEZ_DZIECI:    '6–12 miesięcy',
    Z_WINA_Z_DZIECMI:     '12–24 miesiące',
  }

OUTPUT:
  Tabela kosztów:
  ┌─────────────────────────┬──────────────┬──────────────┐
  │ Pozycja                 │ Kwota min    │ Kwota max    │
  ├─────────────────────────┼──────────────┼──────────────┤
  │ Opłata sądowa           │ 600 zł       │ 600 zł       │
  │ Zwrot opłaty*           │ -300 zł      │ -            │
  │ Honorarium prawnika     │ {min}        │ {max}        │
  │ Biegły psycholog**      │ {min}        │ {max}        │
  │ Opłata podział majątku  │ {kwota}      │ {kwota}      │
  │ Biegły majątkowy**      │ {min}        │ {max}        │
  ├─────────────────────────┼──────────────┼──────────────┤
  │ ŁĄCZNIE (szacunek)      │ {TOTAL_MIN}  │ {TOTAL_MAX}  │
  └─────────────────────────┴──────────────┴──────────────┘
  * Zwrot tylko przy orzeczeniu bez orzekania o winie
  ** Koszt biegłego zależy od decyzji sądu
  Szacowany czas postępowania: {czas}
```

---

## Wspólny disclaimer (wymagany na każdym kalkulatorze)

```html
<div class="disclaimer">
  <strong>⚠️ Ważne:</strong> Wyniki kalkulatora mają charakter wyłącznie
  orientacyjny i nie stanowią porady prawnej w rozumieniu art. 4 ustawy
  z dnia 6 lipca 1982 r. o radcach prawnych. Dokładny wynik zależy od 
  indywidualnych okoliczności sprawy i zawsze jest ustalany przez sąd 
  lub wynika z negocjacji stron. Skontaktuj się z kancelarią w celu 
  uzyskania profesjonalnej oceny Twojej sytuacji.
</div>
```
