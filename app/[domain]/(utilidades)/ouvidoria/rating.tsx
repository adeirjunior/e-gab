"use client";

import React, { useRef, useState, useTransition } from "react";
import { string, number, func, bool, object } from "prop-types";
import defaultClasses from "./rating.module.css";
import IconComponent from "./IconComponent";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";
import { updateOneKeyChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import { toast } from "sonner";
import { ChatRoom } from "@prisma/client";

const SIZES = {
  SMALL: {
    key: "s",
    size: 10,
  },
  MEDIUM: {
    key: "m",
    size: 18,
  },
  LARGE: {
    key: "l",
    size: 28,
  },
};

const OUT_OF_VALUE = 5;

const Rating = (props: any) => {
  const {
    iconSize,
    ratingInPercent,
    showOutOf,
    enableUserInteraction,
    onClick,
    room,
  } = props;

  const [activeStar, setActiveStar] = useState(room.stars ?? -1);
  const decimal = ratingInPercent / 20;
  const nonFraction = Math.trunc(decimal);
  const fraction = Number((decimal - nonFraction).toFixed(2));
  const fractionPercent = fraction * 100;
  const controller = useRef<any>();
  const [isLoading, start] = useTransition();

  const classes = defaultClasses;

  const numberOfStar = OUT_OF_VALUE;
  const size =
    iconSize === SIZES.SMALL.key
      ? SIZES.SMALL.size
      : iconSize === SIZES.MEDIUM.key
        ? SIZES.MEDIUM.size
        : SIZES.LARGE.size;

  const RatingHighlighted = (
    <IconComponent type={"ratingHighlighted"} width={size} height={size} />
  );
  const RatingDefault = (
    <IconComponent type={"ratingDefault"} width={size} height={size} />
  );

  const handleClick = (index: any) => {
    onClick(index + 1);
    const formData = new FormData();
    formData.append("stars", index);

    start(async () => {
      const chatRoom = await updateOneKeyChatRoom(formData, room.id, "stars");

      if ("error" in chatRoom) {
        toast.error(chatRoom.error);
      } else {
        onShoot();
      }
    });

    setActiveStar(index);
  };

  const showDefaultStar = (index: any) => {
    return RatingDefault;
  };

  const onInitHandler = ({ conductor }: any) => {
    controller.current = conductor;
  };

  const onShoot = () => {
    controller.current?.shoot();
  };

  let isShow = true;
  const getStar = (index: any) => {
    if (index <= nonFraction - 1) {
      isShow = true;
      return "100%";
    } else if (fractionPercent > 0 && isShow) {
      isShow = false;
      return `${fractionPercent}%`;
    } else {
      return "0%";
    }
  };

  const isShowOutOfStar = (index: any) => {
    if (showOutOf) {
      return showOutOf;
    }

    const isLoopThrough = (fraction === 0 ? nonFraction : nonFraction + 1) - 1;
    return index <= isLoopThrough;
  };

  const withoutUserInteraction = (index: any) => {
    return isShowOutOfStar(index) ? (
      <div style={{ position: "relative" }} key={index}>
        <div
          style={{
            width: getStar(index),
            overflow: "hidden",
            position: "absolute",
          }}
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar(
          showOutOf
            ? nonFraction === 0
              ? index < nonFraction
              : index <= nonFraction
            : index <= numberOfStar,
        )}
      </div>
    ) : null;
  };

  const withUserInteraction = (index: any) => {
    return (
      <div
        style={{ position: "relative" }}
        onClick={() => activeStar >= 0 ? null : handleClick(index)}
        key={index}
      >
        <div
          style={{
            width: index <= activeStar ? "100%" : "0%",
            overflow: "hidden",
            position: "absolute",
          }}
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar(index)}
      </div>
    );
  };

  return (
    <>
      <div className={classes.root}>
        {[...new Array(numberOfStar)].map((arr, index) =>
          enableUserInteraction
            ? withUserInteraction(index)
            : withoutUserInteraction(index),
        )}
      </div>
      <Fireworks onInit={onInitHandler} />
    </>
  );
};

Rating.propTypes = {
  ratingInPercent: number.isRequired,
  iconSize: string,
  showOutOf: bool.isRequired,
  enableUserInteraction: bool.isRequired,
  onClick: func,
  room: object
};

Rating.defaultProps = {
  ratingInPercent: 50,
  iconSize: SIZES.LARGE.key,
  onClick: () => null,
  showOutOf: false,
  enableUserInteraction: false,
  room: object
};

export default Rating;
