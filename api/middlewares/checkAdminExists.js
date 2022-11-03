const User = require('../models/user');

const checkAdminExists = async () => {
  try {
    await User.sync();

    const [ , created ] = await User.findOrCreate({ where: { access: 'admin' },
                                                    defaults: { name: 'admin',
                                                                password: 'admin',
                                                                email: 'admin@admin.com',
                                                                access: 'admin' }
                                                  });

      if (created) console.log('admin created');
  } catch (error) {
    console.log(error);
  };
};

module.exports = checkAdminExists;
