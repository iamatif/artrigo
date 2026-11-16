import type {EditorialCopy,SitePageId} from './sitePageContent';
export const dictionaryData:Record<string,Record<string,string>>={EN:{}};
export const editorialTranslationData:Record<string,Record<SitePageId,EditorialCopy>>={};
const loaders={
 AR:()=>Promise.all([import('./locales/AR.json'),import('./locales/editorial-AR.json')]),
 DE:()=>Promise.all([import('./locales/DE.json'),import('./locales/editorial-DE.json')]),
 FR:()=>Promise.all([import('./locales/FR.json'),import('./locales/editorial-FR.json')])
};
const pending:Record<string,Promise<void>|undefined>={};
export function loadLocaleData(locale:string):Promise<void>{
 if(dictionaryData[locale])return Promise.resolve();
 if(!(locale in loaders))return Promise.resolve();
 return pending[locale]??(pending[locale]=loaders[locale as keyof typeof loaders]().then(([common,editorial])=>{dictionaryData[locale]=common.default;editorialTranslationData[locale]=editorial.default as Record<SitePageId,EditorialCopy>}).catch(error=>{delete pending[locale];throw error}));
}
// Prerender every language; browsers request only the language being viewed.
if(typeof window==='undefined')await Promise.all(Object.keys(loaders).map(loadLocaleData));
else{const query=new URLSearchParams(window.location.search).get('lang')?.toUpperCase();const path=window.location.pathname.split('/').filter(Boolean)[0]?.toUpperCase();await loadLocaleData(query&&query in loaders?query:path||'EN')}
