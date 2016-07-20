  var data = {
        title: 'todos',
        newTodo: '',
        disabled:false,
        todos: [
            {content:'1234'}
        ],
        src:'/skin/images/common/logo1.png',
        lists:[
            {name:'全部',actived:true},{name:'已完成',actived:false},{name:'未开始',actived:false},{name:'进行中',actived:false}
        ]
    };
    var myVM =  new Vue({
        el: '#demo',
        data: data,
        ready:function(){
    //                this.$http.post(url,postdata,function(rt){
    //                    this.$set('books', data);
    //                }).error(function(rt){
    //                   console.log(rt);
    //                })
        },
        methods:{
            addTodo:function(){
                var content = this.newTodo.trim();
                if(content){
                    this.todos.push({content:content});
                    this.newTodo = '';
                }
            },
            removeTodo: function (index) {
                console.log(index);
                this.todos.splice(index,1);
            },
            disabled:function(){
                this.disabled = true;
            },
            changed:function(index){
                console.log(index);
                this.lists[index].actived=true;
            }
        }
    });

    console.log(myVM.$data === data);
    console.log(myVM.$el === document.getElementById("demo"));
    myVM.$watch("newTodo",function(newVal,oldVal){
        console.log(myVM.newTodo);
    });

    /*组件*/
    Vue.component('couser', {
        template: '#template-couser',
        props: ['heading', 'color'],
        data: function () {
            return {count: 0};
        }
    });
    new Vue({
        el:"#app"
    });
    /*组件*/

    /*ajax*/
    var myAjax = new Vue({
        el:"#testajax",
        data:{
            items:{}
        },
        ready:function(){
            this.$http({
                url:'/tpl/test/json/testajax.json',
                method:'get'
            },{
                emulateJSON:true
            }).then(function(response){
                console.log(response);
                var data = response.data.data.memberMsg;
                this.$set('items', data);
            },function(response){
                console.log("异常");
            });
        }

    });
