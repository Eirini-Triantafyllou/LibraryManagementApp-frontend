export interface AppError {
  status: number;
  code?: string;           
  message?: string;        
  userMessage: string;     
  originalError?: any;     
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}
