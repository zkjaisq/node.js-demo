window.jQuery = function (nodesorSlector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.removeClass = function () { }
    return nodes
}
window.$ = window.jQuery
//add a ajax attribute;accept parameter;给jQuery添加了一个ajax的属性，接收的参数。
//当接受两个参数的时候，第一个参数就是url，第二个参数是剩下的参数。
window.jQuery.ajax = function ({ path, method, body, headers}) {
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest()
        request.open(method, path)//配置request
        for(let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
        }//设置RequestHeader。。。。
        request.onreadystatechange = () => {
        if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
        resolve.call(undefined, request.responseText)
        console.log('failse')
        } else if (request.status >= 400) {
        reject.call(undefined, request)
        }
        }
        }
        request.send(body)
        console.log(1)
    })}
          
          

    /*let path = options.path
    let method = options.method
    let body = options.body
    let successFn =options.successFn
    let failFn = options.failFn
    let headers = options.headers*/
    //es6语法；解构赋值。
    //  let {path,method,body,successFn,failFn,headers,} =options




    
    myButton.addEventListener('click', (e)=>{
        let promise = window.jQuery.ajax({
          path: '/kejia',
          method: 'get',
          headers: {
            'content-type':'application/x-www-form-urlencoded',
            'frank': '18'
          }
        })
        promise.then(
            (text)=>{console.log(text)},
            (request)=>{console.log(request)}
          )
        
        })