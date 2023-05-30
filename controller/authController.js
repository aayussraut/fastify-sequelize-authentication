export const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.user.create({
      username: req.body.username,
      password: req.body.password,
    });
    reply.send(user);
  } catch (err) {
    console.log(err);
  }
};

export const signInHandler = async (req, reply) => {
  try {
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });
    if (user.password === req.body.password) {
      const token = await req.server.jwt.sign({ username: user.username });

      reply.send({ msg: token });
    } else {
      reply.send({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
  }
};
