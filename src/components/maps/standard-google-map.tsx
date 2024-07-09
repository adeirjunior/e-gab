/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, Link, Skeleton } from "@nextui-org/react";
import { Event } from "@prisma/client";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";

export default function StandardGoogleMap({ event }: { event: Event }) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null,
  );

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      loadPlace();
    };

    loadGoogleMapsScript();
  }, []);

  const findPlace = (location: string) => {
    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div"),
      );

      service.findPlaceFromQuery(
        {
          query: location,
          fields: ["name", "geometry"],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results[0]);
          } else {
            reject(status);
          }
        },
      );
    });
  };

  const loadPlace = async () => {
    try {
      const placeResult = await findPlace(event.location!);
      if (placeResult) {
        setPlace(placeResult);
      }
    } catch (error) {
      console.error("Error fetching place:", error);
    }
  };

  const mapCenter = useMemo(() => {
    if (place && place.geometry && place.geometry.location) {
      return {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    }
    return null; // Return null if place is not loaded yet
  }, [place]);

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
      center: mapCenter || undefined, // Use undefined if mapCenter is null
    }),
    [mapCenter],
  );

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API key not provided.");
    return <div>Error: Google Maps API key not provided.</div>;
  }

  return (
    <>
      {place && place.geometry && place.geometry.location && (
        <GoogleMap
          options={mapOptions}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
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
            position={{
              lat: place.geometry?.location.lat() || 0,
              lng: place.geometry?.location.lng() || 0,
            }}
            onLoad={() => console.log("Marker Loaded")}
          >
            {isInfoWindowOpen && (
              <InfoWindow
                options={{ ariaLabel: event.title }}
                onCloseClick={() => setIsInfoWindowOpen(false)}
              >
                <div>
                  <h3 className="text-xl">{event.title}</h3>
                  <p>{place.formatted_address}</p>
                  <Link
                    color="primary"
                    href={`https://www.google.com/maps?q=${place.geometry?.location.lat()},${place.geometry?.location.lng()}`}
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
      )}
      {!place && (
        <Skeleton className="rounded-2xl">
          <Card isPressable className="h-96 w-full bg-gray-400"></Card>
        </Skeleton>
      )}
    </>
  );
}
