import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";
import * as yup from "yup";

class SessionController {
    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        });

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password does not match." });
        }
        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
