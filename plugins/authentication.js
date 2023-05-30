import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export default fp(async (fastify, opts) => {
  fastify.register(jwt, {
    secret: "secret",
  });
  fastify.decorate("authenicate", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
