'use client';

import { useState, useMemo } from 'react';

export default function ApiResults({ results, isLoading, amount = 1 }) {
	const [expandedJson, setExpandedJson] = useState({});

	const toggleJson = (serviceName) => {
		setExpandedJson(prev => ({ ...prev, [serviceName]: !prev[serviceName] }));
	};

	const { validResults, fastestService } = useMemo(() => {
		const validResults = Object.entries(results).filter(([, result]) => result && result.success);
		const fastestService = validResults.length > 0
			? validResults.reduce((fastest, current) =>
				current[1].responseTime < fastest[1].responseTime ? current : fastest
			)[0]
			: null;
		return { validResults, fastestService };
	}, [results]);

	if (isLoading) {
		return (
			<div className="text-center py-10">
				<div className="flex justify-center items-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
					<span className="ml-4 text-slate-500">Fetching exchange rates...</span>
				</div>
			</div>
		);
	}

	if (Object.keys(results).length === 0) {
		return (
			<div className="text-center py-10">
				<p className="text-slate-500">Select currencies and click Convert to see results.</p>
			</div>
		);
	}
	
	if (results.error) {
		return (
			<div className="text-center py-10 bg-red-50 text-red-700 rounded-lg">
				<p><strong>Error:</strong> {results.error}</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{Object.entries(results).map(([serviceName, result]) => (
				<div
					key={serviceName}
					className={`bg-white rounded-xl shadow-md p-5 border transition-all duration-300 ${
						result.success ? 'border-slate-200/80 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10' : 'border-red-200 bg-red-50'
					}`}
				>
					<div className="flex justify-between items-start">
						<h3 className="text-lg font-bold text-slate-800">{serviceName}</h3>
						{result.success && serviceName === fastestService && (
							<span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
								Fastest
							</span>
						)}
					</div>

					{result.success ? (
						<>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-4 text-sm">
								<div>
									<p className="text-slate-500">Exchange Rate</p>
									<p className="font-semibold text-slate-700 text-base">{result.result?.toFixed(6)}</p>
								</div>
								<div>
									<p className="text-slate-500">Converted Amount</p>
									<p className="font-semibold text-emerald-600 text-base">{(amount * result.result)?.toFixed(4)}</p>
								</div>
								<div>
									<p className="text-slate-500">Response Time</p>
									<p className="font-semibold text-slate-700 text-base">{result.responseTime?.toFixed(0)}ms</p>
								</div>
							</div>
							
							{result.note && (
								<div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-2 text-sm text-yellow-800">
									{result.note}
								</div>
							)}

							{result.rawData && (
								<div className="mt-4 pt-4 border-t border-slate-200/80">
									<button
										onClick={() => toggleJson(serviceName)}
										className="text-sm font-medium text-sky-600 hover:text-sky-800"
									>
										{expandedJson[serviceName] ? 'Hide' : 'Show'} Raw JSON
									</button>
									{expandedJson[serviceName] && (
										<pre className="bg-slate-100 p-3 mt-2 rounded-md text-xs overflow-x-auto max-h-48">
											{JSON.stringify(result.rawData, null, 2)}
										</pre>
									)}
								</div>
							)}
						</>
					) : (
						<div className="mt-3 text-red-700">
							<p className="font-semibold">Error:</p>
							<p className="text-sm">{result.error || 'An unknown error occurred.'}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
} 