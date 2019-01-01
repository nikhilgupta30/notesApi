
const handleNotes = (req,res,db) => {
	const { email } = req.body;
	db.select('id', 'title', 'note', 'created').from('note').where({email})
		.then(note => {
			res.json(note);
		})
		.catch(err => res.status(400).json('error getting notes'))
}

const handleAdd = (req,res,db) => {
	const { email, title, note } = req.body;

	if(!title){	
		return res.status(400).json('title required');
	}

	db('note')
		.insert({
			email: email,
			title: title,
			note: note,
			created: new Date(),
		})
		.then(note => {})
		.catch(err => res.status(400).json('unable to add'))

	handleNotes(req,res,db);
}

const handleEdit = (req,res,db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0]);
			}else{
				res.status(404).json('not found');
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

const handleDelete = (req,res,db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0]);
			}else{
				res.status(404).json('not found');
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleNotes: handleNotes,
    handleAdd: handleAdd,
    handleEdit: handleEdit,
    handleDelete: handleDelete
}