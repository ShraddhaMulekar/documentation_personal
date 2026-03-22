import { rolePermissions } from "../config/rolePermissions.js";

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: role not allowed",
      });
    }
    next();
  };
};

export const allowPermission = (...requirePermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    const userPermission = rolePermissions[userRole] || [];

    const hasAccess = requirePermission.every((perm) =>
      userPermission.includes(perm),
    );

    if (!hasAccess) {
      return res.status(403).json({
        msg: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};