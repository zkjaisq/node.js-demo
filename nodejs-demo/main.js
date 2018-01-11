myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://www.baidu.com')//配置request
    request.onreadystatechange = () => {
        if (request.readyState !== 4) {
            
        }
        if (request.status >= 200 && request.status < 300) {
            console.log('请求都完成了')
            console.log(request.responseText)
            let string = request.responseText
            let object = window.JSON.parse(string)//把符合JSON语法的字符串转换成JSON对象
            console.log(object)
            console.log(typeof object)
            console.log(object.note.from)
        } else if (request.status >= 400) {
            console.log('请求失败的了')
        }
    }

    request.send()
})
