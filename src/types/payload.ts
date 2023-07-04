import { RestaurantData } from './createRestaurant';

export type Payload = Omit<RestaurantData, 'menu' | '_id'>;

export type Menu = Pick<RestaurantData, 'menu' | '_id'>;
