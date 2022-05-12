const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// https://www.codewars.com/kata/56f253dd75e340ff670002ac/train/javascript
// A squared string is a string of n lines, each substring being n characters long. We are given two n-squared strings. For example:

// s1 = "abcd\nefgh\nijkl\nmnop" s2 = "qrst\nuvwx\nyz12\n3456"

// Let us build a new string strng of size (n + 1) x n in the following way:

// The first line of strng has the first char of the first line of s1 plus the chars of the last line of s2.
// The second line of strng has the first two chars of the second line of s1 plus the chars of the penultimate line of s2 except the last char
// and so on until the nth line of strng has the n chars of the nth line of s1 plus the first char of the first line of s2.
// Calling this function compose(s1, s2) we have:

// compose(s1, s2) -> "a3456\nefyz1\nijkuv\nmnopq"
// or printed:
// abcd    qrst  -->  a3456 // fist char first line + last line
// efgh    uvwx       efyz1 // first 2 char second line + last line - last char
// ijkl    yz12       ijkuv // etc
// mnop    3456       mnopq // etc

function compose(s1, s2) {
    let lineS1 = s1.split('\n')
    let lineS2 = s2.split('\n')
    let strng = ''

    for(let i=0 ; i<lineS1.length ; i++) {
        let left = lineS1[i].slice(0 , i+1)
        let right = lineS2[lineS2.length-i-1].slice(0, lineS2[i].length-i)

        strng += left+right+'\n'
    }
    return strng.slice(0, -1) //get rid of last \n
}

//console.log(compose("abcd\nefgh\nijkl\nmnop", "qrst\nuvwx\nyz12\n3456"));

//=================================================================================
//https://www.codewars.com/kata/58ce8725c835848ad6000007/train/javascript
// All we eat is water and dry matter.

// Let us begin with an example:

// John bought potatoes: their weight is 100 kilograms. Potatoes contain water and dry matter. The water content is 99 percent of the total weight. He thinks they are too wet and puts them in an oven - at low temperature - for them to lose some water.

// At the output the water content is only 98%.

// What is the total weight in kilograms (water content plus dry matter) coming out of the oven?

// He finds 50 kilograms and he thinks he made a mistake: "So much weight lost for such a small change in water content!"

// Can you help him?

// Task
// Write function potatoes with

// int parameter p0 - initial percent of water-
// int parameter w0 - initial weight -
// int parameter p1 - final percent of water -
// potatoesshould return the final weight coming out of the oven w1 truncated as an int.

// Example:
// potatoes(82, 127, 80) => 114
// potatoes(93, 129, 91) => 100

function potatoes(p0, w0, p1) {
    let dryMatterWeight = w0*(100-p0) //initial weight multiplied by dry percentage
    // let w1 be the final mass, we know w1 equal to dry matter + wet matter   i.e. :
    // w1 = dryMatterWeight + p1*w1 <=>
    // w1 = dryMatterWeight / (100 - p1)

    return Math.floor(w0 * (100 - p0) / (100 - p1))
 }

// console.log(potatoes(82, 127, 80));
// console.log(potatoes(93, 129, 91));

//================================================================================
// https://www.codewars.com/kata/5b45e4b3f41dd36bf9000090/train/javascript
// Guess the Sequence
// You have read the title: you must guess a sequence. It will have something to do with the number given.

// Example
// x = 16
// sequence(16)
// result = [1, 10, 11, 12, 13, 14, 15, 16, 2, 3, 4, 5, 6, 7, 8, 9]

// const x = 7
// sequence(7)
// const result = [1, 2, 3, 4, 5, 6, 7]

// const x = 22
// sequence(22)
// const result = [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 3, 4, 5, 6, 7, 8, 9]

function sequence(x) {
    let result=[]

    for(let i=1 ; i<=9 ; i++) {
        if(i<=x) result.push(i)
        for(let j=i*10 ; j<(i+1)*10 ; j++) {
            if(j<=x) {
                result.push(j)
            }
        }
    }

    return result
}

