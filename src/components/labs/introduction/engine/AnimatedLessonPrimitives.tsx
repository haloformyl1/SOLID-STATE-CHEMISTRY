import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

type Vector3Tuple = [number, number, number];
type LessonMotion = 'vibrate' | 'flow' | 'orbit' | 'slide';

interface AnimatedGroupProps {
  children: React.ReactNode;
  basePosition?: Vector3Tuple;
  enabled: boolean;
  speed?: number;
  phase?: number;
  amplitude?: number;
  direction?: -1 | 1;
  motion: LessonMotion;
}

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({
  children,
  basePosition = [0, 0, 0],
  enabled,
  speed = 1,
  phase = 0,
  amplitude = 0.05,
  direction = 1,
  motion,
}) => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const [baseX, baseY, baseZ] = basePosition;
    if (!enabled) {
      group.position.set(baseX, baseY, baseZ);
      return;
    }

    const time = clock.getElapsedTime() * speed;

    if (motion === 'vibrate') {
      group.position.set(
        baseX + Math.sin(time * 7.2 + phase) * amplitude,
        baseY + Math.sin(time * 8.6 + phase * 1.31) * amplitude * 0.8,
        baseZ + Math.cos(time * 7.8 + phase * 0.83) * amplitude,
      );
      return;
    }

    if (motion === 'flow') {
      const travel = ((time * 0.42 + phase) % 2) - 1;
      group.position.set(
        baseX + direction * travel * amplitude,
        baseY + Math.sin(time * 1.9 + phase * 4) * amplitude * 0.2,
        baseZ + Math.cos(time * 1.45 + phase * 3) * amplitude * 0.2,
      );
      return;
    }

    if (motion === 'orbit') {
      group.position.set(
        baseX + Math.cos(time * 1.55 + phase) * amplitude,
        baseY + Math.sin(time * 1.05 + phase * 1.7) * amplitude * 0.45,
        baseZ + Math.sin(time * 1.55 + phase) * amplitude * 0.7,
      );
      return;
    }

    group.position.set(
      baseX + Math.sin(time * 1.8 + phase) * amplitude,
      baseY,
      baseZ,
    );
  });

  return <group ref={groupRef} position={basePosition}>{children}</group>;
};
