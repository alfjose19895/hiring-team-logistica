import { Category } from '../interfaces';

export const SEED_USERS = [
  {
    fullName: 'Adrian Alex',
    email: 'alex@test.com',
    password: '123123qweQWE',
    isActive: true,
  },
  {
    fullName: 'Other User',
    email: 'other@test.com',
    password: '123123qweQWE',
    isActive: true,
  },
];

export const SEED_CATEGORIES: Category[] = [
  { name: 'Clothing' },
  { name: 'Electronics' },
  { name: 'Home goods' },
  { name: 'Beauty & Personal Care' },
  { name: 'Sports & Outdoors' },
  { name: 'Books & Office Supplies' },
  { name: 'Toys & Games' },
];

export const SEED_PRODUCTS = [
  {
    title: 'Blue T-Shirt',
    category_id: 1,
    unit: 'units',
    quantity: 12,
    price: 21,
  },
  {
    title: 'Red T-Shirt',
    category_id: 1,
    unit: 'units',
    quantity: 3,
    price: 24,
  },
  {
    title: 'Headphones Pro 1',
    category_id: 2,
    unit: 'units',
    quantity: 24,
    price: 54,
  },
  {
    title: 'Headphones Pro 2',
    category_id: 2,
    unit: 'units',
    quantity: 15,
    price: 54,
  },
  {
    title: 'Kitchen Utensils',
    category_id: 3,
    unit: 'boxes',
    quantity: 30,
    price: 342,
  },
  {
    title: 'Shampoo',
    category_id: 4,
    unit: 'bottles',
    quantity: 150,
    price: 9,
  },
  {
    title: 'Tennis Racket',
    category_id: 5,
    unit: 'units',
    quantity: 54,
    price: 12,
  },
  {
    title: 'Asus Rog Strix G153 Ryzen 9 5980Hx',
    category_id: 6,
    unit: 'units',
    quantity: 210,
    price: 1455,
  },
  {
    title: 'PREDATOR HELIOS 300',
    category_id: 6,
    unit: 'units',
    quantity: 3,
    price: 1659,
  },
];
