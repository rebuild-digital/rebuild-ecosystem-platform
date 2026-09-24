import { getBuildersFromNotion } from "../data/builders";
import { getEspeaData } from "../data/espea";

/**
 * Nitro plugin: fill the external-data caches when the server boots.
 *
 * The data modules already serve a cached copy and refresh it in the
 * background, so a request only waits on an upstream API when no cache file
 * exists yet. That's the case for the first request after every deploy
 * (.cache/ starts empty in a new container): ~4-5 s for Notion, ~2-4 s for
 * ESPEA. Fetching at boot writes .cache/ before a visitor asks for it.
 *
 * Fire and forget: startup doesn't wait, and a failed fetch just leaves the
 * lazy path in place.
 */
export default function warmDataCaches() {
  void Promise.allSettled([getBuildersFromNotion(), getEspeaData()]);
}
