import { HomeResults } from './home-results.interface';

export interface MovieCategory {
  title: string;
  categoryResultKey: keyof HomeResults;
}
