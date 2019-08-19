'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    apiKeyActive: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.FavoriteLocation, {as: 'favoriteLocations'})
  };
  return User;
};
