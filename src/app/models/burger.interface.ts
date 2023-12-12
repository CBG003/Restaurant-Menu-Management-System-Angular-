// burger.interface.ts
export interface BurgerDto {
  id: number | null;
  name: string;
  price: number | null;
  imageUrl: string | File | null;
}
