var a = [];

console.log("Generate numbers from 1 to 100 in an array randomaly");
getNumber(a, 100, 0)
console.log(a.toString(), "\n");
console.log("even numbers ");


var p1 = new Promise((res,rej)={
    var s = []
    printEvenNo(a, 100, 0, s, 0);
    console.log(s.toString(), "\n");
});

var p2 = new Promise((res,rej)=>{
    var se = [];
    var sum = printOddSum(a, 100, 0, 0)
    console.log("odd sum ", sum);
});

Promise.all([p1, p2]).then(res => {
   console.log("even numbers\n", res[0].toString(), "\n\nsum of odd number ", res[1]);
   var fs = [];
   fs[0] = 0;
   fs[1] = res[1];
   multiplyFibbSeris(0, 1, fs, 2, sum)
   console.log("fibbonicci no ", fs.toString());
});


function getNumber(a, n, i) {
    if (i === n)
        return;
    a[i] = Math.floor((Math.random() * 100) + 1);
    return getNumber(a, n, i + 1)
}

function printEvenNo(a, n, i, s, j) {
    if (i === n)
        return;

    if (a[i] % 2 === 0) {
        s[j++] = a[i];
    }
    return printEvenNo(a, n, i + 1, s, j)
}

function printOddSum(a, n, i, sum) {
    if (i === n)
        return sum;

    if (a[i] % 2 !== 0) {
        sum += a[i]
    }
    return printOddSum(a, n, i + 1, sum)
}

function multiplyFibbSeris(a, b, fs, p, sum) {
    var c = a + b;
    if (c > 10)
        return;
    fs[p] = c * sum;
    return multiplyFibbSeris(b, c, fs, p + 1, sum);
}
