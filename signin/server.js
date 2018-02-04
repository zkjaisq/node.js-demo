var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    let string = fs.readFileSync('./index.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./signin.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body)
      let hash = {}
      let string = body.split('&')//['email=1','password = 2','passwordconfirmation=3']
      string.forEach((string) => {
        let part = string.split('=')//['email','1']
        let key = part[0]
        let value = part[1]
        hash[key] = decodeURIComponent(value)
      })
      console.log(hash)
      let { email, password, password_confirmation } = hash
      console.log(email)
      console.log(password)
      console.log(password_confirmation)
      if (email.indexOf('@') === -1) {
        response.setHeader('Content-Type', 'application/json;charset = utf-8')
        response.statusCode = 400
        response.write('{"errors":{"email":"invalid"}}')
      } else if (password !== password_confirmation) {
        response.statusCode = 400
        response.write('password not match')
      } else {
        var users = fs.readFileSync('./users', 'utf8')
        users = JSON.parse(users)//将字符串编程一个数组[]目前只是一个空数组，没有任何的内容，我们需要像里面push内容
        let inUse = false
        for (let i = 0; i < users.length; i++) {
          let user = users[i]
          if (user.email === email) {
            inUse = true
            break
          }
        }
        if (inUse) {
          response.statusCode = 400
          response.write('eamil in use')
        } else {
          users.push({ email: email, password: password })
          let userString = JSON.stringify(users)
          fs.writeFileSync('./users', userString)
          response.statusCode = 200
        }
      }
      response.end()
    });

  } else if(path === '/sign_in'&&method=== 'GET'){
    let string = fs.readFileSync('./sign_in.html', 'utf8')
      response.setHeader('Content-Type', 'text/html;charset=utf8')
      response.write(string)
      response.statusCode = 200
      response.end()
  }else if(path ==='/sign_in'&& method === 'POST'){
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body)
      let hash = {}
      let string = body.split('&')//['email=1','password = 2','passwordconfirmation=3']
      string.forEach((string) => {
        let part = string.split('=')//['email','1']
        let key = part[0]
        let value = part[1]
        hash[key] = decodeURIComponent(value)
      })
      console.log(hash)
      let { email, password} = hash
      console.log(email)
      console.log(password)
      var users = fs.readFileSync('./users')
      users=JSON.parse(users)
      console.log(users)
      let found
      for(let i=0;i<users.length;i++){
        if(users[i].email === email && users[i].password === password){
          found =true
          break
        }
      }
      if(found){
        console.log(1)
        response.setHeader('Set-Cookie',`sign_in_email=${email}`)
        console.log(2)
        response.statusCode = 200
      }else{
        response.statusCode = 401
      }
    response.end()
    })
    }else if (path === '/signin.css') {
      let string = fs.readFileSync('./signin.css', 'utf8')
      response.setHeader('Content-Type', 'text/css;charset=utf8')
      response.write(string)
      response.end()
    } else if (path === '/signin.js') {
      let string = fs.readFileSync('./signin.js', 'utf8')
      response.setHeader('Content-type', 'application/javascript;charset =utf-8')
      response.write(string)
      response.end()
    } else if (path === '/kejia') {
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/XML;charset=utf-8')
      response.write(`
    {
      "note":{
        "to": "George",
        "from": "John",
        "heading": "Reminder",
        "content": "hi"
      }
    }
    `)
      response.end()
    } else {
      response.statuscode = 400
      response.setHeader('Content-Type', 'text/html;charset = utf-8')
      response.write("haohao")
      response.end()
    }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