function sequenceBis(x) {
    let array = [];
    for (let i = 1; i <= x; i++) array.push(i);
    return array.sort();
}

// console.log(sequence(9));
// console.log(sequence(16));
// console.log(sequence(62));

//===============================================================================
// https://www.codewars.com/kata/605f5d33f38ca800322cb18f/train/javascript
// Tap Code Translation
// Tap code is a way to communicate using a series of taps and pauses for each letter. In this kata, we will use dots . for the taps and whitespaces for the pauses.

// The number of taps needed for each letter matches its coordinates in the following polybius square (note the c/k position). Then you "tap" the row, a pause, then the column. Each letter is separated from others with a pause too.

//    1  2  3  4  5
// 1  A  B C\K D  E
// 2  F  G  H  I  J
// 3  L  M  N  O  P
// 4  Q  R  S  T  U
// 5  V  W  X  Y  Z
// Input:
// A lowercase string of a single word (no whitespaces or punctuation, only letters).

// Output:
// The encoded string as taps and pauses.

// Examples
// text = "dot"
//   "D" = (1, 4) = ". ...."
//   "O" = (3, 4) = "... ...."
//   "T" = (4, 4) = ".... ...."
  
// output: ". .... ... .... .... ...."


// "example" -> ". ..... ..... ... . . ... .. ... ..... ... . . ....."
// "more"    -> "... .. ... .... .... .. . ....."

function tapCodeTranslation(text) {
    let thisAlpha = 'abcdefghijlmnopqrstuvwxyz' //k is missing
    arrText = text.split('').map(el => el==='k' ? 'c': el) //replace all k with a c

    let alphaVectors = []
    for(let i=1 ; i<=5 ;i++) {
        for(let j=1 ; j<=5 ;j++ ) {
            alphaVectors.push([i,j])
        }
    } //create a 25 elements long array of the vector of each letters of this alphabet

    // console.log(alphaVectors[thisAlpha.indexOf('d')]);
    // console.log(alphaVectors[thisAlpha.indexOf('o')]);
    // console.log(alphaVectors[thisAlpha.indexOf('t')]);

    let strDots = ''
    for(let letter of arrText) {
        let left='.'.repeat(alphaVectors[thisAlpha.indexOf(letter)][0])
        let right='.'.repeat(alphaVectors[thisAlpha.indexOf(letter)][1])
        strDots+= left + ' ' + right +' '
    }

    return strDots.slice(0, -1) //remove last space
}

//best answer created an object with letters and their corresponding dots string

//console.log(tapCodeTranslation('kastor'));

//===============================================================================
// https://www.codewars.com/kata/59a1ea8b70e25ef8e3002992/train/javascript
// You will be given the number of angles of a shape with equal sides and angles, and you need to return the number of its sides, and the measure of the interior angles.

// Should the number be equal or less than 2, return:

// "this will be a line segment or a dot"
// Otherwise return the result in the following format:

// "This shape has s sides and each angle measures d"
// (replace s with number of sides and d with the measure of the interior angles).

// Angle measure should be floored to the nearest integer.

// Number of sides will be tested from 0 to 180.

function describeTheShape( angles ){
    if(angles<=2) {
        return 'this will be a line segment or a dot'
    }else {
        let d = Math.floor(180-360/angles)
        return `This shape has ${angles} sides and each angle measures ${d}`
    }
}

//================================================================================
// https://www.codewars.com/kata/5f8341f6d030dc002a69d7e4/train/javascript
// Given an array of numbers and an index, return either the index of the smallest number that is larger than the element at the given index, or -1 if there is no such index ( or, where applicable, Nothing or a similarly empty value ).

// Notes
// Multiple correct answers may be possible. In this case, return any one of them.
// The given index will be inside the given array.
// The given array will, therefore, never be empty.

// Example
// leastLarger( [4, 1, 3, 5, 6], 0 )  =>  3
// leastLarger( [4, 1, 3, 5, 6], 4 )  => -1

