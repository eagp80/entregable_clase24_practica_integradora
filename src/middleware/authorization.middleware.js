import { API_VERSION } from "../config/config.js";

const authorization = (role) => {
  return async (req, res, next) => {
    console.log(
      "🚀 ~ file: authorization.middleware.js:9 ~ return ~ req.session.user.role:",
      req.user.role
    );
    if (!req.session.user) return res.status(401).json({ message: `Unauthorized` });
    if (req.session.user.role != role)
      return res.status(401).json({ message: "No enought permissions" });

    next();
  };
};
// PUBLIC puede consumir solo endpoint gets
// USER puede consumir solo endpoint gets + ENDPOINT CURRENT
// MANAGER puede hacer lo anterior del USER + ENDPOINT PACH, PUT
// ADMIN puede hacer TODO EL CRUD DE usuarios
export default authorization;
