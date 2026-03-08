<template>
  <div class="inheritance-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">1</span>
            Kim jesteś?
          </label>
          <div class="space-y-3">
            <button v-for="opt in relacjaOptions" :key="opt.value"
              @click="form.relacja = opt.value"
              :class="['w-full p-4 md:p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-center',
                form.relacja === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              <span class="font-semibold text-base mb-1" :class="{'text-navy': form.relacja === opt.value}">{{ opt.label }}</span>
              <span class="text-xs font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">2</span>
            Jesteś małoletni lub trwale niezdolny do pracy?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.zwiekszona = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.zwiekszona === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
            </button>
          </div>
          <p class="text-xs font-medium text-navy/60 mt-3 px-2">Tak → zachowek wynosi 2/3 (art. 991 KC), Nie → 1/2</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">3</span>
            Wartość czystego spadku (aktywa – długi)
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wartoscSpadku" min="0" step="10000"
              class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 500000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/50 font-medium">zł</span>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">4</span>
            Wartość darowizn doliczanych do masy
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wartoscDarowizn" min="0" step="10000"
              class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 100000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/50 font-medium">zł</span>
          </div>
          <p class="text-xs font-medium text-navy/60 mt-3 px-2">
            Darowizny na rzecz spadkobierców dolicza się bez limitu czasu. Dla osób trzecich: tylko z ostatnich 10 lat.
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">5</span>
            Ile dzieci (zstępnych) dziedziczy łącznie?
          </label>
          <div class="flex gap-3">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaZstepnych = n"
              :class="['flex-1 py-3 md:py-4 rounded-2xl border-2 text-base md:text-lg transition-all font-semibold',
                form.liczbaZstepnych === n
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ n }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">6</span>
            Czy małżonek dziedziczy obok Ciebie?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.malzonekDziedzicy = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.malzonekDziedzicy === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
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
              Twój zachowek
            </p>
            <p class="text-5xl md:text-6xl font-sans text-gold font-bold mb-2 tracking-tight">
              {{ zachowekFormatted }}
            </p>

            <div class="space-y-4 mt-8">
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-4 md:p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold">Substrat zachowku</p>
                <p class="text-white font-semibold">{{ substatFormatted }} zł</p>
              </div>
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-4 md:p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold">Twój udział ustawowy</p>
                <p class="text-white font-semibold">{{ udzialFormatted }}</p>
              </div>
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-4 md:p-5 border border-white/5 backdrop-blur-sm">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold">Zastosowany ułamek</p>
                <p class="text-white font-semibold">{{ ulamek }} <span class="text-white/40 text-xs ml-1 font-normal">(art. 991)</span></p>
              </div>
              <div class="bg-amber-600/20 rounded-2xl p-5 border border-amber-500/30">
                <p class="text-xs text-amber-300 uppercase tracking-widest font-bold mb-2">⏱ Termin przedawnienia</p>
                <p class="text-white text-base font-semibold">{{ dataPrzedawnienia }}</p>
                <p class="text-white/70 text-xs font-medium mt-1 leading-relaxed">Zwykle 5 lat od ogłoszenia testamentu lub otwarcia spadku (KC art. 1007)</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-10 block text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/20"
            style="background:#c9a84c; color:#0f2540;">
            Omów taktykę spadkową
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Ważne:</strong> Kalkulator oblicza zachowek zgodnie z <em>Ustawą z dnia 23 kwietnia 1964 r. – Kodeks cywilny (t.j. Dz. U. z 2023 r. poz. 1610 ze zm.)</em>.
      Rzeczywista kwota zależy od m.in. wartości ustalonej przez biegłego, ewentualnych długów spadkowych
      i szczegółowych okoliczności. Wyliczenie ma charakter pomocniczy. Skorzystaj z porady prawnej.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref({
  relacja: 'zstepny',
  zwiekszona: 'nie',
  wartoscSpadku: 500000,
  wartoscDarowizn: 0,
  liczbaZstepnych: 1,
  malzonekDziedzicy: 'tak',
});

const relacjaOptions = [
  { value: 'zstepny', label: 'Zstępny (dziecko, wnuk)', sub: 'Pierwsza kolejność dziedziczenia' },
  { value: 'malzonek', label: 'Małżonek', sub: 'Zawsze w I grupie wraz ze zstępnymi' },
  { value: 'rodzic', label: 'Rodzic', sub: 'Gdy brak zstępnych' },
];
const takNieOptions = [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }];

const substrat = computed(() => form.value.wartoscSpadku + form.value.wartoscDarowizn);

const udzialUstawowy = computed(() => {
  const n = form.value.liczbaZstepnych;
  const malzonek = form.value.malzonekDziedzicy === 'tak';

  if (form.value.relacja === 'zstepny') {
    if (malzonek) {
      // Art. 931 § 1 KC: Dzieci i małżonek w częściach równych, część małżonka min. 1/4
      const czescMalzonka = Math.max(1 / (n + 1), 0.25);
      const resztaDlaDzieci = 1 - czescMalzonka;
      return resztaDlaDzieci / n;
    }
    return 1.0 / n;
  }
  if (form.value.relacja === 'malzonek') {
    // Małżonek dziedziczy w zbiegu z dziećmi minimum 1/4 (Art. 931 KC)
    if (n > 0) return Math.max(1 / (n + 1), 0.25);
    // Dziedzicząc w zbiegu z rodzicami - 1/2 (Art. 932 § 1 KC)
    return 0.50;
  }
  if (form.value.relacja === 'rodzic') {
    // Dziedzicząc w zbiegu z małżonkiem - 1/4 (Art. 932 § 1 KC)
    // Bez małżonka: 1/2
    return malzonek ? 0.25 : 0.50;
  }
  return 0;
});

const ulamekVal = computed(() => form.value.zwiekszona === 'tak' ? 2 / 3 : 1 / 2);
const zachowek = computed(() => substrat.value * udzialUstawowy.value * ulamekVal.value);
const zachowekFormatted = computed(() => Math.round(zachowek.value).toLocaleString('pl-PL') + ' zł');
const substatFormatted = computed(() => substrat.value.toLocaleString('pl-PL'));
const udzialFormatted = computed(() => `${(udzialUstawowy.value * 100).toFixed(1)}% substratu`);
const ulamek = computed(() => form.value.zwiekszona === 'tak' ? '2/3' : '1/2');

const dataPrzedawnienia = computed(() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 5);
  return d.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
});
</script>
