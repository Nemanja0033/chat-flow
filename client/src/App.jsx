import Authentication from "./auth/Authentication";
import AppBody from "./components/AppBody";
import { io } from 'socket.io-client'; 

const socket = io.connect('http://localhost:3001'); 

export const App = () => {
  return (
    <>
      <Authentication />
    </>
  );
};

export default App;
