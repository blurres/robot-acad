
export enum AppSection {
  DASHBOARD = 'dashboard',
  LEARN = 'learn',
  PROJECTS = 'projects',
  PLAYGROUND = 'playground',
  CIRCUIT_LAB = 'circuit-lab'
}

export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id?: string;
  title: string;
  content: string; // Markdown
  quiz: QuizQuestion[];
  nextLessonId?: string;
}

// Replaces the old Module interface
export interface CurriculumSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    xp: number;
  }[];
}

export interface ProjectStep {
  stepTitle: string;
  instruction: string;
}

export interface ProjectContent {
  id?: string;
  title: string;
  overview: string;
  difficulty: Difficulty;
  estimatedTime: string;
  materials: string[];
  steps: ProjectStep[];
  prerequisites: string[];
  createdAt?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// --- Circuit Lab Types ---

export type ComponentType = 
  // Wiring (Legacy grid type, mostly unused now in favor of vector wires)
  'wire' | 'empty' |
  // Power Sources
  'source_dc' | 'source_5v' | 'source_3v3' | 'battery_1v5' | 'battery_9v' | 'usb' | 'ground' |
  // Passive
  'resistor' | 'potentiometer' | 'capacitor_ceramic' | 'capacitor_electrolytic' | 'inductor' | 'switch_spst' | 'switch_push' |
  // Semiconductors
  'diode' | 'diode_zener' | 'transistor_npn' | 'transistor_pnp' | 'mosfet_n' | 'mosfet_p' |
  // ICs
  'ic_555' | 'opamp' | 'logic_and' | 'logic_or' | 'logic_not' | 'logic_nand' | 'logic_nor' | 'logic_xor' | 'regulator_7805' |
  // Sensors
  'sensor_ldr' | 'sensor_temp' | 'sensor_ultra' | 'sensor_ir' |
  // Outputs
  'led' | 'led_rgb' | 'buzzer' | 'motor_dc' | 'motor_servo' | 'motor_stepper' |
  // Drivers
  'driver_hbridge';

export interface CircuitCell {
  x: number;
  y: number;
  type: ComponentType;
  rotation: number; // 0, 90, 180, 270
  value: number; // Ohms for resistor, Volts for battery
  id: string;
}

export interface SimulationState {
  voltage: number;
  current: number;
  resistance: number;
  isComplete: boolean;
  error?: string;
}

// --- New Wiring System Types ---

export interface ConnectionPoint {
  componentId: string;
  terminalIndex: number;
}

export interface Wire {
  id: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  path: {x: number, y: number}[]; // Grid coordinates
  color?: string; // Hex color
}
