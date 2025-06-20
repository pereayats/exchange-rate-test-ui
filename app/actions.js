'use server';

import { ExchangeRateManager } from './services/exchangeRateManager';

export async function getExchangeRate(from, to) {
  const exchangeManager = new ExchangeRateManager();
  try {
    const exchangeRate = await exchangeManager.getExchangeRate(from, to);
    return exchangeRate;
  }
  catch (error) {
    console.error('Error getting exchange rate:', error);
    throw error;
  }
} 