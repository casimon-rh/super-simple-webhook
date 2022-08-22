//app.js
const http = require("http");

const PORT = process.env.PORT || 5000;

function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      // listen to data sent by client
      req.on("data", (chunk) =>
        // append the string version to the body
        body += chunk.toString()
      );
      // listen till the end
      req.on("end", () =>
        // send back the data
        resolve(body)
      );
    } catch (error) {
      reject(error);
    }
  });
}

const server = http.createServer(async (req, res) => {
  // /api/todos/ : POST
  if (req.url === "/alert" && req.method === "POST") {
    // get the data sent along
    let data = await getReqData(req);
    let headers = req.headers;
    console.log({ headers });
    console.log({ data });

    res.writeHead(200, { "Content-Type": "application/json" });
    // send the error
    res.end(JSON.stringify({ message: "Alert Received" }));
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});