const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  try {
    //Borra users
    await knex('user').del();

    //Inserta users
    await knex('user').insert([
      {
        id: 1,
        email: 'admin@gmail.com',
        username: 'admin',
        password: await bcrypt.hash('admin', 12),
        firstName: 'AdminName',
        lastName: 'AdminLastName',
        birthDate: new Date(),
        gender: 'Male',
        role: 'admin',
      },
      {
        id: 2,
        email: 'user@gmail.com',
        username: 'user',
        password: await bcrypt.hash('user', 12),
        firstName: 'UserName',
        lastName: 'UserLastName',
        birthDate: new Date(),
        gender: 'Male',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

// Otra forma de escribirlo
// exports.seed = (knex) => {
//   return knex('users')
//     .del()
//     .then(() => {
//       return knex('users').insert([
//         {
//           id: 1,
//           email: 'hola@gmail.com',
//           username: 'test',
//           password: 'test',
//         },
//       ]);
//     });
// };
