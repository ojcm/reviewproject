var mongoose = require("mongoose");
var Company = require("./models/company");
 
var data = [
    {
        name: "ABC Farms", 
        address: "1 Farm Road, Farmville",
        category: "Farm"
    },
    {
        name: "DEF Shops", 
        address: "Unit A High Street, Cityville",
        category: "Store"
    },
    {
        name: "GHI Refinery", 
        address: "5 Slick Road, Crudeville",
        category: "Refinery"
    }
]
 
function seedDB(){
   //Remove all companies
   Company.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed companies!");
        //add companies
        data.forEach(function(seed){
            Company.create(seed, function(err, company){
                if(err){
                    console.log(err)
                } else {
                    console.log("added company");
                }
            });
        });
    });
}
 
module.exports = seedDB;