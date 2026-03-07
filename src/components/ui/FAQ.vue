<script setup lang="ts">
import { ref } from 'vue';

interface FaqItem {
  question: string;
  answer: string;
}

const props = defineProps<{ items: FaqItem[] }>();
const open = ref<number | null>(null);

const toggle = (i: number) => {
  open.value = open.value === i ? null : i;
};
</script>

<template>
  <div class="divide-y divide-border">
    <div
      v-for="(item, i) in props.items"
      :key="i"
      class="py-5"
    >
      <button
        class="w-full flex items-center justify-between text-left gap-4 group"
        :aria-expanded="open === i"
        :aria-controls="`faq-answer-${i}`"
        @click="toggle(i)"
      >
        <span class="font-serif text-lg text-navy group-hover:text-gold transition-colors">
          {{ item.question }}
        </span>
        <span
          class="flex-shrink-0 w-6 h-6 rounded-full border border-navy text-navy flex items-center justify-center text-sm transition-transform duration-300"
          :class="{ 'rotate-45': open === i }"
          aria-hidden="true"
        >+</span>
      </button>
      <div
        :id="`faq-answer-${i}`"
        v-show="open === i"
        class="mt-3 font-sans text-sm text-text-muted leading-relaxed pr-10"
      >
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>
