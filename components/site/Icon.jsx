const paths = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M6 6h12v12',
  chevron: 'm9 5 7 7-7 7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  grid: 'M3 4h18v12H3zM9 4v12m6-12v12M3 10h18M8 21h8m-4-5v5',
  battery: 'M9 2h6M6 5h12v17H6zM13 8l-3 5h4l-3 5',
  tool: 'M14 6a5 5 0 0 0-6 6L3 17a3 3 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4z',
  phone: 'M8 3H4c-1 10 7 18 17 17v-4l-5-2-2 2a13 13 0 0 1-6-6l2-2z',
  mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6zM8 12l3 3 5-6',
  leaf: 'M20 3C8 1 2 9 6 16s15 2 14-13ZM4 21 16 9',
  expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  calculator: 'M5 2h14v20H5zM8 5h8v4H8zM8 13h1m6 0h1m-8 4h1m6 0h1',
  whatsapp: 'M21 11.5A9 9 0 0 1 7 19l-5 2 2-5A9 9 0 1 1 21 11.5ZM8 7c0 5 4 9 8 9l1-3-3-1-1 1-3-3 1-1-1-2z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17 7h.01',
  linkedin: 'M4 9v11M4 4v.1M9 20V9h4v2c3-5 7-1 7 2v7M13 11v9',
  facebook: 'M15 22V13h3l1-4h-4V6c0-2 2-2 4-2V1h-4c-4 0-5 3-5 6v2H7v4h3v9',
  google: 'M21 11h-9v4h5a6 6 0 1 1-1-8l3-3a10 10 0 1 0 2 7Z',
};
export default function Icon({ name = 'arrow', size = 22, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}
