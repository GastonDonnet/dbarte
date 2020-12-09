exports.seed = async (knex) => {
  try {
    await knex('direction').del();
    await knex('direction').insert([
      {
        id: 1,
        direction: 'Arturo Illia 752',
        city: 'San Carlos Centro',
        userId: 1,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

// exports.seed = (knex) => {
//   return knex('direction')
//     .del()
//     .then(() => {
//       return knex('direction').insert([
//         {
//           id: 1,
//           direction: 'Arturo Illia 752',
//           city: 'San Carlos Centro',
//           userID: 1,
//         },
//       ]);
//     });
// };
