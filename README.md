# vt-message
vue消息弹窗组件  
 
# Use 
```shell
$ npm install vt-message --save
```

```shell
 import message from 'vt-message'
 
 Vue.component('message', message)
```
 

# Api 
 
### Props 
*   `title` 弹窗标题，默认为空，不展示
*   `text` 弹窗内容，必传，支持html片段
*   `done` 按钮点击或濛层点击后响应函数
*   `button` 确认按钮的文案，支持html片段
*   `cancel` 取消按钮的文案，支持html片段，传此参数为confirm形式
*   `inline` 当有两个按钮时，按钮是否在一行展示，如果为true,按钮会变小，一行展示，默认 `false` 
*   `show`  是否显示弹窗， 默认`false` 


### Event 
*   `done` 点击按钮或濛层触发的事件，点击确认按钮参数为（true,'button'），点击取消按钮参数为（false,'button'），点击濛层参数为（false,'mask'）

 
#Plugin
```
使用该组件会默认在Vue实例上注册$message方法，
 ```
### 参数
  *   `title` 弹窗标题，默认为空，不展示
  *   `text` 弹窗内容，必传，支持html片段
  *   `done` 按钮点击或濛层点击后响应函数，如果不传，方法执行完返回一个Promise
  *   `button` 确认按钮的文案，支持html片段
  *   `cancel` 取消按钮的文案，支持html片段，传此参数为confirm形式
  *   `inline` 当有两个按钮时，按钮是否在一行展示，如果为true,按钮会变小，一行展示，默认 `false` 
  *   `tapMaskClose`  点击濛层是否触发关闭弹窗， 默认`false` 
 
##Example

###1.使用全部参数，返回Promise
<font color=#ff0000 size=4><font size=5>Warning:</font>如果传入了cancel参数且未传入done回调函数，将返回一个Promise，此时必须处理Promise的reject情况</font>

```
this.$message({
      tapMaskClose: true,
      title: '确定操作',
      text: `<p class="color:red">您确定此操作吗？<p>`,
      button: '确认修改',
      cancel:'取消'
    }).then(data=> {
       console.info('确认操作，发送确认操做的Ajax')
    }).catch(err=>{
       console.warn('取消了改操作')
    })
 ```    
###2.使用全部参数，使用回调函数
    ```
    this.$message({
          tapMaskClose: true,
          title: '确定操作',
          text: `<p class="color:red">您确定此操作吗？<p>`,
          button: '确认修改',
          cancel:'取消',
          done:(result)=>{
            if(result){
                 console.info('确认操作，发送确认操做的Ajax')
            }else{
                 console.warn('取消了改操作')
            }
          }
        })
     ```   
###3.只显文本
```
this.$message(`Hello World`)
 ```
 
###4.显示title和文本
 ```
 this.$message('提示',`Hello World`)
  ```
