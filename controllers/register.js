 
const handleRegister = (req,res,db,bcrypt) => {
	const { email, name, password } = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form credentials');
	}
	const hash = bcrypt.hashSync(password);
    
    db('login')
	.insert({
		email: email,
		hash: hash
	})
	.then(status => {})
    
    db('users')
	.insert({
		email: email,
		name: name,
		joined: new Date()
	})
	.then(user => {
		db.select('*').from('users').where({id: user[0]})
		.then(user => {
			res.json(user[0]);
		})
	})
	.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}