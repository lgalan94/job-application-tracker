import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
    <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
    <p className="text-gray-600 mb-6">Page not found</p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
