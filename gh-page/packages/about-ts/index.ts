// 逆变协变
// interface animal {
//     age: number
// }
//
// interface dog extends animal {
//     type: 'dog'
// }
//
// interface dog1 extends dog {
//     name: 'dog1'
// }
//
// let fq: (x: dog) => dog = x => x
// let f1: (x: dog1) => dog1 = x => x
// let f2: (x: dog1) => animal = x => x
// let f3: (x: animal) => animal = x => x
// let f4: (x: animal) => dog1 = x => ({...x, type: 'dog', name: 'dog1'})
//
// fq = f1
// fq = f2
// fq = f3
// fq = f4
