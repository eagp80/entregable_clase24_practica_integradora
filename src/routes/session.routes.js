import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import session from "express-session";
import { API_VERSION } from "../config/config.js";
//********* /api/v1/session/

class SessionRoutes {//no es un Router pero adentro tiene uno
  path = "/session";
  router = Router();
  api_version= API_VERSION;

  constructor() {
    this.initSessionRoutes();
  }

  initSessionRoutes() {//  api/v1/session/logout
    this.router.get(`${this.path}/logout`, async (req, res) =>{
      try{
        //algo
          req.session.destroy((err) => {
          if (!err) return res.redirect(`../login`);
          return res.send({ message: `logout Error`, body: err });
        });
        
      } catch (error) {
        console.log("🚀 ~ file: session.routes.js:23 ~ ProductsMongoRoutes ~ this.router.get ~ error:", error)
      } 

    });

    this.router.post(`${this.path}/login`, async (req, res) =>{
      try{
        //algo
        const { email, password } = req.body;
        const session = req.session;
        console.log("🚀 ~ file: session.routes.js:35 ~ SessionRoutes ~ this.router.post ~ session:", session)
           
        // { email: email }
        //console.log(await userModel.find());
        const findUser = await userModel.findOne({ email });
        console.log("🚀 ~ file: session.routes.js:41 ~ SessionRoutes ~ this.router.post ~ findUser:", findUser)
           
        if (!findUser) {
          return res
            .status(401)
            .json({ message: "usuario no registrado/existente" });
        }
    
        if (findUser.password !== password) {
          return res
            .status(401)
            .json({ message: "password incorrecto" });
        }
    
        req.session.user = {
          ...findUser, // estraigo todo propiedad por propiedad
          password: "", //borro password en la session no en la base de datos
        };

        return res.redirect(`../views/products`)//************ */
    
        return res.render("profile", {//OJO OJO OJO
          last_name: req.session?.user?.last_name || findUser.last_name,
          email: req.session?.user?.email || email,
          age: req.session?.user?.age || findUser.age,
        });

      } catch (error) {
      console.log("🚀 ~ file: session.routes.js:68 ~ SessionRoutes ~ this.router.post ~ error:", error)
      } 

    });

    this.router.post(`${this.path}/register`, async (req, res) =>{
      try{
        //algo
        const body = req.body;
        const newUser = await userModel.create(body);
        console.log("🚀 ~ file: session.routes.js:78 ~ SessionRoutes ~ this.router.post ~ newUser:", newUser);       
        req.session.user = { ...body };
        return res.render("login");// OJO OJO OJO 
      } catch (error) {
      console.log("🚀 ~ file: session.routes.js:82 ~ SessionRoutes ~ this.router.post ~ error:", error);
      }
    });
  }  
}
export default SessionRoutes;
