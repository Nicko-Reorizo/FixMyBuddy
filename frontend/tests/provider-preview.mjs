// Isolated browser-test fixture. Never imported by the application.
import http from 'node:http';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const origin = 'http://127.0.0.1:5184';
const estimate = { id: 'test-quote', version: 1, currency: 'PHP', items: [{ label: 'Test call-out', amount: 300 }, { label: 'Test diagnosis', amount: 125.5 }], total: 425.5 };
const provider = { id: 'test-provider', name: 'QA fixture provider (test only)', verified: true, rating: 4.7, reviewsCount: 1, distanceKm: 2, etaMinutes: 10, specialties: ['Battery'], jobsCompleted: 1, credentials: ['Test credential only'], estimate, cancellationPolicy: { id: 'test-policy', text: 'Test-only terms. No real booking or payment is made in this isolated preview.' }, customerReviews: [{ id: 'test-review', authorName: 'QA review', rating: 5, text: 'Test review content, not a real customer review.' }] };
const vehicle = { id: 'test-vehicle', make: 'QA', model: 'Fixture vehicle', year: 2024, type: 'car', color: 'Test', plate: '' };
const bookings = [];
let lastSearch = null;
const api = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204).end(); return; }
  let text = '';
  for await (const chunk of req) text += chunk;
  const body = text ? JSON.parse(text) : {};
  let result;
  if (req.url === '/auth/session') result = { user: { id: 'test-customer', name: 'QA fixture customer', phoneVerified: true } };
  else if (req.url === '/customers/me/vehicles') result = { vehicles: [vehicle] };
  else if (req.url === '/customers/me/updates') result = { updates: [] };
  else if (req.url === '/providers/search') {
    lastSearch = body;
    const filters = body.filters || {};
    const visible = (!filters.specialty || filters.specialty === 'Battery') && Number(filters.radiusKm || 5) >= 2 && (filters.maximumVisitPrice === '' || filters.maximumVisitPrice == null || Number(filters.maximumVisitPrice) >= estimate.total);
    result = { providers: visible ? [provider] : [], recommendedProviderId: visible ? provider.id : null };
  } else if (req.url === '/providers/test-provider/quote') result = { provider };
  else if (req.url === '/customers/me/bookings' && req.method === 'POST') {
    if (body.estimateId !== estimate.id || body.cancellationPolicyId !== provider.cancellationPolicy.id || body.repairsApproved !== false) { res.writeHead(400).end(); return; }
    const booking = { ...body, id: 'test-booking', providerName: provider.name, vehicleLabel: 'QA Fixture vehicle', status: 'requested', quotedAmount: estimate.total, payment: { status: 'unverified' }, repairApprovalStatus: 'awaiting_customer', repairEstimate: { ...estimate, id: 'test-repair' } };
    bookings.push(booking); result = { booking };
  } else if (req.url === '/customers/me/bookings') result = { bookings };
  else if (req.url === '/customers/me/bookings/test-booking/repair-approval') { bookings[0].repairApprovalStatus = 'approved'; result = { booking: bookings[0] }; }
  else if (req.url === '/test-state') result = { lastSearch, bookings };
  else { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(result));
});
api.listen(5984, '127.0.0.1');
process.env.VITE_API_BASE_URL = 'http://127.0.0.1:5984';
const vite = await createServer({ root: fileURLToPath(new URL('../', import.meta.url)), server: { host: '127.0.0.1', port: 5184, strictPort: true } });
await vite.listen();
console.log('TEST ONLY: http://127.0.0.1:5184. No production data, bookings or payments.');
async function stop() { await vite.close(); api.close(); process.exit(); }
process.on('SIGTERM', stop); process.on('SIGINT', stop);

