const express = require("express");
const app = express();
const db = require("./config/db");
const User = require("./models/User");

app.get("/", (req, res) => res.send("response dari node"));
app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => console.log("db connection succes"));

app.post("/crud", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.err(err);
    res.status(500).send("server error");
  }
});

app.get("/crud", async (req, res) => {
  try {
    const allUser = await User.findAll({});

    res.json(allUser);
  } catch (err) {
    console.err(err);
    res.status(500).send("server error");
  }
});

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUserById = await User.findOne({
      where: { id: id },
    });

    res.json(getUserById);
  } catch (err) {
    console.err(err);
    res.status(500).send("server error");
  }
});

app.delete("crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.destroy({
      where: { id: id },
    });

    await deleteUser;

    res.json("user berhasil dihapus");
  } catch (err) {
    console.err(err);
    res.status(500).send("server error");
  }
});

app.put("/crud/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    const updateUser = await User.update(
      {
        username,
        email,
        password,
      },
      { where: { id: id } }
    );

    await updateUser;

    res.json("update user berhasil");
  } catch (err) {
    console.err(err);
    res.status(500).send("server error");
  }
});

app.listen(4500, () => console.log("app berjalan pada port 4500"));
