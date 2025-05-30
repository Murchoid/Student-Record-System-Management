# Student Record Management System

A modular and scalable Student Record Management System built with [NestJS](https://nestjs.com/).

---

## Project Structure

The `src` folder contains the main application code, organized by feature modules:

```
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
  admin-logs/
    admin-logs.controller.ts
    admin-logs.module.ts
    admin-logs.service.ts
    dto/
    entities/
  admin-profiles/
    admin-profiles.controller.ts
    admin-profiles.module.ts
    admin-profiles.service.ts
    dto/
    entities/
  admins/
    admins.controller.ts
    admins.module.ts
    admins.service.ts
    dto/
    entities/
  course_inrollments/
    ...
  courses/
    courses.controller.ts
    ...
  database/
    ...
  feedbacks/
    ...
  password-changes/
    password-changes.controller.ts
    password-changes.module.ts
    password-changes.service.ts
    dto/
    entities/
  reports/
    reports.controller.ts
    reports.module.ts
    reports.service.ts
    dto/
    entities/
  seed-data/
    ...
  sessions/
    ...
  students/
    ...
  subjects/
    subjects.controller.ts
    subjects.module.ts
    subjects.service.ts
    dto/
    entities/
```

Each feature module (e.g., `admin-logs`, `admins`, `courses`, `reports`, `subjects`, etc.) contains its own controller, service, DTOs, and entities for better modularity and maintainability.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run start:dev
```

---

## Testing

```bash
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

---
## API Endpoints

### Admins (`/api/admin`)
- `POST /register` — Register a new admin
- `GET /auths` — Get all admins
- `GET /auths/:id` — Get a specific admin by ID
- `PATCH /auths/:id` — Update an admin by ID
- `DELETE /auths/:id` — Delete an admin by ID

### Admin Profiles (`/api/admin/profile`)
- `POST` — Create a new admin profile
- `GET` — Get all admin profiles
- `GET /:id` — Get a specific admin profile by ID
- `PATCH /:id` — Update an admin profile by ID
- `DELETE /:id` — Delete an admin profile by ID

### Admin Logs (`/api/admin/logs`)
- `POST` — Create a new admin log
- `GET` — Get all admin logs
- `GET /:id` — Get a specific admin log by ID
- `PATCH /:id` — Update an admin log by ID
- `DELETE /:id` — Delete an admin log by ID

### Students (`/students`)
- `POST` — Create a new student
- `GET` — Get all students
- `GET /:id` — Get a specific student by ID
- `PATCH /:id` — Update a student by ID
- `DELETE /:id` — Delete a student by ID

### Courses (`/courses`)
- `POST` — Create a new course
- `GET` — Get all courses
- `GET /:id` — Get a specific course by ID
- `PATCH /:id` — Update a course by ID
- `DELETE /:id` — Delete a course by ID

### Subjects (`/subjects`)
- `POST` — Create a new subject
- `GET` — Get all subjects
- `GET /:id` — Get a specific subject by ID
- `PATCH /:id` — Update a subject by ID
- `DELETE /:id` — Delete a subject by ID

### Reports (`/reports`)
- `POST` — Create a new report
- `GET` — Get all reports
- `GET /:id` — Get a specific report by ID
- `PATCH /:id` — Update a report by ID
- `DELETE /:id` — Delete a report by ID

### Feedbacks (`/feedbacks`)
- `POST` — Create a new feedback
- `GET` — Get all feedbacks
- `GET /:id` — Get a specific feedback by ID
- `PATCH /:id` — Update a feedback by ID
- `DELETE /:id` — Delete a feedback by ID

### Sessions (`/sessions`)
- `POST` — Create a new session
- `GET` — Get all sessions
- `GET /:id` — Get a specific session by ID
- `PATCH /:id` — Update a session by ID
- `DELETE /:id` — Delete a session by ID

### Course Enrollments (`/course-inrollments`)
- `POST` — Create a new course enrollment
- `GET` — Get all course enrollments
- `GET /:id` — Get a specific course enrollment by ID
- `PATCH /:id` — Update a course enrollment by ID
- `DELETE /:id` — Delete a course enrollment by ID

### Password Changes (`/password-changes`)
- `POST` — Create a new password change record
- `GET` — Get all password change records
- `GET /:id` — Get a specific password change record by ID
- `PATCH /:id` — Update a password change record by ID
- `DELETE /:id` — Delete a password change record by ID

### Seed Data (`/api/seed-data`)
- `POST` — Seed the database with initial data

---

> **Note:** All endpoints use RESTful conventions. Adjust the base path as needed depending on your deployment or API gateway.

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).