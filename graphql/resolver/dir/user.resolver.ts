import { prisma } from "../../../lib/prisma";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const APP_SECRET = 'SEC-JCY-DINO-SOR123';

module.exports =
{
  Query: {
    userEnum: async (root, args, context) => await prisma.user.findMany()
  },
  Mutation: {
    userRegistration: async (root, args, context) => {
      var hash = bcrypt.hashSync(args.password, 10);
      const { password, ...register } = await prisma.user.create({
        data: {
          username: args.username,
          password: hash,
          email: '',
          name: '',
        },
      });
      return {
        id: register.id,
        username: args.username,
      };
    },

    userLogin: async (root, args, context) => {
      const { password, ...user } = await prisma.user.findFirst({
        // const { password, ...user } = await prisma.user.findFirst({
        where: {
          username: args.username
        },
      })
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      var validpass = await bcrypt.compareSync(args.password, password)
      if (validpass) {
        return {
          token: token,
          user: user
        }
      }

      return {}
    }
  }
}