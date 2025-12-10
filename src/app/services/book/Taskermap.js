"use client";

import React, { useMemo, useEffect } from "react";
import {
  APIProvider,
  Map as GoogleMap,   // 👈 yahan rename
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";

const DEFAULT_CENTER = { lat: 34.0522, lng: -118.2437 }; // fallback

export default function TaskerMap({ taskers = [], centerLocation }) {
  const center = centerLocation || DEFAULT_CENTER;

  // --- NORMALIZE + SPREAD TASKERS ---
  const normalizedTaskers = useMemo(() => {
    if (!Array.isArray(taskers)) return [];

    const list = taskers
      .map((t) => {
        const rawLat = t?.location?.lat;
        const rawLng = t?.location?.lng;

        const lat = rawLat != null ? parseFloat(rawLat) : null;
        const lng = rawLng != null ? parseFloat(rawLng) : null;

        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng) ||
          (lat === 0 && lng === 0)
        ) {
          return null;
        }

        return { ...t, lat, lng };
      })
      .filter(Boolean);

    // 👇 yahan hum JS Map use kar rahe hain, ab ye built-in Map hai
    const groups = new Map();

    list.forEach((t) => {
      const key = `${t.lat.toFixed(6)}_${t.lng.toFixed(6)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(t);
    });

    const adjusted = [];
    const RADIUS_DEG = 0.00025; // ~20–30m

    groups.forEach((arr) => {
      if (arr.length === 1) {
        adjusted.push(arr[0]);
        return;
      }

      const count = arr.length;
      arr.forEach((t, idx) => {
        const angle = (2 * Math.PI * idx) / count;
        const deltaLat = RADIUS_DEG * Math.cos(angle);
        const deltaLng = RADIUS_DEG * Math.sin(angle);

        adjusted.push({
          ...t,
          lat: t.lat + deltaLat,
          lng: t.lng + deltaLng,
        });
      });
    });

    console.log("TASKERS NORMALIZED + SPREAD =>", adjusted);
    return adjusted;
  }, [taskers]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        style={{ width: "100%", height: "100%", borderRadius: "16px" }}
        center={center}
        defaultZoom={13}
        gestureHandling="greedy"
        disableDefaultUI={true}
      >
        <TaskerMarkers center={center} taskers={normalizedTaskers} />
      </GoogleMap>
    </APIProvider>
  );
}

function TaskerMarkers({ center, taskers }) {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    if (!taskers.length) {
      map.setCenter(center);
      map.setZoom(13);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    if (center?.lat && center?.lng) bounds.extend(center);
    taskers.forEach((t) => bounds.extend({ lat: t.lat, lng: t.lng }));

    map.fitBounds(bounds, 80);

    const MIN_ZOOM = 11;
    const MAX_ZOOM = 14;

    const listener = map.addListener("idle", () => {
      const z = map.getZoom();

      if (z < MIN_ZOOM) {
        map.setZoom(MIN_ZOOM);
      } else if (z > MAX_ZOOM) {
        map.setZoom(MAX_ZOOM);
      }

      window.google.maps.event.removeListener(listener);
    });
  }, [map, center, taskers]);

  return (
    <>
      {taskers.map((t, idx) => (
        <Marker
          key={t._id || t.id || idx}
          position={{ lat: t.lat, lng: t.lng }}
          title={`${t.firstName || ""} ${t.lastName || ""}`}
          icon={getUserIcon(t.firstName, t.lastName, t.profileImage)}
        />
      ))}
    </>
  );
}

// SAME getUserIcon as before
const getUserIcon = (firstName, lastName, profileImage) => {
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");
  const initialsClean = initials.toUpperCase();

  const shouldUseInitials =
    !profileImage ||
    profileImage.trim() === "" ||
    profileImage.includes("/d_avatar.png");

  const pinPath = `
    M30 5
    C18 5 8 15 8 27
    C8 45 30 72 30 72
    C30 72 52 45 52 27
    C52 15 42 5 30 5
    Z
  `;

  if (shouldUseInitials) {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='60' height='80'>
        <ellipse cx='30' cy='75' rx='12' ry='4' fill='rgba(0,0,0,0.25)' />
        <path d="${pinPath}" fill='#FFC107'/>
        <circle cx='30' cy='28' r='13' fill='white'/>
        <text 
          x='30' 
          y='33'
          text-anchor='middle'
          fill='#000'
          font-size='13'
          font-family='Arial'
          font-weight='bold'
        >
          ${initialsClean}
        </text>
      </svg>
    `;
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
      scaledSize: { width: 48, height: 64 },
      anchor: { x: 24, y: 64 },
    };
  }

  const svgPhoto = `
    <svg xmlns='http://www.w3.org/2000/svg' width='60' height='80'>
      <ellipse cx='30' cy='75' rx='12' ry='4' fill='rgba(0,0,0,0.25)' />
      <path d="${pinPath}" fill='#FFC107'/>
      <circle cx='30' cy='28' r='13' fill='white'/>
      <defs>
        <clipPath id='clipCircle'>
          <circle cx='30' cy='28' r='13' />
        </clipPath>
      </defs>
      <image 
        href='${profileImage}'
        width='30' 
        height='30'
        x='15'
        y='13'
        clip-path='url(#clipCircle)'
        preserveAspectRatio='xMidYMid slice'
      />
    </svg>
  `;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgPhoto),
    scaledSize: { width: 48, height: 64 },
    anchor: { x: 24, y: 64 },
  };
};



