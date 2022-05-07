![personal-status](https://github-readme-stats.vercel.app/api?username=lopo12123&show_icons=true&icon_color=CE1D2D&text_color=718096&bg_color=ffffff)

![top-languages](https://github-readme-stats.vercel.app/api/top-langs/?username=lopo12123&layout=compact)

---  

###### 8 javascript quiz here.

---  

```javascript
function Animal() {
    this.type = "animal"
}

function Dog() {
    this.name = "dog"
}

Dog.prototype = new Animal()

var PavlovPet = new Dog();

console.log(PavlovPet.__proto__ === Dog.prototype)
console.log(Dog.prototype.__proto__ === Animal.prototype)
```

<details>
    <summary>answer</summary>
    <code>true true</code>
</details>

---  

```javascript
var arr = [5, 22, 14, 9];

console.log(arr.sort());
```

<details>
    <summary>answer</summary>
    <code>[14, 22, 5, 9]</code>
</details>

---  

```javascript
for (var i = 0; i < 3; i++) {
    const log = () => {
        console.log(i)
    }
    setTimeout(log, 100)
}
```

<details>
    <summary>answer</summary>
    <code>3 3 3</code>
</details>

---  

```javascript
function createNewArray(item) {
    return
    [item]
}

console.log(createNewArray(0))
```

<details>
    <summary>answer</summary>
    <code>undefined</code>
</details>

---  

```javascript
const length = 4
const numbers = []
for (var i = 0; i < length; i++) ;
{
    numbers.push(i + 1)
}

console.log(numbers)
```

<details>
    <summary>answer</summary>
    <code>[5]</code>
</details>

---  

```javascript
const clothes = ['shirt', 'socks', 'jacket', 'pants', 'hat']
clothes.length = 0

console.log(clothes[3])
```

<details>
    <summary>answer</summary>
    <code>undefined</code>
</details>

---  

```javascript
var a = 1

function output() {
    console.log(a)
    var a = 2
    console.log(a)
}

console.log(a)
output()
console.log(a)
```

<details>
    <summary>answer</summary>
    <code>1 undefined 2 1</code>
</details>

---  

```javascript
function foo() {
    let a = b = 0
    a++
    return a
}

foo()
console.log(typeof a)
console.log(typeof b)
```

<details>
    <summary>answer</summary>
    <code>undefined number</code>
</details>

---  

<details>
    <summary>some of my projects</summary>
    <p>
        [flow chart]
        <a href="https://github.com/lopo12123/flow-chart">repository</a>
        <a href="https://lopo12123.github.io/flow-chart">homepage</a>
    </p>
    <p>
        [photo resize]
        <a href="https://github.com/lopo12123/photo-resize">repository</a>
    </p>
</details>