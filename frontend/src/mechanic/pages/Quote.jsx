import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { QuoteEditor } from '../components/QuoteEditor';

export function Quote() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [approvalStatus, setApprovalStatus] = useState('Not sent');
  const [repairTime, setRepairTime] = useState('30–40 minutes');

  function handleQuoteAction(value) {
    if (value.draftRepairTime !== undefined) {
      setRepairTime(value.draftRepairTime);
      return;
    }

    if (value.items) {
      setApprovalStatus('Sent · Waiting for customer approval');
    }
  }

  return (
    <div className="pb-4">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1c293d] text-[#ffda45]"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="m-0 text-xl font-bold">Build a clear quote</h1>
          <p className="mb-0 mt-1 text-xs text-[#aebbd0]">
            {jobId || 'FMB-1042'} · Quote v1 · Draft, not approved
          </p>
        </div>
      </div>

      <QuoteEditor
        approvalStatus={approvalStatus}
        repairTime={repairTime}
        onSubmit={handleQuoteAction}
      />
    </div>
  );
}