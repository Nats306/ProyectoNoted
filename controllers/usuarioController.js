const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUsuarioById = async (req, res) => {
    try {
        const {id} = req.params
        const usuario = await Usuario.findByPk(id);
        if(usuario){
            return res.status(200).json(usuario);
        }
        return res.status(404).json({message: "Usuario no encontrado"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


//Sería como el Register
const addUsuario = async (req, res) => {
    try {
        const { nombreCompleto, nombreUsuario, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "La contraseña es obligatoria" });
        }
        
        const usuario = await Usuario.create({
            nombreCompleto,
            nombreUsuario,
            email,
            password
        });

        return res.status(201).json(usuario);


    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, nombreUsuario, email, password } = req.body;

        if(req.usuario.id !== id){
            return res.status(403).json({message: "No tienes permiso para actualizar este usuario"})
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (nombreCompleto) usuario.nombreCompleto = nombreCompleto;
        if (nombreUsuario) usuario.nombreUsuario = nombreUsuario
        if (email) usuario.email = email;
        if (password) {
            usuario.password = await bcrypt.hash(password, 10); 
        }

        await usuario.save();
        return res.status(200).json({ message: "Usuario actualizado", usuario })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { estado } = req.body; 

        if (!["Activo", "Inactivo"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
        }

        if(req.usuario.id !== id){
            return res.status(403).json({message: "No tienes permiso de cambiar el estado de este usuario"})
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        usuario.estado = estado;
        await usuario.save();

        res.json({ message: `Estado actualizado a ${estado}`, usuario });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { getUsuarios, getUsuarioById, addUsuario, updateUsuario, changeUserStatus }