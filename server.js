const http = require("http"); //Node, give me the built-in HTTP functionality and store it inside a variable called http.
const fs = require("fs"); //Give me Node's file-system functionality.
const path = require("path"); //This module helps you work with file paths.

const port = 3000; //This is the port number that the server will listen on.

const server = http.createServer((req, res) => {
  //This is the function that will be called every time a request is made to the server. It takes two arguments: req (the request object) and res (the response object).

  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url,
  ); //This line constructs the file path to the requested file. It uses the __dirname variable (which is a Node.js global variable that contains the directory name of the current module) and the req.url property (which contains the URL of the request). If the request URL is "/", it serves "index.html" by default; otherwise, it serves the requested file.

  console.log(filePath); //This is just debugging.

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    //A MIME (Multipurpose Internet Mail Extensions) type is a two-part identifier used to show the format and nature of data transmitted over the internet.
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  const contentType = mimeTypes[extName] || "application/octet-stream"; //This line sets the content type of the response based on the file extension. If the file extension is not found in the mimeTypes object, it defaults to "application/octet-stream"which is a generic binary stream which is used to handle fallback for unknown file types.

  fs.readFile(filePath, (err, content) => {
    if (err) {
      //Did something go wrong while reading the file? If yes, enter this block.

      if (err.code === "ENOENT") {
        //ENOENT is an error code that means "Error NO ENTry" or "No such file or directory". It indicates that the requested file does not exist.

        res.writeHead(404, { "Content-Type": "text/html" }); //This sends an HTTP status code of 404 (Not Found) along with a content type of "text/html" to the client.
        res.end("404: File Not Found Broooooooo");

      } else {
        res.writeHead(500, {
          "Content-Type": "text/html",
        }); //This sends an HTTP status code of 500 (Internal Server Error) along with a content type of "text/html" to the client.

        res.end("500: Internal Server Error");
      }

    } else {
      res.writeHead(200, { "Content-Type": contentType }); //This sends an HTTP status code of 200 (OK) along with the appropriate content type to the client.
      res.end(content, "utf-8");
    }

  });
  
});

server.listen(port, () => {
  //This tells the server to start listening for incoming requests on the specified port. The callback function is executed once the server starts listening.
  console.log(`Server is listening on port ${port}`);
});
