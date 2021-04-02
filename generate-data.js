var faker = require('faker');
var fs = require('fs');

//SET UP LOCALE TO USE VIETNAMESE
faker.locale = 'vi';

//RANDOM DATA
// var randomName = faker.name.findName();
// var randomID = faker.random.uuid();
// var randomImage = faker.image.imageUrl();

// var randomProduct = faker.commerce.productName();
// var randomDes = faker.commerce.productDescription();
// var randomDepartment = faker.commerce.department();

// console.log(randomName);
// console.log(randomID);
// console.log(randomImage);
// console.log(randomProduct);
// console.log(randomDes);
// console.log(randomDepartment);

const randomCategoryList = (n) => {
    if(n <=0) return [];

    const categoryList = []

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updateAt : Date.now(),
        };
        categoryList.push(category);    
    });
    return categoryList;
}

const randomProductList = (categoryList , numberProduct) => {
    if(numberProduct <=0) return [];

    const productList = []

    for (const category of categoryList) {
        Array.from(new Array(numberProduct)).forEach(() => {
            const product = {
                categoryId: categoryList.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseInt(faker.commerce.price()),
                descriptors: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updateAt : Date.now(),
                thumbnailUrl: faker.image.imageUrl(400,400),
            };
            productList.push(product);    
        });
        return productList;
    }  
}


//IIFE 
(() => {
    // random DATA
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList , 40)

    // prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Freya",
        },
    };

    // write db object to  db.json
    fs.writeFile('db.json', JSON.stringify(db) , () => {
        console.log(" DATA OK");
    })
})()