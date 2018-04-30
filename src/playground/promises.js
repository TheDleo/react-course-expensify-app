const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('this is my resolve data');
    }, 5000)
});

console.log('before');

promise.then((data) => {
    console.log(data);
}, (error) => {
    console.log('Error: ', error);
});

console.log('after');