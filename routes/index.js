const authRoutes = require("./auth");
const userRoutes = require("./users");
const notificationRoutes = require("./notifications");
const postRoutes = require("./posts");
const reactionRoutes = require("./reactions");

module.exports = function({ app, dbConn, upload }) {
    authRoutes({ app, dbConn });
    userRoutes({ app, dbConn, upload });
    notificationRoutes({ app, dbConn });
    postRoutes({ app, dbConn, upload });
    reactionRoutes({ app, dbConn });
};