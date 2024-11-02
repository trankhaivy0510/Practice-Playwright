function solution(arr): Number{
    var result = [];

    for(var i = 0; i< arr.length; i++){
        for(var j=i+1;j<arr.length; j++){
            if(arr[i]+arr[j]==0){
                result.push(Math.abs(arr[i]));
            }
        }   
    }
    
    var langestNumber = Math.max(...result);
    return langestNumber|0;
}

// var A=[4,2,3,-2,5,-4];
var A=[4,2,3,5];
console.log(solution(A));
