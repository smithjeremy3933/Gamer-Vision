const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Project = mongoose.model("Project");

const router = express.Router();
router.use(cors());
const proxyurl = "https://cors-anywhere.herokuapp.com/";

router.delete("/projects", cors(), async (req, res) => {
  const { _id } = req.params;
  const projectProps = await Project.findByIdAndRemove(
    { _id: _id },
    req.body
  ).then((project) => {
    res.json(project);
  });
});

router.get("/projects", cors(), async (req, res) => {
  const projects = await Project.find({});
  res.send(projects);
});

router.post("/projects", cors(), async (req, res) => {
  console.log(req.body);
  const projectProps = await Project.create(req.body).then((project) =>
    res.json(project)
  );

  //   const { title, description, userId, _id } = req.body;
  //   console.log(title);
  //   if (!title) {
  //     return res.status(422).send({ error: "You must atleast include a title." });
  //   }

  //   try {
  //     const project = new Project({
  //       title,
  //       description,
  //       userId,
  //       _id,
  //     });
  //     console.log(project);
  //     await project.save();
  //     res.send(project);
  //   } catch (err) {
  //     res.status(422).send({ error: err.message });
  //   }
});

// router.get(`/projects/${_id}`, cors(), async (req, res) => {
//   const projectProps = await Project.findById(req.params.id).then((project) => {
//     res.json(project);
//   });
// });

module.exports = router;
