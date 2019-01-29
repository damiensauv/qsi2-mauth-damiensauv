const { Group } = require("../model");

const createGroup = ({ title, description, metadata }, { id }) =>
  Group.create({
    title,
    description,
    metadata,
    ownerId: id
  });


const findAllGroup = () => Group.findAll();

const addUserToGroup = ({ groupId, userId }) =>
  Group.findOne({
    where: { id: groupId }
  }).then(group =>
    group ? group.addUser(userId) : Promise.reject(new Error("Group not found"))
  );

const removeUserFromGroup = ({ groupId, userId }) =>
  Group.findOne({
    where: { id: groupId }
  }).then(group =>
    group
      ? group.removeUser(userId)
      : Promise.reject(new Error("Group not found"))
  );

module.exports = { createGroup, findAllGroup, addUserToGroup, removeUserFromGroup };