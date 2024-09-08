export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    description: string;
    rating: number; // Assuming the rating is an integer from 0 to 5
    img: string;
    bookmarked?: boolean; // Optional field
  }

