<script setup>
import { ref, onMounted } from 'vue';

import LandingPage from './components/LandingPage.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';

const isLoggedIn = ref(false);
const authView = ref('landing');

function handleLoginSuccess() {
  isLoggedIn.value = true;
}

function handleLogout() {
  localStorage.removeItem('mobs2-token');
  isLoggedIn.value = false;
  authView.value = 'landing';
}

onMounted(() => {
  const token = localStorage.getItem('mobs2-token');
  if (token) {
    isLoggedIn.value = true;
  }
});
</script>

<template>
  <Dashboard v-if="isLoggedIn" @logout="handleLogout" />

  <div v-else>
    <LandingPage 
      v-if="authView === 'landing'" 
      @show-login="authView = 'login'" 
      @show-register="authView = 'register'" 
    />
    <Login 
      v-else-if="authView === 'login'" 
      @show-register="authView = 'register'" 
      @login-success="handleLoginSuccess" 
    />
    <Register 
      v-else-if="authView === 'register'" 
      @show-login="authView = 'login'" 
    />
  </div>
</template>

<style>
</style>