function leastLarger(a,i) {
    let value = a[i]
    let res=-1

    let sorted = a.slice().sort((a,b)=>a-b)

    for (let j=0 ; j<sorted.length ; j++) {
        if(sorted[j]>value) return a.indexOf(sorted[j]) //index of the smallest number larger than a[i]
    }
    return res
}

// console.log(leastLarger( [4, 1, 3, 5, 6], 0 ));
// console.log(leastLarger( [1, 3, 5, 2, 4], 0 ));

//===============================================================================
// https://www.codewars.com/kata/559590633066759614000063/train/javascript
// Ben has a very simple idea to make some profit: he buys something and sells it again. Of course, this wouldn't give him any profit at all if he was simply to buy and sell it at the same price. Instead, he's going to buy it for the lowest possible price and sell it at the highest.

// Task
// Write a function that returns both the minimum and maximum number of the given list/array.

// Examples
// minMax([1,2,3,4,5])   == [1,5]
// minMax([2334454,5])   == [5, 2334454]
// minMax([1])           == [1, 1]
// Remarks
// All arrays or lists will always have at least one element, so you don't need to check the length. Also, your function will always get an array or a list, you don't have to check for null, undefined or similar.

function minMax(arr){
    let min = Math.min(...arr)
    let max = Math.max(...arr)

    return [min, max]
}

//==============================================================================
// Your task is to determine how many files of the copy queue you will be able to save into your Hard Disk Drive. The files must be saved in the order they appear in the queue.

// Input:
// Array of file sizes (0 <= s <= 100)
// Capacity of the HD (0 <= c <= 500)
// Output:
// Number of files that can be fully saved in the HD.
// Examples:
// save([4,4,4,3,3], 12) -> 3
// # 4+4+4 <= 12, but 4+4+4+3 > 12
// save([4,4,4,3,3], 11) -> 2
// # 4+4 <= 11, but 4+4+4 > 11
// Do not expect any negative or invalid inputs.

function save(sizes, hd) {
    let space=0
    let counter=0

    while(space+sizes[counter] <= hd) {
        space+=sizes[counter]
        counter++
    }
    return counter
}

//==============================================================================
// https://www.codewars.com/kata/582746fa14b3892727000c4f/train/javascript
// You will be given an array of objects (hashes in ruby) representing data about developers who have signed up to attend the coding meetup that you are organising for the first time.

// Your task is to return the number of JavaScript developers coming from Europe.

// For example, given the following list:

// var list1 = [
//   { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'JavaScript' },
//   { firstName: 'Maia', lastName: 'S.', country: 'Tahiti', continent: 'Oceania', age: 28, language: 'JavaScript' },
//   { firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML' },
//   { firstName: 'Sumayah', lastName: 'M.', country: 'Tajikistan', continent: 'Asia', age: 30, language: 'CSS' }
// ];
// your function should return number 1. (Noah is the only JavaScript developer from Europe)

// If, there are no JavaScript developers from Europe then your function should return 0.

// Notes:

// The format of the strings will always be Europe and JavaScript.
// All data will always be valid and uniform as in the example above.

function countDevelopers(list) {
    let res=0
    for (let dev of list) {
        if(dev['continent'] === 'Europe' && dev['language']==='JavaScript') res++
    }
    return res
}

function countDevelopersBis(list) {
    return list.filter(el => el.continent === 'Europe' && el.language === 'JavaScript').length
}

//=============================================================================
// https://www.codewars.com/kata/595e9f258b763bc2d2000032/train/javascript
// Groups of characters decided to make a battle. Help them to figure out what group is more powerful. Create a function that will accept 2 variables and return the one who's stronger.

// Rules
// Each character has its own power:
//   A = 1, B = 2, ... Y = 25, Z = 26
//   a = 0.5, b = 1, ... y = 12.5, z = 13
// Only alphabetical characters can and will participate in a battle.
// Only two groups to a fight.
// Group whose total power (a + B + c + ...) is bigger wins.
// If the powers are equal, it's a tie.
// Examples
// "One", "Two"  -->  "Two"
// "ONE", "NEO"  -->  "Tie!"

