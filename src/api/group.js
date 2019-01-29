const express = require("express");
const { createGroup, findAllGroup, addUserToGroup, removeUserFromGroup } = require("../controller/group");
const logger = require("../logger");

const apiGroup = express.Router();

apiGroup.post("/", (req, res) =>
  !req.body.title && !req.body.description
    ? res.status(400).send({
      success: false,
      message: "Title or description is incorrect"
    })
    : createGroup(req.body, req.user)
      .then(group => res.status(201).send({
        success: true,
        profile: group,
        message: "Group create"
      }))
      .catch(err => {
        logger.error(`💥 Failed to create group : ${err.stack}`);
        return res.status(500).send({
          success: false,
          message: `${err.name} : ${err.message}`
        });
      })
);

apiGroup.post("/user", (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
      success: false,
      message: "userId and groupId is incorrect"
    })
    : addUserToGroup(req.body)
      .then(() => {
        res.status(201).send({
          success: true,
          message: `user ${req.body.userId} succesfully joined group ${req.body.groupId}`
        });
      })
      .catch(err => {
        logger.error(`💥 Failed to add user in group : ${err.stack}`);
        return res.status(500).send({
          success: false,
          message: `${err.name} : ${err.message}`
        });
      })
);

apiGroup.delete("/user", (req, res) =>
  !req.body.groupId && !req.body.userId
    ? res.status(400).send({
      success: false,
      message: "userId and groupId is incorrect"
    })
    : removeUserFromGroup(req.body)
      .then(() => {
        res.status(201).send({
          success: true,
          message: `user ${req.body.userId} was removed from group ${req.body.groupId}`
        });
      })
      .catch(err => {
        logger.error(`💥 Failed to remove user in group : ${err.stack}`);
        return res.status(500).send({
          success: false,
          message: `${err.name} : ${err.message}`
        });
      })
);

apiGroup.get("/", (req, res) =>
  findAllGroup().then(group => res.status(200).send({
    success: true,
    profile: group,
    message: "The list of group"
  })).catch(err => {
    logger.error(`💥 Failed to get list of group : ${err.stack}`);
    return res.status(500).send({
      success: false,
      message: `${err.name} : ${err.message}`
    });
  })
);

module.exports = { apiGroup };