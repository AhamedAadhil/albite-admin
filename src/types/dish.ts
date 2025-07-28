export interface Dish {
  _id: string;
  name: string;
  price: number;
  image: string;
  calories?: number;
  servings?: number;
  isRecommended?: boolean;
  isNewDish?: boolean;
  isPopular?: boolean;
}
