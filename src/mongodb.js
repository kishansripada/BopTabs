// let apiKey = "kJPDa6l21rKevk5ZB6KJCTzYnTkRKsWtkuSdMhQfQqP3OHLEYZlnnCESJLAcjiyr";

// export async function findOne(filterProperties) {
//    let body = await fetch("https://data.mongodb-api.com/app/data-keyot/endpoint/data/beta/action/findOne", {
//       body: `{
//          "collection":"musicxml",
//          "database":"musicxml",
//          "dataSource":"tabs",
//          "filter": ${JSON.stringify(filterProperties)}
//      }`,
//       headers: {
//          "Api-Key": apiKey,
//          "Content-Type": "application/json",
//          "Access-Control-Request-Headers": "*",
//       },
//       method: "POST",
//    })
//       .then((r) => r.json())
//       .catch((err) => {
//          console.error(err);
//       });
//    return body;
// }

// // example
// // findOne({ "name": "Hate The Other Side (with Marshmello)" }).then(r => console.log(r))

// export async function insertOne(document) {
//    let body = await fetch("https://data.mongodb-api.com/app/data-keyot/endpoint/data/beta/action/insertOne", {
//       body: `{
//     "collection":"musicxml",
//     "database":"musicxml",
//     "dataSource":"tabs",
//     "document": ${JSON.stringify(document)}
//     }`,
//       headers: {
//          "Api-Key": apiKey,
//          "Content-Type": "application/json",
//          "Access-Control-Request-Headers": "*",
//       },
//       method: "POST",
//    })
//       .then((r) => r.json())
//       .catch((err) => {
//          console.error(err);
//       });
//    return body;
// }

// // example
// // insertOne({ "testing": "hellotest" }).then(r => console.log(r))
