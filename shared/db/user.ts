export type User = {
  role: UserRole;
  name: string;
  avatar: string;
  decoration: string;
  discordId: string;
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
