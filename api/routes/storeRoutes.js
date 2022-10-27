const getStores = require('./store/getStores');
const getStoreById = require('./store/getStoreById');
const postStore = require('./store/postStore');
const updateStore = require('./store/updateStore');
const deleteStore = require('./store/deleteStore');

module.exports = [ getStores,
                   getStoreById,
                   postStore,
                   updateStore,
                   deleteStore ];
