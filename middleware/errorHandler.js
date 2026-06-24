export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  let errorResponse = {
    title: "",
    message: err.message,
    stackTrace: err.stack,
  };

  switch (statusCode) {
    case 400:
      errorResponse.title = "VALIDATION_ERROR";
      break;
    case 401:
      errorResponse.title = "UNAUTHORIZED";
      break;
    case 403:
      errorResponse.title = "FORBIDDEN";
      break;
    case 404:
      errorResponse.title = "NOT_FOUND";
      break;
    case 500:
    default:
      errorResponse.title = "SERVER_ERROR";
      break;
  }

  // Log the error to terminal for debugging
  console.error(`[${statusCode}] ${err.message}`);

  // Send JSON response once
  res.status(statusCode).json(errorResponse);
};
