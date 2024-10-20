import React, { createContext } from "react";
import { User } from "../interfaces/User";

let UserContext = createContext<
  | {
      user: User | undefined;
      setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    }
  | undefined
>(undefined);

export default UserContext;
