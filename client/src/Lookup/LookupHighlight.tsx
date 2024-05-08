type LookupHighlightProps = {
  text: string;
  highlight?: string;
};

export const LookupHighlight: React.FC<LookupHighlightProps> = ({
  text,
  highlight,
}) => {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className=" bg-orange-200 p-1 rounded-md">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};
