import Sequelize, { Model } from "sequelize";

class Rent extends Model {
  static init(sequelize) {
    super.init(
      {
        chair_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        underscored: true,
      }
    );
  }

  // Associations with user and chair
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id", // Foreign key for the user
      as: "user", // Alias for the association
    });
    this.belongsTo(models.Chair, {
      foreignKey: "chair_id", // Foreign key for the chair
      as: "chair", // Alias for the association
    });
  }
}

export default Rent;
