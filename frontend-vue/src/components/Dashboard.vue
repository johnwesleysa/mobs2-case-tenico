<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '../services/api';
import { io } from 'socket.io-client';

// --- Estado do Componente ---
const vehicles = ref([]);
const telemetryData = ref({});
const mapContainer = ref(null);
let map = null;
let markers = {};
let polylines = {};

// Estado dos controles da UI
const showHistory = ref(false);
const searchQuery = ref('');
const showDropdown = ref(false);

const emit = defineEmits(['logout']);

// --- Funções ---
function loadGoogleMapsScript() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Chave da API do Google Maps não encontrada!");
    return Promise.reject(new Error("Chave da API do Google Maps não encontrada!"));
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;
  document.head.appendChild(script);
  return new Promise((resolve) => {
    script.onload = resolve;
  });
}

async function fetchVehicles() {
  try {
    const response = await api.get('/api/vehicles');
    vehicles.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    if (error.response?.status === 401) {
      emit('logout');
    }
  }
}

function initializeMap() {
  map = new google.maps.Map(mapContainer.value, {
    center: { lat: -23.55052, lng: -46.633308 },
    zoom: 12,
    mapId: 'MOBS2_MAP_ID',
  });
}

function updateMarkers() {
  vehicles.value.forEach(vehicle => {
    const telemetry = telemetryData.value[vehicle.id];
    if (!telemetry) return;
    const position = { lat: telemetry.latitude, lng: telemetry.longitude };
    if (!markers[vehicle.id]) {
      markers[vehicle.id] = new google.maps.Marker({
        position,
        map,
        title: `Placa: ${vehicle.plate}`,
      });
      const infoWindowContent = `
        <div class="custom-infowindow">
          <h3>${vehicle.plate}</h3>
          <p><strong>Modelo:</strong> ${vehicle.model}</p>
          <p><strong>Velocidade:</strong> ${telemetry.speed} km/h</p>
          <p><strong>Combustível:</strong> ${telemetry.fuel}%</p>
          <p><strong>Atualizado em:</strong> ${new Date(telemetry.updatedAt).toLocaleTimeString()}</p>
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });
      markers[vehicle.id].addListener('click', () => {
        infoWindow.open(map, markers[vehicle.id]);
      });
    } else {
      markers[vehicle.id].setPosition(position);
    }
  });
}

function connectWebSocket() {
  const socket = io('http://localhost:3000/telemetry');
  socket.on('connect', () => {
    console.log('Conectado ao servidor de telemetria!');
  });
  socket.on('telemetryUpdate', (newTelemetry) => {
    telemetryData.value = {
      ...telemetryData.value,
      [newTelemetry.vehicleId]: newTelemetry,
    };
  });
}

function handleLogout() {
  emit('logout');
}

// --- Lifecycle Hook ---
onMounted(async () => {
  try {
    await loadGoogleMapsScript();
    await fetchVehicles();
    initializeMap();
    connectWebSocket();
  } catch (error) {
    console.error("Falha ao inicializar o dashboard:", error);
  }
});

// --- Watchers (Nova Lógica) ---

// 1. WATCHER PARA O CAMPO DE BUSCA
watch(searchQuery, (newQuery) => {
  const query = newQuery.toLowerCase();
  vehicles.value.forEach(vehicle => {
    const marker = markers[vehicle.id];
    const polyline = polylines[vehicle.id];
    if (!marker) return;

    const isVisible = vehicle.plate.toLowerCase().includes(query);
    marker.setVisible(isVisible);
    if (polyline) {
      polyline.setVisible(isVisible && showHistory.value); // A polilinha só é visível se o veículo também for E o histórico estiver ativo
    }
  });
});

// 2. WATCHER PARA O BOTÃO DE HISTÓRICO
watch(showHistory, async (isActive) => {
  if (isActive) {
    // Se o histórico foi ATIVADO
    console.log("Mostrando histórico...");
    for (const vehicle of vehicles.value) {
      try {
        // Busca o histórico de cada veículo na API do NestJS
        const response = await fetch(`http://localhost:3000/telemetry/${vehicle.id}/history`);
        const historyPoints = await response.json();

        // Formata os pontos para o formato que o Google Maps entende
        const pathCoordinates = historyPoints.map(p => ({ lat: p.latitude, lng: p.longitude }));

        // Cria a polilinha
        const polyline = new google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        });

        // Adiciona a polilinha ao mapa e a guarda no nosso objeto
        polyline.setMap(map);
        polylines[vehicle.id] = polyline;

      } catch (error) {
        console.error(`Erro ao buscar histórico para o veículo ${vehicle.id}:`, error);
      }
    }
  } else {
    // Se o histórico foi DESATIVADO
    console.log("Ocultando histórico...");
    // Itera sobre todas as polilinhas guardadas e as remove do mapa
    for (const vehicleId in polylines) {
      polylines[vehicleId].setMap(null);
    }
    polylines = {}; 
  }
});

