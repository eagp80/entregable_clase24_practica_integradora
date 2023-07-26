import { Router } from "express";
import authMdw from "../middleware/auth.middleware.js";
import userModel from "../dao/models/user.model.js";
import session from "express-session";
import { API_VERSION } from "../config/config.js";


class SessionViewsRoutes {
  //algo
  path = "/";
  router = Router();

  constructor() {
    this.initSessionViewsRoutes();
  }
  initSessionViewsRoutes(){
    // ****** ruta directa
    this.router.get(`${this.path}`, async (req, res) =>{
      return res.redirect(`/api/${API_VERSION}/login`);

    })
    this.router.get(`${this.path}login`, async (req, res) =>{
      //algo
      try{
        res.render("login");
      }catch(error){
      console.log("🚀 ~ file: sessionViews.routes.js:21 ~ SessionViewsRoutes ~ this.router.get ~ error:", error)
      }
    })

    this.router.get(`${this.path}register`, async (req, res) =>{
      //algo
      try{
        res.render("register");
      }catch(error){
        console.log("🚀 ~ file: sessionViews.routes.js:30 ~ SessionViewsRoutes ~ this.router.get ~ error:", error)
      }
    })

// TODO: Agregar middleware AUTH
    this.router.get(`${this.path}profile`,authMdw, async (req, res) =>{
      //algo
      try{
        const user = req.session.user?._doc || "usuario no logueado";
        console.log("🚀 ~ file: sessionViews.routes.js:38 ~ SessionViewsRoutes ~ this.router.get ~ user:", user)
        res.render("profile", {
         email:  user.email,
         age: user.age,
         last_name: user.last_name,
          carrito: {
            carritoId: "carrito-1",
            productos: [{ productoId: "1", nombre: "camisa" }],
          },
        });
      }catch(error){
        console.log("🚀 ~ file: sessionViews.routes.js:50 ~ SessionViewsRoutes ~ this.router.get ~ error:", error)
      }
    })
  }
}
export default SessionViewsRoutes;
