"use client"

import React, { useState } from "react";
import { string, number, func, bool } from "prop-types";
import defaultClasses from "./rating.module.css";
import IconComponent from "./IconComponent";

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
  } = props;

  const [activeStar, setActiveStar] = useState(-1);
  const decimal = ratingInPercent / 20;
  const nonFraction = Math.trunc(decimal);
  const fraction = Number((decimal - nonFraction).toFixed(2));
  const fractionPercent = fraction * 100;

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
    setActiveStar(index);
  };

  const showDefaultStar = (index: any) => {
    return RatingDefault;
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
        onClick={() => handleClick(index)}
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
    <div className={classes.root}>
      {[...new Array(numberOfStar)].map((arr, index) =>
        enableUserInteraction
          ? withUserInteraction(index)
          : withoutUserInteraction(index),
      )}
    </div>
  );
};

Rating.propTypes = {
  ratingInPercent: number.isRequired,
  iconSize: string,
  showOutOf: bool.isRequired,
  enableUserInteraction: bool.isRequired,
  onClick: func,
};

Rating.defaultProps = {
  ratingInPercent: 50,
  iconSize: SIZES.LARGE.key,
  onClick: () => null,
  showOutOf: false,
  enableUserInteraction: false,
};

export default Rating;
