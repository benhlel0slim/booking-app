export interface Address {
  city: string;
  street: string;
  _id: string;
}

export interface Times {
  open: string;
  closed: string;
  _id: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  menu: string[];
  userId: string;
  address: Address;
  slots: number;
  closedDays: string[];
  times: Times;
}
