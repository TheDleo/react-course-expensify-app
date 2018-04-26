const person = {
    name: 'Dan',
    age: 54,
    location: {
        city: 'Phoenix',
        temp: 120
    }
};

const { name, age } = person;

const { city, temp: temperature } = person.location;

console.log(`${name} is ${age}.`)

console.log(`It's ${temperature} in ${city}.`);

const book = {
    title: 'Title',
    author: 'Me',
    publisher: {
        name: 'O\'Reilly'
    }
};

const { name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

// Arrays

const address = ['846 E. Marconi', 'Phoenix', 'AZ', '85022'];

const [street, myCity, state, zip] = address;

console.log(`I live in ${myCity}, ${state}.`);

const items = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [item, , mediumPrice] = items;

console.log(`A medium ${item} costs ${mediumPrice}.`);