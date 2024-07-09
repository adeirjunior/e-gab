/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LocationIcon from "@/components/icons/location";
import { Skeleton } from "@nextui-org/react";
import { Event } from "@prisma/client";
import { useState, useEffect } from "react";

export default function LocationTag({ event }: { event: Event }) {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        await loadGoogleMapsScript();
        const placeResult = await findPlace(event.location!);
        if (placeResult) {
          setPlace(placeResult);
          setLoading(false);
        } else {
          setLoading(false);
          setError("Place not found");
        }
      } catch (error) {
        console.error("Error fetching place:", error);
        setLoading(false);
        setError("Error fetching place");
      }
    };

    if (event.location) {
      loadPlace();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.location]);

  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.places) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Google Maps script");
        document.head.appendChild(script);
      }
    });
  };

  const findPlace = (location: string) => {
    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div"),
      );
      service.findPlaceFromQuery(
        {
          query: location,
          fields: ["name", "formatted_address", "geometry"],
        },
        (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            resolve(results[0]);
          } else {
            reject(status);
          }
        },
      );
    });
  };

  return (
    <>
      {place && (
        <div className="flex gap-2">
          <div className="h-fit w-fit rounded-xl bg-[#566aff2a] p-2">
            <LocationIcon />
          </div>
          <div>
            <h2 className="text-base font-medium">{place.name}</h2>
            <p className="text-[12px] font-black">{place.formatted_address}</p>
          </div>
        </div>
      )}
      {!place && loading && (
        <Skeleton>
          <div className="flex gap-2">
            <div className="h-fit w-fit rounded-xl bg-[#566aff2a] p-2">
              <LocationIcon />
            </div>
            <div>
              <Skeleton className="h-[16px] w-[120px]" />
              <Skeleton className="h-[12px] w-[160px]" />
            </div>
          </div>
        </Skeleton>
      )}
      {!place && !loading && error && <p>{error}</p>}
    </>
  );
}
