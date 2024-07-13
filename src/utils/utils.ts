export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export const getFormattedDate = (date: Date): string => (date ? formatter.format(date) : '');

export const enum ISOSource {
  DIRECT,
  SOURCEFORGE,
}
export const enum ISOEdition {
  DESKTOP = 'desktop',
  GNOME = 'gnome',
  HANDHELD = 'handheld',
  KDE = 'kde',
}

const direct_base_link = 'https://iso.cachyos.org';
const sourceforge_base_link = 'https://sourceforge.net/projects/cachyos-arch/files/gui-installer';

export const generateDownloadLink = (edition: ISOEdition, release: string, source: ISOSource): string => {
  const base_link = source === ISOSource.DIRECT ? direct_base_link : sourceforge_base_link;
  const release_link = `${edition}/${release}/cachyos-${edition}-linux-${release}.iso`;
  const res_link =
    source === ISOSource.DIRECT ? `${base_link}/${release_link}` : `${base_link}/${release_link}`;
  return source === ISOSource.DIRECT ? res_link : `${res_link}/download`;
};
