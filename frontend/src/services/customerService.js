const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export const isCustomerApiConfigured = Boolean(baseUrl);

async function request(path, method = 'GET', body) {
  if (!baseUrl)
    throw new Error(
      'Service is currently unavailable. Please try again later.',
    );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      credentials: 'include',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) {
      if (response.status === 401)
        throw new Error('Please sign in to continue.');
      if (response.status === 409)
        throw new Error('These details have changed. Refresh and try again.');
      throw new Error('We could not complete your request. Please try again.');
    }
    if (response.status === 204) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError')
      throw new Error('The request timed out. Please try again.');
    if (error instanceof TypeError)
      throw new Error('Check your connection and try again.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function records(data, key) {
  if (
    !Array.isArray(data?.[key]) ||
    !data[key].every((item) => item && typeof item === 'object' && item.id)
  )
    throw new Error('We could not load your details. Please try again.');
  return data[key];
}

export const customerService = {
  async reportPayment(id, details) {
    return request(`/customers/me/bookings/${encodeURIComponent(id)}/payment-reports`, 'POST', details);
  },
  async approveRepairs(id, details) {
    const data = await request(`/customers/me/bookings/${encodeURIComponent(id)}/repair-approval`, 'POST', details);
    if (data?.booking?.repairApprovalStatus !== 'approved') throw new Error('Could not confirm repair approval. Refresh before retrying.');
    return data.booking;
  },
  async removeVehicle(id) {
    await request(`/customers/me/vehicles/${encodeURIComponent(id)}`, 'DELETE');
  },
  async vehicles() {
    return records(await request('/customers/me/vehicles'), 'vehicles');
  },
  async saveVehicle(vehicle, id) {
    const data = await request(
      `/customers/me/vehicles${id ? `/${encodeURIComponent(id)}` : ''}`,
      id ? 'PATCH' : 'POST',
      vehicle,
    );
    if (!data?.vehicle?.id)
      throw new Error('We could not save your vehicle. Please try again.');
    return data.vehicle;
  },
  async bookings() {
    return records(await request('/customers/me/bookings'), 'bookings');
  },
  async updates() {
    return records(await request('/customers/me/updates'), 'updates');
  },
  async createBooking(details) {
    const data = await request('/customers/me/bookings', 'POST', details);
    if (!data?.booking?.id)
      throw new Error(
        'We could not confirm the booking. Please check your history before retrying.',
      );
    return data.booking;
  },
};
