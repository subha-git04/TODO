import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-violet-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">iTask</h1>
      <div>
        <Link to="/todos" className="mx-2">Todos</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/signup" className="mx-2">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
