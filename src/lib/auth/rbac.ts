import { Role } from "@prisma/client";

export const ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export const PERMISSIONS = {
  // User Management
  "users.list":          ["SUPER_ADMIN"],
  "users.create":        ["SUPER_ADMIN"],
  "users.edit":          ["SUPER_ADMIN"],
  "users.delete":        ["SUPER_ADMIN"],

  // Form Submissions
  "submissions.list":    ["SUPER_ADMIN", "ADMIN"],
  "submissions.read":    ["SUPER_ADMIN", "ADMIN"],
  "submissions.export":  ["SUPER_ADMIN", "ADMIN"],
  "submissions.delete":  ["SUPER_ADMIN"],

  // Content Management
  "content.list":        ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  "content.create":      ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  "content.edit":        ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  "content.publish":     ["SUPER_ADMIN", "ADMIN"],
  "content.delete":      ["SUPER_ADMIN"],

  // Media / Uploads
  "media.upload":        ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  "media.delete":        ["SUPER_ADMIN", "ADMIN"],

  // SEO
  "seo.view":            ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  "seo.edit":            ["SUPER_ADMIN", "ADMIN"],

  // System Settings
  "settings.view":       ["SUPER_ADMIN", "ADMIN"],
  "settings.edit":       ["SUPER_ADMIN"],
  "maintenance.toggle":  ["SUPER_ADMIN"],
  "audit.view":          ["SUPER_ADMIN"],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function hasPermission(role: Role, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission] as readonly Role[];
  return allowedRoles ? allowedRoles.includes(role) : false;
}
