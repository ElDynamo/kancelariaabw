<template>
  <div class="alimony-calculator font-sans">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-5">

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Dochód netto osoby zobowiązanej (zł/mies.)
          </label>
          <input type="number" v-model.number="form.dochodNetto" min="0" step="500"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none"
            placeholder="np. 6000" />
          <input type="range" v-model.number="form.dochodNetto" min="1000" max="30000" step="500"
            class="w-full mt-2 accent-gold" />
          <p class="text-xs text-text-muted mt-1">{{ form.dochodNetto.toLocaleString('pl-PL') }} zł/mies.</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">Wiek dziecka</label>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="opt in wiekOptions" :key="opt.value"
              @click="form.wiekDziecka = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all',
                form.wiekDziecka === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">Liczba dzieci</label>
          <div class="flex gap-2">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaDzieci = n"
              :class="['flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
                form.liczbaDzieci === n
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ n }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">Rodzaj opieki</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in opiekaOptions" :key="opt.value"
              @click="form.opiekaNaprzemienna = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all text-left',
                form.opiekaNaprzemienna === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              <span class="block font-semibold">{{ opt.label }}</span>
              <span class="text-xs opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <!-- Dodatkowe koszty -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">Dodatkowe okoliczności</label>
          <div class="space-y-2">
            <label v-for="extra in extras" :key="extra.key"
              class="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:border-navy transition-colors">
              <input type="checkbox" v-model="form.extras[extra.key]" class="accent-gold w-4 h-4" />
              <div>
                <span class="text-sm text-navy font-medium">{{ extra.label }}</span>
                <span class="block text-xs text-text-muted">{{ extra.sub }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="bg-navy rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <p class="text-xs text-white/40 uppercase tracking-widest mb-2">Szacunkowe alimenty</p>
          <p class="text-5xl font-serif text-gold font-bold mb-1">
            {{ alimentyMin }}–{{ alimentyMax }}
          </p>
          <p class="text-white/50 text-sm mb-6">zł miesięcznie / dziecko</p>

          <div class="space-y-3">
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Fundusz Alimentacyjny (max)</p>
              <p class="text-white text-sm">1 000 zł/mies. (od X 2024)</p>
              <p class="text-white/40 text-xs">Tylko przy bezskutecznej egzekucji + dochód ≤ 900 zł/os.</p>
            </div>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Świadczenie 800+</p>
              <p class="text-white/70 text-xs">Nie zmniejsza alimentów (KRiO art. 135 § 3)</p>
            </div>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Udział w możliwościach</p>
              <p class="text-white text-sm">~{{ procentDochodu }}% dochodów zobowiązanego</p>
            </div>
          </div>
        </div>
        <a href="/kontakt"
          class="mt-6 block text-center px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide"
          style="background:#c9a84c; color:#0f2540;">
          Skonsultuj swoją sprawę
        </a>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
      <strong>⚠️ Ważne:</strong> W polskim prawie nie istnieje stały wzór obliczania alimentów.
      Sąd zawsze decyduje indywidualnie na podstawie art. 135 KRiO. Wyniki opierają się na tablicach
      orientacyjnych Ministerstwa Sprawiedliwości (2022) i orzecznictwie sądów. Tablice nie mają mocy prawnej.
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
