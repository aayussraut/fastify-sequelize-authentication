import {
  postItemHandler,
  getItemHandler,
  getItemsHandler,
  putItemHandler,
  deleteItemHandler,
} from "../../controller/itemController.js";

export default function itemRoutes(fastify, opts, done) {
  const postItemOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
    handler: postItemHandler,
    onRequest: fastify.authenicate,
  };

  const getItemsOptns = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: getItemsHandler,
    onRequest: fastify.authenicate,
  };

  const getItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            item_name: { type: "string" },
          },
        },
      },
    },
    handler: getItemHandler,
    onRequest: fastify.authenicate,
  };
  const putItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },

      // response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       item_name: { type: "string" },
      //     },
      //   },
      // },
    },
    handler: putItemHandler,
    onRequest: fastify.authenicate,
  };
  const deleteItemOptns = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            msg: { type: "string" },
          },
        },
      },
    },
    handler: deleteItemHandler,
    onRequest: fastify.authenicate,
  };

  fastify.get("/", getItemsOptns);
  fastify.post("/", postItemOptns);
  fastify.get("/:id", getItemOptns);
  fastify.put("/:id", putItemOptns);
  fastify.delete("/:id", deleteItemOptns);
  done();
}
