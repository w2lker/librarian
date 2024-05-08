// import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

type LookupHeaderProps = {
  showFilters: boolean;
  onToggleFilters: VoidFunction;
};

export const LookupHeader: React.FC<LookupHeaderProps> = ({
  showFilters,
  onToggleFilters,
}) => {
  // const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-lg relative z-10">
      <div className="flex-1 hidden sm:flex">
        <a className="btn btn-ghost text-xl">
          <Link to="/">The Librarian</Link>
        </a>
      </div>
      <div className="flex-1">
        <div role="tablist" className="tabs tabs-boxed">
          <a role="tab" className="tab">
            <Link to="/">Books</Link>
          </a>
          <a role="tab" className="tab tab-active">
            <Link to="/search">Search</Link>
          </a>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="btn btn-primary" onClick={onToggleFilters}>
          {showFilters ? "Hide filters" : "Show filters"}
        </div>
      </div>
    </div>
  );
};
