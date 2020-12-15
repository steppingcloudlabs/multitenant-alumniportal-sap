  /*eslint no-console: 0*/
  "use strict";
  const express = require("express");
  const morgan = require("morgan");
  const bodyParser = require("body-parser");
  const compression = require("compression");
  const xsenv = require("@sap/xsenv");
  const xssec = require("@sap/xssec");
  const xsHDBConn = require("@sap/hdbext");
  const JWTtoken = require("./middleware/JWTtoken/tokenchecks")()
  const passport = require("passport");
  const admintokenchecker = require('./middleware/JWTtoken/admintokencheck')
  const port = process.env.PORT || 3000;

  //Initialize Express App for XS UAA and HDBEXT Middleware
  const app = express();
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  const logging = require("@sap/logging");
  const appContext = logging.createAppContext();

  const helmet = require("helmet");
  // ...
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "sapui5.hana.ondemand.com"],
      scriptSrc: ["'self'", "sapui5.hana.ondemand.com"]
    }
  }));
  // Sets "Referrer-Policy: no-referrer".
  app.use(helmet.referrerPolicy({
    policy: "no-referrer"
  }));

  //passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
  //	uaa: {
  //		tag: "xsuaa"
  //	}
  //}).uaa));

  // app.use(logging.middleware({
  //   appContext: appContext,
  //   logNetwork: true
  // }));
  const log = require("cf-nodejs-logging-support");
  log.setLoggingLevel("info");
  log.setLogPattern("{{written_at}} - {{msg}}");
  app.use(log.logNetwork);
  //app.use(passport.initialize());
  var hanaOptions = xsenv.getServices({
    hana: {
      tag: "hana"
    }
  });

  hanaOptions.hana.pooling = true;
  app.use(
    // passport.authenticate("JWT", {
    // 	session: false
    // }),
    xsHDBConn.middleware(hanaOptions.hana)
  );

  //Compression
  app.use(require("compression")({
    threshold: "1b"
  }));
  // Handling cors
  const cors = require("cors");
  app.use(cors());
  // compress responses
  app.use(compression());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/", async (req, res) => {
    try {
      const dbClass = require("sap-hdbext-promisfied")
      let db = new dbClass(req.db);
      const statement = await db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA FROM "DUMMY"`)
      const results = await db.statementExecPromisified(statement, [])
      let result = JSON.stringify({
        Objects: results
      })
      return res.type("application/json").status(200).send(result)
    } catch (e) {
      return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
    }
  });

  app.get("/admin/action/info", async (req, res) => {

    let info = {
      'userInfo': req.authInfo.userInfo,
      'subdomain': req.authInfo.subdomain,
      'tenantId': req.authInfo.identityZone
    };
    res.status(200).json(info);

  });

  app.get("/user/action/info", async (req, res) => {
    if (req.authInfo.checkScope('$XSAPPNAME.Administrator')) {
      let info = {
        'userInfo': req.authInfo.userInfo,
        'subdomain': req.authInfo.subdomain,
        'tenantId': req.authInfo.identityZone
      };
      res.status(200).json(info);
    } else {
      res.status(403).send('Forbidden');
    }
  });

  // ADMIN ROUTES 
  const adminskillsRoutes = require("./router/skills");
  const adminjobRoutes = require("./router/job");
  const adminnefRoutes = require("./router/nef");
  const admindocumentRoutes = require("./router/documents");
  const adminactionRoutes = require("./router/admin/");
  const adminuseractionRoutes = require("./router/admin/indexuser.js");
  const searchRoutes = require("./router/search");
  const successfactorsRoutes = require("./router/successfactors");
  const askhradminroutes = require("./router/askhr")
  const adminauthRoutes = require("./router/auth/index.js");

  app.use("/admin/auth", adminauthRoutes);
  app.use("/admin/action", admintokenchecker, adminactionRoutes);
  app.use("/admin/action", admintokenchecker, adminskillsRoutes);
  app.use("/admin/action", admintokenchecker, adminjobRoutes);
  app.use("/admin/action", admintokenchecker, adminnefRoutes);
  app.use("/admin/action", admintokenchecker, adminuseractionRoutes)
  app.use("/admin/action", admintokenchecker, admindocumentRoutes);
  app.use("/admin/action/search", admintokenchecker, searchRoutes);
  app.use("/admin/action", admintokenchecker, successfactorsRoutes)
  app.use("/admin/action/askhr", admintokenchecker, askhradminroutes)
  //USER ROUTES

  //app.use(JWTtoken)     // express middleware for usertoken verfication
  const userauthRoutes = require("./router/auth/userindex.js");
  const userskillsRoutes = require("./router/skills/userindex.js");
  const userjobRoutes = require("./router/job/userindex.js");
  const userdocumentRoutes = require("./router/documents/userindex.js");
  const useractionRoutes = require("./router/users/index.js");
  const usernefRoutes = require("./router/nef");
  const askhruserroutes = require("./router/askhr/indexuser.js")
  app.use("/user/auth", userauthRoutes);
  app.use("/user/action", userskillsRoutes);
  app.use("/user/action", userjobRoutes);
  app.use("/user/action", usernefRoutes);
  app.use("/user/action", userdocumentRoutes);
  app.use("/user/action", useractionRoutes);
  app.use("/user/action/askhr", askhruserroutes);
  app.use("/user/action/search", searchRoutes);
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
  module.exports = express;