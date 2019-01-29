const omit = require('lodash.omit');
const { Users } = require('../model');

const createUser = ({ firstName, lastName, email, password }) =>
  Users.create({
    email,
    firstName: firstName || '',
    lastName: lastName || '',
    hash: password
  }).then(user =>
    omit(
      user.get({
        plain: true
      }),
      Users.excludeAttributes
    )
  );

const loginUser = ({ email, password }) =>
  Users.findOne({
    where: {
      email
    }
  }).then(user =>
    user && !user.deletedAt
      ? Promise.all([
          omit(
            user.get({
              plain: true
            }),
            Users.excludeAttributes
          ),
          user.comparePassword(password)
        ])
      : Promise.reject(new Error('UNKOWN OR DELETED USER'))
  );

const getUser = ({ id }) =>
  Users.findOne({
    where: {
      id
    }
  }).then(user =>
    user && !user.deletedAt
      ? omit(
          user.get({
            plain: true
          }),
          Users.excludeAttributes
        )
      : Promise.reject(new Error('UNKOWN OR DELETED USER'))
  );

const updateUser = (id, { firstname, lastname }) =>
  Users.update(
    { firstName: firstname || '', lastName: lastname || ''},
    { where: {id} }
  ).then(value =>
      value > 0 ? 'user update' : Promise.reject(new Error('UNKNOWN OR DELETED USER (update)'))
    );

const deleteUser = ({ id }) =>
  Users.destroy(
    { where: {id} }
  ).then(value =>
    value > 0 ? 'user delete' : Promise.reject(new Error('UNKNOWN OR DELETED USER (update)'))
  );

module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser
};
