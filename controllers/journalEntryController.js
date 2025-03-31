
const {JournalEntry, Usuario} = require('../models');

const addJournalEntry = async (req, res) => {
    try {
        const {fecha, titulo, contenido, emociones, pensamientos, notasAdicionales} = req.body;
        const usuarioFk = req.usuario.id;

        const journalEntry = await JournalEntry.create({fecha, titulo, contenido, emociones, pensamientos, notasAdicionales, usuarioFk});
        return res.status(200).json(journalEntry);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getJournalEntries = async (req, res) => {
    try {
        const usuarioFk = req.usuario.id;
        const journalEntries = await JournalEntry.findAll({
            where: {usuarioFk},
            include: {
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombreCompleto', 'nombreUsuario', 'email']
            }
        });
        return res.status(200).json(journalEntries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const updateJournalEntry = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha, titulo, contenido, emociones, pensamientos, notasAdicionales} = req.body;
        const usuarioFk = req.usuario.id;

        const journalEntry = await JournalEntry.findByPk(id);
        if(!journalEntry) {
            return res.status(404).json({message: "Entrada del diario no encontrada"});
        }

        if(journalEntry.usuarioFk !== usuarioFk){
            return res.status(403).json({message: "No tienes permiso para actualizar esta entrada del diario"})
        }

        if(titulo) journalEntry.titulo = titulo;
        if(fecha) journalEntry.fecha = fecha;
        if(contenido) journalEntry.contenido = contenido
        if(emociones) journalEntry.emociones = emociones
        if(pensamientos) journalEntry.pensamientos = pensamientos
        if(notasAdicionales) journalEntry.notasAdicionales = notasAdicionales

        await journalEntry.save();
        return res.status(200).json({message: "Entrada del diario actualizada", journalEntry});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addJournalEntry, getJournalEntries, updateJournalEntry};
