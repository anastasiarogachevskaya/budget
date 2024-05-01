export interface Purchase {
  id: string;
  purchaseDate: string;
  place: string;
  buyer: string;
  amount: number;
  splitPercentage: number;
}

export type SortingOrder = 'asc' | 'desc';
