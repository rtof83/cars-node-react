const getBrands = require('./brand/getBrands');
const getBrandById = require('./brand/getBrandById');
const postBrand = require('./brand/postBrand');
const putBrand = require('./brand/putBrand');
const deleteBrand = require('./brand/deleteBrand');

module.exports = [ getBrands,
                   getBrandById,
                   postBrand,
                   putBrand,
                   deleteBrand ];
