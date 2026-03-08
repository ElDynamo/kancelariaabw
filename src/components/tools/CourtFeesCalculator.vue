<template>
  <div class="court-fees-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
      <div class="lg:col-span-7 space-y-8" id="kalkulator-form">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">1</span>
            RODZAJ SPRAWY
          </label>
          <div class="relative">
            <select v-model="form.rodzajSprawy"
              class="w-full appearance-none bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-sm md:text-base font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner cursor-pointer pr-10">
              <option v-for="opt in sprawOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="text-[10px] text-navy/40 font-medium mt-4 px-2">
            {{ sprawOptions.find(o => o.value === form.rodzajSprawy)?.sub }}
          </p>
        </div>

        <div v-show="showWPS" class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all duration-500">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">2</span>
            WARTOŚĆ PRZEDMIOTU SPORU (WPS)
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wps" min="0" step="1000"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 50000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 font-medium text-sm">zł</span>
          </div>
          <p class="text-[10px] font-medium text-navy/40 mt-4 px-2">
            Kwota sporu — np. wartość długu, podziału majątku, wysokość odszkodowania.
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">3</span>
            TRYB PODZIAŁU / UGODY (JEŚLI DOTYCZY)
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in tryOptions" :key="opt.value"
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
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div id="wyniki-kalkulatora" class="bg-navy rounded-[2.5rem] p-6 lg:p-10 md:p-8 flex flex-col justify-between sticky top-32 lg:min-h-[500px] overflow-hidden shadow-xl shadow-navy/10">
          
          <div class="relative z-10">
            <p class="text-[10px] text-gold/80 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              OPŁATA SĄDOWA
            </p>
            <p class="text-5xl md:text-[3.5rem] font-serif text-gold font-bold mb-8 tracking-tight leading-none tabular-nums whitespace-nowrap">
              {{ oplaataMain }}
            </p>

            <div class="space-y-3">
              <div v-show="zwrotInfo" class="bg-green-800/30 rounded-2xl p-5 border border-green-500/30 transition-all duration-300">
                <p class="text-[10px] text-green-300 uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Możliwy zwrot
                </p>
                <p class="text-white text-sm font-medium">{{ zwrotInfo }}</p>
              </div>
              
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold w-1/3 leading-relaxed">Podstawa<br>prawna</p>
                <p class="text-white font-semibold text-right text-xs max-w-[60%]">{{ podstawaPrawna }}</p>
              </div>
              
              <div v-show="zwolnienieInfo" class="bg-[#3A424E] rounded-2xl p-6 mt-4 transition-all duration-300">
                <p class="text-[10px] text-gold uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  Zwolnienie z opłat
                </p>
                <p class="text-white/80 font-medium text-[11px] leading-relaxed">{{ zwolnienieInfo }}</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-8 block text-center px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style="background:#D4AF37; color:#1e293b;">
            ZLEĆ NAM WNIESIENIE OPŁATY
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0 mb-6 lg:mb-0">
      <strong>⚠️ Aktualne przepisy:</strong> <em>Ustawa z dnia 28 lipca 2005 r. o kosztach sądowych w sprawach cywilnych (t.j. Dz. U. z 2023 r. poz. 1144 ze zm.)</em>. Zgodnie z nowelizacją z 2019 r., maksymalna uiszczana opłata stosunkowa wynosi 200 000 zł.
      Kalkulator nie uwzględnia kosztów dodatkowych, takich jak zaliczki na biegłych czy koszty komornicze.
    </div>

    <!-- Mobile Sticky Bar -->
    <transition name="fade-slide">
      <div v-show="showSticky" class="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_40px_rgba(15,37,64,0.3)] z-50 flex items-center justify-between border-t border-white/10">
        <div>
          <p class="text-[9px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-0.5">Opłata Sądowa</p>
          <p class="text-xl font-sans text-gold font-bold tracking-tight leading-none tabular-nums whitespace-nowrap">{{ oplaataMain }}</p>
        </div>
        <button @click="scrollToResults" class="bg-gold text-navy px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-gold/20">
          Szczegóły 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

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

const scrollToResults = () => {
  document.getElementById('wyniki-kalkulatora')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Scroll visibility logic
const showSticky = ref(false);

const checkStickyVisibility = () => {
  const formEl = document.getElementById('kalkulator-form');
  const resultsEl = document.getElementById('wyniki-kalkulatora');
  if (!formEl || !resultsEl) return;
  
  const formRect = formEl.getBoundingClientRect();
  const resultsRect = resultsEl.getBoundingClientRect();
  
  if (formRect.top < 100 && resultsRect.top > window.innerHeight) {
    showSticky.value = true;
  } else {
    showSticky.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkStickyVisibility, { passive: true });
  setTimeout(checkStickyVisibility, 100);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkStickyVisibility);
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
