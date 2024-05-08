import { FocusEvent, useState } from "react";
import { LookupQueryDTO } from "./LookupQueryDTO";
import { TagInput } from "../Topic/TagInput";
import { availableSkills } from "../SkillSelector";
import { LookupRepo } from "./LookupRepo";

const emptyQuery: LookupQueryDTO = {
  tag: "",
  description: "",
  book_name: "",
  author: "",
  ISBN: "",
  publisher: "",
  year: undefined,
  skill: "",
};

export const LookupForm: React.FC = () => {
  const { searchQuery, setSearchQuery } = LookupRepo.useParamQuery();

  const [query, setQuery] = useState<LookupQueryDTO>(searchQuery);
  const handleSearch = () => setSearchQuery(query);
  const handleClear = () => {
    setQuery(emptyQuery);
    setSearchQuery(emptyQuery);
  };

  return (
    <div className="bg-base-100 shadow-lg p-8">
      <div className="max-w-screen-lg m-auto">
        <h3 className="text-left font-bold text-lg mb-4">Topic details</h3>
        <div className="block md:flex justify-stretch gap-10">
          <TagInput
            value={query.tag || ""}
            onChange={(e) => setQuery({ ...query, tag: e.target.value })}
          />
          <label className="form-control flex-1">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              value={query.description}
              onChange={(e) =>
                setQuery({ ...query, description: e.target.value })
              }
              className="textarea textarea-bordered h-64"
              placeholder="Description"
            />
          </label>
        </div>
        <h3 className="text-left font-bold text-lg mt-8 mb-4">Book details</h3>
        <div className="block md:flex justify-stretch gap-10 flex-wrap">
          <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">Book name:</span>
            </div>
            <input
              type="text"
              placeholder="Search by book name"
              className="input input-bordered w-full"
              value={query.book_name}
              onChange={(e) =>
                setQuery({ ...query, book_name: e.target.value })
              }
            />
          </label>
          <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">Author:</span>
            </div>
            <input
              type="text"
              placeholder="Search by author"
              className="input input-bordered w-full"
              value={query.author}
              onChange={(e) => setQuery({ ...query, author: e.target.value })}
            />
          </label>
          <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">Publisher:</span>
            </div>
            <input
              type="text"
              placeholder="Search by book name"
              className="input input-bordered w-full"
              value={query.publisher}
              onChange={(e) =>
                setQuery({ ...query, publisher: e.target.value })
              }
            />
          </label>
          <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">Year:</span>
            </div>
            <input
              type="number"
              placeholder="Search by author"
              className="input input-bordered w-full"
              value={query.year || ""}
              onChange={(e) =>
                setQuery({ ...query, year: parseInt(e.target.value) })
              }
            />
          </label>
          {/* <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">Skill:</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => setQuery({ ...query, skill: e.target.value })}
            >
              <option disabled selected>
                Search by skill
              </option>
              {availableSkills.map((skill) => (
                <option key={skill}>{skill}</option>
              ))}
            </select>
          </label> */}
          <label className="form-control flex-1 basis-1/3">
            <div className="label">
              <span className="label-text">ISBN:</span>
            </div>
            <input
              type="text"
              placeholder="Search by ISBN"
              className="input input-bordered w-full"
              value={query.ISBN}
              onChange={(e) => setQuery({ ...query, ISBN: e.target.value })}
            />
          </label>
        </div>
        <div className="flex justify-start gap-4 mt-6">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
