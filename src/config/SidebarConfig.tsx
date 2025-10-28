import { FaBook, FaLayerGroup, FaClipboardList, FaChartBar, FaUserGraduate, FaCogs, FaQuestionCircle } from "react-icons/fa";
// import { FaBook, FaLayerGroup, FaClipboardList, FaChartBar, FaUserGraduate, FaCogs, FaQuestionCircle } from "react-icons/fa";
import type { NavItem } from "@/types/navigation";
import React from "react";

export const SIDEBAR_WIDTH = {
  collapsed: "72",
  expanded: "240",
};
export const sidebarConfig: NavItem[] = [
  {
    label: "Dashboard",
    icon: <FaChartBar />,
    path: "/dashboard",
    permission: "dashboard:view",
  },
  {
    label: "Courses",
    icon:  <FaBook />,
    permission: "courses:view",
    children: [
      { label: "All Courses", path: "/courses", permission: "courses:view" },
      { label: "SQL Master 1000Q", path: "/courses/sql-master", permission: "courses:view" },
      { label: "Enroll New", path: "/courses/enroll", permission: "courses:enroll" },
    ],
  },
  {
    label: "Modules",
    icon: <FaLayerGroup />,
    permission: "modules:view",
    children: [
      { label: "Basics", path: "/modules/basics", permission: "modules:view" },
      { label: "Intermediate", path: "/modules/intermediate", permission: "modules:view" },
      { label: "Advanced", path: "/modules/advanced", permission: "modules:view" },
      { label: "Case Studies", path: "/modules/case-studies", permission: "modules:view" },
    ],
  },
  {
    label: "Practice",
    icon: <FaClipboardList />,
    permission: "practice:view",
    children: [
      { label: "Quizzes", path: "/practice/quizzes", permission: "practice:quizzes" },
      { label: "Assignments", path: "/practice/assignments", permission: "practice:assignments" },
      { label: "Mock Tests", path: "/practice/mock-tests", permission: "practice:mocktests" },
    ],
  },
  {
    label: "Question Bank",
    icon: <FaQuestionCircle />,
    permission: "questions:view",
    children: [
      { label: "All 1000+ Questions", path: "/questions", permission: "questions:view" },
      { label: "By Topic", path: "/questions/topics", permission: "questions:view" },
      { label: "By Difficulty", path: "/questions/difficulty", permission: "questions:view" },
    ],
  },
  {
    label: "Students",
    icon: <FaUserGraduate />,
    permission: "students:view",
    children: [
      { label: "Student List", path: "/students", permission: "students:view" },
      { label: "Progress Tracking", path: "/students/progress", permission: "students:progress" },
      { label: "Certificates", path: "/students/certificates", permission: "students:certificates" },
    ],
  },
  {
    label: "Administration",
    icon: <FaCogs />,
    permission: "admin:panel",
    children: [
      { label: "Users", path: "/admin/users", permission: "admin:users" },
      { label: "Roles", path: "/admin/roles", permission: "admin:roles" },
      { label: "Permissions", path: "/admin/permissions", permission: "admin:permissions" },
    ],
  },
];
