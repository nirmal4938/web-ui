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
    "admin:permissions"
  ];

  const hasPermission = (key?: string) => !key || userPermissions.includes(key);

  return { hasPermission };
};
