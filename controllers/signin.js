
const handleSignIn = (req,res,db,bcrypt) => {
	const { email, password } = req.body;
	if(!email || !password){
		return res.status(400).json('incorrect form credentials');
	}
	
	db.select('email','hash').from('user')
		.where('email','=',email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			
			if(isValid){
				db.select('id', 'email', 'name').from('user')
				.where('email','=', email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('error getting user')) 
			}else{
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleSignIn: handleSignIn
}