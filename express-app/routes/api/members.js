/* eslint-disable no-param-reassign */
const express = require("express");
const uuid = require("uuid");
const members = require("../../models/Member");

// Initialize express router
const router = express.Router();

// route: GET /api/members
// description: get all members
// access: public
router.get("/", (req, res) => {
  res.json(members);
});

// route: GET /api/members/:id
// description: get single member
// access: public
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const found = members.some(member => member.id.toString() === id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `Unable to find member with id of ${id}` });
  }

  return res.json(members.filter(member => member.id.toString() === id));
});

// route: POST /api/members
// description: create new member
// access: public
router.post("/", async (req, res) => {
  const { name, username } = req.body;
  const newMember = {
    id: uuid.v4(),
    name,
    username,
    status: "active"
  };

  if (!name || !username) {
    return res.status(400).json({ msg: "Please enter required fields" });
  }

  await members.push(newMember);
  // return res.json(members);
  return res.redirect("/");
});

// route: PUT /api/members/:id
// description: update a member
// access: public
// eslint-disable-next-line consistent-return
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const found = members.some(member => member.id.toString() === id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `Unable to find member with id of ${id}` });
  }

  const update = req.body;

  // eslint-disable-next-line consistent-return
  members.forEach(member => {
    if (member.id.toString() === id) {
      member.name = update.name ? update.name : member.name;
      member.username = update.username ? update.username : member.username;

      return res.json({ msg: "Member updated", member });
    }
  });
});

// route: DELETE /api/members/:id
// description: remove member
// access: public
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const found = members.some(member => member.id.toString() === id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `Unable to find member with id of ${id}` });
  }

  return res.json({
    msg: "Member removed",
    members: members.filter(member => member.id.toString() !== id)
  });
});

module.exports = router;
