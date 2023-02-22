// CommonJs
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.type("application/json");
  // raw response in json format, big number value is not quoted
  reply.send(`{
    "hello": "world",
    "big_number": 2323866757078990912
  }`);
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
