
let $form =$('#formreferring')
$form.on('submit',(x)=>{
    x.preventDefault()
    let hash={}
    let needs =['email','password','password_confirmation']
    needs.forEach((name)=>{ 
       let value=$form.find(`[name=${name}]`).val()
       hash[name] =value
  
    })
    $form.find('.error').each((index,span)=>{
        $(span).text('')
    })
    if(hash.email === ''){
        $form.find('[name = "email"]').siblings('.error').text("填写邮箱好吗")
       return 
    }
    if(hash.password === ''){
        $form.find('[name = "password"]').siblings('.error').text('填写密码好吗')
        return 
    }
    if(hash["password_confirmation"] === ''){
        $form.find('[name = "password_confirmation"]').siblings('.error').text('填写密码好吗');
        return 
    }
    if(hash.password !==hash["password_confirmation"]){
        $form.find('[name = "password_confirmation"]').siblings('.error').text('密码不匹配');
        return
    }
console.log(hash)
    console.log(hash['password_confirmation'])
   $.post('/sign_up',hash)
   .then((response)=>{
       console.log(response)
   },(request)=>{
       console.log(request)//是符合JSON对象语法的字符串
       let {errors} = request.responseJSON//创建一个errors的变量，将JSON对象的erroes属性赋值给这个变量。
       console.log(errors)
       if(errors.email &&errors.email === 'invalid'){
        $form.find('[name = "email"]').siblings('.error').text('邮箱格式错误')
       }
   })
})