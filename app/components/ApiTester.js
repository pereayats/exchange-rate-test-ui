'use client';

import { useState } from 'react';
import ApiResults from './ApiResults';

export default function ApiTester({ currencies, getExchangeRate }) {
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('EUR');
	const [amount, setAmount] = useState();
	const [results, setResults] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleConvert = async () => {
		if (fromCurrency === toCurrency) {
			alert('Please select different currencies for conversion');
			return;
		}

		if (!amount || amount <= 0) {
			alert('Please enter a valid amount');
			return;
		}

		setIsLoading(true);
		setResults({});
		try {
			const conversionResults = await getExchangeRate(fromCurrency, toCurrency);
			setResults(conversionResults);
		}
		catch (error) {
			console.error('Error during conversion:', error);
			setResults({ error: 'Failed to fetch exchange rates.' });
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-slate-200/80">
				<div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
					{/* From Currency */}
					<div className="w-full">
						<label className="block text-sm font-medium text-slate-600 mb-2">
							From
						</label>
						<select
							value={fromCurrency}
							onChange={(e) => setFromCurrency(e.target.value)}
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
						>
							{currencies.map((currency) => (
								<option key={currency.code} value={currency.code}>
									{currency.code} - {currency.name}
								</option>
							))}
						</select>
					</div>

					{/* To Currency */}
					<div className="w-full">
						<label className="block text-sm font-medium text-slate-600 mb-2">
							To
						</label>
						<select
							value={toCurrency}
							onChange={(e) => setToCurrency(e.target.value)}
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
						>
							{currencies.map((currency) => (
								<option key={currency.code} value={currency.code}>
									{currency.code} - {currency.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{fromCurrency !== 'USD' && (
					<div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
						<p className="text-sm text-amber-800">
							<span className="font-semibold">Heads up:</span> Some API providers only support USD as the base currency on their free plans. Conversions from other currencies might not work for all services.
						</p>
					</div>
				)}

				{/* Amount & Convert Button */}
				<div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-4 mt-6">
					<div>
						<label className="block text-sm font-medium text-slate-600 mb-2">
							Amount
						</label>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(parseFloat(e.target.value))}
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
						/>
					</div>
					<div className="w-full">
						<button
							onClick={handleConvert}
							disabled={fromCurrency === toCurrency || isLoading}
							className="w-full h-full px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500/80 shadow-lg hover:shadow-xl disabled:shadow-none"
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
									<span>Converting...</span>
								</div>
							) : (
								'Convert'
							)}
						</button>
					</div>
				</div>
			</div>

			<ApiResults results={results} isLoading={isLoading} amount={amount} />
		</>
	);
} 