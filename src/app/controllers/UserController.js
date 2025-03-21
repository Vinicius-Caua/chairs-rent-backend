import * as yup from "yup";
import User from "../models/User";

class UserController {
    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists) {
            return res.status(400).json({ error: "User already exists." });
        }
        const { id, name, email, provider, password_hash } = await User.create(
            req.body
        );
        return res.json({ id, name, email, password_hash, provider });
    }

    async update(req, res) {
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string().email(),
            OldPassword: yup.string().min(6),
            password: yup
                .string()
                .min(6)
                .when("OldPassword", (OldPassword, field) =>
                    OldPassword ? field.required() : field
                ),
            confirmPassword: yup
                .string()
                .when("password", (password, field) =>
                    password
                        ? field.required().oneOf([yup.ref("password")])
                        : field
                ),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { email, OldPassword } = req.body;
        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ error: "User already exists." });
            }
        }

        if (OldPassword && !(await user.checkPassword(OldPassword))) {
            return res.status(401).json({ error: "Password does not match." });
        }

        const { id, name, provider } = await user.update(req.body);
        return res.json({ id, name, email, provider });
    }
}

export default new UserController();
