import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        AI Healthcare
      </h1>

      <nav className="space-y-5">

        <Link
          to="/dashboard"
          className="block hover:text-cyan-400"
        >
          Dashboard
        </Link>

        <Link
          to="/diagnosis"
          className="block hover:text-cyan-400"
        >
          AI Diagnosis
        </Link>

        <Link
          to="/history"
          className="block hover:text-cyan-400"
        >
          Prediction History
        </Link>

        <Link
          to="/profile"
          className="block hover:text-cyan-400"
        >
          Profile
        </Link>
        <Link
  to="/analytics"
  className="block hover:text-cyan-400"
>
  Analytics
</Link>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;