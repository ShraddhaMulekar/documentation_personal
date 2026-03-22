import { permission } from "./permission.js";

export const rolePermissions = {
  admin: [
    // JOB
    permission.CREATE_JOB,
    permission.UPDATE_JOB,
    permission.DELETE_JOB,
    permission.VIEW_JOB,

    // USER
    permission.CREATE_USER,
    permission.VIEW_USERS,
    permission.VIEW_SINGLE_USER,
    permission.UPDATE_USER,
    permission.DELETE_USER,
  ],
  employer: [
    // JOB
    permission.CREATE_JOB,
    permission.UPDATE_JOB,
    permission.VIEW_JOB,

    //USER
    permission.VIEW_SINGLE_USER,
    permission.UPDATE_USER,
  ],
  user: [
    // JOB
    permission.VIEW_JOB,

    //USER
    permission.VIEW_SINGLE_USER,
    permission.UPDATE_USER,
  ],
};