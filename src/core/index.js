const moon = (wx) => {
	const _wx = wx

	let _data = {}
	let _data_proxy = {}
	let _callback = {}

	const define = (obj) => {
		_data = obj
	}

	_wx.$set = (obj) => {
		Object.keys(obj).map((key) => {
			_data_proxy[key] = obj[key]
		})
	}

	_wx.$watch = (key, cb) => {
		_callback = Object.assign({}, _callback, {
			[key]: _callback[key] || []
		})

		_callback[key].push(cb)

		_data_proxy = new Proxy(_data, {
			get (target, name, receiver) {
				return Reflect.get(target, name, receiver)
			},
			set (target, name, value, receiver) {
				if (Array.isArray(_callback[name])) {
					_callback[name].map((func) => func(value, _data[name]))
				}

				return Reflect.set(target, name, value, receiver)
			}
		})
	}

	_wx.$getData = () => {
		return _data
	}

	return {
		define: define
	}
}

module.exports = moon