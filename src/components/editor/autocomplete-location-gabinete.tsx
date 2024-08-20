"use client";

import { Input, Skeleton, InputProps } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { Location, Prisma } from "@prisma/client";

type CustomInputProps = InputProps & {
  location: Location;
  onChange: Dispatch<SetStateAction<Location>>;
};

const libs: Library[] = ["places"];

export default function AutocompleteLocationGabinete({
  location,
  onChange: setData,
  ...inputProps
}: CustomInputProps) {
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(
    location.formatted_address || "",
  );

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded && placeAutoCompleteRef.current) {
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
      );

      gAutoComplete.addListener("place_changed", () => {
        const place = gAutoComplete.getPlace();
        if (place.formatted_address && place.geometry) {
          setInputValue(place.formatted_address);
          
          const latitude = place.geometry.location?.lat();
          const longitude = place.geometry.location?.lng();

          if (latitude !== undefined && longitude !== undefined) {
            setData((prev) => ({
              ...prev,
              formatted_address: place.formatted_address || "",
              adr_address: place.adr_address || "",
              lat: new Prisma.Decimal(latitude),
              lng: new Prisma.Decimal(longitude),
              name: place.name || "",
              url: place.url || "",
            }));
          }
        }
      });
    }

    if (loadError) {
      console.error("Error loading Google Maps API:", loadError);
    }
  }, [isLoaded, loadError, setData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the input value state
  };

  return isLoaded ? (
    <Input
      {...inputProps}
      ref={placeAutoCompleteRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange} // Handle input change locally
      variant="bordered"
      placeholder="Rua X, 1111, Bairro X, Cidade X, Brasil"
    />
  ) : (
    <Skeleton className="rounded-lg">
      <Input type="text" disabled variant="bordered" />
    </Skeleton>
  );
}
