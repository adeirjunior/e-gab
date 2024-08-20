"use client";

import { Input, Skeleton } from "@nextui-org/react";
import { EventWithSite } from "./event-editor";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { Prisma } from "@prisma/client";

const libs: Library[] = ["places"];
export default function AutocompleteLocationInput({
  event,
  onChange: setData,
}: {
  event: EventWithSite;
  onChange: Dispatch<SetStateAction<EventWithSite>>;
}) {
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(
    event.location?.formatted_address || "",
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded) {
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
      );
      gAutoComplete.addListener("place_changed", () => {
        const place = gAutoComplete.getPlace();
        if (place.formatted_address) {
          setInputValue(place.formatted_address);

          const latitude = place.geometry?.location?.lat();
          const longitude = place.geometry?.location?.lng();

          if (latitude && longitude) {
            setData((prev) => ({
              ...prev,
              eventLocation: {
                ...prev.location,
                formatted_address: place.formatted_address || "",
                adr_address: place.adr_address || "",
                lat: new Prisma.Decimal(latitude),
                lng: new Prisma.Decimal(longitude),
                name: place.name || "",
                url: place.url || "",
              },
            }));
          }
        }
      });
    }
  }, [isLoaded, setData]);

  return isLoaded ? (
    <Input
      ref={placeAutoCompleteRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      variant="bordered"
      placeholder="Rua X, 1111, Bairro X, Cidade X, Brasil"
    />
  ) : (
    <Skeleton className="rounded-lg">
      <Input
        type="text"
        disabled
        variant="bordered"
        placeholder="Rua X, 1111, Bairro X, Cidade X, Brasil"
      />
    </Skeleton>
  );
}
