require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const eventoRoutes = require('./routes/eventoRoutes');
const journalEntryRoutes = require('./routes/journalEntryRoutes');
const moodMRoutes = require('./routes/moodMRoutes');
const moodWRoutes = require('./routes/moodWRoutes');
const sleepRoutes = require('./routes/sleepRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const waterRoutes = require('./routes/waterRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/eventos', eventoRoutes);
app.use('/api/journalEntries', journalEntryRoutes);
app.use('/api/moodMTrackers', moodMRoutes);
app.use('/api/moodWTrackers', moodWRoutes);
app.use('/api/sleepTrackers', sleepRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/waterTrackers', waterRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});