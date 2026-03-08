<template>
  <div class="statute-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8" id="kalkulator-form">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">1</span>
            RODZAJ ROSZCZENIA
          </label>
          <div class="relative">
            <select v-model="form.rodzaj"
              class="w-full appearance-none bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-sm md:text-base font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner cursor-pointer pr-10">
              <option v-for="opt in roszczeniaOptions" :key="opt.value" :value="opt.value">{{ opt.label }} ({{ opt.termin }})</option>
            </select>
            <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="text-[10px] font-medium text-navy/40 mt-4 px-2">
            {{ roszczeniaOptions.find(o => o.value === form.rodzaj)?.sub }}
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">2</span>
            DATA WYMAGALNOŚCI ROSZCZENIA
          </label>
          <input type="date" v-model="form.dataWymagalnosci"
            :max="today"
            class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 font-sans text-navy text-base md:text-lg font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner" />
          <p class="text-[10px] font-medium text-navy/40 mt-4 px-2">Data, od kiedy mogłeś prawnie zażądać zapłaty / spełnienia świadczenia.</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">3</span>
            CZY NASTĄPIŁO PRZERWANIE BIEGU PRZEDAWNIENIA?
          </label>
          <div class="grid grid-cols-2 gap-4 mb-5">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.przerwanie = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border-2',
                form.przerwanie === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
            </button>
          </div>
          
          <div v-show="form.przerwanie === 'tak'" class="transition-all duration-500 pt-5 border-t border-slate-100 mt-2">
            <label class="block text-[10px] font-bold uppercase tracking-[0.1em] text-navy mb-3 px-2">Data przerwania biegu</label>
            <input type="date" v-model="form.dataPrzerwania"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 font-sans text-navy text-base font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner" />
            <p class="text-[10px] font-medium text-navy/40 mt-3 px-2">np. data wniesienia pozwu, wezwania do próby ugodowej, lub data pisma z uznaniem długu.</p>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div id="wyniki-kalkulatora" :class="['rounded-[2.5rem] p-6 lg:p-10 md:p-8 flex flex-col justify-between sticky top-32 border border-white/10 shadow-xl shadow-navy/10 lg:min-h-[500px] overflow-hidden transition-colors duration-700', statusBg]">
          <div class="relative z-10">
            <p class="text-[10px] text-gold/80 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              STATUS SPRAWY
            </p>
            <div class="flex items-center gap-4 mb-8">
              <span class="text-4xl filter drop-shadow-md">{{ statusIcon }}</span>
              <p class="text-white font-bold text-2xl md:text-3xl tracking-tight leading-none">{{ statusLabel }}</p>
            </div>

            <div class="space-y-3">
              <div class="bg-white/10 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-2">DATA PRZEDAWNIENIA</p>
                <p class="text-gold text-3xl md:text-4xl font-bold font-serif tracking-tight drop-shadow-sm mb-2">{{ dataPrzedawnieniaFormatted }}</p>
                <p class="text-white/60 text-[10px] font-medium leading-relaxed">Bieg terminu często upływa z 31 XII (KC art. 118 zd. 2)</p>
              </div>

              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold w-1/3 leading-relaxed">Termin<br>bazowy</p>
                <p class="text-white font-bold text-sm text-right bg-white/10 px-3 py-1 rounded-lg">{{ terminInfo }}</p>
              </div>

              <div v-show="dniPozostalo > 0 && dniPozostalo <= 90" class="bg-orange-600/30 rounded-2xl p-5 border border-orange-400/30 backdrop-blur-md animate-pulse">
                <p class="text-orange-300 font-bold text-[11px] uppercase tracking-[0.1em] flex items-center gap-2 mb-2">
                  <span class="w-2 h-2 rounded-full bg-orange-300"></span> Pozostało {{ dniPozostalo }} dni!
                </p>
                <p class="text-white/80 font-medium text-[11px] leading-relaxed">Natychmiast wyślij ostateczne przedsądowe wezwanie do zapłaty lub złóż pozew by przerwać bieg!</p>
              </div>

              <div v-show="dniPozostalo <= 0" class="bg-red-800/40 rounded-2xl p-5 border border-red-500/40 backdrop-blur-md">
                <p class="text-red-300 font-bold text-[11px] uppercase tracking-[0.1em] mb-2">Przedawnione</p>
                <p class="text-white/80 font-medium text-[11px] leading-relaxed">Przeciwnik może skutecznie uchylić się od zapłaty. W sprawach konsumenckich (B2C) Sąd zbada ten zarzut z urzędu.</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-8 block text-center px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style="background:#D4AF37; color:#1e293b;">
            ZWERYFIKUJ DATY Z PRAWNIKIEM
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0 mb-6 lg:mb-0">
      <strong>⚠️ Aktualne przepisy:</strong> Kalkulator uwzględnia skracające terminy przedawnienia wprowadzone przez <em>Ustawę z dnia 13 kwietnia 2018 r. o zmianie ustawy – Kodeks cywilny oraz niektórych innych ustaw (Dz. U. z 2018 r. poz. 1104, weszła w życie 9 lipca 2018 r.)</em>.
      W sprawach z udziałem konsumentów, sąd bada przedawnienie z urzędu. Kalkulator ma charakter orientacyjny i nie zastępuje profesjonalnej analizy prawnej.
    </div>

    <!-- Mobile Sticky Bar -->
    <transition name="fade-slide">
      <div v-show="showSticky" class="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_40px_rgba(15,37,64,0.3)] z-50 flex items-center justify-between border-t border-white/10">
        <div>
          <p class="text-[9px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-0.5">Stan przedawnienia</p>
          <p class="text-[14px] font-sans text-gold font-bold tracking-tight leading-none max-w-[180px] truncate">{{ statusLabel }}</p>
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

