
新增了用angular做的tab切换的案例：ng-tab.html

新增了用angular做的根据子controller来判断切换到父controller的案例，PC端常见的页面上-左-右结构：ng-index.html

新增了用angular做的modal弹框指令:ng-table-modal.html
注意：ng-table-modal是主页面，以PC端常见的列表形式，展示了modal弹款、popover弹款、alert弹框以及分页。所以，我将这四个功能封装成指令，具体实现方法在modul中ng-table-modul.js（即页面的modul），具体调用方法可参考ng-table-modal.js（即页面的controller）。

新增了用angular做的深入了解directive中的scope用法：ng-scope.html
注意：scope最常见的用法是true/false、{@、&、=}
当为true的时候，将继承父作用域的变量，只是自身隔离开了。意思是：改变父亲的值，儿子的值随之变化，但是改变儿子的值，父亲的值不变。（继承隔离）
当为false的时候，将继承父作用域的变量，自身也没有隔离开。意思是：改变父亲的值，儿子的值随之变化，反之亦然。（继承不隔离）
当为{}的时候，没有继承父亲的值，所以儿子的值为空，改变任何一方的值均不能影响另一方的值。（不继承隔离）
@定义之后，绑定一个局部 scope 属性到当前 dom 节点的属性值。结果总是一个字符串，因为 dom 属性是字符串。关联父作用域的一个字符串，在自己的作用域controller中赋值。例如：name:'@text'，html中：<div text="我是案例"></div>
=定义之后，通过 directive 的 attr 属性的值在局部 scope 的属性和父 scope 属性名之间建立双向绑定，在父作用域中赋值。自身的作用域controller几乎作用不到。
&定义一个方法的关联。提供一种方式执行一个表达式在父 scope 的上下文中。如果没有指定 attr 名称，则属性名称为相同的本地名称。


