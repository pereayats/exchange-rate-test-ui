export class OpenExchangeRatesService {
    constructor() {
        this.baseUrl = 'https://openexchangerates.org/api';
        this.apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
    }

    async getSupportedCurrencies() {
		try {
			const response = await fetch(`${this.baseUrl}/currencies.json?app_id=${this.apiKey}`);
			const data = await response.json();

			if (data) {
				return Object.keys(data)?.map(code => ({
					code,
					name: data[code]
				}));
			}
			return [];
		}
		catch (error) {
			console.error('Error fetching currencies:', error);
			return [];
		}
	}

	async getExchangeRate(from = 'USD', to = 'EUR') {
		const startTime = performance.now();

		try {
			const response = await fetch(`${this.baseUrl}/latest.json?app_id=${this.apiKey}&base=${from}&symbols=${to}`);
			const data = await response.json();
			const endTime = performance.now();
			const responseTime = endTime - startTime;

			if (data?.rates && data?.rates[to]) {
				return {
					success: true,
					result: data.rates[to],
					responseTime,
					rawData: data
				};
			}
			return {
				success: false,
				error: data?.error,
				responseTime,
				rawData: data
			};
		}
		catch (error) {
			const endTime = performance.now();
			const responseTime = endTime - startTime;

			return {
				success: false,
				error: error?.message || 'Unknown error',
				responseTime,
				rawData: null
			};
		}
	}
} 