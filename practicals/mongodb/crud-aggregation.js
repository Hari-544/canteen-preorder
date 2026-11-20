// MongoDB shell practicals (run in mongosh after selecting a database)
use canteen_fsd2
// Create/insert
 db.menu.insertOne({ name: "Idly", category: "Breakfast", price: 20, available: true })
 db.menu.insertMany([{ name: "Dosa", category: "Breakfast", price: 30 }, { name: "Meals", category: "Lunch", price: 70 }])
// Read/filter/sort/limit
 db.menu.find({ category: "Breakfast" })
 db.menu.find({ price: { $gte: 25 } }).sort({ price: 1 }).limit(5)
// Update/delete
 db.menu.updateOne({ name: "Idly" }, { $set: { price: 22 } })
 db.menu.deleteOne({ name: "Dosa" })
// Index + aggregation
 db.menu.createIndex({ name: 1 }, { unique: true })
 db.menu.aggregate([{ $group: { _id: "$category", itemCount: { $sum: 1 }, averagePrice: { $avg: "$price" } } }, { $sort: { itemCount: -1 } }])
// Database/collection management
 db.createCollection("lab_records")
 db.lab_records.drop()
