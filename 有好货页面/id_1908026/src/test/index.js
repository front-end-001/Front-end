import Component from './component';
import Wrapper from './wrapper';

function h(target, props, ...children) {
  props = Object.assign({}, props);
  if (children !== null) {
    props.children = children;
  }

  // 处理原生标签和自定义组件
  const o = typeof target === 'string' ? new Wrapper(target, props) : new target(props);

  // 处理属性和事件
  for (const name in props) {
    if (name === 'children') continue;
    if (typeof props[name] === 'function' && name.match(/^on([\s\S]+)$/)) {
      o.addEventListener(RegExp.$1.toLowerCase(), props[name]);
    } else {
      o.setAttribute(name, props[name]);
    }
  }
  return o;
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  mounted() {
    console.log('ListItem mounted');
  }

  render() {
    return (
      <div class="listitem">
        <h1>this is Listitem</h1>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

class ListView extends Component {
  constructor(props) {
    super(props);
  }

  mounted() {
    console.log('ListView mounted');
  }

  render() {
    return (
      <div class="aaaaa">
        <p>这是列表的头部</p>
        {this.props.children}
        {this.props.data.map(child => {
          return <ListItem>{child}</ListItem>;
        })}
      </div>
    );
  }
}

const app = (
  <div class="listview">
    <p>这是标题</p>
    <ListView data={[9999, 88888]}>
      <p>测试一下插槽</p>
    </ListView>
  </div>
);

console.log(app);

app.appendTo(document.body);
