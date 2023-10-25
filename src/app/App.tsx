import { Rotas } from "./routes";
import { LoggedUserProvider } from "./shared/contexts";

export const App = () => {
  return (
    <LoggedUserProvider>
      <Rotas />
    </LoggedUserProvider>
  );
};