# moon

可能是世界上最小巧的小程序功能增强库.

## install

`npm i @matrixage/moon`

## usage

### moon (全局状态管理)

1.在app.js中定义全局变量

```js
const moon = require('moon')

App({
	onLaunch () {
		moon(wx).define({
                  userinfo:{},
			loaded: false
		})
	}
})
```

2.在A页面修改已经定义的值

```js
wx.$set({
      loaded:true
})
```

3.在B页面监听字段的变化

```js
wx.$watch('loaded',(new_val,old_val)=>{
      this.setData({
            visible_ads: new_val
      })

      console.log(old_val)
})
```

### promisifyAll (Promise化wxapi )

1.在app.js onLaunch函数的第一行执行绑定

```js
const { promisifyAll } = require('moon')

App({
	onLaunch () {
		promisifyAll(wx, wx.$)
	}
})
```

2.在其他地方直接使用

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

## 后续计划

* connect函数
* dispatch函数

学习dva的思想，为小程序提供model层的数据控制能力



