import { useMemo, useState } from 'react';
import { Clock3, Plus, Send, Trash2 } from 'lucide-react';

const defaultItems = [
  { id: 'diagnosis', label: 'Call-out & diagnosis', amount: 450 },
];

function formatPeso(value) {
  return `₱${Number(value || 0).toLocaleString('en-PH')}`;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `item-${Date.now()}`;
}

export function QuoteEditor({
  initialItems = defaultItems,
  approvalStatus = 'Not sent',
  repairTime = '',
  onSubmit,
  submitLabel = 'Send for customer approval',
}) {
  const [items, setItems] = useState(() =>
    initialItems.map((item) => ({ ...item })),
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [items],
  );

  const estimatedNet = Math.round(total * 0.9);

  function updateItem(id, field, value) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { id: createId(), label: '', amount: 0 },
    ]);
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ items, total, estimatedNet, repairTime });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <section className="rounded-xl border border-[#34435b] bg-[#1c293d] p-3.5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="m-0 text-sm font-semibold">Parts &amp; labor</h2>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-[#ffda45]"
          >
            <Plus size={15} aria-hidden="true" />
            Add line
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_92px_36px] items-center gap-2"
            >
              <label className="sr-only" htmlFor={`${item.id}-label`}>
                Line item description
              </label>
              <input
                id={`${item.id}-label`}
                value={item.label}
                onChange={(event) =>
                  updateItem(item.id, 'label', event.target.value)
                }
                placeholder="Describe the work or part"
                className="min-h-10 min-w-0 rounded-lg border border-[#34435b] bg-[#10192d] px-2.5 text-xs text-white outline-none placeholder:text-[#7f8da3] focus:border-[#ffda45]"
              />

              <label className="sr-only" htmlFor={`${item.id}-amount`}>
                Amount in pesos
              </label>
              <input
                id={`${item.id}-amount`}
                type="number"
                min="0"
                step="1"
                value={item.amount}
                onChange={(event) =>
                  updateItem(item.id, 'amount', event.target.value)
                }
                className="min-h-10 w-full rounded-lg border border-[#34435b] bg-[#10192d] px-2 text-right text-xs text-white outline-none focus:border-[#ffda45]"
              />

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.label || 'line item'}`}
                className="grid h-9 w-9 place-items-center rounded-lg text-[#aebbd0] hover:bg-white/5 hover:text-white"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t border-[#34435b] pt-3 text-xs">
          <div className="flex justify-between gap-3 text-[#aebbd0]">
            <span>Customer total</span>
            <strong className="text-[#ffda45]">{formatPeso(total)}</strong>
          </div>
          <div className="flex justify-between gap-3 text-[#aebbd0]">
            <span>Estimated net after 10% fee</span>
            <strong className="text-white">{formatPeso(estimatedNet)}</strong>
          </div>
        </div>
      </section>

      <label className="flex min-h-12 items-center gap-2 rounded-xl border border-[#34435b] bg-[#1c293d] px-3 text-xs text-[#aebbd0]">
        <Clock3 size={16} className="shrink-0 text-[#ffda45]" aria-hidden="true" />
        <span className="flex-1">Repair time estimate</span>
        <input
          value={repairTime}
          onChange={(event) => {
            const value = event.target.value;
            onSubmit?.({ draftRepairTime: value });
          }}
          placeholder="30–40 minutes"
          className="w-32 bg-transparent text-right text-xs text-white outline-none placeholder:text-[#7f8da3]"
        />
      </label>

      <p className="m-0 rounded-lg bg-[#3b3420] px-3 py-2.5 text-xs leading-5 text-[#d7c98d]">
        Approval status: {approvalStatus}. Work stays blocked until the
        customer approves the quote.
      </p>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffda45] px-4 text-sm font-bold text-[#111827] hover:bg-[#ffe16a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffda45]"
      >
        <Send size={17} aria-hidden="true" />
        {submitLabel}
      </button>
    </form>
  );
}