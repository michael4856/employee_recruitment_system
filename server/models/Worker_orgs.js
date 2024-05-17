module.exports = (sequelize, DataTypes) => {
  const Worker_org = sequelize.define(
    "Worker_org",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orgId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info_data: {
        type: DataTypes.STRING,
      },
      why_apply_info: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Worker_org;
};
