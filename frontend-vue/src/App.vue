<script setup>

import logo from './assets/logo.png';
</script>

<template>
  <div id="landing-page">
    
    <header class="header">
      <img :src="logo" alt="MOBS2 Logo" class="logo" />
    </header>

    <main class="hero">
      <h1>Sistema completo de rastreamento de frota de veículos em tempo real.</h1>
      <p>Monitore, controle e otimize sua frota com tecnologia de ponta.</p>
      <div class="actions">
        <button class="btn-primary">Acessar Painel</button>
        <button class="btn-secondary">Criar Conta</button>
      </div>
    </main>

    <section class="features">
      <h2>Principais Funcionalidades</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="icon">📍</span>
          <h3>Rastreamento em Tempo Real</h3>
          <p>Monitore a localização de todos os veículos da sua frota instantaneamente.</p>
        </div>
        <div class="feature-card">
          <span class="icon">🛡️</span>
          <h3>Alertas Inteligentes</h3>
          <p>Receba notificações sobre velocidade, combustível e manutenção.</p>
        </div>
        <div class="feature-card">
          <span class="icon">👥</span>
          <h3>Gestão de Motoristas</h3>
          <p>Controle completo sobre motoristas e suas atividades.</p>
        </div>
        <div class="feature-card">
          <span class="icon">📈</span>
          <h3>Relatórios Detalhados</h3>
          <p>Análises completas de desempenho e custos operacionais.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <img :src="logo" alt="MOBS2 Logo" class="logo-footer" />
      <p>© 2025 MOBS2. Sistema de rastreamento de frota de veículos.</p>
    </footer>

  </div>
</template>

<style scoped>
/* A tag <style scoped> contém o CSS que se aplica APENAS a este componente,
   evitando conflitos com outros estilos. */

#landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.logo {
  height: 40px;
  margin-bottom: 4rem;
}

.hero {
  max-width: 700px;
  margin-bottom: 6rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #b0b0b0; /* Um cinza um pouco mais escuro para o subtitulo */
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: #4CAF50; /* Verde */
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: transparent;
  color: #e0e0e0;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
  color: #121212;
}

.features {
  margin-bottom: 6rem;
  width: 100%;
  max-width: 1200px;
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
}

.feature-card .icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.feature-card p {
  color: #b0b0b0;
}

.footer {
  padding-top: 4rem;
  border-top: 1px solid #2a2a2a;
  width: 100%;
  max-width: 1200px;
}

.logo-footer {
  height: 30px;
  margin-bottom: 1rem;
}

.footer p {
  font-size: 0.9rem;
  color: #757575;
}
</style>