import classNames from "classnames";
import { forwardRef } from "react";

// const availableSkills = ['listening', 'speaking', 'reading', 'writing', 'grammar', 'vocabulary', 'pronunciation', 'fluency', 'comprehension', 'conversation', 'interview', 'presentation', 'business', 'travel', 'academic', 'test prep', 'other'];
const availableSkills = ['listening', 'speaking', 'reading', 'writing', 'grammar', 'vocabulary', 'integrated skills'];

type SkillSelectorProps = {
  defaultValue?: string[];
  value: string[];
  invalid: boolean;
  onChange: (value: string[]) => void;
};

export const SkillSelector = forwardRef<HTMLDivElement, SkillSelectorProps>(({value, defaultValue, invalid, onChange}, ref) => {
  const list = value || defaultValue;
  const selected = new Set(list);

  const onToggleSkill = (skill: string) => {
    if (selected.has(skill)) {
      onChange(list.filter((s) => s !== skill));
    } else {
      onChange([...list, skill]);
    }
  };

  return (
    <div ref={ref} className="input input-bordered flex items-center gap-2 flex-wrap h-auto p-2">
      {availableSkills.map((skill) => (
        <div key={skill} className="form-control w-full md:w-2/5">
          <label className="label cursor-pointer mr-10">
            <span className="label-text">{skill}</span>
            <input
              type="checkbox"
              className={classNames('checkbox', { "checkbox-error": invalid })}
              checked={selected.has(skill)}
              onChange={() => onToggleSkill(skill)}
            />
          </label>
        </div>
      ))}
    </div>
  )
});
