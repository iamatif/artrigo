import AR from './locales/editorial-AR.json';
import DE from './locales/editorial-DE.json';
import FR from './locales/editorial-FR.json';
import type {EditorialCopy,SitePageId} from './sitePageContent';
export const editorialTranslations={AR,DE,FR} as unknown as Record<string,Record<SitePageId,EditorialCopy>>;
