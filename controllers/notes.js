
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
	const { id, title, note } = req.body;
	db('note')
		.where('id', '=', id)
		.update({
			title: title,
			note: note
		})
		.then(status => {
			if(!status){
				res.status(400).json('no note found');
			}})
		.catch(err => res.status(400).json('error getting note'))

		handleNotes(req,res,db);
}

const handleDelete = (req,res,db) => {
	const { id } = req.body;
	db('note').where({id}).del()
		.then(status => {
			if(status){
				res.status(200).json('note deleted');
			}else{
				res.status(400).json('no note found');
			}
		})
		.catch(err => res.status(400).json('error getting note'))
}

module.exports = {
    handleNotes: handleNotes,
    handleAdd: handleAdd,
    handleEdit: handleEdit,
    handleDelete: handleDelete
}