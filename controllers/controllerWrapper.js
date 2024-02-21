const controllerWrapper = (controller) => {
  const controllerFunc = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return controllerFunc;
};

module.exports = controllerWrapper;
