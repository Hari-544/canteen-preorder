import "dotenv/config";
import mongoose from "mongoose";
import MenuItem from "./models/MenuItem";
import QuizQuestion from "./models/QuizQuestion";

const menu = [
  ["Upma",20,"Breakfast"],["Idly",20,"Breakfast"],["Gari",25,"Breakfast"],["Bajji",25,"Breakfast"],["Punugu",25,"Breakfast"],["Puri",30,"Breakfast"],["Plain dosa",30,"Breakfast"],["Onion Dosa",35,"Breakfast"],["Pesarattu",35,"Breakfast"],["Rava Dosa",35,"Breakfast"],["Egg Dosa",40,"Breakfast"],["Masala Dosa",40,"Breakfast"],["Sambar idly",40,"Breakfast"],["Sambar Gari",40,"Breakfast"],["Upma Pesarattu",45,"Breakfast"],["Chapati",35,"Breakfast"],["Parotta",35,"Breakfast"],["Egg chapati",45,"Breakfast"],["Egg parotta",45,"Breakfast"],["Omelette",20,"Breakfast"],["Meals",70,"Meals"],["Chicken Biryani",150,"Biryani"],["Veg Curry",25,"Meals"],["Chicken Curry",70,"Meals"],["Veg fried rice",60,"Fast Food"],["Egg Fried Rice",70,"Fast Food"],["Chicken fried rice",80,"Fast Food"],["Roast Fried Rice",120,"Fast Food"],["Veg Noodles",60,"Noodles"],["Egg Noodles",70,"Noodles"],["Chicken Noodles",80,"Noodles"],["Tea (Parcel)",15,"Beverage"],["Coffee (Parcel)",20,"Beverage"],["Horlicks (Parcel)",25,"Beverage"],["Boost (Parcel)",25,"Beverage"]
].map(([name,price,category])=>({name,price,category,available:true}));

const questions = [
  {question:"Which React Hook is commonly used to manage component state?",options:["useState","useRoute","useServer","useModel"],correctAnswer:0},
  {question:"Which HTTP method is normally used to create a resource?",options:["GET","POST","DELETE","HEAD"],correctAnswer:1},
  {question:"Which MongoDB tool maps documents to JavaScript objects in this project?",options:["Express","Mongoose","Vite","Axios"],correctAnswer:1},
  {question:"Which Node.js module provides URL parsing utilities?",options:["fs","http","url","path"],correctAnswer:2},
  {question:"Which Express middleware parses incoming JSON request bodies?",options:["express.json()","express.static()","express.Router()","res.json()"],correctAnswer:0}
];

async function seed() {
  const uri=process.env.MONGODB_URI;
  if(!uri) throw new Error("Set MONGODB_URI in server/.env before seeding.");
  await mongoose.connect(uri);
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menu);
  await QuizQuestion.deleteMany({});
  await QuizQuestion.insertMany(questions);
  console.log(`Seeded ${menu.length} menu items and ${questions.length} quiz questions.`);
  await mongoose.disconnect();
}
seed().catch(async error=>{console.error(error);await mongoose.disconnect().catch(()=>undefined);process.exit(1);});
