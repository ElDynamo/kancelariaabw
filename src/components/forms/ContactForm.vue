<script setup lang="ts">
import { ref, reactive } from 'vue';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot: string; // anti-spam - hidden field
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const form = reactive<FormData>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  honeypot: '',
});

const status = ref<FormStatus>('idle');
const errorMsg = ref('');

const subjects = [
  'Prawo rodzinne',
  'Prawo cywilne',
  'Prawo karne',
  'Inne',
];

const validate = (): boolean => {
  if (!form.name.trim()) { errorMsg.value = 'Proszę podać imię i nazwisko.'; return false; }
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { errorMsg.value = 'Nieprawidłowy adres email.'; return false; }
  if (!form.subject) { errorMsg.value = 'Proszę wybrać temat sprawy.'; return false; }
  if (!form.message.trim() || form.message.length < 10) { errorMsg.value = 'Wiadomość jest zbyt krótka (min. 10 znaków).'; return false; }
  if (!form.consent) { errorMsg.value = 'Proszę wyrazić zgodę na przetwarzanie danych osobowych.'; return false; }
  return true;
};

const submit = async () => {
  errorMsg.value = '';
  if (!validate()) return;
  // Honeypot check — boty wypełniają to pole
  if (form.honeypot) return;

  status.value = 'loading';
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        consent: form.consent,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? 'Błąd serwera.');
    }

    status.value = 'success';
  } catch (err) {
    status.value = 'error';
    errorMsg.value = err instanceof Error ? err.message : 'Wystąpił błąd. Spróbuj ponownie lub zadzwoń: 609 366 160.';
  }
};
</script>

<template>
  <div>
    <!-- Success state -->
    <div v-if="status === 'success'" class="text-center py-12">
      <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <span class="text-green-600 text-2xl" aria-hidden="true">✓</span>
      </div>
      <h3 class="font-serif text-2xl text-navy mb-2">Wiadomość wysłana!</h3>
      <p class="font-sans text-text-muted">Odpiszemy w ciągu 1–2 dni roboczych.</p>
    </div>

    <!-- Form -->
    <form
      v-else
      @submit.prevent="submit"
      novalidate
      aria-label="Formularz kontaktowy"
    >
      <!-- Honeypot — ukryte dla ludzi, widoczne dla botów -->
      <div style="position: absolute; left: -9999px; opacity: 0;" aria-hidden="true">
        <label for="website">Strona (nie wypełniaj)</label>
        <input id="website" v-model="form.honeypot" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="space-y-4">
        <!-- Imię i nazwisko -->
        <div>
          <label for="contact-name" class="block font-sans text-sm text-navy mb-1 font-medium">
            Imię i nazwisko <span class="text-gold" aria-label="wymagane">*</span>
          </label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            placeholder="Jan Kowalski"
            :disabled="status === 'loading'"
            class="w-full border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-navy
                   focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                   disabled:opacity-50 bg-white"
          />
        </div>

        <!-- Email + Telefon -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="contact-email" class="block font-sans text-sm text-navy mb-1 font-medium">
              Email <span class="text-gold" aria-label="wymagane">*</span>
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="jan@example.com"
              :disabled="status === 'loading'"
              class="w-full border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-navy
                     focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                     disabled:opacity-50 bg-white"
            />
          </div>
          <div>
            <label for="contact-phone" class="block font-sans text-sm text-navy mb-1 font-medium">
              Telefon <span class="text-text-muted font-normal">(opcjonalnie)</span>
            </label>
            <input
              id="contact-phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              placeholder="+48 600 000 000"
              :disabled="status === 'loading'"
              class="w-full border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-navy
                     focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                     disabled:opacity-50 bg-white"
            />
          </div>
        </div>

        <!-- Temat -->
        <div>
          <label for="contact-subject" class="block font-sans text-sm text-navy mb-1 font-medium">
            Temat sprawy <span class="text-gold" aria-label="wymagane">*</span>
          </label>
          <select
            id="contact-subject"
            v-model="form.subject"
            required
            :disabled="status === 'loading'"
            class="w-full border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-navy
                   focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                   disabled:opacity-50 bg-white"
          >
            <option value="" disabled>Wybierz temat...</option>
            <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <!-- Wiadomość -->
        <div>
          <label for="contact-message" class="block font-sans text-sm text-navy mb-1 font-medium">
            Wiadomość <span class="text-gold" aria-label="wymagane">*</span>
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Opisz pokrótce swoją sprawę..."
            :disabled="status === 'loading'"
            class="w-full border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-navy
                   focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                   disabled:opacity-50 bg-white resize-none"
          ></textarea>
        </div>

        <!-- Zgoda RODO -->
        <div class="flex gap-3 items-start">
          <input
            id="contact-consent"
            v-model="form.consent"
            type="checkbox"
            required
            :disabled="status === 'loading'"
            class="mt-0.5 w-4 h-4 accent-navy cursor-pointer disabled:opacity-50"
          />
          <label for="contact-consent" class="font-sans text-xs text-text-muted leading-relaxed cursor-pointer">
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez Kancelarię Prawną ABW w celu udzielenia odpowiedzi na zapytanie, zgodnie z
            <a href="/przetwarzanie-danych" class="text-gold hover:underline" target="_blank">klauzulą informacyjną</a>.
            <span class="text-gold" aria-label="wymagane">*</span>
          </label>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" role="alert" class="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p class="font-sans text-sm text-red-700">{{ errorMsg }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="status === 'loading'"
          class="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="status === 'loading'" aria-hidden="true" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ status === 'loading' ? 'Wysyłanie...' : 'Wyślij wiadomość' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
