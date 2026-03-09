const fs = require('fs');
const path = require('path');

const privacyContent = `---
title: Polityka prywatności
lastUpdated: Ostatnia aktualizacja: marzec 2026
---

## 1. Administrator danych osobowych
Administratorem Twoich danych osobowych jest **Anna Jarczyńska**, prowadząca działalność gospodarczą pod firmą **Kancelaria Prawna ABW**, z siedzibą we Wrocławiu, adres e-mail: a.jarczynska@kancelariaabw.pl, tel: 609 366 160.

## 2. Podstawa prawna i cel przetwarzania danych
Twoje dane osobowe przetwarzane są na podstawie:
- **Art. 6 ust. 1 lit. b RODO** — gdy przetwarzanie jest niezbędne do wykonania umowy lub podjęcia działań przed jej zawarciem (np. obsługa zapytania przez formularz kontaktowy),
- **Art. 6 ust. 1 lit. a RODO** — gdy wyraziłeś zgodę na przetwarzanie danych (np. kontakt marketingowy),
- **Art. 6 ust. 1 lit. c RODO** — gdy przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na administratorze.

## 3. Zakres przetwarzanych danych
Przetwarzamy wyłącznie dane niezbędne do realizacji celu, w szczególności: imię i nazwisko, adres e-mail, numer telefonu, treść korespondencji.

## 4. Prawa użytkownika
Zgodnie z RODO przysługują Ci następujące prawa:
- prawo dostępu do Twoich danych (art. 15 RODO),
- prawo do sprostowania danych (art. 16 RODO),
- prawo do usunięcia danych ("prawo do bycia zapomnianym", art. 17 RODO),
- prawo do ograniczenia przetwarzania (art. 18 RODO),
- prawo do przenoszenia danych (art. 20 RODO),
- prawo wniesienia sprzeciwu (art. 21 RODO),
- prawo wniesienia skargi do Prezesa UODO (ul. Stawki 2, 00-193 Warszawa).

## 5. Okres przechowywania danych
Dane przechowywane są przez czas niezbędny do realizacji celu, w jakim zostały zebrane, lub do momentu cofnięcia zgody, nie dłużej jednak niż wymagają tego przepisy prawa.

## 6. Odbiorcy danych
Twoje dane mogą być przekazywane podmiotom przetwarzającym dane w imieniu administratora (np. dostawcom usług IT), wyłącznie w zakresie niezbędnym do realizacji usług. Nie sprzedajemy danych osobowych.

## 7. Pliki cookies i analityka
Na stronie kancelariaabw.pl używamy narzędzia Plausible Analytics, które **nie używa plików cookies** i nie zbiera danych osobowych. Analityka jest w pełni anonimowa i zgodna z RODO — nie wymagamy zgody na cookies.

## 8. Kontakt w sprawach danych osobowych
W sprawach związanych z ochroną danych osobowych możesz skontaktować się z administratorem pod adresem: [a.jarczynska@kancelariaabw.pl](mailto:a.jarczynska@kancelariaabw.pl).
`;

const termsContent = `---
title: Regulamin
lastUpdated: Regulamin świadczenia usług drogą elektroniczną zgodny z Ustawą z dnia 18 lipca 2002 r...
---

## §1. Postanowienia ogólne
Niniejszy regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem kancelariaabw.pl (dalej: „Serwis"), prowadzonego przez Annę Jarczyńską, prowadzącą działalność pod firmą Kancelaria Prawna ABW z siedzibą we Wrocławiu (dalej: „Usługodawca").

## §2. Rodzaje świadczonych usług
Za pośrednictwem Serwisu świadczone są następujące usługi drogą elektroniczną:
- udostępnianie informacji o ofercie kancelarii,
- obsługa formularza kontaktowego,
- dostęp do treści bloga prawniczego.

## §3. Wymagania techniczne
Do korzystania z Serwisu niezbędne jest: urządzenie z dostępem do Internetu, przeglądarka internetowa obsługująca HTML5 i CSS3, aktywny adres e-mail (w przypadku korzystania z formularza kontaktowego).

## §4. Zasady korzystania z Serwisu
Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z prawem, niniejszym Regulaminem i dobrymi obyczajami. Zakazane jest dostarczanie treści bezprawnych oraz działania mogące zakłócić działanie Serwisu.

## §5. Formularz kontaktowy
Korzystanie z formularza kontaktowego jest dobrowolne. Wysłanie wiadomości przez formularz nie jest równoznaczne z nawiązaniem stosunku prawnego (umowy o świadczenie pomocy prawnej). Odpowiedź na zapytanie nastąpi w ciągu 3 dni roboczych.

## §6. Odpowiedzialność
Treści zamieszczone w Serwisie mają charakter wyłącznie informacyjny i nie stanowią porady prawnej. Usługodawca nie ponosi odpowiedzialności za decyzje podjęte na podstawie informacji zawartych w Serwisie bez uprzedniej konsultacji prawnej.

## §7. Własność intelektualna
Wszelkie treści dostępne w Serwisie, w tym teksty, grafiki i projekt strony, są chronione prawem autorskim i stanowią własność Usługodawcy. Kopiowanie bez zgody jest zabronione.

## §8. Postanowienia końcowe
Regulamin wchodzi w życie z dniem publikacji. Usługodawca zastrzega prawo do zmiany regulaminu z powiadomieniem użytkowników poprzez publikację nowej wersji w Serwisie. W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego i Ustawy o świadczeniu usług drogą elektroniczną.

## §9. Kontakt
Kontakt z Usługodawcą: [a.jarczynska@kancelariaabw.pl](mailto:a.jarczynska@kancelariaabw.pl), tel. 609 366 160.
`;

fs.writeFileSync(path.join(__dirname, 'src/content/legal/privacyPolicy.md'), privacyContent);
fs.writeFileSync(path.join(__dirname, 'src/content/legal/termsOfService.md'), termsContent);

console.log('Legal MD files created.');
