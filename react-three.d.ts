import { ThreeElements } from '@react-three/fiber';

// Extend JSX intrinsic elements with react-three-fiber element typings
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
