


window.jQuery = function (nodesorSlector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.removeClass = function () { }
    return nodes
}
window.$ = window.jQuery
//add a ajax attribute;accept parameter;给jQuery添加了一个ajax的属性，接收的参数。
//当接受两个参数的时候，第一个参数就是url，第二个参数是剩下的参数。
window.jQuery.ajax = function ({ path, method, body, successFn, failFn, headers, }) {
    
    /*let path = options.path
    let method = options.method
    let body = options.body
    let successFn =options.successFn
    let failFn = options.failFn
    let headers = options.headers*/
    //es6语法；解构赋值。
    //  let {path,method,body,successFn,failFn,headers,} =options

    let request = new XMLHttpRequest()
    request.open(method, path)//配置request
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)

    }//设置RequestHeader。。。。
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
                console.log('failse')
            } else if (request.status >= 400) {
                console.log(shibai)
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}


function f1(responseText) { }
function f2(responseText) { }
myButton.addEventListener('click', () => {
    window.jQuery.ajax({
        path: '/kejia',
        method: 'get',
        body: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            frank: '18'
        },
        successFn: (e) => {
            console.log(e)
            f1.call(undefined, e)
            f2.call(undefined, e)
        },//回调 函数
        failFn: (x) => { console.log(x); console.log(x.status) }
    })
})
