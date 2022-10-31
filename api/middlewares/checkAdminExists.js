const User = require('../models/user');

const checkAdminExists = async () => {
  try {
    const user = await User.findOne({ where: { access: 'admin' }});

    if (!user) {
      User.create({ name: 'admin',
                    password: 'admin',
                    email: 'admin@admin.com',
                    access: 'admin' });

      console.log('admin created.');
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = checkAdminExists;
