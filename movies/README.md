# Movies Application

This is a Spring Boot application for managing movies with JWT authentication.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd movies
```

2. Configure Database
   - Create a MySQL database
   - Update the database configuration in `src/main/resources/application.properties` with your database credentials

3. Build the project:
```bash
./mvnw clean install
```

## Running the Application

You can run the application using Maven:

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

The application provides the following endpoints:

- Authentication endpoints:
  - POST `/auth/register` - Register a new user
  - POST `/auth/login` - Login and get JWT token

- Movie endpoints (requires authentication):
  - GET `/movies` - Get all movies
  - GET `movies/{id}` - Get a specific movie
  - POST `movies` - Create a new movie
  - PUT `/movies/{id}` - Update a movie
  - DELETE `/movies/{id}` - Delete a movie

## Authentication

The application uses JWT (JSON Web Token) for authentication. To access protected endpoints:

1. First, register a user or login to get a JWT token
2. Include the token in the Authorization header for subsequent requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## Technologies Used

- Spring Boot 3.4.2
- Spring Security with JWT
- Spring Data JPA
- MySQL
- Maven
