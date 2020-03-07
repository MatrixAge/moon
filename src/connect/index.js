const connect = (page, model) => {
	function dispatch ({ type, payload }){
		if (!page.hasOwnProperty(type) || typeof page[type] !== 'function') {
			console.log('type should be a function which has declared.')

			return
		}

		page[type].call(this, { payload })
	}

	Object.assign(
		page,
		model.effects,
		model.reducers,
		{
			data: model.data
		},
		{
			dispatch: dispatch
		}
	)

	return Page(page)
}

module.exports = connect
