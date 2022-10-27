const getBrands = require('./brand/getBrands');
const getBrandById = require('./brand/getBrandById');
const postBrand = require('./brand/postBrand');
const updateBrand = require('./brand/updateBrand');
const deleteBrand = require('./brand/deleteBrand');

module.exports = [ getBrands,
                   getBrandById,
                   postBrand,
                   updateBrand,
                   deleteBrand ];
