import Sequelize, { Model } from "sequelize";

class Chair extends Model {
  static init(sequelize) {
    super.init(
      {
        location: Sequelize.STRING, // Localização da cadeira (ex: "Área VIP")
        status: {
          type: Sequelize.ENUM("available", "occupied", "maintenance"), // Status pré-definidos
          defaultValue: "available", // Valor padrão: disponível
        },
      },
      {
        sequelize,
        underscored: true, // Garante que os campos snake_case (created_at) sejam mapeados
      }
    );
  }

  // Associação com aluguéis (1 cadeira pode ter muitos aluguéis)
  static associate(models) {
    this.hasMany(models.Rent, { foreignKey: "chair_id", as: "rents" });
  }
}

export default Chair;
