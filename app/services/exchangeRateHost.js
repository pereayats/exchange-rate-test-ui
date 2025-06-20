export class ExchangeRateHostService {
	constructor() {
		this.baseUrl = 'https://api.exchangerate.host';
		this.apiKey = process.env.EXCHANGE_RATE_HOST_API_KEY;
	}

	async getSupportedCurrencies() {
		try {
			const response = await fetch(`${this.baseUrl}/list?access_key=${this.apiKey}`);
			const data = await response.json();

			if (data?.success && data?.currencies) {
				return Object.keys(data?.currencies)?.map(code => ({
					code,
					name: data?.currencies[code]
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
			const response = await fetch(`${this.baseUrl}/live?source=${from}&currencies=${to}&access_key=${this.apiKey}`);
			const data = await response.json();
			const endTime = performance.now();
			const responseTime = endTime - startTime;

			if (data?.success && data?.quotes[`${from}${to}`]) {
				return {
					success: data.success,
					result: data.quotes[`${from}${to}`],
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