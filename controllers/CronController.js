var models  = require('./../models');
var axios = require('axios');
var api_key = 'EK-uCm45-ZfZFE1m-fwmSj';


module.exports.loadApiData = async () => {
    var entries = await models.entry.findAll();
    
    for (let i=0; i<entries.length; i++) {
    
        let entry = entries[i];

        try {
            let url = 'https://api.ethplorer.io/getTokenInfo/' + entry.dataValues.address + '?apiKey=' + api_key;
            console.log(url); 
            const response = await axios.get(url);

            let res = response.data;

            let data = {
                entry_id: entry.dataValues.id,
                name: res.name,
                symbol: res.symbol,
                address: res.address,
                transaction: res.transfersCount,
                holders: res.holdersCount,
                price: 0,
                marketcap: 0,
                available_supply: 0,
                updatedAt : res.lastUpdated,
            }

            if (res.price) {
                data.price = res.price.rate,
                data.marketcap = res.price.marketCapUsd,
                data.available_supply = res.price.availableSupply
            }

            models.coin_listing.create(data);
          } catch (error) {
            console.log('error');
        }
    }
}
