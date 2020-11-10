## What ？什么是HOC

**HOC（High Order Component） 是 `react` 中对组件逻辑复用部分进行抽离的高级技术，但HOC并不是一个 `React API` 。 它只是一种设计模式，类似于装饰器模式。**
**具体而言，HOC就是一个函数，且该函数接受一个组件作为参数，并返回一个新组件。**
从结果论来说，**HOC相当于 `Vue` 中的 `mixins(混合)`** 。其实 `React` 之前的策略也是采用 `mixins` ，但是后来 `facebook` 意识到 `mixins` 产生的问题要比带来的价值大，所以移除了 `mixins`。 [想要了解更多](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

## Why ? 为什么使用HOC

来看个例子

```js
import React, { Component } from 'react'

class Page1 extends Component{
  componentWillMount(){
    let data = localStorage.getItem('data')
    this.setState({ data })
  }

  render() {
    return (
      <h2>{this.state.data}</h2>
    )
  }
} 

export default Page112345678910111213141516
```

这个例子中在组件挂载前需要在 `localStorage` 中取出 `data` 的值，但当其他组件也需要从 `localStorage` 中取出同样的数据进行展示的话，每个组件都需要重新写一遍 `componentWillMount` 的代码，那就会显得非常冗余。那么在 `Vue` 中通常我们采用:

```js
mixins: []
```

但是在 `React` 中我们需要采用HOC模式咯

```js
import React, { Component } from 'react'

const withStorage = WrappedComponent => {
  return class extends Component{
    componentWillMount() {
      let data = localStorage.getItem('data')
      this.setState({ data })
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} /> 
    }
  }
}

export default withStorage
```

当我们构建好一个HOC之后，我们使用的时候就简单多了，还看最开始的例子，我们就不需要写 `componentWillMount` 了。

```js
import React, { Component } from 'react'
import withStorage from '@/utils/withStorage'

class Page1 extends Component{
  render() {
    return <h2>{this.props.data}</h2>
  }
}

export default withStorage(Page1)
```

很明显，这是一个装饰器模式，那么就可以使用ES7形式

```js
import React, { Component } from 'react'
import withStorage from '@/utils/withStorage'

@withStorage
class Page1 extends Component{
  render() {
    return <h2>{this.props.data}</h2>
  }
}

export default Page
```

装饰器模式：在不改变原有对象的结构的情况下为其添加新的功能。本例中通过withStorage()方法为Page1添加获取data数据的功能，又没有改变Page1的结构，是通过闭包的方法添加的数据。

本例程序运行顺序是：

## How ? 怎么使用HOC

#### 使用场景

1. 操纵 props
2. 通过 ref 访问组件实例
3. 组件状态提升
4. 用其他元素包装组件

## Tips 注意事项

1，命名
把被包装的组件名称也包到HOC的显示名称中。
2，时机
**不要在组件的 `render` 方法中使用HOC，尽量也不要在组件的其他生命周期中使用HOC。因为调用HOC的时候每次都会返回一个新的组件，于是每次render，前一次高阶组件创建的组件都会被卸载(unmount)，然后重新挂载(mount)本次创建的新组件，既影响效率又丢失了组件及其子组件的状态。**
3，静态方法
如果需要使用被包装组件的静态方法，那么就需要手动复制这些静态方法，因为HOC返回的新组建不包含被包装组件的静态方法。
4，ref
不会被传递给被包装组件

## HOC和Mixin的比较

![这里写图片描述](https://img-blog.csdn.net/20180604132245744?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NTM0ODIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)