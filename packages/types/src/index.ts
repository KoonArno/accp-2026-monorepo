// ACCP Shared Types
// เพิ่ม shared types ที่ใช้ร่วมกันระหว่าง apps

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
