const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const notes = require('./controllers/notes');

var db = knex({
	client: 'sqlite3',
	connection: {
	  filename: "./notes.db"
	},                            
	useNullAsDefault: true	
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { res.send('its working') })

app.post('/signin', (req,res) => { signin.handleSignIn(req,res,db,bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfile(req,res,db) })

app.get('/notes', (req,res) => { notes.handleNotes(req,res,db) })

app.post('/add', (req,res) => { notes.handleAdd(req,res,db) })

app.put('/edit', (req,res) => { notes.handleEdit(req,res,db) })

app.delete('/delete', (req,res) => { notes.handleDelete(req,res,db) })

app.listen(3000, () => { 
	console.log('app is running on port 3000');
})


/**

routes

/ --> res = this is working
/signin --> POST = user
/register --> POST = user
/profile/:userId --> GET = user
/notes --> GET = list of all notes
/add --> POST = updated list of notes
/edit --> PUT = updated list of notes
/delete --> DELETE = updated list of notes

 */

 