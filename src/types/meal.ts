/**
 * Type definitions for TheMealDB API responses
 */

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  // Ingredient and measure fields (1-20)
  strIngredient1?: string;
  strMeasure1?: string;
  strIngredient2?: string;
  strMeasure2?: string;
  // ... continue for all 20 ingredients
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
}

export interface MealSearchResponse {
  meals: Meal[] | null; // null if no results found
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface MealPreview {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface CategoryFilterResponse {
  meals: MealPreview[] | null;
}
