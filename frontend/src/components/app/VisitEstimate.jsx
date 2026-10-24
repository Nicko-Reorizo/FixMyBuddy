import { validEstimate } from '../../utils/bookingValidation';
const money = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
export function VisitEstimate({ estimate, service = 'mechanic' }) {
  if (!validEstimate(estimate)) return <section className="provider-estimate"><h2>Visit estimate pending</h2><p>A current, itemized estimate is required before you can book.</p></section>;
  return <section className="provider-estimate"><h2>Itemized {service === 'repair' ? 'repair' : service === 'towing' ? 'towing' : 'visit'} estimate</h2>
    <dl>{estimate.items.map((item, index) => <div key={`${item.label}-${index}`}><dt>{item.label}</dt><dd>{money(item.amount)}</dd></div>)}<div className="estimate-total"><dt>Estimated total</dt><dd>{money(estimate.total)}</dd></div></dl>
    <p>{service === 'repair' ? 'Only these itemized repair charges are included. Further changes require your approval.' : service === 'towing' ? 'Any additional charges need your approval before work starts.' : 'Parts and repairs are not approved by this booking. Review and approve those costs separately after diagnosis.'}</p>
  </section>;
}

