import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          Home
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;