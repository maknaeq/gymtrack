import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";

function Calendar({
                    selected,
                    setSelected
                  }: {
  selected: Date;
  setSelected: (date: Date) => void;
}) {
  const today = new Date();
  return (
    <div className="mb-10 md:mb-0">
      <DayPicker
        required
        locale={fr}
        mode="single"
        timeZone="Europe/Paris"
        selected={selected}
        onSelect={setSelected}
        modifiers={{
          past: (date) => date < today
        }}
        modifiersClassNames={{
          past: "text-gray-900/50"
        }}
      />
    </div>
  );
}

export default Calendar;
