'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteLocation = sequelize.define('FavoriteLocation', {
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    active: DataTypes.BOOLEAN
  }, {});
  FavoriteLocation.associate = function(models) {
    FavoriteLocation.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };
  return FavoriteLocation;
};
