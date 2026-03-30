<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const mapContainer = ref<HTMLElement | null>(null);
let map: unknown = null;

onMounted(async () => {
  if (!mapContainer.value) return;

  // Leaflet imports — tylko po stronie klienta (Vue Island)
  const L = (await import('leaflet')).default;
  await import('leaflet/dist/leaflet.css');

  // Fix for default marker icons in bundled environments
  const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
  const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

  const defaultIcon = L.icon({ iconUrl, iconRetinaUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
  L.Marker.prototype.options.icon = defaultIcon;

  map = L.map(mapContainer.value, { scrollWheelZoom: false }).setView([51.1396, 16.9248], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map as any);

  // Marker — Wrocław, ul. Szkolna 7bh
  L.marker([51.1396, 16.9248])
    .addTo(map as any)
    .bindPopup(`
      <strong style="font-family:serif;color:#1a3a5c;">Kancelaria Prawna ABW</strong><br/>
      <span style="font-size:12px;color:#64748b;">Biuro kancelarii:<br/>ul. Szkolna 7bh, Wrocław</span><br/>
      <a href="tel:+48609366160" style="color:#c9a84c;font-size:12px;margin-top:4px;display:inline-block;">609 366 160</a>
    `);
});

onBeforeUnmount(() => {
  if (map) (map as any).remove();
});
</script>

<template>
  <div
    ref="mapContainer"
    style="width: 100%; height: 400px;"
    role="region"
    aria-label="Mapa lokalizacji kancelarii we Wrocławiu"
  ></div>
</template>
