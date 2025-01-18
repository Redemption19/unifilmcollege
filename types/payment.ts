export interface Payment {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  reference: string;
  formSent: boolean;
  createdAt: string;
}