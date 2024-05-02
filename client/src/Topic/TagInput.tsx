import { TopicRepo } from "./TopicRepo";

type TagInputProps = {
  defaultValue: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const TagInput: React.FC<TagInputProps> = ({ value, defaultValue, onChange, onBlur }) => {
  const { data: existingTags } = TopicRepo.useTags();
  const valueToFilter = (value || defaultValue || '').trim().toLowerCase();

  const suggestions = (existingTags || []).filter((tag) => tag.toLowerCase().includes(valueToFilter)).splice(0, 4);

  return (
    <div className="flex-1">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Tag</span>
        </div>
        <input
          type="text"
          placeholder="Type or select"
          className="input input-bordered"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {suggestions.length && (
        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Suggestions</span>
          </div>
          <ul className="menu bg-base-200 rounded-box">
            {suggestions.map((tag) => (
              <li key={tag}>
                <a onClick={() => onChange({ target: { value: tag }} as any)}>{tag}</a>
              </li>
            ))}
          </ul>
        </label>
      )}
    </div>
  );
};