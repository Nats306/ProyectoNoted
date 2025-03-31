const {MoodMonthly, Usuario} = require('../models');

const addMoodMonthly = async (req, res) => {
    try {
        const {fecha, mood} = req.body;
        const usuarioFk = req.usuario.id;

        const moodM = await MoodMonthly.create({fecha, mood, usuarioFk});
        return res.status(200).json(moodM);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getMoodsMonthly = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const moodsM = await MoodMonthly.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(moodsM);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateMoodMonthly = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha, mood} = req.body;
        const usuarioFk = req.usuario.id;
        const moodM = await MoodMonthly.findByPk(id);
        if(!moodM) {
            return res.status(404).json({message: "Mood no encontrado"});
        }

        if(moodM.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar este Mood Tracker"})
        }

        if(mood) moodM.mood = mood;
        if(fecha) moodM.fecha = fecha;

        await moodM.save();
        return res.status(200).json({message: "Mood actualizado", moodM});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addMoodMonthly, getMoodsMonthly, updateMoodMonthly};
