import { API_VERSION } from "../config/config.js";

const authMdw = (req, res, next) => {
  console.log("VALIDANDO SESSION!!!!!");
  console.log(req.session.user);
  if (req.session?.user) {
    return next();
  }
  return res.redirect(`../login`);
};

export default authMdw;
