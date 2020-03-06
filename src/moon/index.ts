const moon = ( wx: any ) => {
      const _wx = wx

      let _data = {}
      let _data_proxy = {}
      let _callback = {}

      const define = ( obj: object ): void => {
            _data = obj
      }

      _wx.$set = ( obj: object ): void => {
            Object.keys( obj ).map( ( key ) => {
                  _data_proxy[ key ] = obj[ key ]
            } )
      }

      _wx.$watch = ( key: string, cb: void ): void => {
            _callback = Object.assign( {}, _callback, {
                  [ key ]: _callback[ key ] || []
            } )

            _callback[ key ].push( cb )

            _data_proxy = new Proxy( _data, {
                  get ( target, name, receiver ) {
                        return Reflect.get( target, name, receiver )
                  },
                  set ( target, name, value, receiver ) {
                        if ( Array.isArray( _callback[ name ] ) ) {
                              _callback[ name ].map( ( func: any ) => func( value, _data[ name ] ) )
                        }

                        return Reflect.set( target, name, value, receiver )
                  }
            } )
      }

      _wx.$getData = (): object => {
            return _data
      }

      return {
            define: define
      }
}

export default moon