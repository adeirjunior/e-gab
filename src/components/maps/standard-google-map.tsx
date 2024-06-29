"use client";

import { Card, Link, Skeleton } from "@nextui-org/react";
import { Event } from "@prisma/client";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

export default function StandardGoogleMap({ event }: { event: Event }) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: -11.724192, lng: -61.787287 }), []);

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
      rotateControl: false
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return (
      <Skeleton className="rounded-2xl">
        <Card isPressable className="h-96 w-full bg-gray-400"></Card>
      </Skeleton>
    );
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      onClick={() => setIsInfoWindowOpen(false)}
      mapContainerStyle={{
        width: "100%",
        height: "384px",
        borderRadius: "1em",
      }}
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
              <Link
                color="primary"
                href={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`}
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
  );
}
