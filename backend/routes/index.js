const express = require("express");
const adminRoute = require("./admin.routes.js");
const router = express.Router();
const authRoute = require("./auth.route.js");
const carRoute = require("./car.routes.js");
const orderRoute = require('./order.route.js')
const statsRoute = require('./stats.routes.js')
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  //   {
  //     path: '/users',
  //     route: userRoute,
  //   },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/cars",
    route: carRoute,
  },
  {
    path: "/orders",
    route: orderRoute,
  },
  {
    path: "/stats",
    route: statsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
