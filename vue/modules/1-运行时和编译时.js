const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}

const Render = (obj, root) => {
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (Array.isArray(obj.children)) {
    obj.children.forEach(item => Render(item, el))
  }

  root.appendChild(el)
}

Render(obj, document.body)
