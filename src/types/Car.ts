export interface Car {
    _id: string;
    model: string;
    price: number;
    detail: string;
    img: string[];
    year: number;
    brand: string;
    description?: string;
    mileage?: number;
    transmission?: string;
    fuel?: string;
    licensePlateEnd?: number;
    doors?: number;
    options?: string[];
    createdAt?: string;
  }
  