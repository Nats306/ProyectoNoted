const {MoodWeekly, Usuario} = require('../models');

const addMoodWeekly = async (req, res) => {
    try {
        const {fecha, enojo, miedo, alegria, tristeza, culpa, desesperanza, frustracion, otras} = req.body;
        const usuarioFk = req.usuario.id;
        const moodW = await MoodWeekly.create({fecha, enojo, miedo, alegria, tristeza, culpa, desesperanza, frustracion, otras, usuarioFk});
        return res.status(200).json(moodW);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getMoodsWeekly = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const moodsW = await MoodWeekly.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(moodsW);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateMoodWeekly = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha, enojo, miedo, alegria, tristeza, culpa, desesperanza, frustracion, otras} = req.body;
        const usuarioFk = req.usuario.id;

        const moodW = await MoodWeekly.findByPk(id);
        if(!moodW) {
            return res.status(404).json({message: "Mood no encontrado"});
        }

        if(moodW.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar este Mood Tracker"})
        }

        if(enojo) moodW.enojo = enojo;
        if(miedo) moodW.miedo = miedo;
        if(alegria) moodW.alegria = alegria;
        if(tristeza) moodW.tristeza = tristeza;
        if(culpa) moodW.culpa = culpa;
        if(desesperanza) moodW.desesperanza = desesperanza;
        if(frustracion) moodW.frustracion = frustracion;
        if(otras) moodW.otras = otras;
        if(fecha) moodW.fecha = fecha;

        await moodW.save();
        return res.status(200).json({message: "Mood actualizado", moodW});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addMoodWeekly, getMoodsWeekly, updateMoodWeekly};
