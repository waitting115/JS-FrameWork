# 减少渲染节点/降低计算量

## 避免无用渲染

为stae变量set相同值时组件也会重新渲染，哪怕UI看不出来任何变化。这可以通过shouldComponentUpdate()生命周期函数来减少其发生，进而优化性能

一定要将变化的state变量用DOM元素抱起来，如果暴露在外面，react会重新渲染其父元素以及所有的子元素，这样也会造成无用渲染。

解决无用渲染的方法：

类组件：

- 手动重写shouldComponentUpdate()
- 使用react v15.5提供的pureComponent来避免无用渲染：当react在组件进行更新时发现这个组件是一个pureComponent，那么react会比较state和prop是否发生了变化，如果没有，则不重新渲染。(pureComonent代替了老的pureRenderMixin)（pureComponent通过浅比较实现了shouleComponentUpdate()，这也是它与Component的区别，以及其实现原理）

函数组件：

- 使用react v16.6提供的React.memo()，相当于类组件中的pureCompoennt。

## render()中减少计算

比如不要在渲染函数(render)中进行数组排序、数据转换、订阅事件、创建事件处理器等等. **渲染函数中不应该放置太多副作用**

## 减少不必要的嵌套

避免嵌套地狱，最好层次清晰。

**一般不必要的节点嵌套都是滥用HOC/RenderProps 导致的。所以还是那句话‘只有在必要时才使用 xxx’**。 有很多种方式来代替HOC/RenderProps，例如优先使用 props、React Hooks

## 虚拟列表

虚拟列表是常见的‘长列表'和'复杂组件树'优化方式，它优化的本质就是减少渲染的节点。

虚拟列表只渲染当前视口可见元素:



