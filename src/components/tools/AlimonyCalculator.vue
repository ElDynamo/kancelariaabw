```html
<template>
  <div class="alimony-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
      <div class="lg:col-span-7 space-y-8" id="kalkulator-form">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">1</span>
            DOCHÓD NETTO OSOBY ZOBOWIĄZANEJ
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.dochodNetto" min="0" step="500"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 6000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 font-medium text-sm">zł/mies.</span>
          </div>
          <input type="range" v-model.number="form.dochodNetto" min="1000" max="30000" step="500"
            class="w-full mt-6 accent-gold h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          <p class="text-right text-xs text-navy/50 font-bold mt-2">{{ form.dochodNetto.toLocaleString('pl-PL') }} zł</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">2</span>
            WIEK DZIECKA
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button v-for="opt in wiekOptions" :key="opt.value"
              @click="form.wiekDziecka = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-[13px] font-bold transition-all border-2',
                form.wiekDziecka === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">3</span>
            LICZBA DZIECI
          </label>
          <div class="flex gap-3">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaDzieci = n"
              :class="['flex-1 py-3.5 rounded-full text-base font-bold transition-all border-2',
                form.liczbaDzieci === n
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ n }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">4</span>
            RODZAJ OPIEKI
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in opiekaOptions" :key="opt.value"
              @click="form.opiekaNaprzemienna = opt.value"
              :class="['p-4 md:p-5 rounded-2xl transition-all text-left flex flex-col justify-center h-full border-2',
                form.opiekaNaprzemienna === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              <span class="block font-bold text-sm mb-1" :class="{'text-navy': form.opiekaNaprzemienna === opt.value}">{{ opt.label }}</span>
              <span class="text-[11px] font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <!-- Dodatkowe koszty -->
        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">5</span>
            DODATKOWE OKOLICZNOŚCI
          </label>
          <div class="space-y-3">
            <label v-for="extra in extras" :key="extra.key"
              :class="['flex items-center gap-4 cursor-pointer p-4 md:p-5 rounded-2xl border-2 transition-all',
                (form.extras as Record<string, boolean>)[extra.key] 
                  ? 'border-gold bg-white shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 hover:border-slate-200']">
              <div class="relative flex items-center justify-center">
                <input type="checkbox" v-model="(form.extras as Record<string, boolean>)[extra.key]" 
                  class="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-lg checked:border-gold checked:bg-gold transition-colors cursor-pointer" />
                <svg class="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="mt-1">
                <span :class="['text-sm font-bold transition-colors', (form.extras as Record<string, boolean>)[extra.key] ? 'text-navy' : 'text-navy/60']">{{ extra.label }}</span>
                <span class="block text-[11px] font-medium text-navy/40 mt-1 leading-snug">{{ extra.sub }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div id="wyniki-kalkulatora" class="bg-navy rounded-[2.5rem] p-6 lg:p-10 md:p-8 flex flex-col justify-between sticky top-32 lg:min-h-[500px] overflow-hidden shadow-xl shadow-navy/10">
          
          <div class="relative z-10">
            <p class="text-[10px] text-gold/80 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              SZACUNKOWE ALIMENTY
            </p>
            <p class="text-5xl md:text-[3.5rem] font-sans text-white font-bold mb-2 tracking-tight leading-none">
              <span class="text-gold">{{ alimentyMin }}</span>–<span class="text-gold">{{ alimentyMax }}</span>
            </p>
            <p class="text-sm text-white/50 mb-8 font-medium">zł miesięcznie / dziecko</p>

            <div class="space-y-3">
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-2">Fundusz Alimentacyjny</p>
                <p class="text-white text-sm font-semibold mb-1">Max. 1 000 zł/miesięcznie <span class="text-white/40 text-[10px] ml-1">(od X 2024)</span></p>
                <p class="text-white/40 text-[11px]">Przy bezskutecznej egzekucji i dochodzie ≤ 900 zł/os.</p>
              </div>
              
              <div class="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm mb-6">
              <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-2">Szacunkowe alimenty</p>
              <p class="text-3xl lg:text-4xl font-sans text-gold font-bold tracking-tight tabular-nums">{{ alimentyMin }} – {{ alimentyMax }}</p>
            </div>
              
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-2">Świadczenie 800+</p>
                <p class="text-white text-[13px] font-medium leading-relaxed">Nie pomniejsza ustalonej kwoty alimentów (KRiO art. 135 § 3)</p>
              </div>
              
              <div class="bg-[#3A424E] rounded-2xl p-6 mt-4 transition-all duration-300">
                <p class="text-[10px] text-gold uppercase tracking-[0.15em] font-semibold mb-3">Udział w zarobkach zobowiązanego</p>
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gold h-full rounded-full transition-all duration-1000" :style="`width: ${Math.min(procentDochodu, 100)}%`"></div>
                  </div>
                  <p class="text-gold text-sm font-bold w-12 text-right">~{{ procentDochodu }}%</p>
                </div>
              </div>
            </div>
          </div>
          <a href="/kontakt"
            class="relative z-10 mt-8 block text-center px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style="background:#D4AF37; color:#1e293b;">
            OMÓW KWOTĘ ALIMENTÓW
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0 mb-6 lg:mb-0">
      <strong>⚠️ Ważne:</strong> W polskim prawie nie istnieje stały wzór matematyczny do obliczania alimentów.
      Sąd zawsze decyduje indywidualnie na podstawie potrzeb uprawnionego oraz możliwości zarobkowych zobowiązanego (zgodnie z <em>Ustawą z dnia 25 lutego 1964 r. – Kodeks rodzinny i opiekuńczy (t.j. Dz. U. z 2023 r. poz. 2809 ze zm.)</em>). Niniejszy kalkulator opiera się na nieformalnych tablicach orientacyjnych MS z 2022 r. i ma charakter wyłącznie szacunkowy.
    </div>

    <!-- Mobile Sticky Bar -->
    <transition name="fade-slide">
      <div v-show="showSticky" class="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_40px_rgba(15,37,64,0.3)] z-50 flex items-center justify-between border-t border-white/10">
        <div>
          <p class="text-[9px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-0.5">Szacunkowe alimenty</p>
          <p class="text-lg font-sans text-gold font-bold tracking-tight leading-none tabular-nums">{{ alimentyMin }} – {{ alimentyMax }}</p>
        </div>
        <button @click="scrollToResults" class="bg-gold text-navy px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-gold/20">
          Wyniki
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const form = ref({
  dochodNetto: 6000,
  wiekDziecka: '7-12',
  liczbaDzieci: 1,
  opiekaNaprzemienna: 'pelna',
  extras: { niepelnosprawnosc: false, prywatnaEdukacja: false, leczeniaKoszty: false },
});

const wiekOptions = [
  { value: '0-2', label: '0–2 lat', },
  { value: '3-6', label: '3–6 lat' },
  { value: '7-12', label: '7–12 lat' },
  { value: '13-17', label: '13–17 lat' },
  { value: '18+', label: '18+ (student)' },
  { value: 'rozne', label: 'Różny wiek' },
];
const opiekaOptions = [
  { value: 'pelna', label: 'Pełna opieka', sub: 'Jedno z rodziców sprawuje opiekę' },
  { value: 'naprzemienna', label: 'Naprzemienna', sub: 'Równy podział czasu' },
];
const extras = [
  { key: 'niepelnosprawnosc', label: 'Niepełnosprawność dziecka', sub: 'Zwiększa alimenty o 30–50%' },
  { key: 'prywatnaEdukacja', label: 'Prywatna szkoła / uczelnia', sub: 'Wyższe koszty edukacji' },
  { key: 'leczeniaKoszty', label: 'Zwiększone koszty leczenia', sub: 'Rehabilitacja, terapia, leki' },
];

const WSPOLCZYNNIKI: Record<string, number> = {
  '0-2': 0.22, '3-6': 0.20, '7-12': 0.20, '13-17': 0.22, '18+': 0.20, 'rozne': 0.21,
};

const alimentyBaseMin = computed(() => {
  const w = WSPOLCZYNNIKI[form.value.wiekDziecka];
  let base = form.value.dochodNetto * w / form.value.liczbaDzieci;
  if (form.value.opiekaNaprzemienna === 'naprzemienna') base *= 0.55;
  if (form.value.extras.niepelnosprawnosc) base *= 1.30;
  if (form.value.extras.prywatnaEdukacja) base *= 1.20;
  if (form.value.extras.leczeniaKoszty) base *= 1.15;
  return Math.round(base * 0.85 / 50) * 50;
});

const alimentyBaseMax = computed(() => {
  const w = WSPOLCZYNNIKI[form.value.wiekDziecka];
  let base = form.value.dochodNetto * w / form.value.liczbaDzieci;
  if (form.value.opiekaNaprzemienna === 'naprzemienna') base *= 0.55;
  if (form.value.extras.niepelnosprawnosc) base *= 1.50;
  if (form.value.extras.prywatnaEdukacja) base *= 1.35;
  if (form.value.extras.leczeniaKoszty) base *= 1.30;
  return Math.round(base * 1.25 / 50) * 50;
});

const alimentyMin = computed(() => alimentyBaseMin.value.toLocaleString('pl-PL'));
const alimentyMax = computed(() => alimentyBaseMax.value.toLocaleString('pl-PL'));
const procentDochodu = computed(() => {
  const srednia = (alimentyBaseMin.value + alimentyBaseMax.value) / 2 * form.value.liczbaDzieci;
  return Math.round(srednia / form.value.dochodNetto * 100);
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