// 3. WATCHER PARA A TELEMETRIA
watch(telemetryData, () => {
  updateMarkers();
}, { deep: true });
</script>

<template>
  <div class="dashboard-layout">
    <header class="main-header">
      <div class="header-left">
        <span class="logo-text">Painel de Veículos MOBS2</span>
      </div>
      <div class="header-center">
        <input type="text" v-model="searchQuery" placeholder="🔎 Buscar por placa..." class="search-bar" />
      </div>
      <div class="header-right">
        <div class="history-toggle">
          <span class="toggle-label">Mostrar Histórico</span>
          <label class="switch">
            <input type="checkbox" v-model="showHistory">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="user-menu">
          <button @click="showDropdown = !showDropdown" class="user-button">👤</button>
          <div v-if="showDropdown" class="dropdown-menu">
            <a href="#" @click.prevent="handleLogout">↪ Sair</a>
          </div>
        </div>
      </div>
    </header>

    <main class="content-area">
      <div ref="mapContainer" class="map-container"></div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #1e1e1e;
  border-bottom: 1px solid #2a2a2a;
  color: #e0e0e0;
}

.logo-text {
  font-weight: bold;
  font-size: 1.2rem;
}

.search-bar {
  width: 300px;
  padding: 0.5rem 1rem;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #e0e0e0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.history-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-menu {
  position: relative;
}

.user-button {
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 10px;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid #3a3a3a;
  z-index: 10;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1rem;
  color: #e0e0e0;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-menu a:hover {
  background-color: #3a3a3a;
}

.content-area {
  flex-grow: 1;
}

/*o mapa ocupe todo o espaço disponível */
.map-container {
  width: 100%;
  height: 100%;
}

/* Estilos para o Toggle Switch */
.switch { position: relative; display: inline-block; width: 50px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #3a3a3a; transition: .4s; }
.slider.round { border-radius: 34px; }
.slider.round:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: #4CAF50; }
input:checked + .slider:before { transform: translateX(26px); }
</style>

<style>
/* Estiliza o container principal do popup do Google */
.gm-style-iw.gm-style-iw-c {
  padding: 0 !important;
  border-radius: 12px !important;
  /* NOVAS REGRAS PARA ESCONDER O BALÃO BRANCO */
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* Esconde a "cauda" (setinha) branca do balão */
.gm-style-iw-t::after {
  display: none;
}

/* Remove o botão de fechar padrão do Google */
.gm-style-iw-close-button {
  display: none !important;
}

/* Garante que o nosso conteúdo ocupe todo o espaço */
.gm-style-iw-d {
  overflow: hidden !important;
}

/* --- NOSSOS ESTILOS CUSTOMIZADOS (CONTINUAM OS MESMOS) --- */

.custom-infowindow {
  background-color: #2a2a2a;
  color: #e0e0e0;
  padding: 16px 24px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  position: relative;
}

.custom-infowindow h3 {
  margin: 0 0 10px 0;
  color: white;
  font-size: 1.1rem;
}

.custom-infowindow p {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
}

.custom-infowindow strong {
  color: #a0a0a0;
}

.custom-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #a0a0a0;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
}
.custom-close-button:hover {
  color: white;
}
</style>