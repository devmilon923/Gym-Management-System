const Users = require("../models/users");
const checkHashPassword = require("../services/checkHashPassword");
const createJWT = require("../services/createJWT");
const createHash = require("../services/createPasswordHash");

const register = async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

  if (!req.body?.name?.trim())
    return res.status(400).send({
      success: false,
      message: "Name must be required",
    });
  if (!nameRegex.test(req.body?.name.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "name",
        message:
          "Name has at least 3 alphabetic characters and optional spaces",
      },
    });

  if (!req.body?.email?.trim())
    return res.status(400).send({
      success: false,
      message: "Email must be required",
    });
  if (!emailRegex.test(req.body?.email.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "email",
        message: "Invalid email format",
      },
    });

  if (!req.body?.password?.trim())
    return res.status(400).send({
      success: false,
      message: "Password must be required",
    });
  if (!passwordRegex.test(req.body?.password.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "password",
        message:
          "Your password is too weak. Use a mix of uppercase, lowercase, numbers, and special characters.",
      },
    });

  try {
    const hash = await createHash(req.body?.password);
    const user = await Users.create({
      name: req.body?.name,
      email: req.body?.email,
      password: hash,
    });
    const { password, profile, __v, updatedAt, ...data } = user.toObject();
    res.status(201);
    return res.send({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      Data: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.send({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!req.body?.email?.trim())
    return res.status(400).send({
      success: false,
      message: "Email must be required",
    });
  if (!emailRegex.test(req.body?.email.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "email",
        message: "Invalid email format",
      },
    });

  try {
    const user = await Users.findOne({ email: req.body?.email });
    if (!user)
      return res.send({
        success: false,
        statusCode: 404,
        message: "Invalid credentials",
      });

    const checkPassword = await checkHashPassword(
      req.body?.password,
      user.password
    );
    if (!checkPassword)
      return res.send({
        success: false,
        statusCode: 404,
        message: "Invalid credentials",
      });

    const { password, profile, __v, updatedAt, ...data } = user.toObject();
    const token = await createJWT(data);
    res.status(201);
    return res.send({
      success: true,
      statusCode: 201,
      message: "User login successfully",
      Data: { ...data, token: token },
    });
  } catch (error) {
    console.log(error.message);
    return res.send({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

module.exports = { register, login };
