<template>
  <div class="divorce-calculator font-sans">
    <!-- Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      <div class="space-y-5">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Tryb orzekania o winie</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in trybOptions" :key="opt.value"
              @click="form.tryb = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all text-left',
                form.tryb === opt.value
                  ? 'border-gold bg-navy text-white'
                  : 'border-border bg-white text-navy hover:border-navy']">
              <span class="block font-semibold">{{ opt.label }}</span>
              <span class="text-xs opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Dzieci</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="opt in dzieciOptions" :key="opt.value"
              @click="form.dzieci = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all',
                form.dzieci === opt.value
                  ? 'border-gold bg-navy text-white'
                  : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div v-if="form.dzieci === 'tak'">
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Spór o opiekę nad dziećmi?</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.sporOpieka = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all',
                form.sporOpieka === opt.value
                  ? 'border-gold bg-navy text-white'
                  : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Podział majątku</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in majatekOptions" :key="opt.value"
              @click="form.majatekPodzial = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all',
                form.majatekPodzial === opt.value
                  ? 'border-gold bg-navy text-white'
                  : 'border-border bg-white text-navy hover:border-navy']">
              <span class="block font-semibold text-sm">{{ opt.label }}</span>
              <span class="text-xs opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Reprezentacja prawna</label>
          <div class="space-y-2">
            <button v-for="opt in reprezentacjaOptions" :key="opt.value"
              @click="form.reprezentacja = opt.value"
              :class="['w-full p-3 rounded-xl border-2 text-sm font-medium transition-all text-left flex justify-between items-center',
                form.reprezentacja === opt.value
                  ? 'border-gold bg-navy text-white'
                  : 'border-border bg-white text-navy hover:border-navy']">
              <span>{{ opt.label }}</span>
              <span :class="form.reprezentacja === opt.value ? 'text-gold' : 'text-text-muted'" class="text-xs">{{ opt.cena }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result panel -->
      <div class="bg-navy rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <p class="text-xs text-white opacity-70 uppercase tracking-widest font-semibold mb-4">Szacunkowe koszty</p>

          <!-- Cost table -->
          <div class="space-y-3 mb-6">
            <div v-for="row in kosztTabela" :key="row.label"
              class="flex justify-between items-center border-b border-white/10 pb-2">
              <span class="text-sm text-white opacity-80">{{ row.label }}</span>
              <span class="text-sm font-semibold text-white">{{ row.wartosc }}</span>
            </div>
          </div>

          <div class="bg-white/10 rounded-xl p-4 mb-4">
            <p class="text-xs text-white opacity-70 uppercase tracking-widest font-semibold mb-1">Łączny koszt (szacunek)</p>
            <p class="text-3xl font-serif text-gold font-bold">{{ totalMin }} – {{ totalMax }}</p>
            <p class="text-xs text-white opacity-60 mt-1">wartości w PLN (brutto)</p>
          </div>

          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-xs text-white opacity-70 uppercase tracking-widest font-semibold mb-2">⏱ Szacowany czas</p>
            <p class="text-white text-sm font-semibold">{{ czasPostepowania }}</p>
          </div>
        </div>

        <div class="mt-6">
          <a href="/kontakt"
            class="block text-center px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide"
            style="background:#c9a84c; color:#0f2540;">
            Umów bezpłatną rozmowę
          </a>
          <p class="text-xs text-white opacity-60 text-center mt-2">Sprawdź czy Twój wynik jest typowy</p>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
      <strong>⚠️ Ważne:</strong> Powyższe wyliczenia mają charakter wyłącznie orientacyjny i nie stanowią porady prawnej.
      Rzeczywiste koszty zależą od indywidualnych okoliczności sprawy. Honoraria prawnicze podane wg stawek rynkowych Wrocław 2025 — mogą się różnić.
      Podstawa: UKSC (Dz.U. 2005 nr 167 poz. 1398 ze zm.).
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref({
  tryb: 'bez_winy',
  dzieci: 'nie',
  sporOpieka: 'nie',
  majatekPodzial: 'brak',
  reprezentacja: 'radca_sredni',
});

const trybOptions = [
  { value: 'bez_winy', label: 'Bez orzekania', sub: 'Szybszy, zwrot 300 zł' },
  { value: 'z_wina', label: 'Z orzekaniem', sub: 'Dłuższy, brak zwrotu' },
];
const dzieciOptions = [
  { value: 'nie', label: 'Brak dzieci' },
  { value: 'tak', label: 'Mam dzieci' },
  { value: 'pelnoletnie', label: 'Pełnoletnie' },
];
const takNieOptions = [
  { value: 'nie', label: 'Brak sporu' },
  { value: 'tak', label: 'Jest spór' },
];
const majatekOptions = [
  { value: 'brak', label: 'Bez podziału', sub: 'Brak majątku wspólnego' },
  { value: 'zgodny', label: 'Zgodny', sub: '300 zł opłata' },
  { value: 'sporny', label: 'Sporny', sub: '1 000 zł opłata' },
];
const reprezentacjaOptions = [
  { value: 'sam', label: 'Bez prawnika', cena: '0 zł' },
  { value: 'radca_tani', label: 'Radca / adwokat (podstawowy)', cena: '3 000–5 000 zł' },
  { value: 'radca_sredni', label: 'Radca / adwokat (standardowy)', cena: '5 000–8 000 zł' },
  { value: 'radca_premium', label: 'Radca / adwokat (premium)', cena: '8 000–15 000 zł' },
];

const HONORARIA: Record<string, { min: number; max: number }> = {
  sam:           { min: 0,     max: 0 },
  radca_tani:    { min: 3000,  max: 5000 },
  radca_sredni:  { min: 5000,  max: 8000 },
  radca_premium: { min: 8000,  max: 15000 },
};

const kosztTabela = computed(() => {
  const rows = [];
  const oplataSadowa = 600;
  const zwrot = form.value.tryb === 'bez_winy' ? 300 : 0;

  rows.push({ label: 'Opłata sądowa (art. 26 UKSC)', wartosc: `${oplataSadowa} zł` });
  if (zwrot > 0) rows.push({ label: 'Zwrot przy ugodzie (art. 79 UKSC)', wartosc: `−${zwrot} zł` });

  const h = HONORARIA[form.value.reprezentacja];
  if (h.max > 0) {
    rows.push({ label: 'Honorarium prawnika', wartosc: `${h.min.toLocaleString('pl-PL')} – ${h.max.toLocaleString('pl-PL')} zł` });
  }

  if (form.value.dzieci === 'tak' && form.value.sporOpieka === 'tak') {
    rows.push({ label: 'Biegły psycholog (jeśli sąd zleci)', wartosc: '700 – 2 500 zł' });
  }

  if (form.value.majatekPodzial === 'zgodny') {
    rows.push({ label: 'Opłata za podział majątku (zgodny)', wartosc: '300 zł' });
  } else if (form.value.majatekPodzial === 'sporny') {
    rows.push({ label: 'Opłata za podział majątku (sporny)', wartosc: '1 000 zł' });
    rows.push({ label: 'Biegły majątkowy (jeśli sąd zleci)', wartosc: '1 000 – 5 000 zł' });
  }

  return rows;
});

const totalMin = computed(() => {
  const h = HONORARIA[form.value.reprezentacja];
  const oplataNetto = form.value.tryb === 'bez_winy' ? 300 : 600;
  let min = oplataNetto + h.min;
  if (form.value.majatekPodzial === 'zgodny') min += 300;
  if (form.value.majatekPodzial === 'sporny') min += 1000;
  return min.toLocaleString('pl-PL') + ' zł';
});

const totalMax = computed(() => {
  const h = HONORARIA[form.value.reprezentacja];
  let max = 600 + h.max;
  if (form.value.dzieci === 'tak' && form.value.sporOpieka === 'tak') max += 2500;
  if (form.value.majatekPodzial === 'zgodny') max += 300;
  if (form.value.majatekPodzial === 'sporny') max += 1000 + 5000;
  return max.toLocaleString('pl-PL') + ' zł';
});

const czasPostepowania = computed(() => {
  if (form.value.tryb === 'bez_winy' && form.value.dzieci !== 'tak') return '2–4 miesiące';
  if (form.value.tryb === 'bez_winy' && form.value.dzieci === 'tak') return '4–8 miesięcy';
  if (form.value.tryb === 'z_wina' && form.value.sporOpieka !== 'tak') return '6–12 miesięcy';
  return '12–24 miesiące';
});
</script>
