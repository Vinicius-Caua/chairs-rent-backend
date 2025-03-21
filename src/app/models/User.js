import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    static associate(models) {
        // Define que um usuário pode ter vários aluguéis
        this.hasMany(models.Rent, {
          foreignKey: "user_id",
          as: "rents",
        });
      }
}

export default User;
