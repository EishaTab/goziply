'use client';

import { useRef, useState } from 'react';

function debounce(fn, delay = 350) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

async function loadGoogleBaseIfNeeded() {
  if (typeof window === 'undefined') return;

  // Already loaded
  if (window.google?.maps?.places) return;

  // Script exists — wait for load but validate google.maps
  const existing = document.getElementById('google-maps-base');
  if (existing) {
    await new Promise((resolve, reject) => {
      existing.onload = () => {
        if (!window.google?.maps)
          return reject(
            new Error(
              'Google Maps script loaded but window.google.maps missing'
            )
          );
        resolve();
      };
      existing.onerror = () =>
        reject(new Error('Google Maps script failed to load (network)'));
    });
    return;
  }

  // Create new script
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.id = 'google-maps-base';
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&loading=async`;

    s.onload = () => {
      if (!window.google || !window.google.maps) {
        reject(
          new Error(
            'Google Maps script loaded but google.maps not initialized — check API key & billing'
          )
        );
      } else resolve();
    };

    s.onerror = () =>
      reject(new Error('Google Maps script failed to load (network error)'));

    document.head.appendChild(s);
  });
}

export default function LocationInput({
  onSelect,
  text = '',
  setText = () => {},
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const googleReady = useRef(false);
  const placesLib = useRef(null);
  const sessionToken = useRef(null);

  // --------------------------------------------------
  // Ensure Google Maps + Places Ready
  // --------------------------------------------------
  async function ensureGoogleReady() {
    if (googleReady.current) return;

    await loadGoogleBaseIfNeeded();

    const g = window.google;
    if (!g?.maps)
      throw new Error('Google Maps JS failed to initialize. Check key/billing.');

    // Try importLibrary first
    try {
      if (g.maps.importLibrary) {
        const lib = await g.maps.importLibrary('places');
        placesLib.current = lib;
      } else {
        placesLib.current = g.maps.places;
      }
    } catch {
      if (g.maps.places) placesLib.current = g.maps.places;
    }

    // Session token
    try {
      if (g.maps.places?.AutocompleteSessionToken) {
        sessionToken.current = new g.maps.places.AutocompleteSessionToken();
      }
    } catch {
      sessionToken.current = null;
    }

    googleReady.current = true;
  }

  // --------------------------------------------------
  // Run Search (debounced)
  // --------------------------------------------------
  const runSearch = debounce(async (query) => {
    if (!query || query.length < 3) return;

    try {
      setLoading(true);
      await ensureGoogleReady();

      const p = placesLib.current;

      // 1) New API: AutocompleteSuggestion.fetch
      if (p?.AutocompleteSuggestion?.fetch) {
        try {
          const res = await p.AutocompleteSuggestion.fetch({
            input: query,
            sessionToken: sessionToken.current,
            includeQueryPredictions: true,
          });

          setSuggestions(res?.suggestions || []);
          setLoading(false);
          return;
        } catch {
          // fall through to legacy
        }
      }

      // 2) Legacy API: AutocompleteService
      if (window.google?.maps?.places?.AutocompleteService) {
        const svc = new window.google.maps.places.AutocompleteService();
        svc.getPlacePredictions({ input: query }, (preds) => {
          setSuggestions(preds || []);
          setLoading(false);
        });
        return;
      }

      setSuggestions([]);
      setLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setSuggestions([]);
      setLoading(false);
    }
  }, 350);

  // --------------------------------------------------
  // Handle Select
  // --------------------------------------------------
  const handleSelect = async (item) => {
    setText(item.formattedSuggestion || item.description || '');
    setSuggestions([]);

    try {
      await ensureGoogleReady();
      const p = placesLib.current;
      const placeId = item.placeId || item.place_id;

      // 1) Modern Places API
      if (p?.Place) {
        try {
          const place = new p.Place({
            id: placeId,
            sessionToken: sessionToken.current,
          });

          const details = await place.fetchFields({
            fields: ['location', 'formattedAddress', 'addressComponents'],
          });

          const loc = {
            lat: details.location.lat(),
            lng: details.location.lng(),
            fullAddress: details.formattedAddress,
            city: '',
            state: '',
            country: '',
            zipCode: '',
          };

          (details.addressComponents || []).forEach((c) => {
            if (c.types?.includes('locality'))
              loc.city = c.longText || c.long_name;
            if (c.types?.includes('administrative_area_level_1'))
              loc.state = c.shortText || c.short_name;
            if (c.types?.includes('country'))
              loc.country = c.longText || c.long_name;
            if (c.types?.includes('postal_code'))
              loc.zipCode = c.longText || c.long_name;
          });

          onSelect && onSelect(loc);
          return;
        } catch (e) {
          console.error('Modern Place API error:', e);
        }
      }

      // 2) Legacy Geocoder fallback
      if (window.google?.maps?.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId }, (results) => {
          const r = results?.[0];
          if (!r) {
            onSelect && onSelect(null);
            return;
          }

          const loc = {
            lat: r.geometry.location.lat(),
            lng: r.geometry.location.lng(),
            fullAddress: r.formatted_address,
            city: '',
            state: '',
            country: '',
            zipCode: '',
          };

          (r.address_components || []).forEach((c) => {
            if (c.types?.includes('locality')) loc.city = c.long_name;
            if (c.types?.includes('administrative_area_level_1'))
              loc.state = c.short_name;
            if (c.types?.includes('country')) loc.country = c.long_name;
            if (c.types?.includes('postal_code')) loc.zipCode = c.long_name;
          });

          onSelect && onSelect(loc);
        });
        return;
      }

      onSelect && onSelect(null);
    } catch (e) {
      console.error('Details error:', e);
      onSelect && onSelect(null);
    }
  };

  // --------------------------------------------------
  // Handle typing / clear
  // --------------------------------------------------
  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);

    // field clear
    if (!val) {
      setSuggestions([]);
      if (onSelect) {
        onSelect(null); // ← parent ko bolo: location reset kar do
      }
      return;
    }

    if (val.length < 3) {
      setSuggestions([]);
      return;
    }

    runSearch(val);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <div className="relative w-full">
      <input
        className="border rounded p-2 w-full"
        value={text}
        onChange={handleChange}
        placeholder="Enter your location"
      />

      {(loading || suggestions.length > 0) && (
        <ul className="absolute w-full bg-white border rounded shadow-md z-50 max-h-60 overflow-auto">
          {loading && (
            <li className="p-3 flex justify-center">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            </li>
          )}

          {!loading &&
            suggestions.map((s) => {
              const label =
                s.formattedSuggestion || s.description || s.title || '';
              const id = s.placeId || s.place_id || label;

              return (
                <li
                  key={id}
                  onClick={() => handleSelect(s)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {label}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
