module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departement: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Other",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outdate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    numberOfWorkers: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    min_cgpa: {
      type: DataTypes.FLOAT,
      defaultValue: 2.2,
    },
  });

  return Post;
};