function battle(x, y) {
    let xPower = 0
    let yPower = 0

    x.split('').forEach(el => {
        if(alphaU.includes(el)) {
            xPower+=alphaU.indexOf(el)+1
        }else if(alphaL.includes(el)){
            xPower+=(alphaL.indexOf(el)+1)/2
        }
    })

    y.split('').forEach(el => {
        if(alphaU.includes(el)) {
            yPower+=alphaU.indexOf(el)+1
        }else if(alphaL.includes(el)){
            yPower+=(alphaL.indexOf(el)+1)/2
        }
    })
    //could have been a reduce instead of a forEach

    if(xPower>yPower) {
        return x
    }else if(xPower<yPower) {
        return y
    }else {
        return "Tie!"
    }
}

// console.log(battle("One","Two"));

//==============================================================================
// https://www.codewars.com/kata/5803753aab6c2099e600000e/train/javascript
// Did you ever want to know how many days old are you? Complete the function which returns your age in days. The birthday is given in the following order: year, month, day.

// For example if today is 30 November 2015 then

// ageInDays(2015, 11, 1) returns "You are 29 days old"
// The birthday is expected to be in the past.

function ageInDays(year, month, day){
    // Note that month == 1 means January (in contrast to JavaScripts Date where the month is zero based)
    let date = new Date(year, month-1, day)
    let today = new Date()
    let deltaTime = today.getTime() - date.getTime() //time diff in millisec
    deltaTime = deltaTime/1000/3600/24
    let res = Math.floor(deltaTime)

    return `You are ${res} days old`
  }

//console.log(ageInDays(2022, 5, 10));


//================================================================================
// https://www.codewars.com/kata/56a1c074f87bc2201200002e/train/javascript
// Write a function that given, an array nums, returns an array containing at each index i the amount of numbers that are smaller than arr[i] to the right.

// For example:

// * Input [5, 4, 3, 2, 1] => Output [4, 3, 2, 1, 0]
// * Input [1, 2, 0] => Output [1, 1, 0]

function smaller(nums) {
    let mapped = nums.map( (el,idx) => {
        let right = nums.slice(idx)
        return right.filter(e => e<el).length //amount of number smaller
    })
    return mapped
}

//console.log(smaller([5, 4, 3, 2, 1]));

//=============================================================================
// https://www.codewars.com/kata/55e6f5e58f7817808e00002e/train/javascript
// A number m of the form 10x + y is divisible by 7 if and only if x − 2y is divisible by 7. In other words, subtract twice the last digit from the number formed by the remaining digits. Continue to do this until a number known to be divisible by 7 is obtained; you can stop when this number has at most 2 digits because you are supposed to know if a number of at most 2 digits is divisible by 7 or not.

// The original number is divisible by 7 if and only if the last number obtained using this procedure is divisible by 7.

// Examples:
// I  m = 371 -> 37 − (2×1) -> 37 − 2 = 35 ; thus, since 35 is divisible by 7, 371 is divisible by 7.

// The number of steps to get the result is 1.

// II m = 1603 -> 160 - (2 x 3) -> 154 -> 15 - 8 = 7 and 7 is divisible by 7.

// III m = 372 -> 37 − (2×2) -> 37 − 4 = 33 ; thus, since 33 is not divisible by 7, 372 is not divisible by 7.

// IV m = 477557101->47755708->4775554->477547->47740->4774->469->28 and 28 is divisible by 7, so is 477557101. The number of steps is 7.

// Task:
// Your task is to return to the function seven(m) (m integer >= 0) an array (or a pair, depending on the language) of numbers, the first being the last number m with at most 2 digits obtained by your function (this last m will be divisible or not by 7), the second one being the number of steps to get the result.

// Forth Note:
// Return on the stack number-of-steps, last-number-m-with-at-most-2-digits

// Examples:
// seven(371) should return [35, 1]
// seven(1603) should return [7, 2]
// seven(477557101) should return [28, 7]

