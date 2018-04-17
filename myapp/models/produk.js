'use strict';
module.exports = (sequelize, DataTypes) => {
  var Produk = sequelize.define('Produk', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {});
  Produk.associate = function(models) {
    // associations can be defined here
  };
  return Produk;
};