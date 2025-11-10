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
    
    // 🧩 Question Bank
    "questions:view",               // access to all questions
    "questions:topics:view",        // access filtered by topic
    "questions:difficulty:view",    // access filtered by difficulty
    "questions:add",                // for admin: add question
    "questions:edit",               // edit existing question
    "questions:delete",             // delete question
    "questions:quiz:generate",      // generate quiz
    "questions:analytics:view",     // view analytics for questions

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
