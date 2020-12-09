exports.up = function (knex) {
  return knex.schema
    .createTable('cuadro', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');
      t.date('date').notNullable();
      t.integer('width').unsigned().notNullable();
      t.integer('height').unsigned().notNullable();
    })

    .createTable('tamaño', (t) => {
      t.increments();
      t.integer('width').unsigned().notNullable();
      t.integer('height').unsigned().notNullable();
      t.number('price').unsigned().notNullable();
      t.date('lastUpdate').notNullable();
    })

    .createTable('cuadroTamaño', (t) => {
      t.primary('cuadroId', 'tamañoId');
      t.foreign('cuadroId')
        .references('id')
        .inTable('cuadro')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.foreign('tamañoId')
        .references('id')
        .inTable('tamaño')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.number('price').unsigned();
      t.date('lastUpdate').notNullable();
    })

    .createTable('imagenCuadro', (t) => {
      t.increments();
      t.foreign('cuadroId')
        .references('id')
        .inTable('cuadro')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      t.string('description');
      t.string('path').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('cuadroTamaño')
    .dropTable('tamaño')
    .dropTable('cuadro');
};
