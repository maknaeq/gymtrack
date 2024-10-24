import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";

function Calendar({
  selected,
  setSelected,
}: {
  selected: Date;
  setSelected: (date: Date) => void;
}) {
  return (
    <div>
      <DayPicker
        required
        locale={fr}
        mode="single"
        timeZone="Europe/Paris"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}

export default Calendar;
