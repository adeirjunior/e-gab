/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, Link, Skeleton } from "@nextui-org/react";
import { Event, EventLocation } from "@prisma/client";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import { useMemo, useState, Suspense } from "react";

export default function StandardGoogleMap({
  event,
}: {
  event: Event & { eventLocation: EventLocation };
}) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const mapCenter = {
    lat: event.eventLocation.lat,
    lng: event.eventLocation.lng,
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
      center: mapCenter, // Use undefined if mapCenter is null
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
                options={{ ariaLabel: event.title }}
                onCloseClick={() => setIsInfoWindowOpen(false)}
              >
                <div>
                  <h3 className="text-xl">{event.title}</h3>
                  <p>{event.eventLocation.formatted_address}</p>
                  <Link
                    color="primary"
                    href={event.eventLocation.url}
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
