<template>
  <div class="alimony-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">1</span>
            Dochód netto osoby zobowiązanej
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.dochodNetto" min="0" step="500"
              class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 6000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/50 font-medium">zł/mies.</span>
          </div>
          <input type="range" v-model.number="form.dochodNetto" min="1000" max="30000" step="500"
            class="w-full mt-6 accent-gold h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer" />
          <p class="text-right text-sm text-navy/60 font-medium mt-2">{{ form.dochodNetto.toLocaleString('pl-PL') }} zł</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">2</span>
            Wiek dziecka
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button v-for="opt in wiekOptions" :key="opt.value"
              @click="form.wiekDziecka = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.wiekDziecka === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">3</span>
            Liczba dzieci
          </label>
          <div class="flex gap-3">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaDzieci = n"
              :class="['flex-1 py-3 md:py-4 rounded-2xl border-2 text-base md:text-lg transition-all font-semibold',
                form.liczbaDzieci === n
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ n }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">4</span>
            Rodzaj opieki
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in opiekaOptions" :key="opt.value"
              @click="form.opiekaNaprzemienna = opt.value"
              :class="['p-4 md:p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-center h-full',
                form.opiekaNaprzemienna === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              <span class="block font-semibold text-base mb-1" :class="{'text-navy': form.opiekaNaprzemienna === opt.value}">{{ opt.label }}</span>
              <span class="text-xs font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <!-- Dodatkowe koszty -->
        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">5</span>
            Dodatkowe okoliczności
          </label>
          <div class="space-y-3">
            <label v-for="extra in extras" :key="extra.key"
              :class="['flex items-center gap-4 cursor-pointer p-4 md:p-5 rounded-2xl border-2 transition-all',
                (form.extras as Record<string, boolean>)[extra.key] 
                  ? 'border-gold bg-white shadow-[0_4px_15px_-5px_rgba(201,168,76,0.2)]' 
                  : 'border-transparent bg-off-white hover:bg-navy/5']">
              <div class="relative flex items-center justify-center">
                <input type="checkbox" v-model="(form.extras as Record<string, boolean>)[extra.key]" 
                  class="peer appearance-none w-6 h-6 border-2 border-navy/30 rounded-lg checked:border-gold checked:bg-gold transition-colors cursor-pointer" />
                <svg class="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <span :class="['text-sm md:text-base font-semibold transition-colors', (form.extras as Record<string, boolean>)[extra.key] ? 'text-navy' : 'text-navy/80']">{{ extra.label }}</span>
                <span class="block text-xs font-medium text-navy/50 mt-0.5">{{ extra.sub }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div class="bg-navy rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 border border-white/10 shadow-[0_20px_50px_-12px_rgba(15,37,64,0.3)] overflow-hidden min-h-[500px]">
          <!-- Dekoracyjny gradient -->
          <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[20rem] h-[20rem] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10">
            <p class="text-sm text-white/70 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              Szacunkowe alimenty
            </p>
            <p class="text-5xl md:text-6xl font-sans text-white font-bold mb-2 tracking-tight">
              <span class="text-gold">{{ alimentyMin }}</span>–<span class="text-gold">{{ alimentyMax }}</span>
            </p>
            <p class="text-base text-white/70 mb-10 font-medium">zł miesięcznie / dziecko</p>

            <div class="space-y-4">
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Fundusz Alimentacyjny (max)</p>
                <p class="text-white text-base font-medium mb-1">1 000 zł/miesięcznie (od X 2024)</p>
                <p class="text-white/50 text-xs">Przy bezskutecznej egzekucji i dochodzie ≤ 900 zł/os.</p>
              </div>
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Świadczenie 800+</p>
                <p class="text-white text-sm font-medium">Nie pomniejsza ustalonej kwoty alimentów (KRiO art. 135 § 3)</p>
              </div>
              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Udział w zarobkach</p>
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div class="bg-gold h-full rounded-full transition-all duration-1000" :style="`width: ${Math.min(procentDochodu, 100)}%`"></div>
                  </div>
                  <p class="text-gold text-sm font-bold w-12 text-right">~{{ procentDochodu }}%</p>
                </div>
                <p class="text-white/50 text-xs mt-2 text-right">orientacyjnej pensji zobowiązanego</p>
              </div>
            </div>
          </div>
          <a href="/kontakt"
            class="relative z-10 mt-10 block text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/20"
            style="background:#c9a84c; color:#0f2540;">
            Omów kwotę alimentów
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Ważne:</strong> W polskim prawie nie istnieje stały wzór matematyczny do obliczania alimentów.
      Sąd zawsze decyduje indywidualnie na podstawie potrzeb uprawnionego oraz możliwości zarobkowych zobowiązanego (zgodnie z <em>Ustawą z dnia 25 lutego 1964 r. – Kodeks rodzinny i opiekuńczy (t.j. Dz. U. z 2023 r. poz. 2809 ze zm.)</em>). Niniejszy kalkulator opiera się na nieformalnych tablicach orientacyjnych MS z 2022 r. i ma charakter wyłącznie szacunkowy.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

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
</script>
