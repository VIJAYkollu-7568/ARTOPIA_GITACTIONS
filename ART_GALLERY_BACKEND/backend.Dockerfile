# Stage 1: Build the Spring Boot application using Maven
FROM maven:3.9.3-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven config files and source code
COPY pom.xml .
COPY src ./src

# Package the application without running tests
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image with JRE only
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the jar built in the previous stage
COPY --from=builder /app/target/ART_GALLERY-0.0.1-SNAPSHOT.jar app.jar

# Expose your backend port (adjust if needed)
EXPOSE 5000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
