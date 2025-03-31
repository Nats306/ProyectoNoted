const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado." });
    }

    const esPasswordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!esPasswordCorrecto) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
