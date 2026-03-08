<template>
  <div class="statute-calculator font-sans">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-5">

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">Rodzaj roszczenia</label>
          <div class="space-y-2">
            <button v-for="opt in roszczeniaOptions" :key="opt.value"
              @click="form.rodzaj = opt.value"
              :class="['w-full p-3 rounded-xl border-2 text-sm font-medium transition-all text-left',
                form.rodzaj === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              <div class="flex justify-between items-center">
                <span class="font-semibold">{{ opt.label }}</span>
                <span :class="form.rodzaj === opt.value ? 'text-gold' : 'text-gold'" class="text-xs font-bold">{{ opt.termin }}</span>
              </div>
              <span class="text-xs opacity-60">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Data wymagalności roszczenia
          </label>
          <input type="date" v-model="form.dataWymagalnosci"
            :max="today"
            class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none" />
          <p class="text-xs text-text-muted mt-1">Data, od kiedy mogłeś żądać zapłaty / spełnienia świadczenia</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-gold mb-2">
            Czy nastąpiło przerwanie biegu przedawnienia?
          </label>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.przerwanie = opt.value"
              :class="['p-3 rounded-xl border-2 text-sm font-semibold transition-all',
                form.przerwanie === opt.value
                  ? 'border-gold bg-navy text-white' : 'border-border bg-white text-navy hover:border-navy']">
              {{ opt.label }}
            </button>
          </div>
          <div v-if="form.przerwanie === 'tak'">
            <label class="block text-xs uppercase tracking-widest text-gold mb-2">Data przerwania biegu</label>
            <input type="date" v-model="form.dataPrzerwania"
              class="w-full border-2 border-border rounded-xl px-4 py-3 font-sans text-navy text-base focus:border-gold focus:outline-none" />
            <p class="text-xs text-text-muted mt-1">np. data wytoczenia powództwa, uznania długu, ugody</p>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div :class="['rounded-2xl p-6 flex flex-col justify-between', statusBg]">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">{{ statusIcon }}</span>
            <div>
              <p class="text-xs text-white/40 uppercase tracking-widest">Status</p>
              <p class="text-white font-semibold text-lg">{{ statusLabel }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="bg-white/10 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Data przedawnienia</p>
              <p class="text-gold text-xl font-bold font-serif">{{ dataPrzedawnieniaFormatted }}</p>
              <p class="text-white/50 text-xs mt-1">Koniec terminu upada 31 XII roku (KC art. 118 zd. 2)</p>
            </div>

            <div class="bg-white/10 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Termin przedawnienia</p>
              <p class="text-white text-sm">{{ terminInfo }}</p>
            </div>

            <div v-if="dniPozostalo > 0 && dniPozostalo <= 90" class="bg-red-800/50 rounded-xl p-4 border border-red-400/30">
              <p class="text-red-300 font-semibold text-sm">⚠️ Pozostało {{ dniPozostalo }} dni!</p>
              <p class="text-white/70 text-xs mt-1">Działaj natychmiast — złóż pozew lub wezwanie do zapłaty</p>
            </div>

            <div v-if="dniPozostalo <= 0" class="bg-red-900/50 rounded-xl p-4 border border-red-400/30">
              <p class="text-red-300 font-semibold text-sm">❌ Roszczenie przedawnione</p>
              <p class="text-white/70 text-xs mt-1">Skonsultuj się z prawnikiem — w sprawach konsumenckich sąd bada przedawnienie z urzędu</p>
            </div>

            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-xs text-white/40 uppercase tracking-wide mb-1">Podstawa prawna</p>
              <p class="text-white/70 text-xs">{{ podstawaPrawna }}</p>
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
      <strong>⚠️ Uwaga:</strong> Kalkulator stosuje przepisy KC art. 117–125 po nowelizacji z 9 VII 2018 r.
      W sprawach z konsumentami sąd uwzględnia przedawnienie z urzędu od 2018 r.
      Kalkulator nie zastępuje analizy prawnej — skonsultuj się z radcą prawnym.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

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
</script>
