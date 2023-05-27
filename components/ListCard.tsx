interface Props {
  emoji: string | null;
  name: string;
  description: string | null;
  date: Date;
}
function ListCard({ emoji, name, description, date }: Props) {
  return (
    <div>
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <div>
        <div>{emoji}</div>
        <div>{description}</div>
      </div>
      <div>
        {Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(date)}
      </div>
    </div>
  );
}

export default ListCard;
