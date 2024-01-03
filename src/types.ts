export interface User {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;
  avatar?: string;
}

export interface Transaction {
  description: string;
  value: number | string;
  date: string;
  id?: number;
  type: string;
  user_id: number | undefined;
  category_name: string;
  category_id: number | undefined;
}
