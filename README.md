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

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).