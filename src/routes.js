import { Router } from "express";
import User from "./app/models/User";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import ChairController from "./app/controllers/ChairController";
import RentController from "./app/controllers/RentController";


const routes = Router();

routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

routes.get("/chairs", ChairController.index);
routes.post("/chairs", ChairController.store);
routes.put("/chairs/:id", ChairController.update);
routes.delete("/chairs/destroy/:id", ChairController.delete);

routes.post("/rents", RentController.store);
routes.put("/rents/:id/return", RentController.return);
routes.get("/rents", RentController.index);
routes.put("/rents/:id", RentController.update);
routes.delete("/rents/destroy/:id", RentController.delete);

routes.use(authMiddleware);
routes.put("/users", UserController.update);

export default routes;
