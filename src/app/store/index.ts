import { User } from "src/app/model/user.model";

export type AppState = {
  user: { currentUser: User; token: string; authError: string };
};
