// CommonJs
const fastify = require("fastify")({
  logger: true,
});

function unquoteBigNumbers(payload) {
  const replacer = (matchingSubstr) => {
    console.log(matchingSubstr);
    return matchingSubstr.slice(1, -1);
  };
  const data = payload.replace(/("[\d]+\.{0,1}[\d]*")/g, replacer);
  console.log(data);
  return data;
}

// Declare a route
fastify.get("/", (request, reply) => {
  reply.type("application/json");
  // raw response in json format, big number value is not quoted
  const data = {
    hello: "world",
    array_of_nums: {
      nested: [23, "this is a text", "11111111122222222222", 9900000.22],
    },
    big_number: "2323866757078990912",
  };
  reply.send(unquoteBigNumbers(JSON.stringify(data)));
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
