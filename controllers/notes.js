
const handleNotes = (req,res,db) => {
	const { email } = req.body;
	db.select('title', 'note', 'created').from('note').where({email})
		.then(note => {
			res.json(note);	//check
		})
		.catch(err => res.status(400).json('error getting notes'))
}

const handleAdd = (req,res,db) => {
	const { email, title, note } = req.body;

	if(!title){			// check how to do
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

module.exports = {
    handleNotes: handleNotes,
    handleAdd: handleAdd,
}