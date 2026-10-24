import { formatLongDate, shiftDate } from "../../utils/utils";

const buttonClass =
  "min-w-[44px] min-h-[44px] px-3 text-[15px] text-indigo-400 transition duration-300 ease-in-out hover:text-white disabled:text-zinc-600";

// `date` is the day being shown ("2026-10-21"), or null until it's known.
// onChange gets "YYYYMMDD", or null for today.
const DateNav = ({ date, isToday, onChange }) => {
  return (
    <div className="flex flex-wrap items-center -ml-3">
      <button
        type="button"
        aria-label="Previous day"
        disabled={!date}
        onClick={() => onChange(shiftDate(date, -1))}
        className={buttonClass}
      >
        [ ‹ ]
      </button>
      <span className="min-w-[190px] text-center text-[15px] text-zinc-300">
        {date ? formatLongDate(date) : " "}
      </span>
      <button
        type="button"
        aria-label="Next day"
        disabled={!date}
        onClick={() => onChange(shiftDate(date, 1))}
        className={buttonClass}
      >
        [ › ]
      </button>
      {!isToday && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className={buttonClass}
        >
          [ today ]
        </button>
      )}
    </div>
  );
};

export default DateNav;
