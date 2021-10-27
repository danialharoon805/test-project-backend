const {
  knex,
  Validators
} = require('../helpers');

class UserHandler {

  static findUserByEmail (email) {

    return knex('users')
      .select('*')
      .where('email', email)
      .first();

  }

  static findUserById (_id, apiToken) {

    return knex('users')
      .select('*')
      .where({
        id: Validators.parseInteger(_id, -1)
      })
      .first();

  }

  static getUsers (id) {

    return knex.select('*').from('users').where('id', Validators.parseInteger(id, -1));

  }

  static createUser (data) {

    return knex('users')
      .insert({
        email: data.email,
        password: data.password,
        name: data.name,
      }).returning('*');

  }


  static setApiKey (userId, token) {

    return knex('users')
      .where('id', Validators.parseInteger(userId, -1))
      .update({
        access_token: token
      })
      .returning('*');

  }

}

module.exports = UserHandler;
