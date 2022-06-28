// 20. What is an array? Create an array with the numbers 1, 2, and 3 in JavaScript
// An array is a variable that can contain a list of values

const arr_1 = [1,2,3];



// 22. Implement a simple sorting algorithm from the ones you fill in question 6. Pseudocode is enough, but functional code is better.
 
function selectionSort(_arr) {
    for (let i = 0; i < _arr.length - 1; i++) {
        let min = i;
        for (let j = i; j < _arr.length; j++) {
            if (_arr[min] > _arr[j])
                min = j;
        }
        if (i !== min) {
            let prev_min = _arr[i];
            _arr[i] = _arr[min];
            _arr[min] = prev_min;
        }
    }
    return _arr;
}



console.log(selectionSort([3,6,2,1,4]));