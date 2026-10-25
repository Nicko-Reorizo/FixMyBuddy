import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bell, LocateFixed, QrCode, ShieldCheck, Languages } from 'lucide-react';
import { CustomerHeading } from '../components/customer/CustomerHeading';
import { useLocale } from '../context/useLocale';
import { useBrowserPermissions } from '../hooks/useBrowserPermissions';
export function AccountSettings() {
  const { section } = useParams();
  const { language, setLanguage, storageError, t } = useLocale();
  const permissions = useBrowserPermissions();
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const labels = { notifications: t('Notifications','Mga abiso'), location: t('Location access','Access sa lokasyon'), privacy: t('Privacy & sharing','Privacy at pagbabahagi'), payments: t('QR payments','Pagbabayad gamit ang QR'), language: t('Language','Wika') };
  const permissionLabel = value => value === 'granted' ? t('Allowed by browser','Pinayagan ng browser') : value === 'denied' ? t('Blocked by browser','Hinarang ng browser') : value === 'unsupported' ? t('Not supported by this browser','Hindi suportado ng browser') : value === 'prompt' || value === 'default' ? t('Not allowed yet','Hindi pa pinapahintulutan') : t('Permission status unavailable','Hindi makuha ang estado ng pahintulot');
  async function ask(kind) {
    setBusy(true); setError('');
    try { if (kind === 'location') await permissions.askLocation(); else await permissions.askNotifications(); }
    catch (problem) { setError(problem.message); } finally { setBusy(false); }
  }
  return <>
    <CustomerHeading title={labels[section] || t('Settings','Mga setting')} backTo="/account">{t('Your choice, clearly explained.','Malinaw ang iyong mga pagpipilian.')}</CustomerHeading>
    {section === 'language' ? <section className="settings-section"><Languages size={28} /><fieldset className="settings-languages"><legend>{t('Choose your language','Piliin ang iyong wika')}</legend>{[['en','English'],['fil','Filipino']].map(([value,label]) => <label key={value}><input type="radio" name="language" checked={language === value} onChange={() => setLanguage(value)} />{label}</label>)}</fieldset><p className="auth-hint">{storageError ? t('Language changed for this tab; browser storage is unavailable.','Nabago ang wika sa tab na ito; hindi gumagana ang browser storage.') : t('Your language preference is saved on this device.','Naka-save sa device na ito ang pinili mong wika.')}</p></section>
      : section === 'notifications' || section === 'location' ? <section className="settings-section">
        {section === 'notifications' ? <Bell size={28} /> : <LocateFixed size={28} />}
        <h2>{permissionLabel(permissions[section])}</h2>
        <p>{section === 'location' ? t('Location is requested when you choose GPS. You can still enter a pickup address manually.','Kinukuha lang ang lokasyon kapag pinili mo ang GPS. Maaari ka pa ring maglagay ng pickup address.') : t('Browser permission is not a guarantee of background notifications. Push delivery still needs backend integration.','Hindi garantiya ng background notification ang pahintulot ng browser. Kailangan pa ng backend para sa push delivery.')}</p>
        <button className="auth-primary" type="button" disabled={busy || ['granted','denied','unsupported'].includes(permissions[section])} onClick={() => ask(section)}>{busy ? t('Requesting...','Humihingi ng pahintulot...') : t('Request browser permission','Humingi ng pahintulot sa browser')}</button>
        <p className="auth-hint">{t('To revoke or unblock access, change this site permission in your browser settings. This website cannot silently change it.','Para bawiin o payagan muli ang access, baguhin ang pahintulot sa settings ng browser. Hindi ito palihim na mababago ng website.')}</p>
      </section> : section === 'privacy' ? <section className="settings-section"><ShieldCheck size={28} /><h2>{t('Sharing is off by default','Naka-off ang pagbabahagi bilang default')}</h2><p>{t('Enable sharing separately in a booking. Your emergency contact is not automatically sent your location, and approval for one booking never applies to another.','Payagan ang pagbabahagi sa bawat booking. Hindi awtomatikong ipinapadala ang iyong lokasyon sa emergency contact, at hindi nalilipat ang pahintulot sa ibang booking.')}</p><Link className="auth-secondary" to="/history">{t('Manage booking sharing','Pamahalaan ang pagbabahagi sa booking')}</Link><Link className="provider-text-link" to="/account/emergency-contact">{t('Review emergency contact','Suriin ang kontak sa emergency')}</Link></section>
      : section === 'payments' ? <section className="settings-section"><QrCode size={28} /><h2>{t('Use your provider QR','Gamitin ang QR ng iyong provider')}</h2><p>{t('No payment account is saved here. Open a confirmed booking to see a QR supplied by that provider. Check the payee and amount in GCash before sending.','Walang payment account na naka-save rito. Buksan ang booking para makita ang QR na ibinigay ng provider. Suriin ang tatanggap at halaga sa GCash bago magpadala.')}</p><p>{t('Reporting a payment does not verify it. Receipt confirmation must come from the provider.','Hindi nabe-verify ang bayad sa pag-report lamang. Kailangang kumpirmahin ng provider ang pagtanggap.')}</p><Link to="/history" className="auth-secondary">{t('Open my bookings','Buksan ang aking mga booking')}</Link></section> : <p>{t('Choose a setting from your account.','Pumili ng setting sa iyong account.')}</p>}
    {error && <p className="auth-error" role="alert">{error}</p>}
  </>;
}

