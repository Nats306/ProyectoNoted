const {Tarea, Usuario} = require('../models');

const addTarea = async (req, res) => {
    try {
        const {titulo} = req.body;
        const usuarioFk = req.usuario.id;
        const tarea = await Tarea.create({titulo, usuarioFk});
        return res.status(200).json(tarea);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getTareas = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const tareas = await Tarea.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(tareas);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateTarea = async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, completada} = req.body;
        const usuarioFk = req.usuario.id;
        const tarea = await Tarea.findByPk(id);
        if(!tarea) {
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        if(tarea.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar esta tarea"})
        }

        if(titulo) tarea.titulo = titulo;
        if(completada !== undefined) tarea.completada = completada;
        await tarea.save();
        return res.status(200).json({message: "Tarea actualizada", tarea});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const deleteTarea = async (req, res) => {
    try {
        const {id} = req.params;
        const usuarioFk = req.usuario.id;
        const tarea = await Tarea.findByPk(id);
        if(!tarea) {
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        if(tarea.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso de eliminar esta tarea"})
        }

        await tarea.destroy();
        return res.status(200).json({message: "Tarea eliminada"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addTarea, getTareas, updateTarea, deleteTarea};
