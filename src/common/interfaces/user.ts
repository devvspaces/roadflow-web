export interface Profile {
  fullname: string;
  bio: string;
  github: string;
  twitter: string;
  image: string;
}

export interface User {
  username: string;
  email: string;
  profile: Profile;
}
