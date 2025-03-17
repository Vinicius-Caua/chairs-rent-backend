import Rent from "../models/Rent";
import Chair from "../models/Chair";
import User from "../models/User";
import { Op } from "sequelize";
import * as yup from "yup";
import { sequelize } from "../../database";

class RentController {
  async store(req, res) {
    const schema = yup.object().shape({
      chair_id: yup.number().required(),
      user_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const transaction = await sequelize.transaction();

    try {
        const { user_id, chair_id } = req.body;

        const user = await User.findByPk(user_id, { transaction });
        if (!user) {
          await transaction.rollback();
          return res.status(404).json({ error: "User not found." });
        }

        const chair = await Chair.findByPk(chair_id, { transaction });
        if (!chair) {
          await transaction.rollback();
          return res.status(404).json({ error: "Chair not found." });
        }

        if (chair.status !== "available") {
          await transaction.rollback();
          return res.status(400).json({ error: "Chair not available." });
        }

        // Cria aluguel com data de início automática
        const rent = await Rent.create({
          chair_id,
          user_id,
          start_date: new Date(),
          end_date: null
        }, { transaction });

        await chair.update({ status: "occupied" }, { transaction });
        await transaction.commit();

        return res.json(rent);

      } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
  }

  async return(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const rent = await Rent.findByPk(req.params.id, { transaction });
      if (!rent) {
        await transaction.rollback();
        return res.status(404).json({ error: "Rent not found." });
      }

      if (rent.end_date) {
        await transaction.rollback();
        return res.status(400).json({ error: "Chair already returned." });
      }

      // Atualiza data de devolução
      await rent.update({ end_date: new Date() }, { transaction });

      // Libera a cadeira
      const chair = await Chair.findByPk(rent.chair_id, { transaction });
      await chair.update({ status: "available" }, { transaction });

      await transaction.commit();
      return res.json(rent);

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async index(req, res) {
    try {

      const rents = await Rent.findAll({
        include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"]
            },
            {
              model: Chair,
              as: "chair",
              attributes: ["id", "location", "status"]
            }
          ],
        });

      if (!rents || rents.length === 0) {
        return res.status(404).json({ error: "Rent not exists." });
      }
      return res.json(rents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro internal server." });
    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      start_date: yup.date(),
      end_date: yup.date().min(yup.ref("start_date")),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const transaction = await sequelize.transaction();

    try {
      const rent = await Rent.findByPk(req.params.id, { transaction });
      if (!rent) {
        await transaction.rollback();
        return res.status(404).json({ error: "Rent not found." });
      }

      // Verifica conflitos de datas (apenas se houver mudança)
      if (req.body.start_date || req.body.end_date) {
        const newStart = req.body.start_date || rent.start_date;
        const newEnd = req.body.end_date || rent.end_date;

        const overlappingRental = await Rent.findOne({
          where: {
            chair_id: rent.chair_id,
            id: { [Op.ne]: rent.id }, // Ignora o próprio registro
            [Op.and]: [
              { start_date: { [Op.lt]: newEnd } },
              { end_date: { [Op.gt]: newStart } }
            ]
          },
          transaction
        });

        if (overlappingRental) {
          await transaction.rollback();
          return res.status(400).json({ error: "Overlapping rental detected." });
        }
      }

      const updatedRent = await rent.update(req.body, { transaction });
      await transaction.commit();

      return res.json(updatedRent);

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async delete(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const rent = await Rent.findByPk(req.params.id, {
        include: [{ model: Chair, as: "chair" }],
        transaction
      });

      if (!rent) {
        await transaction.rollback();
        return res.status(404).json({ error: "Rent not found." });
      }

      if (rent.chair && !rent.end_date) {
        await rent.chair.update({ status: "available" }, { transaction });
      }

      await rent.destroy({ transaction });
      await transaction.commit();

      return res.json({ message: "Rent deleted successfully." });

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new RentController();
