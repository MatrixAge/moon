# moon

可能是世界上最小巧的小程序功能增强库. https://github.com/MatrixAge/moon

## install

1. `npm i @matrixage/moon`

2. 微信开发者工具 -> 工具 -> 构建npm

## usage

### moon (全局状态管理)

1. 在app.js中定义全局变量

```js
import { moon } from '@matrixage/moon'

App({
	onLaunch () {
		moon(wx).define({
            		userinfo:{},
			loaded: false
		})
	}
})
```

2. 在A页面修改已经定义的值

```js
wx.$set({
      loaded:true
})
```

3. 在B页面监听字段的变化

```js
wx.$watch('loaded',(new_val,old_val)=>{
      this.setData({
            visible_ads: new_val
      })

      console.log(old_val)
})
```

### connect (支持dva model)

页面的js文件 (index.js)

```js
import { connect } from '@matrixage/moon'
import model from './model'

const page = {
	onLoad () {
		this.dispatch({
                	type: 'query',
                  	payload:{
                        	shop_id: 1
                  	}
		})
	}
}

connect(page, model)
```

页面的model文件 (model.js)

```js
import { Service_getContent, Service_getUserinfo } from './services'

export default {
	data: {
		list: [],
		userinfo: {},
		loading: false
	},

	effects: {
		async query ({ payload }) {
			const { result, success } = await Service_getContent(Object.assign(payload,{ type: 1 }))

			if (!success) return

			this.setData({
				list: result
			})
		},
		async getUserinfo () {
                        const {result, success} = await Service_getUserinfo()
                  
                        if (!success) return
                  
			this.setData({
				userinfo: result
			})
		}
	},

	reducers: {
		showLoading () {
			this.setData({ loading: true })
		},
		hideLoading () {
			this.setData({ loading: false })
		}
	}
}
```

model只支持三种对象：

* data (同小程序data)
* effects (异步方法，通常用于获取异步数据)
* reducers (同步方法，通常用于控制模态框或是loading的显示隐藏)

在index.js中使用`this.dispatch({type,payload})`调用model.js中的函数,在model.js中直接使用`this.setData({data})`对数据进行变更。

index.html负责视图展现 (view)，index.js负责页面逻辑 (controller)，model.js负责数据逻辑 (model)。基于“0入侵”的原则，简化了dva的一些概念，尽可能地让经验较少的开发者也能体会到标准MVC编程的快乐。

### modelExtend (扩展model)

```js
import { modelExtend } from '@matrixage/modelExtend'
import model from 'path/to/public_model'

export default modelExtend(model,{
      ...
})
```

### promisifyAll (Promise化wxapi )

1. 在app.js onLaunch函数的第一行执行绑定

```js
import { promisifyAll } from '@matrixage/moon'

App({
	onLaunch () {
		promisifyAll(wx, wx.$)
	}
})
```

2. 在其他地方直接使用

```js
try {
      await wx.$.requestPayment(data)
} catch ( e ) {
      wx.$messageInfo( '支付失败' )

      return
}

wx.$messageSuccess( '预约成功' )

//wx.$messageInfo和wx.$messageSuccess是项目中封装的方法
```

### typescript使用

小程序使用typescript打包出来的文件有点问题，先暂时手动复制粘贴声明文件

```js
declare namespace WechatMiniprogram {
      interface Wx {
            $: any
            $set: () => void
            $watch: () => void
            $getData: object
      }
}

interface IModel {
      data:object
      effects:object
      reducers:object
}

declare module '@matrixage/moon'{
      export const moon:(wx:any)=>void
      export const connect:(page:object,model:object)=>any
      export const modelExtend:(page_model:IModel,public_model:IModel)=>IModel
      export const promisifyAll:(wx:any,wx$:any)=>void
}
```

## 理念

moon将始终保持小而美，要保证使用moon不会对现有代码造成任何侵入式破坏.



