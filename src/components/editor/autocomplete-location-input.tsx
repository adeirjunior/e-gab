"use client";

import {
  Input,
  Skeleton,
} from "@nextui-org/react";
import { EventWithSite } from "./event-editor";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";

const libs: Library[] = ["places"];
export default function AutocompleteLocationInput({
  event,
  onChange: setData,
}: {
  event: EventWithSite;
  onChange: Dispatch<SetStateAction<EventWithSite>>;
}) {
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded) {
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
      );
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded]);


useEffect(() => {
  if (autoComplete) {
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      setData((prev) => ({
        ...prev,
          location: {
            ...prev.location,
            name: place.name ?? "",
            formatted_address: place.formatted_address ?? "",
            adr_address: place.adr_address ?? "",
            url: place.url ?? "",
            lat: place.geometry?.location?.lat() ?? 0,
            lng: place.geometry?.location?.lng() ?? 0,
          },
      }));

    });
  }
}, [autoComplete, setData]);

  return isLoaded ? (
    <Input
      ref={placeAutoCompleteRef}
      type="text"
      defaultValue={event.location.formatted_address || ""}
      variant="bordered"
      placeholder="Rua X, 1111, Bairro X, Cidade X, Brasil"
    />
  ) : (
    <Skeleton>
      <Input
        type="text"
        disabled
        variant="bordered"
        placeholder="Rua X, 1111, Bairro X, Cidade X, Brasil"
      />
    </Skeleton>
  );
}
