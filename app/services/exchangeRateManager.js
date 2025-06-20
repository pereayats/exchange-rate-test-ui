import { ExchangeRateHostService } from './exchangeRateHost';
import { OpenExchangeRatesService } from './openExchangeRates';
import { CurrencyApiService } from './currencyApi';

export class ExchangeRateManager {
    constructor() {
        this.services = {
            'ExchangeRate.host': new ExchangeRateHostService(),
            'OpenExchangeRates': new OpenExchangeRatesService(),
            'CurrencyAPI.com': new CurrencyApiService()
        };
    }

    getServiceNames() {
        return Object.keys(this.services);
    }

    async getSupportedCurrencies() {
        const allCurrencies = [];

        const promises = Object.entries(this.services).map(async ([name, service]) => {
            try {
                const serviceCurrencies = await service.getSupportedCurrencies();
                allCurrencies.push(...serviceCurrencies);
            }
            catch (error) {
                console.error(`Error fetching currencies from ${name}:`, error);
            }
        });

        await Promise.all(promises);
        
        // Remove duplicates and sort
        const uniqueCurrencies = [];
        const seen = new Set();
        
        for (const currency of allCurrencies) {
            if (!seen.has(currency.code)) {
                seen.add(currency.code);
                uniqueCurrencies.push(currency);
            }
        }
        
        return uniqueCurrencies.sort((a, b) => a.code.localeCompare(b.code));
    }

    async getExchangeRate(from = 'USD', to = 'EUR') {
        const results = {};

        // Get exchange rate from all services in parallel
        const promises = Object.entries(this.services).map(async ([name, service]) => {
            try {
                const result = await service.getExchangeRate(from, to);
                results[name] = result;
            }
            catch (error) {
                results[name] = {
                    success: false,
                    result: null,
                    responseTime: 0,
                    rawData: null,
                    error: error.message || 'Unknown error'
                };
            }
        });

        await Promise.all(promises);
        return results;
    }
} 