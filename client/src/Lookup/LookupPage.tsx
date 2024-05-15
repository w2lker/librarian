import { useState } from "react";
import { LookupHeader } from "../Header/LookupHeader";
import { LookupForm } from "./LookupForm";
import { LookupRepo } from "./LookupRepo";
import { LookupTopic } from "./LookupTopic";

export const LookupPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { searchParams, searchQuery } = LookupRepo.useParamQuery();
  const { data, isSuccess } = LookupRepo.useSearch(searchParams);

  return (
    <div>
      <LookupHeader
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      {showFilters && <LookupForm />}
      {!isSuccess && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {isSuccess &&
        data?.map((topic) => (
          <LookupTopic key={topic.id} topic={topic} searchQuery={searchQuery} />
        ))}
    </div>
  );
};
