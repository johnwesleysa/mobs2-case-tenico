<script setup>
import { ref } from 'vue';
import logo from '../assets/logo.png';
import api from '../services/api';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Garante que o componente pode emitir ambos os eventos
const emit = defineEmits(['show-register', 'login-success']);

async function handleLogin() {
  errorMessage.value = '';
  try {
    // 1. Faz a chamada para a API de login
    const response = await api.post('/api/login', {
      email: email.value,
      password: password.value,
    });

    // 2. Extrai o token da resposta
    const token = response.data.token;

    // 3. Verifica se o token realmente veio na resposta
    if (token) {
      // 4. Salva o token no armazenamento do navegador
      localStorage.setItem('mobs2-token', token);
      
      // 5. AVISA O APP.VUE QUE O LOGIN FOI UM SUCESSO!
      emit('login-success');
    } else {
      // Caso a resposta venha sem o token por algum motivo
      throw new Error('Token não encontrado na resposta da API');
    }
  } catch (error) {
    errorMessage.value = 'Email ou senha inválidos.';
    console.error("Erro no login:", error);
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <img :src="logo" alt="MOBS2 Logo" class="logo" />
      <h2>Acesse sua Conta</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="seu@email.com" required />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" class="btn-primary">Entrar</button>
      </form>

      <p class="switch-form">
        Não tem uma conta? 
        <a href="#" @click.prevent="emit('show-register')">Cadastre-se</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: #ff5252;
  margin-bottom: 1rem;
}
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.auth-card {
  background-color: #1e1e1e;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo {
  height: 40px;
  margin-bottom: 2rem;
}
h2 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
}
.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}
.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #b0b0b0;
}
.input-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 1rem;
}
.btn-primary {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  margin-top: 1rem;
}
.switch-form {
  margin-top: 2rem;
  color: #b0b0b0;
}
.switch-form a {
  font-weight: bold;
  color: #4CAF50;
}
</style>