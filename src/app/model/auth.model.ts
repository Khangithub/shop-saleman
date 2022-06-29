export interface User {
  addressList: string[];
  avatar: string;
  cardNumber: string;
  email: string;
  isActived: boolean;
  mediaList: Media[];
  phoneNumber: string;
  role: string;
  username: string;
  zipCode: string;
  _id: string;
}

export interface Media {
  _id: string;
  mimetype: string;
  filename: string;
}
