<template>
  <div class="divorce-calculator font-sans">
    <!-- Inputs -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">1</span>
            TRYB ORZEKANIA O WINIE
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in trybOptions" :key="opt.value"
              @click="form.tryb = opt.value"
              :class="['p-4 md:p-5 rounded-2xl transition-all text-left flex flex-col justify-center h-full border-2',
                form.tryb === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              <span class="block font-bold text-sm mb-1" :class="{'text-navy': form.tryb === opt.value}">{{ opt.label }}</span>
              <span class="text-[11px] font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">2</span>
            DZIECI
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button v-for="opt in dzieciOptions" :key="opt.value"
              @click="form.dzieci = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border-2',
                form.dzieci === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div v-show="form.dzieci === 'tak'" class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all duration-500">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">3</span>
            SPÓR O OPIEKĘ NAD DZIEĆMI?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.sporOpieka = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border-2',
                form.sporOpieka === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">4</span>
            PODZIAŁ MAJĄTKU
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button v-for="opt in majatekOptions" :key="opt.value"
              @click="form.majatekPodzial = opt.value"
              :class="['p-4 rounded-2xl transition-all flex flex-col items-center justify-center text-center border-2',
                form.majatekPodzial === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              <span class="block font-bold text-[13px] mb-1" :class="{'text-navy': form.majatekPodzial === opt.value}">{{ opt.label }}</span>
              <span class="text-[10px] font-medium opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">5</span>
            REPREZENTACJA PRAWNA
          </label>
          <div class="space-y-3">
            <button v-for="opt in reprezentacjaOptions" :key="opt.value"
              @click="form.reprezentacja = opt.value"
              :class="['w-full p-4 rounded-2xl text-sm transition-all text-left flex justify-between items-center border-2',
                form.reprezentacja === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              <span class="font-bold text-[13px]">{{ opt.label }}</span>
              <span :class="form.reprezentacja === opt.value ? 'text-gold font-bold bg-gold/10' : 'text-navy/40 font-bold bg-slate-200'" class="text-[11px] px-3 py-1.5 rounded-lg ml-2">{{ opt.cena }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result panel -->
      <div class="lg:col-span-5 relative">
        <div id="wyniki-kalkulatora" class="bg-navy rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 min-h-[500px] overflow-hidden shadow-xl shadow-navy/10">
          
          <div class="relative z-10">
            <p class="text-[10px] text-gold/80 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              SZACUNKOWE WYDATKI
            </p>

            <div class="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm mb-6">
              <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-2">Suma łączna (brutto)</p>
              <p class="text-4xl lg:text-5xl font-sans text-gold font-bold tracking-tight">{{ totalMin }} – {{ totalMax }}</p>
            </div>

            <!-- Cost table -->
            <div class="space-y-4 mb-8">
              <div v-for="row in kosztTabela" :key="row.label"
                class="flex justify-between items-center border-b border-white/5 pb-3">
                <span class="text-xs text-white/60 pr-4 leading-relaxed max-w-[70%]">{{ row.label }}</span>
                <span class="text-sm font-bold text-white whitespace-nowrap">{{ row.wartosc }}</span>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-[#3A424E] rounded-2xl p-5 mt-4 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-1">Szacowany czas</p>
                <p class="text-white text-sm font-bold">{{ czasPostepowania }}</p>
              </div>
            </div>
          </div>

          <div class="relative z-10 mt-8">
            <a href="/kontakt"
              class="block text-center px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
              style="background:#D4AF37; color:#1e293b;">
              POROZMAWIAJ O TWOJEJ SPRAWIE
            </a>
            <p class="text-[10px] text-white/40 font-medium text-center mt-4">Napisz lub zadzwoń by poznać wycenę</p>
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

    <!-- Mobile Sticky Bar -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_40px_rgba(15,37,64,0.3)] z-50 flex items-center justify-between border-t border-white/10">
      <div>
        <p class="text-[9px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-0.5">Suma szacunkowa</p>
        <p class="text-xl font-sans text-gold font-bold tracking-tight leading-none">{{ totalMin }} – {{ totalMax }}</p>
      </div>
      <button @click="scrollToResults" class="bg-gold text-navy px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-gold/20">
        Szczegóły 
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
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

const scrollToResults = () => {
  document.getElementById('wyniki-kalkulatora')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
