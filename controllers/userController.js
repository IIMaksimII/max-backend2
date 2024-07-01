
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Role, UserRole} = require('../models/models')

const generateJwt = (id,email,role) =>{
    return jwt.sign({id, email,role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}   


class UserComtroller {
  async registration(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    try {
      let user = await User.findOne({ where: { email } });

      if (user) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);

      user = await User.create({ email, password: hashPassword });

      const defaultRoleId = 2; // По умолчанию роль USER (id:2)
      await UserRole.create({ userId: user.id, roleId: defaultRoleId });

      const role = await Role.findByPk(defaultRoleId);

      const token = generateJwt(user.id, user.email, role.name);

      return res.json({ token });
    } catch (e) {
      console.error('Ошибка при создании пользователя:', e);
      return next(ApiError.internal('Ошибка при создании пользователя'));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal('Пользователь не найден'));
      }

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'));
      }

      const userRoles = await UserRole.findAll({ where: { userId: user.id } });

      if (!userRoles || userRoles.length === 0) {
        return next(ApiError.internal('Роль пользователя не найдена'));
      }

      const role = await Role.findByPk(userRoles[0].roleId);

      const token = generateJwt(user.id, user.email, role.name);
      return res.json({ token });
    } catch (e) {
      console.error('Ошибка при входе пользователя:', e);
      return next(ApiError.internal('Ошибка при входе пользователя'));
    }
  }
  async getAllUsers(req, res) {
    try {
        const users = await User.findAll({
            include: [{ model: Role, through: UserRole }]
        });
        return res.json(users);
    } catch (e) {
        console.error('Ошибка при получении пользователей:', e);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
  async updateUser(req, res, next) {
    const { id } = req.params;
        const { email, password, roleIds } = req.body;

        try {
            let user = await User.findByPk(id);

            if (!user) {
                return next(ApiError.notFound(`Пользователь с id ${id} не найден`));
            }

            // Если передан новый email, проверяем его на уникальность
            if (email && email !== user.email) {
                const existingUser = await User.findOne({ where: { email } });
                if (existingUser) {
                    return next(ApiError.badRequest('Пользователь с таким email уже существует'));
                }
                user.email = email;
            }

            // Если передан новый пароль, хэшируем его
            if (password) {
                const hashPassword = await bcrypt.hash(password, 5);
                user.password = hashPassword;
            }

            // Обновление ролей пользователя
            if (roleIds && roleIds.length > 0) {
                await UserRole.destroy({ where: { userId: user.id } });
                await UserRole.bulkCreate(roleIds.map(roleId => ({ userId: user.id, roleId })));
            }

            await user.save();

            return res.json({ message: 'Пользователь успешно обновлен' });
        } catch (e) {
            console.error('Ошибка при обновлении пользователя:', e);
            return next(ApiError.internal('Ошибка при обновлении пользователя'));
        }
    
}
async getAllRoles(req, res, next) {
  try {
      const roles = await Role.findAll();
      return res.json(roles);
  } catch (e) {
      console.error('Ошибка при получении ролей:', e);
      return next(ApiError.internal('Ошибка при получении ролей'));
  }
}

async deleteUser(req, res, next) {
  const { id } = req.params;

  try {
      const user = await User.findByPk(id);

      if (!user) {
          return next(ApiError.notFound(`Пользователь с id ${id} не найден`));
      }

      await user.destroy();

      return res.json({ message: 'Пользователь успешно удален' });
  } catch (e) {
      console.error('Ошибка при удалении пользователя:', e);
      return next(ApiError.internal('Ошибка при удалении пользователя'));
  }
}
}

    

module.exports = new UserComtroller()