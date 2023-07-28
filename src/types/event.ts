export interface Event {
  restaurant: string;
  duration: string;
  time: string;
  startDate: Date;
  endDate: Date;
  email: string;
  phone: string;
  menu: string;
  name: string;
  guests: number;
  _id: string;
  group: number;
}

export type CreateEvent = Omit<Event, 'group' | '_id' | 'endDate'>;
export type GetEvent = Omit<Event, 'time' | 'duration'>;
