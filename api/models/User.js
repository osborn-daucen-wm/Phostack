/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  // attributes: {
  //   attributes: {
  //     id: {
  //       type: 'int',
  //       required: true
  //     },
  //     name: {
  //       type: 'text',
  //       required: true
  //     },
  //     email: {
  //       type: 'email',
  //       required: true
  //     },
  //     age: {
  //       type: 'integer',
  //       min: 18,
  //       max: 100
  //     },
  //     vip: {
  //       type: 'boolean',
  //       defaultsTo: false,
  //       required: true
  //     },
  //     isEnabled: {
  //       type: 'boolean',
  //       required: true,
  //       defaultsTo: true
  //     }
  //   }
  // }

  attributes: {
    id: {
          type: 'int',
          required: true
      },
    name: {
      type: 'text',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'text',
      required: true
    }
  },

  signup: function (inputs, cb) {
    // Create a user
    User.create({

      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  },

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  }
};
