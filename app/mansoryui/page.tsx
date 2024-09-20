"use client";
import React, { useEffect, useRef } from "react";
import Masonry from "masonry-layout";

type MasonryConstructor = typeof Masonry;

export default function MasonryUI() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const masonryRef = useRef<Masonry | null>(null);

  useEffect(() => {
    const initMasonry = async () => {
      if (
        typeof window !== "undefined" &&
        gridRef.current &&
        !masonryRef.current
      ) {
        try {
          const MasonryModule = await import("masonry-layout");
          const MasonryConstructor: MasonryConstructor =
            MasonryModule.default || MasonryModule;

          if (typeof MasonryConstructor === "function") {
            masonryRef.current = new MasonryConstructor(gridRef.current, {
              itemSelector: ".grid-item",
              columnWidth: 200,
            });
            console.log("Masonry initialized", masonryRef.current);
          } else {
            console.error("Masonry constructor is not a function");
          }
        } catch (error) {
          console.error("Error initializing Masonry:", error);
        }
      }
    };

    initMasonry();
  }, []);

  return (
    <>
      <h1>Masonry - columnWidth</h1>
      <div className="grid" ref={gridRef}>
        <div className="grid-item">1</div>
        <div className="grid-item grid-item--width2 grid-item--height2">2</div>
        <div className="grid-item grid-item--height3">3</div>
        <div className="grid-item grid-item--height2">4</div>
        <div className="grid-item grid-item--width3">5</div>
        <div className="grid-item">6</div>
        <div className="grid-item">7</div>
        <div className="grid-item grid-item--height2">8</div>
        <div className="grid-item grid-item--width2 grid-item--height3">9</div>
        <div className="grid-item">10</div>
      </div>
      <style jsx>{`
        .grid-item {
          float: left;
          width: 200px;
          height: 100px;
          background: #e6e5e4;
          border: 2px solid #b6b5b4;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2em;
          font-weight: bold;
        }
        .grid-item--width2 {
          width: 400px;
        }
        .grid-item--height2 {
          height: 200px;
        }
        .grid-item--height3 {
          height: 300px;
        }
        .grid-item--width3 {
          width: 600px;
        }
      `}</style>
    </>
  );
}
