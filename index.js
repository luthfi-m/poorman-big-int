const rp = require("request-promise");
const Promise = require("bluebird");

// https://stackoverflow.com/questions/69644298/how-to-make-json-parse-to-treat-all-the-numbers-as-bigint
const isBigNumber = (num) => !Number.isSafeInteger(+num);

// function that enquotes *big numbers* matching
// desired criteria into double quotes inside
// JSON string
const enquoteBigNumber = (jsonString) =>
  jsonString.replaceAll(
    /([:\s\[,]*)(\d+)([\s,\]]*)/g,
    (matchingSubstr, prefix, bigNum, suffix) =>
      isBigNumber(bigNum) ? `${prefix}"${bigNum}"${suffix}` : matchingSubstr
  );

const parseJson = (response) => {
  try {
    if (typeof response === "string") {
      const bodyWithQuote = enquoteBigNumber(response);
      return JSON.parse(bodyWithQuote);
    }
  } catch (error) {
    return JSON.parse(response);
  }
};

async function getData() {
  // request with json = false, we want raw text response from server
  // big int value will not be encased in quote
  const options = {
    url: "http://localhost:3000",
    method: "GET",
  };

  await Promise.delay(1000);
  const raw = await rp(options);

  const res = parseJson(raw);

  console.log("JSON res:", res);
}

getData().then(() => process.exit());
