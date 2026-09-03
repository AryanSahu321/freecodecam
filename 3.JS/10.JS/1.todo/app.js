/* let num =9;
if(num%10===0){
    console.log("good")
}else{
    console.log('bad')
}
let name=prompt("enter name");
let age=prompt("enter age");
console.log(`${name} is ${age} years old`);


let q=9;
switch(q){
    case 1: console.log("January,February,March");
    break;
    case 2: console.log("April,May,June");
    break;
    case 3: console.log("July,August,September");
    break;
    default:console.log("invalid");
}

let str=prompt("enter string");
if((str[0]==='A' || str[0]==='a') && str.length>=5){
    console.log("good");
}else{
    alert("not good");
}
let n1=prompt("enter number");
let n2=prompt("enter num 2");
let n3=prompt("enter n3");
if(n1>n2){
    if(n1>n3){
        console.log(`${n1} is big`);
    }else{
        console.log(`${n3} is big`);
    }
}else{
    if(n2>n3){
        console.log(`${n2} is big`);
    }else{
        console.log(`${n3} is big`);
    }
}
let n1=prompt("enter number");
let n2=prompt("enter num 2");
if(n1%10==n2%10){
    console.log("same digit");
}else{
    console.log("different digit");
}

let str="apnacollage";
console.log(str.replace("apna","our"));

let a=[1,2,3];
console.log(a.concat([4,5,6]));
console.log(a.reverse());
console.log(a.slice(-3,)) */
//----------------------------------------------------------------------------
//js part 3 assi
/* let n=prompt("enter a number n: ");//always return string
let arr1 =[7,9,0,-2];
console.log(`first n elements of ${arr1} is ${arr1.slice(0,n)}`);
console.log(`last n elements of ${arr1} is ${arr1.slice(-n)}`);
let str=prompt("enter string: ");
if(str.trim()===''){
    console.log("empty");
}else{
    console.log("not empty");
}
if(str[n]>='a' && str[n]<='z'){
    console.log(`${str[n]} is lowercase`);
}else{
    console.log(`${str[n]} is uppercase`);
}
let arr2=[1,2,3,4,5,6,7];
if(arr2.includes(parseInt(n))){//Number(n)
     console.log(`${arr2} contain ${n}`);
} */


 //--------------------------------------------------------

 //js part 4

 /* for(let i=1;i<=10;i+=2){//i+2 give infinite loop
    console.log(i); //website crash ho jati hai
 }

// for of , array,string , collestions ka liya use karta hai
let arr1=[1,23,4,5,6,78,4];
for(i of arr1){
    console.log(i);
} */


//-----------------------------------------------
// js part 5
let num=parseInt(prompt("enter num: "));
let arr=[1,2,3,4,5,6,2,3];
console.log(`given arr ${arr}`);
for(let i=0;i<arr.length;i++){
    if(num===arr[i]){
        arr.splice(i,1);
    }
}
console.log(`updated arr ${arr}`);

let num2=parseInt(prompt("enter a number: "));
let cnt=0;
while(num2>0){
    cnt++;
    num2=Math.floor(num2/10);
}
console.log(cnt);

let num3 = parseInt(prompt("enter num to get factorial: "));
console.log(`u entered ${num3}`);
let fact=1;
for(let i=num3;i>=0;i--){
    if(i===0 || i===1){
        break;
    }else{
        fact*=i;
    }
}
console.log(`fact is ${fact}`);
