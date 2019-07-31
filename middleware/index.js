const db = require('../users/userDb');

function logger(req, res, next) {
  const timestamp = new Date().toTimeString();
  const { method, url } = req;
  console.log(
    `Method: ${method}. Request URL: ${url}. Timestamp: ${timestamp}.`
  );
  next();
}

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.findById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const validateUser = (req, res, next) => {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: 'missing user data' });
  }
  const { name } = body;
  if (!name) {
    return res.status(400).json({ message: `Missing required field: name` });
  }
  next();
};

const validatePost = (req, res, next) => {
  console.log();
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};