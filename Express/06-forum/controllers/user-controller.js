const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const db = require('../models');
const { ErrorResponse } = require('../response-schemas/error-schema');;
const {generateJWT} = require('../utils/jwt-utils');

const userController = {
  register: async (req, res) => {
    const HashedPwd = await bcrypt.hash(req.validatedData.password, 10);

    const { pseudo, email } = req.validatedData;
    const newUserDB = await db.Member.create({
      pseudo,
      email,
      password: HashedPwd,
    });
    // const data = req.validatedData;
    // const userData = {
    //   pseudo: data.pseudo,
    //   email: data.email,
    //   password: HashedPwd,
    // }
    // const newUserDB = await db.Member.create(userData)
    res.json(newUserDB);
  },
  login: async (req, res) => {
    const { login, password } = req.validatedData;

    const member = await db.Member.findOne({
      where: {
        // condition avec un OU en sql
        [Op.or]: [
          {
            // condition avec un LIKE en sql
            pseudo: { [Op.like]: login },
          },
          {
            email: { [Op.like]: login },
          },
        ],
      },
    });

    if (!member) {
      return res.status(422).json(new ErrorResponse('Mais qui es-tu?', 422));
    }
    const validPwd = await bcrypt.compare(password, member.password);

    if (!validPwd) {
      return res.status(422).json(new ErrorResponse('Mais qui es-tu?', 422));
    }
    const token = generateJWT({
      id: member.id,
      pseudo: member.pseudo,
      isAdmin: member.isAdmin,
    })
    res.json(token);
  },
};

// to : user-route
module.exports = userController;
