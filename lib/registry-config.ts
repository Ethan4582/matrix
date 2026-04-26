export interface LoaderRegistryEntry {
  slug: string;
  title: string;
  description: string;
  componentName: string;
  fileName: string;
  dependencies: string[];
  motionOptional: boolean;
}

export const loaderRegistry: LoaderRegistryEntry[] = [
  {
    slug: "dotm-square-1",
    title: "Diagonal TR–BL",
    description: "Same ripple family as the icon, with a wave that sweeps from the top-right toward the bottom-left.",
    componentName: "DotmSquare1",
    fileName: "dotm-square-1.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-2",
    title: "Row Wave",
    description:
      "Clockwise snake route: starts bottom-left up column 1, jumps to column 3 down, then column 2 up, and continues the same cycle to the right.",
    componentName: "DotmSquare2",
    fileName: "dotm-square-2.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-3",
    title: "Spiral Snake",
    description: "A 4-dot tail spirals clockwise from the outer border toward the center of the 5x5 grid.",
    componentName: "DotmSquare3",
    fileName: "dotm-square-3.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-4",
    title: "Triple Snake",
    description:
      "Outer ring snake moves clockwise, middle ring snake moves anticlockwise, and the center dot stays inactive.",
    componentName: "DotmSquare4",
    fileName: "dotm-square-4.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-5",
    title: "Diagonal Snake",
    description: "Snake-style trail that traverses the 5x5 grid on alternating diagonals.",
    componentName: "DotmSquare5",
    fileName: "dotm-square-5.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-6",
    title: "Column Snake",
    description: "Five simultaneous snakes: columns 1/3/5 move up while columns 2/4 move down.",
    componentName: "DotmSquare6",
    fileName: "dotm-square-6.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-7",
    title: "Tetris Stack",
    description: "Tetromino-like frames drop and stack in a 5x5 matrix, then flash a row-clear beat.",
    componentName: "DotmSquare7",
    fileName: "dotm-square-7.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-8",
    title: "Column Stagger Blink",
    description:
      "Each column stacks upward on a stagger (Tetris-style), the full grid blinks twice, then columns drain downward with the same stagger.",
    componentName: "DotmSquare8",
    fileName: "dotm-square-8.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-9",
    title: "Braille Pattern",
    description:
      "Two synced 2×3 cells (Unicode dot order) step through clear motifs: rails, full grid, three rows, checker, horseshoes, and alternating columns.",
    componentName: "DotmSquare9",
    fileName: "dotm-square-9.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-10",
    title: "Phosphor Sweep",
    description:
      "A CRT-style horizontal scanline moves down the matrix; swept rows leave a soft phosphor trail with a slight column-wise warp.",
    componentName: "DotmSquare10",
    fileName: "dotm-square-10.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-11",
    title: "Ripple Echo",
    description: "Concentric diamond ripple with a soft secondary echo pulse per ring.",
    componentName: "DotmSquare11",
    fileName: "dotm-square-11.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-12",
    title: "Center Origin Ripple",
    description: "Ripple starts at cell (2,2) and expands outward in concentric rings.",
    componentName: "DotmSquare12",
    fileName: "dotm-square-12.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-13",
    title: "Digital Counter",
    description: "Single fan blade rotating around a center hub for a clean, readable loop.",
    componentName: "DotmSquare13",
    fileName: "dotm-square-13.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-14",
    title: "Kaleidoscope",
    description: "A symmetric kaleidoscope bloom cycling through clean radial motifs.",
    componentName: "DotmSquare14",
    fileName: "dotm-square-14.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-15",
    title: "DNA Helix",
    description: "Two mirrored strands with periodic bridges pulse like a compact DNA helix.",
    componentName: "DotmSquare15",
    fileName: "dotm-square-15.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-16",
    title: "DNA Helix Compact",
    description: "A narrower helix variant that stays in the center band while preserving strand/rung rhythm.",
    componentName: "DotmSquare16",
    fileName: "dotm-square-16.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-17",
    title: "DNA Half Helix",
    description: "Single-strand helix variant that shows one side of the DNA wave.",
    componentName: "DotmSquare17",
    fileName: "dotm-square-17.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-18",
    title: "Audio Bars",
    description: "Equalizer-style vertical bars that pulse like live music levels.",
    componentName: "DotmSquare18",
    fileName: "dotm-square-18.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-19",
    title: "Infinity Loop",
    description: "Dual counter-rotating heads trace a figure-eight with a soft crossover pulse at center.",
    componentName: "DotmSquare19",
    fileName: "dotm-square-19.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-square-20",
    title: "Mobius Strip",
    description:
      "A bright head and tail run around the outer ring; a dimmer second train stays half a lap behind, with inner corner flashes for the twist.",
    componentName: "DotmSquare20",
    fileName: "dotm-square-20.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-1",
    title: "Circular Diagonal Half Helix",
    description:
      "A circular-masked half-helix that travels diagonally from top-left to bottom-right with a bright strand and soft adjacent trail.",
    componentName: "DotmCircular1",
    fileName: "dotm-circular-1.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-2",
    title: "Circular Tri-Orbit",
    description:
      "Three luminous heads orbit the circular ring at equal offsets, creating a triad chase that never overlaps into the old snake rhythm.",
    componentName: "DotmCircular2",
    fileName: "dotm-circular-2.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-3",
    title: "Circular Plasma Weave",
    description:
      "A plasma-like diagonal sweep and pulsing core weave through the circular mask for a distinctly different motion signature.",
    componentName: "DotmCircular3",
    fileName: "dotm-circular-3.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-4",
    title: "Circular Radar Sweep",
    description:
      "A rotating radar arm scans the circular grid with a bright beam front, soft wake, and faint perimeter ring echo.",
    componentName: "DotmCircular4",
    fileName: "dotm-circular-4.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-5",
    title: "Circular Pinwheel",
    description:
      "Four rotating pinwheel blades spin through the circular matrix with a glowing center and soft trailing halo.",
    componentName: "DotmCircular5",
    fileName: "dotm-circular-5.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-6",
    title: "Circular Phase Orbit",
    description:
      "An off-center orbiting energy point traces a phase-shifted loop, creating a drifting orbital glow inside the circular matrix.",
    componentName: "DotmCircular6",
    fileName: "dotm-circular-6.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-7",
    title: "Circular Gate Flip",
    description:
      "A scanning gate flips between vertical and horizontal sweeps, producing a crisp alternating shutter rhythm in the circular grid.",
    componentName: "DotmCircular7",
    fileName: "dotm-circular-7.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-8",
    title: "Circular Heartbeat",
    description:
      "Pulse bursts from the center with a dual-beat cadence, sending soft concentric pressure waves across the circular matrix.",
    componentName: "DotmCircular8",
    fileName: "dotm-circular-8.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-9",
    title: "Circular Constellation",
    description:
      "A cardinal beacon pattern: N/E/S/W sectors pulse in sequence with a dim opposite echo, creating a clear directional rhythm in the circular mask.",
    componentName: "DotmCircular9",
    fileName: "dotm-circular-9.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-10",
    title: "Circular Binary Bloom",
    description:
      "Binary-style opacity tiers pulse in modular steps so only a few cells peak at once while others stay low, producing a crisp coded bloom.",
    componentName: "DotmCircular10",
    fileName: "dotm-circular-10.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-11",
    title: "Circular Quadrant Breathe",
    description:
      "A rotating crescent moon silhouette: bright lunar body, soft rim, and faint directional halo moving around the circular mask.",
    componentName: "DotmCircular11",
    fileName: "dotm-circular-11.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-12",
    title: "Circular Arc Cascade",
    description:
      "A stepped 8-direction beacon beam sweeps around the circle with a dim opposite echo and diagonal spoke accents.",
    componentName: "DotmCircular12",
    fileName: "dotm-circular-12.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-13",
    title: "Circular DNA Twin Helix",
    description:
      "A circular-masked twin-helix: mirrored side strands weave inward and outward with intermittent interior bridge pulses.",
    componentName: "DotmCircular13",
    fileName: "dotm-circular-13.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-14",
    title: "Circular DNA Rung Shift",
    description:
      "A shifting DNA ladder where a bright horizontal rung steps row-by-row while side anchors sway and leave soft ghost echoes.",
    componentName: "DotmCircular14",
    fileName: "dotm-circular-14.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-15",
    title: "Circular Braille Cluster",
    description:
      "Braille-inspired grouped dot motifs cycle through rails, bridges, and cross forms inside the circular mask with crisp tiered opacity.",
    componentName: "DotmCircular15",
    fileName: "dotm-circular-15.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-16",
    title: "Circular Braille Scanline",
    description:
      "A braille rail scanline sweeps row-by-row between left and right cells, with near-column accents and soft trail falloff.",
    componentName: "DotmCircular16",
    fileName: "dotm-circular-16.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-17",
    title: "Circular Braille Checker Shift",
    description:
      "Braille-biased checker phases alternate in stepped shifts, keeping rails pronounced while the center cross supports readability.",
    componentName: "DotmCircular17",
    fileName: "dotm-circular-17.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-18",
    title: "Circular Braille Pulse Pair",
    description:
      "Mirrored braille dot pairs pulse from top and bottom toward the center, with a connective center-column accent.",
    componentName: "DotmCircular18",
    fileName: "dotm-circular-18.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-19",
    title: "Circular Braille Orbit Cells",
    description:
      "A bright braille cell head orbits the inner ring with a dim tail while rail columns remain softly active.",
    componentName: "DotmCircular19",
    fileName: "dotm-circular-19.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-circular-20",
    title: "Circular Braille Glyph Cycle",
    description:
      "Distinct braille-like glyphs cycle in sequence with previous-frame ghosting for a crisp readable symbol transition.",
    componentName: "DotmCircular20",
    fileName: "dotm-circular-20.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-1",
    title: "Triangle Center Spokes",
    description:
      "A triangle-masked matrix where three spoke lines originate at the center and travel outward to each triangle edge.",
    componentName: "DotmTriangle1",
    fileName: "dotm-triangle-1.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-2",
    title: "Triangle Altitude Pulse",
    description:
      "A soft altitude wave travels between apex and base while the center column remains gently present for shape readability.",
    componentName: "DotmTriangle2",
    fileName: "dotm-triangle-2.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-3",
    title: "Triangle Corner Bounce",
    description:
      "A single head bounces between triangle corners along the perimeter path with a short fading tail.",
    componentName: "DotmTriangle3",
    fileName: "dotm-triangle-3.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-4",
    title: "Triangle Vertex Chase",
    description:
      "Three staggered heads chase around the triangle perimeter, leaving short fading tails while all dots stay fixed in place.",
    componentName: "DotmTriangle4",
    fileName: "dotm-triangle-4.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-5",
    title: "Triangle Row Scan",
    description:
      "A reflected scanline sweeps from apex to base and back, animating only opacity bands across triangle rows.",
    componentName: "DotmTriangle5",
    fileName: "dotm-triangle-5.tsx",
    dependencies: [],
    motionOptional: false
  },
  {
    slug: "dotm-triangle-6",
    title: "Triangle Braille Beat",
    description:
      "Triangle-masked braille dots fill down the left rail, then the right, then blink full and empty.",
    componentName: "DotmTriangle6",
    fileName: "dotm-triangle-6.tsx",
    dependencies: [],
    motionOptional: false
  }
];

export function getLoaderBySlug(slug: string): LoaderRegistryEntry | undefined {
  return loaderRegistry.find((entry) => entry.slug === slug);
}
