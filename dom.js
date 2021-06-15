// window.dom = {} // 新建一个空对象
// window.dom.create = function () {
//
// }

// 上面的写法可以简化为
// 参数是一个标签名
window.dom = {
    // 增
    // 1.创建节点 dom.create()
    create(string) {
        // 创建一个容器container
        const container = document.createElement("template") // template标签可以存放任意元素
        container.innerHTML = string.trim() // trim()可以把字符串两端的空格去掉
        return container.content.firstChild
    },
    // 2.新增弟弟 after()用于在一个节点的后面插入一个新的节点
    after(node, newNode) {
        node.parentNode.insertBefore(newNode, node.nextSibling)
        // 找到这个节点的父节点，调用父节点的insertBefore方法，把newNode插到node的下一个节点的前面
    },
    // 3.新增哥哥 before()用于在一个节点的前面插入一个新的节点
    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node)
    },
    // 4.新增儿子 append()用于在一个节点的里面再插入一个新节点
    append(parent, newNode) {
        parent.appendChild(newNode)
    },
    // 5.新增爸爸 wrap()用于在一个节点的外面再插入一个新节点
    wrap(node, parent) {
        // 先把要插入的节点放在节点前面
        dom.before(node, parent)
        // 移除node
        dom.append(parent, node)
    },
    // 删
    // 1.删除节点 remove()
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // 2.删除后代 empty() 删父元素的所有儿子
    empty(node) {
        // 获取到所有的子节点
        // const childNodes = node.childNodes
        // const {childNodes} = node
        const array = []
        let firstNode = node.firstChild
        while (firstNode) {
            // 如果这个节点存在，那么就移除这个节点
            array.push(dom.remove(node.firstChild))
            // 移除之后，第二个节点就变成了第一个节点
            firstNode = node.firstChild
        }
        return array
    },
    // 改
    // 1.读写属性 attr(节点，属性名，属性值)
    attr(node, name, value) { // 重载
        if (arguments.length === 3) { // 如果参数长度为3，设置
            node.setAttribute(name, value)
        } else if (arguments.length === 2) { // 长度为2，只是获取值
            return node.getAttribute(name)
        }
    },
    // 2.读写文本内容 text()
    text(node, string) {  // 适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string // IE
            } else {
                node.textContent = string // 新
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    // 3.读写HTML内容 html()
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    // 4.修改style style()
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    // 5.class
    class: {
        // 添加
        add(node, className) {
            node.classList.add(className)
        },
        // 删除
        remove(node, className) {
            node.classList.remove(className)
        },
        // 查找（是否存在）
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    // 6. 添加点击事件 on(节点，事件名，事件处理函数)
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    // 7. 移除监听事件
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    // 查
    // 1. find() 获取标签或标签们
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // 2. parent() 获取父元素
    parent(node) {
        return node.parentNode
    },
    // 3. children() 获取子元素
    children(node) {
        return node.children
    },
    // 4. siblings() 获取兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    // 5. next() 获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    // 6. previous() 获取哥哥
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // 7. each() 遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    // 8. index() 获取排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}