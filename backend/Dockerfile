# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia arquivos do maven primeiro para otimizar o cache de dependências
COPY pom.xml .
COPY .mvn/ .mvn/
COPY mvnw .
RUN ./mvnw dependency:go-offline -B || mvn dependency:go-offline -B

# Copia o restante do código e compila
COPY src/ src/
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Cria usuário não-root para maior segurança
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Healthcheck interno do container consumindo o Actuator
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]