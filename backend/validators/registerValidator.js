const { z } = require("zod");

const registerValidator = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

module.exports = registerValidator;
