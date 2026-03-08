<template>
  <div class="court-fees-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">1</span>
            Rodzaj sprawy
          </label>
          <div class="relative">
            <select v-model="form.rodzajSprawy"
              class="w-full appearance-none bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-base md:text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner cursor-pointer pr-10">
              <option v-for="opt in sprawOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/50 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="text-xs text-navy/60 font-medium mt-3 px-2">
            {{ sprawOptions.find(o => o.value === form.rodzajSprawy)?.sub }}
          </p>
        </div>

        <div v-show="showWPS" class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm transition-all duration-500">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">2</span>
            Wartość przedmiotu sporu (WPS)
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wps" min="0" step="1000"
              class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 50000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/50 font-medium">zł</span>
          </div>
          <p class="text-xs font-medium text-navy/60 mt-3 px-2">
            Kwota sporu — np. wartość długu, podziału majątku, wysokość odszkodowania.
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">3</span>
            Tryb podziału / ugody (jeśli dotyczy)
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in tryOptions" :key="opt.value"
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
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div class="bg-navy rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 border border-white/10 shadow-[0_20px_50px_-12px_rgba(15,37,64,0.3)] min-h-[500px] overflow-hidden">
          <!-- Dekoracyjny gradient -->
          <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[20rem] h-[20rem] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">
            <p class="text-sm text-white/70 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              Opłata sądowa
            </p>
            <p class="text-5xl md:text-6xl font-sans text-white font-bold mb-2 tracking-tight">
              <span class="text-gold">{{ oplaataMain }}</span>
            </p>

            <div class="space-y-4 mt-8">
              <div v-show="zwrotInfo" class="bg-green-800/30 rounded-2xl p-5 border border-green-500/30 transition-all duration-300">
                <p class="text-xs text-green-300 uppercase tracking-widest font-bold mb-2">✅ Możliwy zwrot</p>
                <p class="text-white text-base">{{ zwrotInfo }}</p>
              </div>
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Podstawa prawna</p>
                <p class="text-white font-medium text-sm">{{ podstawaPrawna }}</p>
              </div>
              <div v-show="zwolnienieInfo" class="bg-amber-600/20 rounded-2xl p-5 border border-amber-500/30 transition-all duration-300">
                <p class="text-xs text-amber-300 uppercase tracking-widest font-bold mb-2">💡 Zwolnienie z opłat</p>
                <p class="text-white/90 font-medium text-sm leading-relaxed">{{ zwolnienieInfo }}</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-10 block text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/20"
            style="background:#c9a84c; color:#0f2540;">
            Zleć nam wniesienie opłaty
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Aktualne przepisy:</strong> <em>Ustawa z dnia 28 lipca 2005 r. o kosztach sądowych w sprawach cywilnych (t.j. Dz. U. z 2023 r. poz. 1144 ze zm.)</em>. Zgodnie z nowelizacją z 2019 r., maksymalna uiszczana opłata stosunkowa wynosi 200 000 zł.
      Kalkulator nie uwzględnia kosztów dodatkowych, takich jak zaliczki na biegłych czy koszty komornicze.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref({
  rodzajSprawy: 'rozwod_bez',
  wps: 50000,
  tryb: 'sporny',
});

const sprawOptions = [
  { value: 'rozwod_bez', label: 'Rozwód bez orzekania o winie', sub: 'Opłata stała 600 zł, zwrot 300 zł' },
  { value: 'rozwod_z', label: 'Rozwód z orzekaniem o winie', sub: 'Opłata stała 600 zł, brak zwrotu' },
  { value: 'alimenty_powod', label: 'Alimenty — jako powód', sub: 'Zwolniony z opłat (art. 96 UKSC)' },
  { value: 'alimenty_pozwany', label: 'Alimenty — jako pozwany', sub: 'Opłata stosunkowa od WPS' },
  { value: 'podzial', label: 'Podział majątku', sub: 'Stała: 300 zł (zgodny) / 1 000 zł (sporny)' },
  { value: 'zniesienie', label: 'Zniesienie współwłasności', sub: '300 zł (zgodny) / 1 000 zł (sporny)' },
  { value: 'zachowek', label: 'Zachowek / roszczenie o spadek', sub: 'Stosunkowa 5% WPS' },
  { value: 'inne', label: 'Inne roszczenie majątkowe', sub: 'Stosunkowa 5% WPS' },
];

const tryOptions = [
  { value: 'sporny', label: 'Sporny', sub: 'Strony nie doszły do ugody' },
  { value: 'zgodny', label: 'Zgodny / ugoda', sub: 'Możliwy zwrot połowy opłaty' },
];

const showWPS = computed(() =>
  ['alimenty_pozwany', 'zachowek', 'inne'].includes(form.value.rodzajSprawy)
);

function obliczStosunkowa(wps: number): number {
  if (wps <= 500) return 30;
  if (wps <= 1500) return 100;
  if (wps <= 4000) return 200;
  if (wps <= 7500) return 400;
  if (wps <= 10000) return 500;
  if (wps <= 15000) return 750;
  if (wps <= 20000) return 1000;
  // Ustawa z 2019 (Dz.U. 2019 poz 1469) max. 200 000 PLN
  return Math.min(Math.round(wps * 0.05), 200000);
}

const oplaataMain = computed(() => {
  switch (form.value.rodzajSprawy) {
    case 'rozwod_bez': case 'rozwod_z': return '600 zł';
    case 'alimenty_powod': return '0 zł';
    case 'alimenty_pozwany': return obliczStosunkowa(form.value.wps).toLocaleString('pl-PL') + ' zł';
    case 'podzial': case 'zniesienie':
      return form.value.tryb === 'zgodny' ? '300 zł' : '1 000 zł';
    default: return obliczStosunkowa(form.value.wps).toLocaleString('pl-PL') + ' zł';
  }
});

const zwrotInfo = computed(() => {
  if (form.value.rodzajSprawy === 'rozwod_bez') return 'Zwrot 300 zł przy wyroku bez orzekania o winie (art. 79 UKSC)';
  if (form.value.tryb === 'zgodny' && ['podzial', 'zniesienie'].includes(form.value.rodzajSprawy))
    return 'Obniżona opłata przy zgodnym podziale';
  return null;
});

const podstawaPrawna = computed(() => {
  if (['rozwod_bez', 'rozwod_z'].includes(form.value.rodzajSprawy)) return 'art. 26 ust. 1 pkt 1 UKSC';
  if (form.value.rodzajSprawy === 'alimenty_powod') return 'art. 96 ust. 1 pkt 2 UKSC — zwolnienie z mocy prawa';
  if (['podzial', 'zniesienie'].includes(form.value.rodzajSprawy)) return 'art. 38–39 UKSC';
  return 'art. 13 UKSC (opłata stosunkowa 5% WPS, max 200 000 zł)';
});

const zwolnienieInfo = computed(() => {
  if (form.value.rodzajSprawy === 'alimenty_powod') return null;
  return 'Możesz ubiegać się o zwolnienie z opłat sądowych jeśli Twoje dochody są niskie. Wniosek składa się razem z pozwem lub odrębnie do sądu.';
});
</script>