![img](https://pic1.zhimg.com/80/v2-dadad69fc233a6110302aa79f5bed13c_720w.jpg)



虚拟列表渲染性能对比:



![img](https://pic1.zhimg.com/80/v2-25dfac341a9652a31bed3a15b10626c0_720w.jpg)



虚拟列表常用于以下组件场景:

- 无限滚动列表，grid, 表格，下拉列表，spreadsheets
- 无限切换的日历或轮播图
- 大数据量或无限嵌套的树
- 聊天窗，数据流(feed), 时间轴
- 等等

## 惰性渲染

**惰性渲染的初衷本质上和虚表一样，也就是说我们只在必要时才去渲染对应的节点**。

举个典型的例子，我们常用 Tab 组件，我们没有必要一开始就将所有 Tab 的 panel 都渲染出来，而是等到该 Tab 被激活时才去惰性渲染。

还有很多场景会用到惰性渲染，例如树形选择器，模态弹窗，下拉列表，折叠组件等等。

# 避免重新渲染

减少不必要的重新渲染也是 React 组件性能优化的重要方向. 为了避免不必要的组件重新渲染需要在做到两点:

1. 保证组件纯粹性。即控制组件的副作用，如果组件有副作用则无法安全地缓存渲染结果
2. 通过`shouldComponentUpdate`生命周期函数来比对 state 和 props, 确定是否要重新渲染。对于函数组件可以使用`React.memo`包装

另外这些措施也可以帮助你更容易地优化组件重新渲染:

## 简化props

**如果一个组件的 props 太复杂一般意味着这个组件已经违背了‘单一职责’，首先应该尝试对组件进行拆解**. **② 另外复杂的 props 也会变得难以维护, 比如会影响`shallowCompare`效率, 还会让组件的变动变得难以预测和调试**.

**简化的 props 更容易理解, 且可以提高组件缓存的命中率**

## 不变的事件处理器

①**避免使用箭头函数形式的事件处理器**, 例如:

```js
<ComplexComponent onClick={evt => onClick(evt.id)} otherProps={values} />
```

**假设 ComplexComponent 是一个复杂的 PureComponent, 这里使用箭头函数，其实每次渲染时都会创建一个新的事件处理器，这会导致 ComplexComponent 始终会被重新渲染.**

更好的方式是使用实例方法:

```js
class MyComponent extends Component {
  render() {
    <ComplexComponent onClick={this.handleClick} otherProps={values} />;
  }
  handleClick = () => {
    /*...*/
  };
}
```



② 即使现在使用`hooks`，我依然会**使用`useCallback`来包装事件处理器**，尽量给下级组件暴露一个静态的函数:

```js
const handleClick = useCallback(() => {
  /*...*/
}, []);
//只有[]里面的值发生变化才会重新计算，否则使用上一次调用计算的缓存值
//useCallback(fn, []) 等价于 useMemo(() => fn, [])

return <ComplexComponent onClick={handleClick} otherProps={values} />;
```

但是如果`useCallback`依赖于很多状态，你的`useCallback`可能会变成这样:

```text
const handleClick = useCallback(() => {
  /*...*/
  //  
}, [foo, bar, baz, bazz, bazzzz]);
```

这种写法实在让人难以接受，这时候谁还管什么函数式非函数式的。我是这样处理的:  (不太懂)

```js
function useRefProps<T>(props: T) {
  const ref = useRef < T > props;
  // 每次渲染更新props
  useEffect(() => {
    ref.current = props;
  });
}

function MyComp(props) {
  const propsRef = useRefProps(props);

  // 现在handleClick是始终不变的
  const handleClick = useCallback(() => {
    const { foo, bar, baz, bazz, bazzzz } = propsRef.current;
    // do something
  }, []);
}
```

③**设计更方便处理的 Event Props**. 有时候我们会被逼的不得不使用箭头函数来作为事件处理器：

```js
<List>
  {list.map(i => (
    <Item key={i.id} onClick={() => handleDelete(i.id)} value={i.value} />
  ))}
</List>
```

上面的 onClick 是一个糟糕的实现，它没有携带任何信息来标识事件来源，所以这里只能使用闭包形式，更好的设计可能是这样的:

```js
// onClick传递事件来源信息
const handleDelete = useCallback((id: string) => {
  /*删除操作*/
}, []);

return (
  <List>
    {list.map(i => (
      <Item key={i.id} id={i.id} onClick={handleDelete} value={i.value} />
    ))}
  </List>
);
```

如果是第三方组件或者 DOM 组件呢? 实在不行，看能不能传递`data-*`属性:

```js
const handleDelete = useCallback(event => {
  const id = event.dataset.id;
  /*删除操作*/
}, []);

return (
  <ul>
    {list.map(i => (
      <li key={i.id} data-id={i.id} onClick={handleDelete} value={i.value} />
    ))}
  </ul>
);
```

## 简化state

不是所有状态都要放在组件的state中，例如缓存数据。

state中只放需要组件相应它的变动，或者需要渲染到视图中的数据。

这样可以避免因不必要的数据变化而导致的重新渲染。

# 精细化渲染

精细化渲染指的是只有一个数据的来源变动导致的组件重新渲染。比如父组件数据更新，但只更新了A组件所需的数据，那么此时B C D...等组件就没有必要重新渲染。

举一个典型的例子，列表渲染:

```js
import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

const initialList = [];
for (let i = 0; i < 10; i++) {
  initialList.push({ id: i, name: `name-${i}`, value: 0 });
}

const store = observable({
  list: initialList,
});

export const List = observer(() => {
  const list = store.list;
  console.log('List渲染');
  return (
    <div className="list-container">
      <ul>
        {list.map((i, idx) => (
          <div className="list-item" key={i.id}>
            {/* 假设这是一个复杂的组件 */}
            {console.log('render', i.id)}
            <span className="list-item-name">{i.name} </span>
            <span className="list-item-value">{i.value} </span>
            <button
              className="list-item-increment"
              onClick={() => {
                i.value++;
                console.log('递增');
              }}
            >
              递增
            </button>
            <button
              className="list-item-increment"
              onClick={() => {
                if (idx < list.length - 1) {
                  console.log('移位');
                  let t = list[idx];
                  list[idx] = list[idx + 1];
                  list[idx + 1] = t;
                }
              }}
            >
              下移
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
});
```

上述的例子是存在性能问题的，**单个 list-item 的递增和移位都会导致整个列表的重新渲染:**

![img](https://pic1.zhimg.com/80/v2-ddf37ce31f3ca4fcb8925b7f21004d2c_720w.jpg)

原因大概能猜出来吧? 对于 Vue 或者 Mobx 来说，**一个组件的渲染函数就是一个依赖收集的上下文**。上面 List 组件渲染函数内'访问'了所有的列表项数据，那么 Vue 或 Mobx 就会认为你这个组件依赖于所有的列表项，这样就导致，只要任意一个列表项的属性值变动就会重新渲染整个 List 组件。

解决办法也很简单，就是将数据隔离抽取到单一职责的组件中。**对于 Vue 或 Mobx 来说，越细粒度的组件，可以收获更高的性能优化效果**:

```js
export const ListItem = observer(props => {
  const { item, onShiftDown } = props;
  return (
    <div className="list-item">
      {console.log('render', item.id)}
      {/* 假设这是一个复杂的组件 */}
      <span className="list-item-name">{item.name} </span>
      <span className="list-item-value">{item.value} </span>
      <button
        className="list-item-increment"
        onClick={() => {
          item.value++;
          console.log('递增');
        }}
      >
        递增
      </button>
      <button className="list-item-increment" onClick={() => onShiftDown(item)}>
        下移
      </button>
    </div>
  );
});

export const List = observer(() => {
  const list = store.list;
  const handleShiftDown = useCallback(item => {
    const idx = list.findIndex(i => i.id === item.id);
    if (idx !== -1 && idx < list.length - 1) {
      console.log('移位');
      let t = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = t;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('List 渲染');

  return (
    <div className="list-container">
      <ul>
        {list.map((i, idx) => (
          <ListItem key={i.id} item={i} onShiftDown={handleShiftDown} />
        ))}
      </ul>
    </div>
  );
});
```

效果很明显, list-item 递增只会重新渲染本身; 而移位只会重新渲染 List， 因为列表项没有变动, 所以下级 list-item 也不需要重新渲染:



![img](https://pic3.zhimg.com/80/v2-333f01475326dc9fcaef0fa43943c2c2_720w.jpg)

最后，记一下react性能优化的框架：immutable.js