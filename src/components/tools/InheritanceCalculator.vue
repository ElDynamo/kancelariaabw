<template>
  <div class="inheritance-calculator font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
      <div class="lg:col-span-7 space-y-8">

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">1</span>
            KIM JESTEŚ?
          </label>
          <div class="space-y-3">
            <button v-for="opt in relacjaOptions" :key="opt.value"
              @click="form.relacja = opt.value"
              :class="['w-full p-4 md:p-5 rounded-2xl transition-all text-left flex flex-col justify-center border-2',
                form.relacja === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              <span class="font-bold text-sm mb-1" :class="{'text-navy': form.relacja === opt.value}">{{ opt.label }}</span>
              <span class="text-[11px] font-medium opacity-80 leading-relaxed">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">2</span>
            JESTEŚ MAŁOLETNI LUB TRWALE NIEZDOLNY DO PRACY?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.zwiekszona = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border-2',
                form.zwiekszona === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
            </button>
          </div>
          <p class="text-[10px] font-medium text-navy/40 mt-4 px-2">Tak → zachowek wynosi 2/3 (art. 991 KC), Nie → 1/2</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">3</span>
            WARTOŚĆ CZYSTEGO SPADKU (AKTYWA – DŁUGI)
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wartoscSpadku" min="0" step="10000"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 500000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 font-medium text-sm">zł</span>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">4</span>
            WARTOŚĆ DAROWIZN DOLICZANYCH DO MASY
          </label>
          <div class="relative">
            <input type="number" v-model.number="form.wartoscDarowizn" min="0" step="10000"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-sans text-navy text-lg font-bold focus:bg-white focus:border-gold focus:outline-none transition-all shadow-inner"
              placeholder="np. 100000" />
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-navy/40 font-medium text-sm">zł</span>
          </div>
          <p class="text-[10px] font-medium text-navy/40 mt-4 px-2">
            Darowizny na rzecz spadkobierców dolicza się bez limitu czasu. Dla osób trzecich: tylko z ostatnich 10 lat.
          </p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">5</span>
            ILE DZIECI (ZSTĘPNYCH) DZIEDZICZY ŁĄCZNIE?
          </label>
          <div class="flex gap-3">
            <button v-for="n in [1,2,3,4,5]" :key="n"
              @click="form.liczbaZstepnych = n"
              :class="['flex-1 py-3.5 rounded-full text-base font-bold transition-all border-2',
                form.liczbaZstepnych === n
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ n }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <label class="block text-[11px] font-bold uppercase tracking-[0.15em] text-navy mb-5 flex items-center gap-3 leading-snug">
            <span class="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-gold text-xs">6</span>
            CZY MAŁŻONEK DZIEDZICZY OBOK CIEBIE?
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in takNieOptions" :key="opt.value"
              @click="form.malzonekDziedzicy = opt.value"
              :class="['w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border-2',
                form.malzonekDziedzicy === opt.value
                  ? 'border-gold bg-white text-navy shadow-md shadow-gold/10' 
                  : 'border-slate-50 bg-slate-50 text-navy/60 hover:border-slate-200']">
              {{ opt.label }}
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
        <div id="wyniki-kalkulatora" class="bg-navy rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between sticky top-32 min-h-[500px] overflow-hidden shadow-xl shadow-navy/10">
          
          <div class="relative z-10">
            <p class="text-[10px] text-gold/80 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
              TWÓJ ZACHOWEK
            </p>
            <p class="text-5xl md:text-[3.5rem] font-serif text-gold font-bold mb-8 tracking-tight leading-none">
              {{ zachowekFormatted }}
            </p>

            <div class="space-y-3">
              <!-- Row 1 -->
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold w-1/2 leading-relaxed">Substrat<br>zachowku</p>
                <p class="text-white font-semibold text-right">{{ substatFormatted }} zł</p>
              </div>
              
              <!-- Row 2 -->
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold w-1/2 leading-relaxed">Twój udział<br>ustawowy</p>
                <p class="text-white font-semibold text-right">{{ udzialFormatted }}</p>
              </div>
              
              <!-- Row 3 -->
              <div class="flex justify-between items-center bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p class="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold w-1/2 leading-relaxed">Zastosowany<br>ułamek</p>
                <p class="text-white font-semibold text-right flex flex-col items-end">
                  <span>{{ ulamek }}</span>
                  <span class="text-white/30 text-[10px] font-normal mt-0.5">(art. 991)</span>
                </p>
              </div>
              
              <!-- Termin Row -->
              <div class="bg-[#3A424E] rounded-2xl p-6 mt-4">
                <p class="text-[10px] text-gold uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Termin przedawnienia
                </p>
                <p class="text-white text-base font-bold mb-1.5">{{ dataPrzedawnienia }}</p>
                <p class="text-white/60 text-[11px] font-medium leading-relaxed">Zwykle 5 lat od ogłoszenia testamentu lub otwarcia spadku (KC art. 1007)</p>
              </div>
            </div>
          </div>

          <a href="/kontakt"
            class="relative z-10 mt-8 block text-center px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style="background:#D4AF37; color:#1e293b;">
            OMÓW TAKTYKĘ SPADKOWĄ
          </a>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mt-6 lg:mt-0">
      <strong>⚠️ Ważne:</strong> Kalkulator oblicza zachowek zgodnie z <em>Ustawą z dnia 23 kwietnia 1964 r. – Kodeks cywilny (t.j. Dz. U. z 2023 r. poz. 1610 ze zm.)</em>.
      Rzeczywista kwota zależy od m.in. wartości ustalonej przez biegłego, ewentualnych długów spadkowych
      i szczegółowych okoliczności. Wyliczenie ma charakter pomocniczy. Skorzystaj z porady prawnej.
    </div>

    <!-- Mobile Sticky Bar -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_40px_rgba(15,37,64,0.3)] z-50 flex items-center justify-between border-t border-white/10">
      <div>
        <p class="text-[9px] text-white/50 uppercase tracking-[0.15em] font-semibold mb-0.5">Twój zachowek</p>
        <p class="text-xl font-sans text-gold font-bold tracking-tight leading-none">{{ zachowekFormatted }}</p>
      </div>
      <button @click="scrollToResults" class="bg-gold text-navy px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-gold/20">
        Szczegóły 
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
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

const scrollToResults = () => {
  document.getElementById('wyniki-kalkulatora')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
