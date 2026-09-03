"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const buildings = [
  { height: "34%", width: "8%", left: "2%", windows: 4 },
  { height: "52%", width: "12%", left: "11%", windows: 5 },
  { height: "40%", width: "9%", left: "24%", windows: 4 },
  { height: "68%", width: "14%", left: "34%", windows: 6 },
  { height: "46%", width: "10%", left: "49%", windows: 4 },
  { height: "76%", width: "13%", left: "60%", windows: 7 },
  { height: "42%", width: "9%", left: "75%", windows: 4 },
  { height: "59%", width: "13%", left: "85%", windows: 5 },
];

const stations = [
  { left: "8%", width: "25%", delay: 0 },
  { left: "39%", width: "20%", delay: 0.18 },
  { left: "66%", width: "26%", delay: 0.34 },
];

export default function ScrollCityScene() {
  const { scrollYProgress } = useScroll();
  const skyOpacity = useTransform(scrollYProgress, [0, 0.28, 0.52], [1, 0.92, 0]);
  const sunY = useTransform(scrollYProgress, [0, 0.48], ["0vh", "-34vh"]);
  const skylineY = useTransform(scrollYProgress, [0.08, 0.5, 0.82], ["42vh", "0vh", "-28vh"]);
  const skylineOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.84, 1], [0, 1, 1, 0]);
  const streetY = useTransform(scrollYProgress, [0.38, 0.65, 0.9], ["34vh", "0vh", "-15vh"]);
  const streetOpacity = useTransform(scrollYProgress, [0.36, 0.52, 0.92, 1], [0, 1, 1, 0.35]);
  const undergroundY = useTransform(scrollYProgress, [0.62, 0.82, 1], ["42vh", "0vh", "-3vh"]);
  const undergroundOpacity = useTransform(scrollYProgress, [0.6, 0.78, 1], [0, 1, 1]);
  const trainX = useTransform(scrollYProgress, [0.72, 1], ["-48%", "115%"]);
  const depthShade = useTransform(scrollYProgress, [0.45, 0.82, 1], [0, 0.15, 0.5]);

  return (
    <div className="city-scene" aria-hidden="true">
      <motion.div className="city-sky" style={{ opacity: skyOpacity }} />
      <motion.div className="city-sun" style={{ y: sunY }} />

      <motion.div className="city-birds" style={{ opacity: skyOpacity }}>
        <span className="city-bird city-bird-one" />
        <span className="city-bird city-bird-two" />
        <span className="city-bird city-bird-three" />
      </motion.div>

      <motion.div className="city-skyline" style={{ y: skylineY, opacity: skylineOpacity }}>
        {buildings.map((building) => (
          <div
            key={building.left}
            className="city-building"
            style={{ height: building.height, width: building.width, left: building.left }}
          >
            <div className="city-building-roof" />
            <div className="city-windows">
              {Array.from({ length: building.windows * 2 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        ))}
        <div className="city-ground-line" />
      </motion.div>

      <motion.div className="city-street" style={{ y: streetY, opacity: streetOpacity }}>
        <div className="city-road">
          <div className="city-road-line" />
          <div className="city-crosswalk" />
        </div>
        <div className="city-sidewalk city-sidewalk-left" />
        <div className="city-sidewalk city-sidewalk-right" />
        <div className="city-lamp city-lamp-one" />
        <div className="city-lamp city-lamp-two" />
        <div className="city-tree city-tree-one" />
        <div className="city-tree city-tree-two" />
      </motion.div>

      <motion.div className="city-underground" style={{ y: undergroundY, opacity: undergroundOpacity }}>
        <div className="station-ceiling" />
        <div className="station-tunnel station-tunnel-left" />
        <div className="station-tunnel station-tunnel-right" />
        <div className="station-platform station-platform-top" />
        <div className="station-platform station-platform-bottom" />
        <motion.div className="city-train" style={{ x: trainX }}>
          <div className="city-train-car city-train-engine">
            <span className="city-train-window" />
            <span className="city-train-light" />
          </div>
          <div className="city-train-car"><span className="city-train-window" /><span className="city-train-window" /></div>
          <div className="city-train-car"><span className="city-train-window" /><span className="city-train-window" /></div>
          <div className="city-train-car"><span className="city-train-window" /><span className="city-train-window" /></div>
        </motion.div>
        <div className="station-columns">
          {stations.map((station) => (
            <span key={station.left} style={{ left: station.left, width: station.width, animationDelay: `${station.delay}s` }} />
          ))}
        </div>
      </motion.div>

      <motion.div className="city-depth-shade" style={{ opacity: depthShade }} />
    </div>
  );
}
