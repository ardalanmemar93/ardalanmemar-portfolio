import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Gotei13",
    url: "https://gotei13-61d7a1b24567.herokuapp.com",
    image: "project/gotei13.png",
    description: "Skills: JavaScript · Node.js · MongoDB · Embedded JavaScript · Express.js · HTML5 · Bootstrap · Mongoose · Git · npm · CSS",
  },
  {
    title: "Elden Ring",
    url: "https://elden-ring-e8545a34e7a5.herokuapp.com/",
    image: "project/elden-ring.png",
    description: "Skills: React.js · Express.js · MERN Stack · Tailwind CSS · JSON Web Token · MongoDB",
  },
  {
    title: "NASA Photo App",
    url: "https://nasa-dailey-photo-04f716fe02dd.herokuapp.com/content/new",
    image: "project/nasa-photo.png",
    description: "Skills: React.js · Express.js · Tailwind CSS · JavaScript · MongoDB · api · MERN Stack"
   },
  {
    title: "Malevolent",
    url: "https://malevolent-shrine-7e6aea34c382.herokuapp.com/",
    image: "project/malevolent.png",
    description: "Skills: Express.js · Tailwind CSS · HTML5 · css · crud · Git · npm · React.js · Heroku"
   },
  {
    title: "Natural Gum Mastic",
    url: "https://naturalgummastic.com",
    image: "project/mastic.png",
    description: "Still working..."
  },
  {
    title: "IC Auto Tek",
    url: "https://icautotek.com",
    image: "project/icautotek.png",
    description: "Still working..."
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.3, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={8}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.18}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};