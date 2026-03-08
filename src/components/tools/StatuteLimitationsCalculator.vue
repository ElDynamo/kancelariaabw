<template>
  <div class="statute-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">1</span>
            Rodzaj roszczenia
          </label>
          <div class="relative">
            <select v-model="form.rodzaj"
              class="w-full appearance-none bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-sm md:text-base font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner cursor-pointer pr-10">
              <option v-for="opt in roszczeniaOptions" :key="opt.value" :value="opt.value">{{ opt.label }} ({{ opt.termin }})</option>
            </select>
            <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/50 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="text-xs font-medium text-navy/60 mt-3 px-2">
            {{ roszczeniaOptions.find(o => o.value === form.rodzaj)?.sub }}
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">2</span>
            Data wymagalności roszczenia
          </label>
          <input type="date" v-model="form.dataWymagalnosci"
            :max="today"
            class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-base md:text-lg font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner" />
          <p class="text-xs font-medium text-navy/60 mt-3 px-2">Data, od kiedy mogłeś prawnie zażądać zapłaty / spełnienia świadczenia.</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-sm">
          <label class="block text-sm font-semibold uppercase tracking-widest text-navy mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-gold">3</span>
            Czy nastąpiło przerwanie biegu przedawnienia?
          </label>
          <div class="grid grid-cols-2 gap-4 mb-5">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.przerwanie = opt.value"
              :class="['w-full py-3 px-4 rounded-2xl border-2 text-sm md:text-base transition-all font-medium',
                form.przerwanie === opt.value
                  ? 'border-gold bg-white text-navy shadow-[0_8px_20px_-6px_rgba(201,168,76,0.3)] scale-[1.02]' 
                  : 'border-transparent bg-off-white text-navy/70 hover:bg-navy/5 hover:text-navy']">
              {{ opt.label }}
            </button>
          </div>
          
          <div v-show="form.przerwanie === 'tak'" class="transition-all duration-500 pt-3 border-t border-border/50">
            <label class="block text-xs font-semibold uppercase tracking-widest text-navy mb-3 px-2">Data przerwania biegu</label>
            <input type="date" v-model="form.dataPrzerwania"
              class="w-full bg-off-white border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-base font-medium focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner" />
            <p class="text-xs font-medium text-navy/60 mt-3 px-2">np. data wniesienia pozwu, wezwania do próby ugodowej, lub data pisma z uznaniem długu.</p>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="lg:col-span-5 relative">
        <div :class="['rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 border border-white/10 shadow-[0_20px_50px_-12px_rgba(15,37,64,0.3)] min-h-[500px] overflow-hidden transition-colors duration-700', statusBg]">
          <!-- Dekoracyjny gradient -->
          <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[20rem] h-[20rem] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl filter drop-shadow-md">{{ statusIcon }}</span>
              <div>
                <p class="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Status sprawy</p>
                <p class="text-white font-bold text-xl md:text-2xl tracking-tight leading-none">{{ statusLabel }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="bg-white/10 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold mb-2">Data przedawnienia</p>
                <p class="text-gold text-2xl md:text-3xl font-bold font-sans tracking-tight drop-shadow-sm mb-1">{{ dataPrzedawnieniaFormatted }}</p>
                <p class="text-white/60 text-xs font-medium">Bieg terminu często upływa z 31 XII (KC art. 118 zd. 2)</p>
              </div>

              <div class="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm flex justify-between items-center">
                <p class="text-xs text-white/60 uppercase tracking-widest font-semibold">Termin bazowy</p>
                <p class="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-lg">{{ terminInfo }}</p>
              </div>

              <div v-show="dniPozostalo > 0 && dniPozostalo <= 90" class="bg-orange-600/30 rounded-2xl p-5 border border-orange-400/30 backdrop-blur-md animate-pulse">
                <p class="text-orange-300 font-bold text-sm flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-orange-300"></span> Pozostało tylko {{ dniPozostalo }} dni!
                </p>
                <p class="text-white/80 font-medium text-xs mt-2 leading-relaxed">Natychmiast wyślij ostateczne przedsądowe wezwanie do zapłaty lub złóż pozew by przerwać bieg!</p>
              </div>

              <div v-show="dniPozostalo <= 0" class="bg-red-800/40 rounded-2xl p-5 border border-red-500/40 backdrop-blur-md">
                <p class="text-red-300 font-bold text-sm tracking-wide">Roszczenie uległo przedawnieniu</p>
                <p class="text-white/80 font-medium text-xs mt-2 leading-relaxed">Przeciwnik może skutecznie uchylić się od zapłaty. W sprawach konsumenckich (B2C) Sąd zbada ten zarzut z urzędu.</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-10 block text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 text-navy bg-gold">
            Zweryfikuj daty z prawnikiem
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Aktualne przepisy:</strong> Kalkulator uwzględnia skracające terminy przedawnienia wprowadzone przez <em>Ustawę z dnia 13 kwietnia 2018 r. o zmianie ustawy – Kodeks cywilny oraz niektórych innych ustaw (Dz. U. z 2018 r. poz. 1104, weszła w życie 9 lipca 2018 r.)</em>.
      W sprawach z udziałem konsumentów, sąd bada przedawnienie z urzędu. Kalkulator ma charakter orientacyjny i nie zastępuje profesjonalnej analizy prawnej.
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
