const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // DB Connection
    this.dbConnections();

    // Middlewares
    this.middlewares();

    // Endpoints Paths (Routes)
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
      users: "/api/users",
    };

    // Routes
    this.routes();
  }

  async dbConnections() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read parse
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));

    // Fileupload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.route"));
    this.app.use(this.paths.categories, require("../routes/categories.route"));
    this.app.use(this.paths.products, require("../routes/products.route"));
    this.app.use(this.paths.users, require("../routes/users.route"));
    this.app.use(this.paths.uploads, require("../routes/uploads.route"));
    this.app.use(this.paths.search, require("../routes/search.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at:`);
      console.log(`http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
