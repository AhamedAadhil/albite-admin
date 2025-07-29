export interface Addon {
  _id: string;
  name: string;
  price: number;
  image: string;
  mainCategory: "breakfast" | "lunch" | "dinner";
  isActive: boolean;
}
