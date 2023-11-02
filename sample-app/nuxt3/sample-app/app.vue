<template>
  <div>
    <button
      @click="login()"
    >
      Login
    </button>
  </div>
</template>

<script setup lang="ts">
import Keycloak from 'keycloak-js';

const nuxtApp = useNuxtApp();

const login = () => {
  // console.log(nuxtApp);
  // console.log('----> ', nuxtApp.$keycloak);
  // (nuxtApp.$keycloak as Keycloak).login();
}
</script>
