<template>
  <div class="divorce-calculator font-sans">
    <!-- Inputs -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">1</span>
            Tryb orzekania o winie
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in trybOptions" :key="opt.value"
              @click="form.tryb = opt.value"
              :class="['p-4 md:p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-center h-full',
                form.tryb === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              <span class="block font-semibold text-base mb-1" :class="{'text-navy': form.tryb === opt.value}">{{ opt.label }}</span>
              <span class="text-xs font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">2</span>
            Dzieci
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button v-for="opt in dzieciOptions" :key="opt.value"
              @click="form.dzieci = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.dzieci === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div v-show="form.dzieci === 'tak'" class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm transition-all duration-500">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">3</span>
            Spór o opiekę nad dziećmi?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.sporOpieka = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.sporOpieka === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">4</span>
            Podział majątku
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button v-for="opt in majatekOptions" :key="opt.value"
              @click="form.majatekPodzial = opt.value"
              :class="['p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center',
                form.majatekPodzial === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.05]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              <span class="block font-bold text-sm mb-1" :class="{'text-navy': form.majatekPodzial === opt.value}">{{ opt.label }}</span>
              <span class="text-xs font-medium opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">5</span>
            Reprezentacja prawna
          </label>
          <div class="space-y-3">
            <button v-for="opt in reprezentacjaOptions" :key="opt.value"
              @click="form.reprezentacja = opt.value"
              :class="['w-full p-4 md:p-5 rounded-2xl border-2 text-sm md:text-base transition-all text-left flex justify-between items-center',
                form.reprezentacja === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              <span class="font-semibold">{{ opt.label }}</span>
              <span :class="form.reprezentacja === opt.value ? 'text-gold font-bold' : 'text-navy/50 font-medium'" class="text-sm px-3 py-1 rounded-lg bg-navy/5">{{ opt.cena }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result panel -->
      <div class="lg:col-span-5 relative">
        <div class="bg-navy rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 border border-white/10 shadow-[0_20px_50px_-12px_rgba(15,37,64,0.3)] min-h-[500px] overflow-hidden">
          <!-- Dekoracyjny gradient -->
          <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[20rem] h-[20rem] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">
            <p class="text-sm text-white/70 uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              Szacunkowe wydatki
            </p>

            <div class="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm mb-6">
              <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Suma łączna (brutto)</p>
              <p class="text-4xl lg:text-5xl font-sans text-gold font-bold tracking-tight">{{ totalMin }} – {{ totalMax }}</p>
            </div>

            <!-- Cost table -->
            <div class="space-y-4 mb-8">
              <div v-for="row in kosztTabela" :key="row.label"
                class="flex justify-between items-center border-b border-white/5 pb-3">
                <span class="text-sm text-white/80 pr-4">{{ row.label }}</span>
                <span class="text-sm font-bold text-white whitespace-nowrap">{{ row.wartosc }}</span>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
              <div class="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-1">Szacowany czas</p>
                <p class="text-white text-base font-medium">{{ czasPostepowania }}</p>
              </div>
            </div>
          </div>

          <div class="relative z-10 mt-10">
            <a href="/kontakt"
              class="block text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/20"
              style="background:#c9a84c; color:#0f2540;">
              Porozmawiaj o Twojej sprawie
            </a>
            <p class="text-xs text-white/50 text-center mt-4">Napisz lub zadzwoń by sprawdzić standardy</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Ważne:</strong> Powyższe wyliczenia mają charakter wyłącznie orientacyjny i nie stanowią porady prawnej.
      Rzeczywiste koszty zależą od indywidualnych okoliczności sprawy. Honoraria prawnicze podane wg stawek rynkowych we Wrocławiu – mogą się różnić.
      Podstawa prawna opłat sądowych: <em>Ustawa z dnia 28 lipca 2005 r. o kosztach sądowych w sprawach cywilnych (t.j. Dz. U. z 2023 r. poz. 1144 ze zm.)</em>.
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
