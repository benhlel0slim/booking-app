import { RestaurantData } from './createRestaurant';

export type Payload = Omit<RestaurantData, 'menu'>;
