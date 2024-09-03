/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProductItem = {
  [x: string]: any;
  _id?: string;
  img?: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  description?: string;
};

export const productItems: TProductItem[] = [
  {
    img: "https://example.com/images/keyboard1.jpg",
    name: "Ducky One 2 Mini",
    capacity: 14,
    pricePerSlot: 99.99,
  },
  {
    img: "https://example.com/images/keyboard2.jpg",
    name: "Keychron K6",
    capacity: 23,
    pricePerSlot: 79.99,
  },
  {
    img: "https://example.com/images/keyboard3.jpg",
    name: "Corsair K95 RGB Platinum",
    capacity: 20,
    pricePerSlot: 199.99,
  },
  {
    img: "https://example.com/images/keyboard4.jpg",
    name: "Logitech G Pro X",
    capacity: 18,
    pricePerSlot: 129.99,
  },
  {
    img: "https://example.com/images/keyboard5.jpg",
    name: "Razer BlackWidow Elite",
    capacity: 26,
    pricePerSlot: 149.99,
  },
  {
    img: "https://example.com/images/keyboard6.jpg",
    name: "Anne Pro 2",
    capacity: 40,
    pricePerSlot: 89.99,
  },
];
