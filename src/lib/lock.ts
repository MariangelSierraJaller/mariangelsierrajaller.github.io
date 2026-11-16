export const LOCK_QUERY_KEY = "locked";
export const LOCK_QUERY_VALUE = "true";

export const LOCK_SCRIPT =
  'try{if(new URLSearchParams(location.search).get("locked")==="true"){document.documentElement.dataset.locked="true";}}catch(e){}';

export function isLockedSearch(search: string): boolean {
  try {
    return new URLSearchParams(search).get(LOCK_QUERY_KEY) === LOCK_QUERY_VALUE;
  } catch {
    return false;
  }
}
