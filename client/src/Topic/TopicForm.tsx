import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TopicDTO } from "./TopicDTO";
import { TagInput } from "./TagInput";
import classNames from "classnames";

const schema = yup.object({
  tag: yup.string().required(),
  description: yup.string().required(),
});

type TopicFormProps = {
  topic?: TopicDTO;
  bookId: number;
  onSubmit: (data: TopicDTO) => void;
  onCancel: VoidFunction;
};

export const TopicForm: React.FC<TopicFormProps> = ({
  topic,
  bookId,
  onSubmit,
  onCancel,
}) => {
  const { register, control, handleSubmit, formState } = useForm<TopicDTO>({
    resolver: yupResolver(schema) as any,
  });
  const { errors } = formState;
  const prepareData = (data: TopicDTO) =>
    onSubmit({ ...(topic || {}), ...data, book_id: bookId });

  return (
    <form onSubmit={handleSubmit(prepareData)}>
      <div className="card w-100% bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="block md:flex justify-stretch gap-10">
            <Controller
              name="tag"
              control={control}
              render={({ field }) => (
                <TagInput
                  defaultValue={topic?.tag || ""}
                  {...field}
                  invalid={!!errors.tag?.message}
                />
              )}
            />
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                defaultValue={topic?.description}
                className={classNames("textarea textarea-bordered h-64", {
                  "textarea-error": !!errors.description?.message,
                })}
                placeholder="Description"
                {...register("description")}
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button
              role="submit"
              className="btn btn-sm btn-outline btn-primary"
            >
              {topic ? "Update" : "Create"}
            </button>
            <button
              role="button"
              className="btn btn-sm btn-outline btn-neutral"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
