import { Timestamp } from "firebase/firestore";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";

interface Props {
  date?: Timestamp;
}

export default function PromoTimer({ date }: Props) {
  const formatTimeDifference = (timestamp: number | undefined) => {
    if (!timestamp) {
      return "Data indisponível"; // caso a data nao exista
    }

    const now = DateTime.now();
    const then = DateTime.fromMillis(timestamp);
    const diffInMinutes = now.diff(then, "minutes").minutes;

    if (diffInMinutes < 1) {
      return "agora mesmo";
    }
    if (diffInMinutes < 60) {
      return `há ${Math.floor(diffInMinutes)}m`;
    } else if (diffInMinutes < 1440) {
      // 1440 minutos = 24 horas
      return `há ${Math.floor(diffInMinutes / 60)}h`;
    } else if (diffInMinutes < 10080) {
      return `há ${Math.floor(diffInMinutes / 1440)}dia`;
    } else if (diffInMinutes < 43800) {
      // 43800 minutos = aproximadamente 30 dias
      return `há ${Math.floor(diffInMinutes / 10080)}sem`;
    }
    if (diffInMinutes < 1051200) {
      // 1051200 minutos = aproximadamente 2 meses
      return `há ${Math.ceil(diffInMinutes / 43200)}mês`;
    } else {
      return `há ${Math.floor(diffInMinutes / 525600)}ano`;
    }
  };

  return (
    <>
      <p className="text-muted-foreground text-xs sm:text-sm truncate flex items-center gap-2 ">
        <Clock size={13} /> {formatTimeDifference(date?.toMillis())}
      </p>
    </>
  );
}
