import { User } from "src/app/model/auth.model";

export type AppState = {
  user: { currentUser: User; token: string; authError: string };
};
