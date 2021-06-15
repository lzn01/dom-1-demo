// document.createElement('div')
// document.createElement('span')
// div.appendChild(span)

// dom.create()
const div = dom.create("<tr><td>123</td></tr>")
console.log(div)

// dom.after()
const div2 = dom.create("<div>newDiv</div>")
dom.after(test, div2)

// dom.warp()
const div3 = dom.create(`<div id="parent"></div>`)
dom.wrap(test, div3)

// dom.empty()
const nodes = dom.empty(window.empty)
console.log(nodes)

// dom.attr() attr 缩写 attributes
dom.attr(test, 'title', 'Hi Hello')
// 读取div的title属性值
const title = dom.attr(test, 'title')
console.log(`title: ${title}`)

// dom.text() 设置这个div的内容为---
dom.text(test, '你好，这是新的内容')

// dom.style()
dom.style(test, {border: '1px solid red', color: 'blue'})
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

// dom.class.
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test,'blue'))

// dom.on()
const fn = ()=>{
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

// dom.find()
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n)=> dom.style(n, 'color', 'red'))

console.log(dom.index(s2))