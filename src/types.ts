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
  value: string;
  type: string;
  date: string;
  category_id: string;
}
