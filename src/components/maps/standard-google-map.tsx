/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, Link, Skeleton } from "@nextui-org/react";
import { Location } from "@prisma/client";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import { useMemo, useState, Suspense } from "react";

export default function StandardGoogleMap({
  location,
}: {
  location: Location
}) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const mapCenter = {
    lat: Number(location.lat),
    lng: Number(location.lng),
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: false,
      zoomControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      scaleControl: false,
      rotateControl: false,
      center: mapCenter,
    }),
    [mapCenter],
  );

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API key not provided.");
    return <div>Error: Google Maps API key not provided.</div>;
  }

  return (
    <LoadScript
      loadingElement={
        <Skeleton className="rounded-2xl">
          <Card isPressable className="h-96 w-full bg-gray-400"></Card>
        </Skeleton>
      }
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <Suspense
        fallback={
          <Skeleton className="rounded-2xl">
            <Card isPressable className="h-96 w-full bg-gray-400"></Card>
          </Skeleton>
        }
      >
        <GoogleMap
          options={mapOptions}
          zoom={14}
          mapTypeId="roadmap"
          onClick={() => setIsInfoWindowOpen(false)}
          mapContainerStyle={{
            width: "100%",
            height: "384px",
            borderRadius: "1em",
          }}
          center={mapCenter || undefined}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          <MarkerF
            onClick={() => setIsInfoWindowOpen(true)}
            position={mapCenter}
            onLoad={() => console.log("Marker Loaded")}
          >
            {isInfoWindowOpen && (
              <InfoWindow
                options={{ ariaLabel: location.name }}
                onCloseClick={() => setIsInfoWindowOpen(false)}
              >
                <div>
                  <h3 className="text-xl">{location.name}</h3>
                  <p>{location.formatted_address}</p>
                  <Link
                    color="primary"
                    href={location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir no Google Maps
                  </Link>
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        </GoogleMap>
      </Suspense>
    </LoadScript>
  );
}
