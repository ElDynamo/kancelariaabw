<template>
  <div class="inheritance-calculator font-sans">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-5">

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Kim jesteś?</label>
          <div class="space-y-2">
            <button v-for="opt in relacjaOptions" :key="opt.value"
              @click="form.relacja = opt.value"
              :class="['w-full p-3 rounded-xl border-2 text-sm font-medium transition-all text-left',
                form.relacja === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              <span class="font-semibold">{{ opt.label }}</span>
              <span class="block text-xs opacity-60">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">
            Jesteś małoletni lub trwale niezdolny do pracy?
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.zwiekszona = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-semibold transition-all',
                form.zwiekszona === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
          <p class="text-xs text-text-muted mt-1">Tak → zachowek 2/3 (art. 991 KC), Nie → 1/2</p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">
            Wartość czystego spadku (aktywa – długi) [zł]
          </label>
          <input type="number" v-model.number="form.wartoscSpadku" min="0" step="10000"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none"
            placeholder="np. 500000" />
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">
            Wartość darowizn doliczanych do masy [zł]
          </label>
          <input type="number" v-model.number="form.wartoscDarowizn" min="0" step="10000"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none"
            placeholder="np. 100000" />
          <p class="text-xs text-text-muted mt-1">
            Darowizny na rzecz spadkobierców — bez limitu czasu. Dla osób trzecich: tylko z ostatnich 10 lat. (KC art. 994)
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">
            Ile dzieci (zstępnych) dziedziczy łącznie?
          </label>
          <div class="flex gap-2">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaZstepnych = n"
              :class="['flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
                form.liczbaZstepnych === n
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ n }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Czy małżonek dziedziczy obok Ciebie?
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.malzonekDziedzicy = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-semibold transition-all',
                form.malzonekDziedzicy === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="bg-navy rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <p class="text-xs text-white opacity-70 uppercase tracking-widest font-semibold mb-2">Twój zachowek</p>
          <p class="text-5xl font-serif text-gold font-bold mb-1">
            {{ zachowekFormatted }}
          </p>
          <p class="text-white opacity-70 text-sm mb-6">złotych</p>

          <div class="space-y-3">
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white opacity-70 uppercase tracking-wide font-semibold mb-1">Substrat zachowku</p>
              <p class="text-white text-sm">{{ substatFormatted }} zł</p>
            </div>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white opacity-70 uppercase tracking-wide font-semibold mb-1">Twój udział ustawowy</p>
              <p class="text-white text-sm">{{ udzialFormatted }}</p>
            </div>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white opacity-70 uppercase tracking-wide font-semibold mb-1">Zastosowany ułamek</p>
              <p class="text-white text-sm">{{ ulamek }} (art. 991 KC)</p>
            </div>
            <div class="bg-amber-600/20 rounded-xl p-4 border border-amber-500/30">
              <p class="text-xs text-amber-300 uppercase tracking-wide font-semibold mb-1">⏱ Przedawnienie</p>
              <p class="text-white text-sm">{{ dataPrzedawnienia }}</p>
              <p class="text-white opacity-70 text-xs">5 lat od ogłoszenia testamentu (KC art. 1007)</p>
            </div>
          </div>
        </div>
        <a href="/kontakt"
          class="mt-6 block text-center px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide"
          style="background:#c9a84c; color:#0f2540;">
          Omów swoją sprawę
        </a>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
      <strong>⚠️ Ważne:</strong> Kalkulator oblicza zachowek zgodnie z KC art. 991–1007, jednak
      rzeczywista kwota zależy od m.in. wartości ustalonej przez biegłego, ewentualnych długów spadkowych
      i szczegółowych okoliczności. Skorzystaj z porady prawnej.
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
    // małżonek dostaje 1/4, reszta dla dzieci
    const udzialDzieci = malzonek ? 0.75 : 1.0;
    return udzialDzieci / n;
  }
  if (form.value.relacja === 'malzonek') {
    return n > 0 ? 0.25 : 0.50;
  }
  if (form.value.relacja === 'rodzic') {
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
