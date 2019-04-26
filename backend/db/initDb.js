const User = require('./User');

async function initDb() {
  // try {
  //   await User.deleteTable();
  // } catch (error) {
  //   console.log(error.message);
  // }
  // await User.createTable();
  await User.put({
    githubId: '1212',
    username: 'timqian',
    email: 'timqian92@qq.com',
    photo: 'aa',
  });
  const item = await User.get({
    githubId: '1212',
  });

  console.log(item);
}

initDb();
