const getStores = require('./store/getStores');
const getStoreById = require('./store/getStoreById');
const postStore = require('./store/postStore');
const putStore = require('./store/putStore');
const deleteStore = require('./store/deleteStore');

module.exports = [ getStores,
                   getStoreById,
                   postStore,
                   putStore,
                   deleteStore ];
