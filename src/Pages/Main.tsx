import { useState } from "react";
import { useAuth } from "../State/AuthState";

function Main() {
  const [count, setCount] = useState(0);
  const { user } = useAuth() ?? { user: null };

  return <div>{user && user.email}</div>;
}

export default Main;
