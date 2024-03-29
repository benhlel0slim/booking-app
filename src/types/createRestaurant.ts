export interface Address {
  city: string;
  street: string;
}

export interface Times {
  open: string;
  closed: string;
}

export interface RestaurantData {
  _id: string;
  name: string;
  address: Address;
  slots: number;
  closedDays: string[];
  menu: string[];
  times: Times;
}
