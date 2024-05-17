module.exports = (sequelize, DataTypes) => {
  const Org = sequelize.define("Org", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Org.associate = (models) => {
    Org.hasMany(models.Post, { onDelete: "cascade" });
  };

  return Org;
};
