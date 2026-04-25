export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
  color: string;
}

export interface MarketData {
  time: string;
  value: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  impact: 'positive' | 'negative' | 'neutral';
}
