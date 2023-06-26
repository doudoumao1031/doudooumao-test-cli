const semver = require('semver')
const arr = [
    '1.0.6',
    '1.0.2',
    '1.0.3',
    '1.0.1',
    '1.0.8',
    '1.0.9'
]
// const arr = [
//     100,1,2,28,99
// ]
// const arr = [
//     1,2
// ]
console.log(arr)
function compareNum(x,y){
    if(x==y){return 0}
    if(semver.gt(y,x)){
        return 1
    }else{
        return -1
    }
}
arr.sort(compareNum);
// arr.sort((a,b) => {
//     console.log(a, b, semver.gt(a,b))
//     if(semver.gt(a,b)){
//         return 1
//     }else{
//         return -1
//     }
// })
console.log(arr)

// var arr2=[12,5,28,2];
// // 对sort添加比较函数
// function compareNum(x,y){
//     console.log(x,y)
//     if(x<y){
//         return -1;
//     }else if(x==y){
//         return 0;
//     }else if(x>y){
//         return 1;
//     }
// }
// //再次调用sort()函数
// arr2.sort(compareNum);
// console.log('arr2 again',arr2); //[2, 5, 12, 28]
  