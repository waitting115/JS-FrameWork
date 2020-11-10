### 介绍React：

(阅读)

1. 以前我们没有jquery的时候，我们大概的流程是从后端通过ajax获取到数据然后使用jquery生成dom结果然后更新到页面当中，但是随着业务发展，我们的项目可能会越来越复杂，我们每次请求到数据，或则数据有更改的时候，我们又需要重新组装一次dom结构，然后更新页面，这样我们手动同步dom和数据的成本就越来越高，而且频繁的操作dom，也使我我们页面的性能慢慢的降低。
2. 这个时候mvvm出现了，mvvm的双向数据绑定可以让我们在数据修改的同时同步dom的更新，dom的更新也可以直接同步我们数据的更改，这个特定可以大大降低我们手动去维护dom更新的成本，mvvm为react的特性之一，虽然react属于单项数据流，需要我们手动实现双向数据绑定。
3. 有了mvvm还不够，因为如果每次有数据做了更改，然后我们都全量更新dom结构的话，也没办法解决我们频繁操作dom结构(降低了页面性能)的问题，为了解决这个问题，react内部实现了一套虚拟dom结构，也就是用js实现的一套dom结构，他的作用是讲真实dom在js中做一套缓存，每次有数据更改的时候，react内部先使用算法，也就是鼎鼎有名的diff算法对dom结构进行对比，找到那些我们需要新增、更新、删除的dom节点，然后一次性对真实DOM进行更新，这样就大大降低了操作dom的次数。 那么diff算法是怎么运作的呢，首先，diff针对类型不同的节点，会直接判定原来节点需要卸载并且用新的节点来装载卸载的节点的位置；针对于节点类型相同的节点，会对比这个节点的所有属性，如果节点的所有属性相同，那么判定这个节点不需要更新，如果节点属性不相同，那么会判定这个节点需要更新，react会更新并重渲染这个节点。
4. react设计之初是主要负责UI层的渲染，虽然每个组件有自己的state，state表示组件的状态，当状态需要变化的时候，需要使用setState更新我们的组件，但是，我们想通过一个组件重渲染它的兄弟组件，我们就需要将组件的状态提升到父组件当中，让父组件的状态来控制这两个组件的重渲染，当我们组件的层次越来越深的时候，状态需要一直往下传，无疑加大了我们代码的复杂度，我们需要一个状态管理中心，来帮我们管理我们状态state。
5. 这个时候，redux出现了，我们可以将所有的state交给redux去管理，当我们的某一个state有变化的时候，依赖到这个state的组件就会进行一次重渲染，这样就解决了我们的我们需要一直把state往下传的问题。redux有action、reducer的概念，action为唯一修改state的来源，reducer为唯一确定state如何变化的入口，这使得redux的数据流非常规范，同时也暴露出了redux代码的复杂，本来那么简单的功能，却需要完成那么多的代码。
6. 后来，社区就出现了另外一套解决方案，也就是mobx，它推崇代码简约易懂，只需要定义一个可观测的对象，然后哪个组价使用到这个可观测的对象，并且这个对象的数据有更改，那么这个组件就会重渲染，而且mobx内部也做好了是否重渲染组件的生命周期shouldUpdateComponent，不建议开发者进行更改，这使得我们使用mobx开发项目的时候可以简单快速的完成很多功能，连redux的作者也推荐使用mobx进行项目开发。但是，随着项目的不断变大，mobx也不断暴露出了它的缺点，就是数据流太随意，出了bug之后不好追溯数据的流向，这个缺点正好体现出了redux的优点所在，所以针对于小项目来说，社区推荐使用mobx，对大项目推荐使用redux

### key

标识元素唯一性，react为了尽可能的提高性能，在重新渲染DOM元素之前，会看是否有可复用的元素/组件，如果有，直接复用，但是如果元素都有key，都是唯一的，那么就不能复用了，这样也避免了一些bug的出现。而且key值不建议直接用index，因为12345多次渲染可能会赋值给不同的元素，建议给唯一值。

### refs

refs提供一种方法，可以访问DOM节点或render中创建的DOM元素。

