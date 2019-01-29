module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        comment: "Group id",
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        comment: "Group title",
        set(value) {
          this.setDataValue("title", value);
        }
      },
      description: {
        type: DataTypes.STRING,
        comment: "Group description",
        set(value) {
          this.setDataValue("description", value);
        }
      },
      metadata: {
        type: DataTypes.JSON,
        comment: "Group metadata"
      }
    });

  Group.associate = models => {
    Group.belongsToMany(models.Users, { through: "UsersGroup" });
    Group.belongsTo(models.Users, { as: "owner", foreignKey: "ownerId" });
  };

  return Group;
};