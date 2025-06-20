export class CurrencyApiService {
    constructor() {
        this.baseUrl = 'https://api.currencyapi.com/v3';
        this.apiKey = process.env.CURRENCY_API_API_KEY;
    }

    async getSupportedCurrencies() {
		try {
			const response = await fetch(`${this.baseUrl}/currencies`, {
				headers: {
					'apikey': this.apiKey
				}
			});
			const data = await response.json();

			if (data?.data) {
				return Object.keys(data?.data)?.map(code => ({
					code,
					name: data?.data[code]?.name
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
			const response = await fetch(`${this.baseUrl}/latest?base_currency=${from}&currencies=${to}`, {
				headers: {
					'apikey': this.apiKey
				}
			});
			const data = await response.json();
			const endTime = performance.now();
			const responseTime = endTime - startTime;

			if (data?.data && data?.data[to]) {
				return {
					success: true,
					result: data.data[to]?.value,
					responseTime,
					rawData: data
				};
			}
			return {
				success: false,
				error: data?.error || 'Unknown error',
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