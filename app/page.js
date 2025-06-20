import { ExchangeRateManager } from './services/exchangeRateManager';
import ApiTester from './components/ApiTester';
import { getExchangeRate } from './actions';

export default async function Home() {
	const exchangeManager = new ExchangeRateManager();

	try {
		const supportedCurrencies = await exchangeManager.getSupportedCurrencies();

		return (
			<div className="min-h-screen bg-slate-50 py-12 sm:py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-10">
						<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
							Exchange Rate API Comparison
						</h1>
						<p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">
							Compare exchange rates from three different APIs
						</p>
					</div>

					{/* API Tester */}
					<ApiTester
						currencies={supportedCurrencies}
						getExchangeRate={getExchangeRate}
					/>
				</div>
			</div>
		);
	}
	catch (error) {
		console.error('Error loading currencies:', error);
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-500 mb-4">
						<svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
					</div>
					<p className="text-gray-600">Error loading currencies. Please check your API keys.</p>
				</div>
			</div>
		);
	}
}
