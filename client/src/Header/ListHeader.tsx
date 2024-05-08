import { Link, useNavigate } from 'react-router-dom';

export const ListHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-lg relative z-10">
      <div className="flex-1 hidden sm:flex">
        <a className="btn btn-ghost text-xl">
          <Link to="/">The Librarian</Link>
        </a>
      </div>
      <div className="flex-1">
        <div role="tablist" className="tabs tabs-boxed">
          <a role="tab" className="tab tab-active">
            <Link to="/">Books</Link>
          </a>
          <a role="tab" className="tab">
            <Link to="/search">Search</Link>
          </a>
        </div>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          + Add book
        </button>
      </div>
    </div>
  );
};
