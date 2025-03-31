const {Water, Usuario} = require('../models');

const addWater = async (req, res) => {
    try {
        const {fecha, litrosTomadosDia} = req.body;
        const usuarioFk = req.usuario.id
        const water = await Water.create({fecha, litrosTomadosDia, usuarioFk});
        return res.status(200).json(water);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getWaters = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const waters = await Water.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(waters);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateWater = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha, litrosTomadosDia} = req.body;
        const usuarioFk = req.usuario.id;
        const water = await Water.findByPk(id);
        if(!water) {
            return res.status(404).json({message: "Registro de agua no encontrado"});
        }

        if(water.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar este Water Tracker"})
        }

        if(fecha) water.fecha = fecha;
        if(litrosTomadosDia) water.litrosTomadosDia = litrosTomadosDia

        await water.save();
        return res.status(200).json({message: "Registro de agua actualizado", water});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addWater, getWaters, updateWater};
