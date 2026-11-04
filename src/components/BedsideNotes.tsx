import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, StickyNote } from 'lucide-react';
import { loadNote, saveNote } from '../lib/storage';

/** Expandable, device-local note. Never leaves the browser (localStorage only). */
export default function BedsideNotes({ noteId }: { noteId: string }) {
  const [text, setText] = useState(() => loadNote(noteId));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    saveNote(noteId, text);
  }, [noteId, text]);

  const hasNote = text.trim() !== '';

  return (
    <div className="mt-3 border-t border-slate-800 pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <StickyNote size={14} className={hasNote ? 'text-amber-300' : ''} />
        Bedside notes{hasNote && !open ? ' •' : ''}
      </button>
      {open && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Local pearls (PLEX contact, formulary limits…). Saved on this device only. No patient identifiers."
          aria-label="Bedside notes"
          className="mt-2 w-full rounded-md border border-slate-600 bg-slate-800 p-2 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      )}
    </div>
  );
}
