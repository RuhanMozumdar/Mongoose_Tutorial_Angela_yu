const mongoose = require('mongoose');
main();
async function main(){

mongoose.connect("mongodb://localhost:27017/fruitsDB");

// Create Schema
const fruitSchema= new mongoose.Schema({
    name :{
        type:String,
        required:[true,'Please check your data entry no name is specified']
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
});
const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
    name : "Apple",
    rating:10,
    review:"I don't like papaya fruit"
});
// await fruit.save();
console.log("Its connected");

const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit:fruitSchema
});
const pineapple = new Fruit({
    name : "pineapple",
    score :9,
    review : "Great fruit"
});
// pineapple.save();

const Person = mongoose.model("Person",personSchema);
const person = new Person ({
    name:"Rohit",
    age:20,
    favouriteFruit : pineapple
});
// person.save();

const Ruhan = new Person ({
    name :"Ruhan" ,
    age : 22
});
// Ruhan.save();

const kiwi = new Fruit({
    name : "kiwi",
    score:10,
    review:"osm and very high quality"
});

const mango = new Fruit({
    name : "mango",
    score:9,
    review:"ohh sweet and very tasty"
});

const grappes = new Fruit({
    name : "grappes",
    score:8,
    review:"good and very tasty  , I am loving it"
});
////////////  For inserting many document simultaneously in collections/tables ///////////

// await Fruit.insertMany([kiwi,mango,grappes])
//     .then(function(){
//     console.log("saved");
// })
// .catch(function(err){
//     console.log(err);
// });


// Fruit.find(function(err,fruits){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(fruits);
//     }
// });


/////////////////  PRINT ALL DOCUMENT IN ARRAY   ///////////////////////
// Fruit.find()
//     .then(function (fruits) {
//         console.log(fruits);
//     })
//     .catch(function (err) {
//         console.log(err);
// });

await Person.updateOne({name:"ruhan"},{favouriteFruit:grappes})
    .then(result =>{
        console.log("updated favrourite fruit of Ruhan  ");
    });

//////////////UPDATING DOCUMENT OF FRUITS COLLECTION ///////////////////
await Fruit.updateOne({_id:"641d4ac4228c0b810b0f28b3"},{name:"Mango"})
    .then(result =>{
        console.log("updated name Mango ");
    });
/////////////////////// DELETED ONE DOCUMENT FROM FRUIT COLLECTION ////////////////////////

await Fruit.deleteOne({name:"grappes"})
.then(result =>{
    console.log("deleted grappes from the Fruit collection")
})
////////////////////// Print only fruits name /////////////////////////

Fruit.find()
    .then(function (fruits) {
        mongoose.connection.close();

        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });

    })
    .catch(function (err) {
        console.log(err);
    });
////////////////////////////////////////////////////////////////////////
}




























 
