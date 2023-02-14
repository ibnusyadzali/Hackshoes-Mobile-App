function errorHandling(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case `SequelizeValidationError`:
    case `SequelizeUniqueConstraintError`:
      status = 400;
      message = err.errors[0].message;
      break;

    case `Invalid token`:
    case `Unauthenticated`:
      status = 401;
      message = "Unauthenticated, please login first";
      break;

    case `Data not found`:
      status = 404;
      message = "Data not found";
      break;

    case `Email or Password is required`:
      status = 400;
      message = "Email or Password is Required";
      break;

    case `Invalid Email/Password`:
      status = 400;
      message = "Invalid Email or Password";
      break;

    default:
        console.log(err)
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message: message });
}

module.exports = errorHandling;
