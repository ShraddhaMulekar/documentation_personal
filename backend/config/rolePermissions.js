import { permission } from "./permission.js";

export const rolePermissions = {
    admin:[
        permission.CREATE_JOB,
        permission.UPDATE_JOB,
        permission.DELETE_JOB,
        permission.VIEW_JOB
    ],
    employer:[
        permission.CREATE_JOB,
        permission.UPDATE_JOB,
        permission.VIEW_JOB
    ],
    user:[
        permission.VIEW_JOB
    ]
}