const getErr = function (err = "server internal error", errCode = 500) {
  return {
    code: errCode,
    msg: err,
  };
};

const getResult = function (result) {
  return {
    code: 0,
    msg: "",
    data: result,
  };
};

const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(getResult(result));
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  getErr,
  getResult,
  asyncHandler
}

