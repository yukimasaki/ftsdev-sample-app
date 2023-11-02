// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      keycloakAuthServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
      keycloakRealm: process.env.KEYCLOAK_REALM,
      keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
    },
  },
  devtools: { enabled: true },
})