const today = new Date().toISOString().split('T')[0];

const form = ref({
  rodzaj: 'cywilny_ogolny',
  dataWymagalnosci: '',
  przerwanie: 'nie',
  dataPrzerwania: '',
});

const roszczeniaOptions = [
  { value: 'cywilny_ogolny', label: 'Umowa cywilna (ogólna)', sub: 'Pożyczka, umowa zlecenie, umowa o dzieło itp.', termin: '6 lat' },
  { value: 'bb2_gospodarcze', label: 'Działalność gospodarcza (B2B)', sub: 'Roszczenia przedsiębiorcy z umowy', termin: '3 lata' },
  { value: 'swiadczenia_okresowe', label: 'Świadczenia okresowe', sub: 'Czynsz, odsetki, raty, bieżące alimenty', termin: '3 lata' },
  { value: 'delikt', label: 'Szkoda / delikt', sub: 'Od dowiedzenia się o szkodzie i sprawcy', termin: '3 lata' },
  { value: 'delikt_max', label: 'Szkoda — max od zdarzenia', sub: 'Niezależnie od wiedzy poszkodowanego', termin: '10 lat' },
  { value: 'zbrodnia', label: 'Szkoda z przestępstwa (zbrodnia)', sub: 'Art. 4421 § 2 KC', termin: '20 lat' },
  { value: 'zachowek', label: 'Zachowek', sub: 'Od ogłoszenia testamentu / otwarcia spadku', termin: '5 lat' },
  { value: 'wyrok', label: 'Wierzytelność stwierdzona wyrokiem', sub: 'Po uprawomocnieniu się orzeczenia', termin: '6 lat' },
];

const terminLat: Record<string, number> = {
  cywilny_ogolny: 6, bb2_gospodarcze: 3, swiadczenia_okresowe: 3,
  delikt: 3, delikt_max: 10, zbrodnia: 20, zachowek: 5, wyrok: 6,
};

const takNieOptions = [{ value: 'nie', label: 'Nie' }, { value: 'tak', label: 'Tak' }];

const startDate = computed(() => {
  if (form.value.przerwanie === 'tak' && form.value.dataPrzerwania) {
    return new Date(form.value.dataPrzerwania);
  }
  return form.value.dataWymagalnosci ? new Date(form.value.dataWymagalnosci) : null;
});

const dataPrzedawnienia = computed(() => {
  if (!startDate.value) return null;
  const lat = terminLat[form.value.rodzaj];
  const d = new Date(startDate.value);
  d.setFullYear(d.getFullYear() + lat);
  // Zaokrąglenie do 31 XII jeśli termin >= 2 lata (KC art. 118 zd. 2)
  if (lat >= 2) {
    d.setMonth(11); d.setDate(31);
  }
  return d;
});

const dataPrzedawnieniaFormatted = computed(() => {
  if (!dataPrzedawnienia.value) return '—';
  return dataPrzedawnienia.value.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
});

const dniPozostalo = computed(() => {
  if (!dataPrzedawnienia.value) return 9999;
  return Math.ceil((dataPrzedawnienia.value.getTime() - Date.now()) / 86400000);
});

const statusBg = computed(() => {
  if (!dataPrzedawnienia.value) return 'bg-navy';
  if (dniPozostalo.value <= 0) return 'bg-red-900';
  if (dniPozostalo.value <= 90) return 'bg-orange-900';
  return 'bg-navy';
});
const statusIcon = computed(() => {
  if (!dataPrzedawnienia.value) return '⚖️';
  if (dniPozostalo.value <= 0) return '❌';
  if (dniPozostalo.value <= 90) return '⚠️';
  return '✅';
});
const statusLabel = computed(() => {
  if (!dataPrzedawnienia.value) return 'Wpisz datę';
  if (dniPozostalo.value <= 0) return 'Przedawnione';
  if (dniPozostalo.value <= 90) return `Pilne — ${dniPozostalo.value} dni`;
  return `Nieprzedawnione (${dniPozostalo.value} dni)`;
});

const terminInfo = computed(() => {
  const lat = terminLat[form.value.rodzaj];
  return `${lat} ${lat === 1 ? 'rok' : lat < 5 ? 'lata' : 'lat'} (KC art. 118)`;
});

const podstawaPrawna = computed(() => {
  if (form.value.rodzaj === 'delikt' || form.value.rodzaj === 'delikt_max' || form.value.rodzaj === 'zbrodnia')
    return 'KC art. 4421';
  if (form.value.rodzaj === 'zachowek') return 'KC art. 1007';
  if (form.value.rodzaj === 'wyrok') return 'KC art. 125 § 1';
  return 'KC art. 118 (nowelizacja 9 VII 2018 r.)';
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
