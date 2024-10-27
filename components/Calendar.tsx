import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";

function Calendar({
  selected,
  setSelected,
}: {
  selected: Date;
  setSelected: (date: Date) => void;
}) {
  const today = new Date();
  return (
    <div>
      <DayPicker
        required
        locale={fr}
        mode="single"
        timeZone="Europe/Paris"
        selected={selected}
        onSelect={setSelected}
        //gray out past days
        modifiers={{
          past: (date) => date < today,
        }}
        modifiersClassNames={{
          past: "text-gray-400",
        }}
      />
    </div>
  );
}

export default Calendar;
