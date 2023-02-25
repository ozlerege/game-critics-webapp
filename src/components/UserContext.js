import { createContext } from "react";
const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user] = useState({});
  return <UserContext.Provider></UserContext.Provider>;
};
