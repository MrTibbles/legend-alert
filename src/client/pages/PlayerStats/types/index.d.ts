export interface Stat {
  categoryName: string;
  displayValue: string;
  name: string;
}

export interface Legend {
  isActiveInGame: boolean;
  legendName: string;
  stats: Stat[];
  tallImageUrl?: string;
}
