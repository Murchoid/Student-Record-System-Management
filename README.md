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
  feedbacks/
    ...
  password-changes/
    ...
  reports/
    ...
  sessions/
    ...
  subjects/
    ...
```

Each feature module (e.g., `admin-logs`, `admins`, `courses`) contains its own controller, service, DTOs, and entities for better modularity and maintainability.