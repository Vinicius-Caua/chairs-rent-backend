import Chair from "../models/Chair";
import * as yup from "yup";

class ChairController {
    async store(req, res) {
        const schema = yup.object().shape({
            location: yup.string().required(),
            status: yup.string().required(), //"available", "occupied", "maintenance"
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        if(req.body.status !== "available" && req.body.status !== "occupied" && req.body.status !== "maintenance"){
            return res.status(400).json({ error: "Status not valid: " + req.body.status });
        }
        const { id, location, status } = await Chair.create(req.body);
        return res.json({ id, location, status });
    }

    async index(req, res) {
        const chairs = await Chair.findAll();

        if (!chairs) {
            return res.status(400).json({ error: "Chairs not found." });
        }
        return res.json(chairs);
    }

    async update(req, res) {
        const schema = yup.object().shape({
            location: yup.string(),
            status: yup.string(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        if(req.body.status !== "available" && req.body.status !== "occupied" && req.body.status !== "maintenance"){
            return res.status(400).json({ error: "Status not valid: " + req.body.status });
        }
        const chair = await Chair.findByPk(req.params.id);
        if (!chair) {
            return res.status(400).json({ error: "Chair not found." });
        }
        const { id, location, status } = await chair.update(req.body);
        return res.json({ id, location, status });
    }

    async delete(req, res) {
        const chair = await Chair.findByPk(req.params.id);
        if (!chair) {
            return res.status(400).json({ error: "Chair not found." });
        }
        await chair.destroy();
        return res.json({ message: "Chair deleted." });
    }
}

export default new ChairController();
