const modelExtend = (public_model, page_model) => {
	const model = {
		data: {},
		effects: {},
		reducers: {}
	}

	for (let i in model) {
		Object.assign(model[i], public_model[i], page_model[i])
	}

	return model
}

module.exports = modelExtend
