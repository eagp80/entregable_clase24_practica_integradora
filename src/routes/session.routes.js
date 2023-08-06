import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import session from "express-session";
import { API_VERSION } from "../config/config.js";
import { createHashValue, isValidPasswd } from "../utils/encrypt.js";
import passport from "passport";
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
          console.log("haciendo logout");
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
        if(!email||!password) return res.status(400).send({status:"error", error: "Incompletes values"})
        //no es necesario consultar password a  base de datos
        const session = req.session;
        console.log("🚀 ~ file: session.routes.js:35 ~ SessionRoutes ~ this.router.post ~ session:", session)
           
        // { email: email }
        //console.log(await userModel.find());
        const findUser = await userModel.findOne({ email });
        console.log("🚀 ~ file: session.routes.js:41 ~ SessionRoutes ~ this.router.post ~ findUser:", findUser)
           
        if (!findUser) {
          return res
            .status(401)
            .json({ message: "user no found" });
        };
        if(!isValidPasswd(password,findUser.password)) {
          return res
            .status(401)
            .send({status: "error",  error: "Incorrect password" });
        };
    
        const a = {
          ...findUser, // estraigo todo propiedad por propiedad
          password: "***", //borro password en la session no en la base de datos
        };
        req.session.user=a._doc; //se hace asi porque los tres puntitos traen un monton de info incluyendo objeto _doc donde viene el user
      

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

    this.router.post(`${this.path}/register`, passport.authenticate("registerpassport", {failureRedirect:'/failregister'}), async (req,res)=>{
      try{
        
        //algo
        console.log("BODY ****", req.body);
        // const { first_name, last_name, email, age, password } = req.body;
        
        // const pswHashed = await createHashValue(password);
        // const userAdd = {
        //   first_name,
        //   last_name,
        //   email,
        //   age,
        //   password: pswHashed,
        // };
        // const newUser = await userModel.create(userAdd);

        // console.log("🚀 ~ file: session.routes.js:96 ~ SessionRoutes ~ this.router.post ~ newUser:", newUser);       
        res.send({status: "success", message: "User register"})
        // req.session.user = { first_name, last_name,email, age };
        // console.log("req.session al entrar con formulario a register");        
        // console.log(req.session);
        // return res.render("login");// OJO OJO OJO 
      } catch (error) {
      console.log("🚀 ~ file: session.routes.js:105 ~ SessionRoutes ~ this.router.post ~ error:", error);
      }
    })

    this.router.get('/failregister', async (req,res)=>{
      console.log("Failed register with passport");
      res.send({error:"Failed register with passport"});
    })



    this.router.get(`${this.path}/github`,passport.authenticate("github",{scope:['user:email']}), async (req, res) =>{
      
    });

    this.router.get(`${this.path}/githubcallback`, passport.authenticate('github',{failureRedirect:'/api/v1/login'}), async (req,res)=>{
      req.session.user=req.user;
      console.log("entre a github/callback");
      console.log(req.user);
      res.redirect(`../views/products`);
    })

  
    this.router.get(`${this.path}/failgithub`,async (req,res)=>{
      console.log("Failed strategy");
      res.send({error:"Failed"});
    })

    this.router.post(`${this.path}/recover-psw`,async (req,res)=>{
      try {
        console.log("BODY UPDATE***",req.body);
        const {new_password,email}=req.body;
        const newPswHashed = await createHashValue(new_password);
        const user = await userModel.findOne({email});
        if(!user) return res.status(401).json({message:"credenciales invalidas o erroneas"});
        const updateUser = await userModel.findOneAndUpdate({email},{password:newPswHashed});
        if(!updateUser){
          return res.json({message:"Problemas actualizando contraseña"});
        }
        // return res.render("login");
        return res.redirect(`../login`);
      } catch (error) {
        console.log("🚀 ~ file: session.routes.js:113 ~ SessionRoutes ~ this.router.post ~ error:", error)        
      }
    })
  }  
}
export default SessionRoutes;
