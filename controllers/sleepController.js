const {Sleep, Usuario} = require('../models');

const addSleep = async (req, res) => {
    try {
        const {fecha, horaDormir, horaDespertar, duracion, calidad, sueno, notasAdicionales} = req.body;
        const usuarioFk = req.usuario.id;
        const sleep = await Sleep.create({fecha, horaDormir, horaDespertar, duracion, calidad, sueno, notasAdicionales, usuarioFk});
        return res.status(200).json(sleep);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getSleeps = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const sleeps = await Sleep.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(sleeps);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateSleep = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha, horaDormir, horaDespertar, duracion, calidad, sueno, notasAdicionales} = req.body;
        const usuarioFk = req.usuario.id;
        const sleep = await Sleep.findByPk(id);
        if(!sleep) {
            return res.status(404).json({message: "Sleep record no encontrado"});
        }

        if(sleep.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar este Sleep Tracker"})
        }

        if(fecha) sleep.fecha = fecha;
        if(horaDormir) sleep.horaDormir = horaDormir;
        if(horaDespertar) sleep.horaDespertar = horaDespertar;
        if(duracion) sleep.duracion = duracion;
        if(calidad) sleep.calidad = calidad;
        if(sueno) sleep.sueno = sueno;
        if(notasAdicionales) sleep.notasAdicionales = notasAdicionales;

        await sleep.save();
        return res.status(200).json({message: "Sleep record actualizado", sleep});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addSleep, getSleeps, updateSleep};
