import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

export default function Rating({ rating, text }) {
  return (
    <div className="d-flex gap-2 ">
      <div style={{color: '#ffbf00'}}>
        <span >
          {rating >= 1 ? (
            <IoIosStar />
          ) : rating >= 0.5 ? (
            <IoIosStarHalf />
          ) : (
            <IoIosStarOutline />
          )}
        </span>
        <span>
          {rating >= 2 ? (
            <IoIosStar />
          ) : rating >= 1.5 ? (
            <IoIosStarHalf />
          ) : (
            <IoIosStarOutline />
          )}
        </span>
        <span>
          {rating >= 3 ? (
            <IoIosStar />
          ) : rating >= 2.5 ? (
            <IoIosStarHalf />
          ) : (
            <IoIosStarOutline />
          )}
        </span>
        <span>
          {rating >= 4 ? (
            <IoIosStar />
          ) : rating >= 3.5 ? (
            <IoIosStarHalf />
          ) : (
            <IoIosStarOutline />
          )}
        </span>
        <span>
          {rating >= 5 ? (
            <IoIosStar />
          ) : rating >= 4.5 ? (
            <IoIosStarHalf />
          ) : (
            <IoIosStarOutline />
          )}
        </span>
      </div>
      <div>
        {text && <strong>({text})reviews</strong>}
      </div>
    </div>
  );
}
