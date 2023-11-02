FROM quay.io/keycloak/keycloak:18.0.2
USER root
RUN microdnf update -y && microdnf install -y glibc-langpack-en gzip hostname java-11-openjdk-headless openssl tar which && microdnf clean all
USER 1000
EXPOSE 8080