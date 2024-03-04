import React from "react";
import { roomItems } from "../data/Data";

export default function Heading({heading}) {
  console.log(heading);

  const room = roomItems.find(item => item.url === heading);
  const isRoomDetail = roomItems.some(item => item.url === heading);

  return (
    <>
      <div className="container-fluid page-header mb-5 p-0 bg-image">
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-primary mb-3 animated slideInDown">
              {isRoomDetail ? (room ? room.name : heading) : heading}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
