# Exchange Rate API Comparison Tool

A simple web UI for comparing exchange rates from three different APIs. This tool allows you to test and compare the performance, accuracy, and response times of various currency exchange rate services.


## Supported APIs

1. **ExchangeRate.host**
2. **OpenExchangeRates**
3. **CurrencyAPI.com**

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- API keys for all three APIs

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exchange-rate-test-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file

4. Add API keys to .env
```bash
EXCHANGE_RATE_HOST_API_KEY="your_api_key"
OPEN_EXCHANGE_RATES_API_KEY="your_api_key"
CURRENCY_API_API_KEY="your_api_key"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Select Currencies**: Choose the "From" and "To" currencies from the dropdown menus
2. **Enter Amount**: Input the amount you want to convert
3. **Convert**: Click the "Convert Currency" button to get results from all three APIs
4. **Compare Results**: View the conversion results, exchange rates, and response times side by side
5. **Inspect Data**: Click "Show Raw JSON" to view the complete API responses

## Project Structure

```
app/
├── components/
│   └── ApiResults.js          # Results display component
│   └── ApiTester.js           # Currency selection interface
├── services/
│   ├── exchangeRateHost.js    # ExchangeRate.host API service
│   ├── openExchangeRates.js   # OpenExchangeRates API service
│   ├── currencyApi.js         # CurrencyAPI.com API service
│   └── exchangeRateManager.js # Main service coordinator
├── actions.js                 # Server actions for the client
├── page.js                    # Main application page
└── layout.js                  # App layout
```

## Development

### Adding New APIs

To add a new exchange rate API:

1. Create a new service file in `app/services/`
2. Implement the required methods:
   - `convertCurrency(from, to, amount)`
   - `getSupportedCurrencies()`
3. Add the service to `ExchangeRateManager`
4. Update the UI components if needed

### Customization

- **Styling**: Modify Tailwind classes in components
- **API Configuration**: Update service files with your API keys
- **Additional Features**: Extend components and services as needed

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **JavaScript ES6+** - Modern JavaScript features

## Notes

- All APIs have different rate limits and terms of service. Check their documentation for production use.
- Response times may vary based on network conditions and API server load.

## License

This project is for educational and testing purposes. Please respect the terms of service for each API provider.
