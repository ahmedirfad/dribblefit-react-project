const { z } = require("zod");

const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

module.exports = loginValidator;