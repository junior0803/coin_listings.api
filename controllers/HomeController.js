var models  = require('./../models');
const {QueryTypes} = require('sequelize');

module.exports.loadCoinListings = async (req, res, next) => {
    var entries = await models.entry.findAll();
    var data = []
    for (let i=0; i<entries.length; i++) {

        let entry = entries[i];
        let pricies = []
        let transactions = []
        let allholders = []

        //Now coin price sql begin
        let coinItem = await models.coin_listing.findAll({
            where: { entry_id: entry.dataValues.id },
            order: [
                ['createdAt', 'DESC']
            ],
            limit:1
        })
        //Now coin price sql end

        // for 1 weeks price, transaction, holder get values begin
        let priceItem = await models.coin_listing.findAll({
            where: { entry_id: entry.dataValues.id },
            order: [
                ['createdAt', 'DESC']
            ],
            limit:5040
        })
        for (let i=0; i < priceItem.length; i++){
            pricies.push(priceItem[i].dataValues.price)
            transactions.push(priceItem[i].dataValues.transaction)
            allholders.push(priceItem[i].dataValues.holders)
        }
        if (coinItem[0] == null || coinItem[0].dataValues == null)
            continue
        coinItem = coinItem[0].dataValues;
        // for 1 weeks price, transaction, holder get values end

        coinItem.id = i + 1; //id set in coin
        
        //price graph data begin
        coinItem.pricies0 = averageCoinArrays(pricies, 0) // 30 minute
        coinItem.pricies1 = averageCoinArrays(pricies, 1) // 1 hours
        coinItem.pricies2 = averageCoinArrays(pricies, 2) // 3 hours
        coinItem.pricies3 = averageCoinArrays(pricies, 3) // 6 hours
        coinItem.pricies4 = averageCoinArrays(pricies, 4) // 1 days
        coinItem.pricies5 = averageCoinArrays(pricies, 5) // 1 week
        // price graoh data end

        //transaction graph data begin
        coinItem.transactions0 = averageCoinArrays(transactions, 0) // 30 minute
        coinItem.transactions1 = averageCoinArrays(transactions, 1) // 1 hours
        coinItem.transactions2 = averageCoinArrays(transactions, 2) // 3 hours
        coinItem.transactions3 = averageCoinArrays(transactions, 3) // 6 hours
        coinItem.transactions4 = averageCoinArrays(transactions, 4) // 1 days
        coinItem.transactions5 = averageCoinArrays(transactions, 5) // 1 week        
        //transaction graph data end
        
        //number holders graph data begin
        coinItem.allholders0 = averageCoinArrays(allholders, 0) // 30 minute
        coinItem.allholders1 = averageCoinArrays(allholders, 1) // 1 hours
        coinItem.allholders2 = averageCoinArrays(allholders, 2) // 3 hours
        coinItem.allholders3 = averageCoinArrays(allholders, 3) // 6 hours
        coinItem.allholders4 = averageCoinArrays(allholders, 4) // 1 days
        coinItem.allholders5 = averageCoinArrays(allholders, 5) // 1 week        
        //number holders graph data end

        //coin Age caculate begin
        let ageValue = await models.coin_listing.findAll({
            where: { entry_id: entry.dataValues.id },
            order: [
                ['updatedAt', 'ASC']
            ],
            limit:1
        })
        for (let i=0; i < ageValue.length; i++)
            coinItem.age =  ageValue[i].dataValues.updatedAt
        console.log(coinItem.age)
        //coin Age caculate end
        console.log(pricies)

        data.push(coinItem);
    }
    return res.status(200).json(data)
}


function getAge(date) 
{
  var now = Date.now();

  var age = new Date();
  age = (date - now).toUTCString()
  return age;
}

function averageCoinArrays(coinItem, mode) {
    /* modu description
    mode 0: 30 minute data
        1: 1 hour data
        2: 3 hours data
        3: 6 hours data
        4: 1 days data
        5: 1 weeks data
    */
   var lpLimit = 0
    retVal = []
    switch (mode) {
        case 0:
            lpLimit = coinItem.length < 15 ? 1: 15
            for (let i=0; i < lpLimit; i ++) { retVal.push(coinItem[i])}
            break
        case 1:
            lpLimit = coinItem.length < 30 ? 1 : 30
            for (let i=0; i < lpLimit; i ++) { retVal.push(coinItem[i])}
            break
        case 2:
            lpLimit = coinItem.length < 90 ? 1 : 90
            for (let i=0; i < lpLimit; i ++) { retVal.push(coinItem[i])}
            break
        case 3:
            lpLimit = coinItem.length < 180 ? 1 : 180
            for (let i=0; i < lpLimit; i ++) { retVal.push(coinItem[i])}
            break
        case 4:
            lpLimit = coinItem.length < 720 ? 1 : 720
            for (let i=0; i < lpLimit; i += 4) retVal.push(coinItem[i])
            break
        case 5:
            lpLimit = coinItem.length < 5040 ? 1 : 5040
            for (let i=0; i < lpLimit; i += 28) retVal.push(coinItem[i])
            break
    }
    return retVal.reverse()
}