~~~jsx
class MyComponent extends React.Component {
  handleClick() {
    // 使用原生的 DOM API 获取焦点
    this.refs.myInput.focus();
  }
  render() {
    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
    return (
      <div>
        <input type="text" ref="myInput" />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}
 
ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);

~~~

### react性能优化

- 重写shouldComponentUpdate()生命周期函数，避免没有必要的dom操作
- 为遍历的元素添加key，设置其唯一性，有助于diff算法优化
- 

### virtual DOM & diff

react并不直接操作实际的DOM元素，而是在react内部根据开发者编写的JSX语法生成虚拟DOM，向虚拟DOM中添加属性，事件和内容，然后一次性渲染到页面中，这样不论JSX中有多少DOM元素，都只需要一次渲染，当state或props发生一次变化时会触发页面的重新渲染，重新渲染时用react的diff算法先操作虚拟DOM然后渲染到页面中。

为什么虚拟DOM会提高性能？

虚拟DOM相当于在js于真实DOM中间加了一个缓存，利用 dom diff算法避免了很多没有必要的dom操作，从而提高了性能。

传统的diff算法：

传统的树的diff算法计算一颗树转换成另一棵树的最少操作时，通过循环递归对节点进行依次对比，效率低下，算法复杂度达到O(n^3)。

react的diff算法：

- **策略一：web UI中DOM节点跨层级的移动操作特别少，可忽略不计**
- **策略二：拥有相同的类的组件生成相似的树形结构，不同的则反之**
- **策略三：对于同一层级的子节点，可以通过唯一id进行区分**

基于策略一，对树进行分层比较，两棵树只会对同一层次的节点进行比较。

![clipboard.png](https://segmentfault.com/img/bVbiiZc?w=1036&h=482)

跨层级的移动操作：

![clipboard.png](https://segmentfault.com/img/bVbiiZv?w=992&h=544)

react-diff：react只会简单的考虑同层级节点之间的位置变换，对于不同节点，只有创建和删除操作。

createA --> createB --> createC --> deleteA(left)

基于策略二：

- 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
- React 判断 D 和 G 是不同类型的组件，就不会比较二者的结构，而是直接删除 component D，重新创建 component G 以及其子节点，即使D 和 G的结构很相似

![clipboard.png](https://segmentfault.com/img/bVbii1l?w=1056&h=438)

详情请看：

https://segmentfault.com/a/1190000016723305

总结：

- React通过定制大胆的diff策略，将O(n^3)复杂度的问题转化为O(n^1)
- React通过**分层求异**策略，对tree diff进行算法优化
- React通过**同类同树**策略，对component diff进行算法优化
- React通过**唯一key**策略，对element diff进行算法优化
- 建议，在开发组件时，**保持稳定的DOM结构有助于性能提升**

diff算法：

- 把树形结构按照层级分解，只比较同级元素。
- 给列表结构的每个单元添加唯一的`key`属性，方便比较。
- `React` 只会匹配相同 `class` 的 `component`（这里面的`class`指的是组件的名字）
- 合并操作，调用 `component` 的 `setState` 方法的时候, `React` 将其标记为 - `dirty`.到每一个事件循环结束, `React` 检查所有标记 `dirty`的 `component`重新绘制.
- 选择性子树渲染。开发人员可以重写`shouldComponentUpdate`提高`diff`的性能

### class & function

类组件可以有this.stae，可以使用生命周期函数

函数组件在React 16以后有了hook，也可以实现了状态和生命周期等函数

函数组件比类组件性能高一点，因为类组件使用的时候要实例化，而函数组件可以直接执行并返回结果

### 生命周期

initalization：初始化阶段

​	componentWillMount()：组件挂载前

Mounting：组件挂载阶段

​	componentDidMount()：组件挂载后

​	shouldComponentUpdate()：组件是否要更新，默认返回true，特定情况下设为false可以避免更新组件，	有利于提高性能

​	componentWillUpdate()：组件更新前

updating：组件更新阶段（当shouldComponentUpdate()返回true时执行，默认返回true

​	componentDidUpdate()：组件更新后

​	componentWillUnmount ()：组件卸载前

unMounting：组件卸载阶段



Error Handling：报错阶段（可以发生在生命周期的任一阶段）

​	报错阶段会触发：componentDidCatch()生命周期方法

### 处理事件

react为解决兼容问题，syntheticEvent实例会被传递给你的事件处理函数，它是react跨浏览器的浏览器原生事件包装器，它拥有与原生事件同样的接口

react并不会将事件附加到节点本身，react使用单个侦听器监听顶层的所有事件，这对性能很有好处，这就意味着react在更新DOM时不需要跟踪事件监听器。

### HOC

high order component

接收一个组件作为参数，并返回一个新组件，但不改变原组件。

适用于为一个组件添加一些功能，但不改变原组件的结构，而且其他组件也需要这些功能，这时候我们就可以写一个HOC，将需要添加一些功能的组件在导出之前作为参数传递给HOC，然后导出HOC返回的组件。

举例：

我们有一个这样的 List 组件，如果我们想给这个 List 组件加一个 loading 功能，我们可以这么做：

```js
const List = ({ data, isLoading }) => (
  isLoading ?
    <div>我正在加载...</div> :
    <ul>
      {data.map(item => <li key={item.name}>{item.name}</li>)}
    </ul>
)
```

我们修改一下 List 组件的代码，让它根据 isLoading 的状态来判断是否出现加载动画。这样做不是不可以，但是不够优雅。第一，这么做需要修改原来组件的代码；第二，如果我们有其它组件，比如 Table也需要 loading 功能，我们又需要重复写相同的判断逻辑。我们用高阶组件/函数就可以完美的解决上面两个问题。

```js
const withLoading = BaseComponent => ({ isLoading, ...otherProps }) => (
  isLoading ?
    <div>我正在加载...</div> :
    <BaseComponent {...otherProps} />
)

const LoadingList = withLoading(List)
```

我们这里的 withLoading 接受一个 BaseComponent，然后返回一个加强了的组件(LoadingList)，我们在 LoadingList 内部处理了 loading 的判断逻辑，这样我们既不用修改 List 的码，也可以复用loading 的判断逻辑。以后有组件需要 loading 功能我就就可以通过调用 withLoading 来实现，你也可以用 decorator (@withLoading) 的形式来调用。

```js
@withLoading
class Table extends React.Component {
  //...
}
```

withLoading 的使用方式和 react-router 里的 withRouter 使用方式很像对吧，withRouter 就是一个高阶组件，会把路由相关的一些数据注入到传进来的组件中去。

### 有/无状态组件

无状态组件：没有自己的state，只用接收的prop来渲染界面

有状态组件：有自己的state

### 受/非受控组件

受控组件：由react（state）控制值以及渲染的组件

非受控组件：由用户输入、点击控制的组件（input，textarea等）

### JSX

js的扩展，可以在里面编写js语法，是react编写ui组件的方法。

### HOOK

React Hooks 是 React `16.7.0-alpha` 版本推出的新特性

useState、useEffect等。

### StrictMode

严格模式：突出应用的潜在问题，不呈现任何可见的ui，为后代激活其他检查和警告。

- [识别具有不安全生命周期的组件](https://reactjs.org/docs/strict-mode.html#identifying-unsafe-lifecycles)
  - ![严格模式不安全生命周期警告](https://reactjs.org/static/e4fdbff774b356881123e69ad88eda88/1e088/strict-mode-unsafe-lifecycles-warning.png)
- [关于旧版字符串引用API使用的警告](https://reactjs.org/docs/strict-mode.html#warning-about-legacy-string-ref-api-usage)
- [关于不建议使用findDOMNode的警告](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
- [检测意外的副作用](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)
- [检测遗留上下文API](https://reactjs.org/docs/strict-mode.html#detecting-legacy-context-api)

### Flux & MVC

https://zhuanlan.zhihu.com/p/21324696

**简述flux 思想**

> `Flux` 的最大特点，就是数据的"单向流动"。

- 用户访问 `View`
- `View`发出用户的 `Action`
- `Dispatcher` 收到`Action`，要求 `Store` 进行相应的更新
- `Store` 更新后，发出一个`"change"`事件
- `View` 收到`"change"`事件后，更新页面

### 纯函数

纯函数是不依赖并且不会再作用于之外修改变量状态的函数。

本质上，纯函数始终在给定参数情况下返回相同的结果。

### setState第二个参数

该函数会在setState调用完之后组件开始重新渲染时候被调用，可以用来监听渲染是否完成。

~~~js
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)

this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})
~~~

### AJAX

**在生命周期中的哪一步你应该发起 AJAX 请求**

componentDidMount()，因为componentWillMount()可能执行多次（`React` 下一代调和算法 `Fiber` 会通过开始或停止渲染的方式优化应用性能，其会影响到 `componentWillMount` 的触发次数。）

### Redux

react的数据管理仓库，类似于vue中的vuex。

想理解redux，那么就要明白它存在的意义是什么。

首先，react的数据传递是DOM tree自上向下单向传递，而自下向上并没有这种方法，只能是通过父节点写一个方法传下去，子节点通过调用父节点的方法将数据传进去，然后父节点回调到数据，这样的话需要的数据就要尽可能的层级高，才能向多个子节点服务。但是如果DOM结构错综复杂，兄弟节点中间通信频繁，这样的方法就很乏力，所以我们需要一个在DOM tree顶端的一个数据仓库，可以实现数据的分发处理，那么这个仓库，就是redux

Redux有三剑客：

- action：包装包裹
- reducer：快递员
- store：物流仓库中心

redux通过connect对接现实世界（react）

redux适合大型项目，错综复杂的DOM结构与数据交互，小型项目并不不适合使用，因为简单的功能也需要很多代码来实现。

所以就出现了mobx，其推崇代码简约易懂，也就是适用于小项目的redux。



**Redux实现原理解析：**

**为什么要用redux**

> 在`React`中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过`props`）,所以，两个非父子组件之间通信就相对麻烦，`redux`的出现就是为了解决`state`里面的数据问题

**Redux设计理念**

> `Redux`是将整个应用状态存储到一个地方上称为`store`,里面保存着一个状态树`store tree`,组件可以派发(`dispatch`)行为(`action`)给`store`,而不是直接通知其他组件，组件内部通过订阅`store`中的状态`state`来刷新自己的视图

![img](https://pic1.zhimg.com/80/v2-5436efbfb2163f0110848e284dfb1960_720w.jpg)

**Redux三大原则**

- 唯一数据源

> 整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中

- 保持只读状态

> `state`是只读的，唯一改变`state`的方法就是触发`action`，`action`是一个用于描述以发生时间的普通对象

- 数据改变只能通过纯函数来执行

> 使用纯函数来执行修改，为了描述`action`如何改变`state`的，你需要编写`reducers`

**Redux源码**

```text
let createStore = (reducer) => {
    let state;
    //获取状态对象
    //存放所有的监听函数
    let listeners = [];
    let getState = () => state;
    //提供一个方法供外部调用派发action
    let dispath = (action) => {
        //调用管理员reducer得到新的state
        state = reducer(state, action);
        //执行所有的监听函数
        listeners.forEach((l) => l())
    }
    //订阅状态变化事件，当状态改变发生之后执行监听函数
    let subscribe = (listener) => {
        listeners.push(listener);
    }
    dispath();
    return {
        getState,
        dispath,
        subscribe
    }
}
let combineReducers=(renducers)=>{
    //传入一个renducers管理组，返回的是一个renducer
    return function(state={},action={}){
        let newState={};
        for(var attr in renducers){
            newState[attr]=renducers[attr](state[attr],action)

        }
        return newState;
    }
}
export {createStore,combineReducers};
```

详情请见：

https://www.zhihu.com/question/41312576/answer/90782136

### React-router

对比``,`Link`组件避免了不必要的重渲染

。。。

### useEffect

对比生命周期函数：

useEffect(fun) -->  componentDidUpdate()

useEffect(fun, []) --> componentDidMount()

useEffect(fun,[state1]) --> componentDidUpdate()  （仅state1变化时才执行）

### react & vue

**相同点：**

1. 数据驱动页面，提供响应式的试图组件
2. 都有virtual DOM,组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范
3. 数据流动单向，都支持服务器的渲染SSR
4. 都有支持native的方法，react有React native， vue有wexx

**不同点：**

1. 数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的
2. 数据渲染：大规模的数据渲染，react更快
3. 使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目
4. 开发风格：react推荐做法jsx + inline style把html和css都写在js了

### Time Slice

- React 在渲染（render）的时候，不会阻塞现在的线程
- 如果你的设备足够快，你会感觉渲染是同步的
- 如果你设备非常慢，你会感觉还算是灵敏的
- 虽然是异步渲染，但是你将会看到完整的渲染，而不是一个组件一行行的渲染出来
- 同样书写组件的方式

