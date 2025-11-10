// src/hooks/usePermissions.ts
export const usePermissions = () => {
  const userPermissions: string[] = [
    "dashboard:view",
    "courses:view",
    "courses:enroll",
    "modules:view",
    "practice:view",
    "practice:quizzes",
    "practice:assignments",
    "practice:mocktests",
    "questions:view",
    "students:view",
    "students:progress",
    "students:certificates",
    "admin:panel",
    "admin:users",
    "admin:roles",
    "admin:permissions",
    "cricket:view",
    "cricket:players",
    "cricket:tournaments",

    // 🗳️ Election Permissions
    "election:view",
    "election:candidates",
    "election:voters",
    "election:voting",
    "election:results",
    "election:admin",
  ];

  const hasPermission = (key?: string) => !key || userPermissions.includes(key);

  return { hasPermission };
};