// "use client";
// import React, { useEffect, useRef } from "react";

// // Initial center point (Fallback agar user location na ho)
// const DEFAULT_CENTER = { lat: 34.0522, lng: -118.2437 }; // Los Angeles ka example

// export default function TaskerMap({ taskers, centerLocation }) {
//     const mapRef = useRef(null);
//     const mapInstanceRef = useRef(null);
//     console.log("taskers, centerLocation ",taskers, centerLocation )

//     // Tasker locations jo map par markers banenge
//     const taskerLocations = taskers
//         .filter(t => t.location?.lat && t.location?.lng)
//         .map(t => ({
//             lat: t.location.lat,
//             lng: t.location.lng,
//             name: t.firstName + " " + t.lastName,
//             hourlyRate: t.hourlyRate,
//             // 🛑 IMPORTANT: Yeh fields aapki mock data/API mein honi chahiye
//             email: t.email,
//             phone: t.phone
//         }));

//     useEffect(() => {
//         // Check if Google Maps API is loaded
//         if (!window.google) {
//              console.error("Google Maps API not loaded. Check script loading in AutocompleteInput or main layout.");
//              return;
//         }

//         const loader = window.google.maps.importLibrary("maps");
//         const markerLoader = window.google.maps.importLibrary("marker");

//         Promise.all([loader, markerLoader]).then(([maps, markers]) => {
//             const center = centerLocation || DEFAULT_CENTER;

//             // 1. Map Initialize karna
//             const map = new maps.Map(mapRef.current, {
//                 center: center,
//                 zoom: 12, // Initial zoom level
//                 mapId: "TASKER_MAP_ID", // Optional: Custom map style ID
//                 disableDefaultUI: true,
//             });
//             mapInstanceRef.current = map;

//             // 2. User/Job Location Marker (Bara ya alag color ka)
//             new markers.AdvancedMarkerElement({
//                 map,
//                 position: center,
//                 content: createMarkerContent('Your Location', 'blue', '🏠'),
//                 title: "Your Task Location"
//             });

//             // 3. Tasker Markers add karna
//             taskerLocations.forEach(tasker => {
//                 const marker = new markers.AdvancedMarkerElement({
//                     map,
//                     position: { lat: tasker.lat, lng: tasker.lng },
//                     content: createMarkerContent(`$${tasker.hourlyRate}/hr`, 'green', '👤'),
//                     title: tasker.name
//                 });

//                 // 4. Info Window (Details dikhane ke liye)
//                 const infoWindow = new maps.InfoWindow({
//                     content: `
//                         <div style="color:black; padding: 5px;">
//                             <strong>${tasker.name}</strong><br>
//                             Rate: $${tasker.hourlyRate}/hr<br>
//                             Email: <a href="mailto:${tasker.email}">${tasker.email}</a><br>
//                             Phone: <a href="tel:${tasker.phone}">${tasker.phone}</a>
//                         </div>
//                     `,
//                 });

//                 marker.addListener("click", () => {
//                     infoWindow.open({
//                         anchor: marker,
//                         map,
//                     });
//                 });
//             });

//             // 5. Map Bounds adjust karna taaki saare markers fit ho jayen
//             if (taskerLocations.length > 0) {
//                  const bounds = new maps.LatLngBounds();
//                  bounds.extend(center); // User location
//                  taskerLocations.forEach(t => bounds.extend(t));
//                  map.fitBounds(bounds);
//             }

//         }).catch(error => {
//             console.error("Error loading Google Maps libraries:", error);
//         });

//     }, [taskers, centerLocation]); // centerLocation change hone par map update hoga

//     // Custom Marker Content Function
//     const createMarkerContent = (text, color, icon) => {
//         const div = document.createElement('div');
//         div.className = `p-1 px-2 rounded-full border border-white text-xs font-bold whitespace-nowrap shadow-md ${color === 'blue' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`;
//         div.textContent = text;
//         return div;
//     };

//     return (
//         <div
//             ref={mapRef}
//             // Map ka size control karna
//             style={{ width: '100%', height: '500px', borderRadius: '8px' }}
//         />
//     );
// }
