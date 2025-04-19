
// MvpAthlete type for the MVP page
export interface MvpAthlete {
  id: string;
  name: string;
  age: number;
  position: string;
  tacticalRole: string;
  nationality: string;
  team: string;
  image: string;
  stats: {
    xG: number;
    passCompletion: number;
    tackles: number;
    aerialDuelsWon: number;
    shotsOnTarget: number;
    distanceCovered: number;
  };
  positionAverage: {
    xG: number;
    passCompletion: number;
    tackles: number;
    aerialDuelsWon: number;
    shotsOnTarget: number;
    distanceCovered: number;
  };
}
