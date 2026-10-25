import { tr } from "../../i18n/translations";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export function ScreenHeader({
  title,
  subtitle,
  backTo = '/app'
}) {
  return <header className="flex items-center gap-4 pt-11">
      <Link to={backTo} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-white text-white transition hover:bg-white/10" aria-label={tr("Go back")}>
        <ArrowLeft size={24} />
      </Link>
      <div>
        <h1 className="text-base font-bold leading-tight text-white">{tr(title)}</h1>
        {subtitle ? <p className="mt-0.5 text-xs italic text-slate-400">{tr(subtitle)}</p> : null}
      </div>
    </header>;
}
