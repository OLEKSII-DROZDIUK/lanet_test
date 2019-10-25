const formRules = [
  	{ 
		field: 'login', 
		method: 'isEmpty', 
		validWhen: false, 
		message: 'Це поле обов`язкове'
	},
	{ 
		field: 'password', 
		method: 'isEmpty', 
		validWhen: false, 
		message: 'Це поле обов`язкове'
	},
]

export default formRules;