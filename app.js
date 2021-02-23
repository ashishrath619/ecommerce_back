var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var categoryRouter = require("./routes/category");
var brandRouter = require("./routes/brand");
var outletRouter = require("./routes/outlet");
var statecityRouter = require("./routes/statecity");
var modelRouter = require("./routes/model");
var adminRouter = require("./routes/admin");
var productregisterRouter = require("./routes/productregister");
var useradminRouter = require("./routes/useradmin");
var productpicRouter = require("./routes/productpic");
var modelnewRouter = require("./routes/modelnew");
var userdetailsRouter = require("./routes/userdetails");
var smsapiRouter = require("./routes/smsapi");
var copyRouter = require("./routes/copy");
var TestRouter = require("./routes/Test");
var taskRouter = require("./routes/task");
var EmployeeRouter = require("./routes/Employee");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userapiRouter = require("./routes/userapi");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandRouter);
app.use("/outlet", outletRouter);
app.use("/statecity", statecityRouter);
app.use("/model", modelRouter);
app.use("/admin", adminRouter);
app.use("/productregister", productregisterRouter);
app.use("/useradmin", useradminRouter);
app.use("/productpic", productpicRouter);
app.use("/modelnew", modelnewRouter);
app.use("/userdetails", userdetailsRouter);
app.use("/smsapi", smsapiRouter);
app.use("/copy", copyRouter);
app.use("/Test", TestRouter);
app.use("/task", taskRouter);
app.use("/Employee", EmployeeRouter);
app.use("/userapi", userapiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
