import Keycloak, { type KeycloakConfig } from "keycloak-js";

export default defineNuxtPlugin((app) => {
  const runtimeConfig = useRuntimeConfig();

  const config: KeycloakConfig = {
    url: runtimeConfig.public.keycloakAuthServerUrl,
    realm: runtimeConfig.public.keycloakRealm,
    clientId: runtimeConfig.public.keycloakClientId,
  }
  const keycloak = new Keycloak(config);

  keycloak.init({
    onLoad: "login-required",
  });

  keycloak.updateToken(2000);
  app.$keycloak = keycloak;

  // console.log('KeyCloak Plugin Loaded: ', app.$keycloak);
});
