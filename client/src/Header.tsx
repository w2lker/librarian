import React from "react"

type HeaderProps = {
  bookSelected: boolean;
  onCreate: VoidFunction;
  onBack: VoidFunction;
};

export const Header: React.FC<HeaderProps> = ({ bookSelected, onBack, onCreate }) => {
  if (bookSelected) return (
    <div className="navbar bg-base-100 shadow-lg">
      <button className="btn btn-ghost text-xl" onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4" fill="currentColor">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        Back
      </button>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">The Librarian</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <button className="btn btn-primary" onClick={onCreate}>+ Add book</button>
      </div>
    </div>
  )
}