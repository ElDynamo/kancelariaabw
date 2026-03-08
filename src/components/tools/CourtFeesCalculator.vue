<template>
  <div class="court-fees-calculator font-sans">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-5">

        <div>
          <label class="block text-xs font-semibold uppercase tracking-widest text-navy opacity-70 mb-2">Rodzaj sprawy</label>
          <select v-model="form.rodzajSprawy"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-sm focus:border-gold focus:outline-none bg-white">
            <option v-for="opt in sprawOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <div v-if="showWPS">
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Wartość przedmiotu sporu (WPS) [zł]
          </label>
          <input type="number" v-model.number="form.wps" min="0" step="1000"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none"
            placeholder="np. 50000" />
          <p class="text-xs text-text-muted mt-1">
            Kwota sporu — np. wartość długu, wartość majątku, wysokość odszkodowania.
          </p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Tryb podziału / ugody (jeśli dotyczy)
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="opt in tryOptions" :key="opt.value"
              @click="form.tryb = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-medium transition-all',
                form.tryb === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              <span class="block font-semibold">{{ opt.label }}</span>
              <span class="text-xs opacity-70">{{ opt.sub }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="bg-navy rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <p class="text-xs text-white opacity-70 uppercase tracking-widest font-semibold mb-2">Opłata sądowa</p>
          <p class="text-5xl font-serif text-gold font-bold mb-1">{{ oplaataMain }}</p>
          <p class="text-white opacity-70 text-sm mb-6">złotych</p>

          <div class="space-y-3">
            <div v-if="zwrotInfo" class="bg-green-800/30 rounded-xl p-4 border border-green-500/30">
              <p class="text-xs text-green-300 uppercase tracking-wide mb-1">✅ Możliwy zwrot</p>
              <p class="text-white text-sm">{{ zwrotInfo }}</p>
            </div>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white opacity-70 uppercase tracking-wide font-semibold mb-1">Podstawa prawna</p>
              <p class="text-white opacity-80 text-sm">{{ podstawaPrawna }}</p>
            </div>
            <div v-if="zwolnienieInfo" class="bg-amber-600/20 rounded-xl p-4 border border-amber-500/30">
              <p class="text-xs text-amber-300 uppercase tracking-wide mb-1">💡 Zwolnienie z opłat</p>
              <p class="text-white opacity-80 text-sm text-xs">{{ zwolnienieInfo }}</p>
            </div>
          </div>
        </div>

        <a href="/kontakt"
          class="mt-6 block text-center px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide"
          style="background:#c9a84c; color:#0f2540;">
          Sprawdź inne koszty sprawy
        </a>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
      <strong>⚠️ Aktualne przepisy:</strong> Ustawa o kosztach sądowych w sprawach cywilnych
      (Dz.U. 2005 nr 167 poz. 1398). Nowelizacja z 23 IX 2025 r. — max opłata stosunkowa: 100 000 zł.
      Kalkulator nie uwzględnia kosztów biegłych, zaliczek i kosztów komornika.
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
  return Math.min(Math.round(wps * 0.05), 100000);
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
  return 'art. 13 UKSC (opłata stosunkowa 5% WPS, max 100 000 zł)';
});

const zwolnienieInfo = computed(() => {
  if (form.value.rodzajSprawy === 'alimenty_powod') return null;
  return 'Możesz ubiegać się o zwolnienie z opłat sądowych jeśli Twoje dochody są niskie. Wniosek składa się razem z pozwem lub odrębnie do sądu.';
});
</script>