function seven(m) {
    let counter=0

    while (m>99) {
        let strM = m.toString()
        let lastDig = strM.slice(-1)
        let firstDigs = strM.slice(0,-1)
        m = +firstDigs - +lastDig*2

        //m = Math.floor(m/10) - (m%10)*2;

        counter++
    }

    return [m, counter]
}

// console.log(seven(371));
// console.log(seven(477557101));


//===============================================================================
// https://www.codewars.com/kata/59c0b9d4cb7fb4dd41000962/train/javascript
// You walk in a maze. You need to reach the exit through many rooms. These rooms are in a straight line.

// You can only walk in the dark. Otherwise, you will be caught by the enemy.

// Your trouble is that some rooms have light bulbs. If the light bulb is bright when you enter the room. You were caught by the enemy.

// Fortunately, the status of these bulbs (on/off) is aoto-switched every minute. So you have a chance to go through the maze.

// Task
// Let's us use a string map to represent these rooms， like this: "xo oxox".

// "x" means there is a bulb in the room, and its initial status is off;

// "o" means there is a bulb in the room, and its initial status is on;

// " "(space) means a room without bulb, it's always dark.

// Your task is to determine if you can go through the maze. Return true if you can, false otherwise.

// Note
// Your initial position is the most left, the exit position is the most right.

// Your moving speed is 1 minute per step. You can not stop before you start your moving until you reach the exit.

// Examples
// For map = "xo oxox". The output should be true.

// step 0 :  xo oxox
//           ^ <--------You are here
// step 1 :  ox xoxo
//            ^ <--------You are here
// step 2 :  xo oxox
//             ^ <--------You are here
// step 3 :  ox xoxo
//              ^ <--------You are here
// step 4 :  xo oxox
//               ^ <--------You are here
// step 5 :  ox xoxo
//                ^ <--------You are here
// step 6 :  xo oxox
//                 ^ <--------You are here
// step 7 :  ox xoxo
//                  ^ <--------You've go through the maze :)
// For map = "xo oxox". The output should be false.

// step 0 :  xo  oxox
//           ^ <--------You are here
// step 1 :  ox  xoxo
//            ^ <--------You are here
// step 2 :  xo  oxox
//             ^ <--------You are here
// step 3 :  ox  xoxo
//              ^ <--------You are here
// step 4 :  xo  oxox
//               ^ <--------You were caught by the enemy :(

function bulbMaze(map){
    let result=true
    let mapCpy = map.split('').slice()
    for(let i=0 ; i<map.length ; i++){
        if(mapCpy[i]==='o') {
            result=false
        }
        mapCpy=switchLight(mapCpy)
    }

    return result

    function switchLight(map) {
        return map.map(el => {
            if (el==='x'){return 'o'}
            else if(el==='o') {return 'x'}
        })
    }

}

// console.log(bulbMaze("xo oxox")); //true
// console.log(bulbMaze("xo  oxox")); //false

//================================================================================
//https://www.codewars.com/kata/619f200fd0ff91000eaf4a08/train/javascript
// Given a number N, determine if the sum of N consecutive numbers is odd or even.

// If the sum is definitely an odd number, return Odd.
// If the sum is definitely an even number, return Even.
// If the sum can be either odd or even ( depending on which first number you choose ), return Either.
// Examples
// Odd_or_Even(1) should return Either, because the sum can be odd or even.
// Odd_or_Even(6) should return Odd, because 6 consecutive numbers contain 3 odd and 3 even numbers, so their sum is always odd.
// Odd_or_Even(8) should return Even, because 8 consecutive numbers contain 4 odd and 4 even numbers, so their sum is always even.
// Note
// const ODD = "Odd";
// const EVEN = "Even";
// const EITHER = "Either";
// is Preloaded.

function oddOrEven(n) {
    //It looks like if n is odd, then the answer is either
    //But if n is even, the answer depends if n/n is odd or even (So if it is divisible by 4)

    if(n%4 === 0) {
        return 'Even'
    }
    else if(n%2 === 1) {
        return 'Either'
    }else{
        return 'Odd'
    }
}

//=============================================================================
