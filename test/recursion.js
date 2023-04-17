// function print(n) {
//     if(n == 5) {
//         return;
//     } 
//     console.log(n);
//     print(n + 1);
// }
// print(1);
// function print1(n) {
//     if(n === 1) {
//         console.log(n);
//         return 0;
//     } else if ( n % 2 === 0) {
//         console.log(n);
//         return 1 + print1(n/2); 
//     } else if ( n % 2 === 1) {
//         console.log(n);
//         return 1 + print1(n * 3 + 1);
//     }
    
// }

// print1(6);

let arr = [];
let x = 0;

function fibs(n) {
    if(n === 0) {
        return;
    } else {
        arr.push(x);
        x = 1;
        if(arr.length > 1) {
            x = arr[arr.length - 1] + arr[arr.length - 2];
        }
        return fibs(n - 1);
    }
   
}

fibs(11);

console.log(arr);

function fibo1(n) {
    if ( n < 2) 
        return n;
    return fibo1(n - 1) + fibo1(n - 2);
}

console.log(fibo1(50));

let arr2 = [23,45,67,123,2,56,89,11];



