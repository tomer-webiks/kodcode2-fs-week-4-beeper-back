export interface Beeper {
  id: string;
  name: string;
  status: 'manufactured' | 'assembled' | 'shipped' | 'deployed' | 'detonated';
  latitude?: number;
  longitude?: number;
  created_at: Date;
  detonated_at?: Date;
}

export let beepers: Beeper[] = [];