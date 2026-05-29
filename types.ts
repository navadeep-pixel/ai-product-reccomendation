export interface RecommendationFormInputs {
  purpose: string;
  budget: string;
  category: string;
  preferences: string;
  dietary: string;
  additional: string;
}

export interface Product {
  productName: string;
  category: string;
  priceRange: string;
  keyBenefits: string[];
  whyRecommended: string;
  rating: number;
  alternatives: string[];
}

export interface ChoiceDetail {
  productName: string;
  reason: string;
  priceRange?: string;
}

export interface RecommendationInsights {
  bestOverall: ChoiceDetail;
  budgetFriendly: ChoiceDetail;
  premium: ChoiceDetail;
  healthiest?: ChoiceDetail;
}

export interface RecommendationResponse {
  products: Product[];
  insights: RecommendationInsights;
  finalShoppingAdvice: string;
}
