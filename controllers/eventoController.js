const { Evento, Usuario } = require('../models');

const addEvento = async (req, res) => {
    try {
        const { titulo, fecha, hora, descripcion} = req.body;
        const usuarioFk = req.usuario.id;

        const evento = await Evento.create({ titulo, fecha, hora, descripcion, usuarioFk });
        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getEventos = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const eventos = await Evento.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email'] //no ponemos la contraseña
            }
        });
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, fecha, hora, descripcion} = req.body;
        const usuarioFk = req.usuario.id;

        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        if(evento.usuarioFk !== usuarioFk){
            return res.status(403).json({message:"No tienes permiso para actualizar este evento"})
        }

        if (titulo) evento.titulo = titulo;
        if (fecha) evento.fecha = fecha;
        if (hora) evento.hora = hora;
        if (descripcion) evento.descripcion = descripcion;

        await evento.save();
        return res.status(200).json({ message: "Evento actualizado", evento });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioFk = req.usuario.id; 

        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        if(evento.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para eliminar este evento"});
        }

        await evento.destroy();
        return res.status(200).json({ message: "Evento eliminado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { addEvento, getEventos, updateEvento, deleteEvento };
