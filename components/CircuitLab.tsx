
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CircuitCell, ComponentType, SimulationState, Wire, ConnectionPoint } from '../types';
import { 
  Zap, Trash2, Play, Battery, Lightbulb, Box, Activity, 
  Pause, Share2, Sliders, Search, Settings, Triangle, 
  Waves, RotateCw, GripVertical, ZoomIn, ZoomOut, 
  Maximize, MousePointer2, Plus, Minus, Undo, Redo, 
  Save, Download, Eye, Move, ShieldAlert, AlertTriangle,
  ToggleLeft, Disc, Speaker, Thermometer, Microchip, ArrowUpCircle, Power, CircleDot, MoreVertical, X, Filter, Fan, PanelLeft
} from './Icons';

// --- Constants & Config ---
const GRID_SIZE = 40; // px
const GRID_W = 40; // Increased grid size
const GRID_H = 30;

// Extends the basic type with more properties for the advanced lab
interface AdvancedCell extends CircuitCell {
  label?: string;
  color?: string;
  locked?: boolean;
}

interface ComponentDef {
  type: ComponentType;
  icon: any;
  label: string;
  defaultVal: number;
  unit: string;
  category: 'Power' | 'Passive' | 'Semi' | 'ICs' | 'Sensors' | 'Output' | 'Drivers' | 'Wiring';
  description: string;
  color: string;
  terminals: { x: number, y: number }[]; // Relative offsets -0.5 to 0.5
  terminalLabels?: string[]; // Labels for terminals (e.g. +, -, A, K)
}

// --- Terminals ---
const T_2H = [{ x: -0.4, y: 0 }, { x: 0.4, y: 0 }]; 
const T_2V = [{ x: 0, y: -0.4 }, { x: 0, y: 0.4 }];
const T_3 = [{ x: -0.3, y: 0 }, { x: 0.3, y: -0.3 }, { x: 0.3, y: 0.3 }]; // Transistors (Base Left, Col TopRight, Emit BotRight)
const T_GATE = [{ x: -0.4, y: -0.2 }, { x: -0.4, y: 0.2 }, { x: 0.4, y: 0 }]; // Logic Gates
const T_QUAD = [{ x: -0.3, y: -0.3 }, { x: 0.3, y: -0.3 }, { x: 0.3, y: 0.3 }, { x: -0.3, y: 0.3 }]; // ICs

const PALETTE: ComponentDef[] = [
  // Power Sources
  { type: 'source_dc', icon: Settings, label: 'DC Source', defaultVal: 12, unit: 'V', category: 'Power', description: 'Adjustable Voltage', color: '#EF4444', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'source_5v', icon: ArrowUpCircle, label: '5V Regulated', defaultVal: 5, unit: 'V', category: 'Power', description: 'Logic Power', color: '#EF4444', terminals: [{x:0, y:-0.4}], terminalLabels: ['+5V'] },
  { type: 'source_3v3', icon: ArrowUpCircle, label: '3.3V Regulated', defaultVal: 3.3, unit: 'V', category: 'Power', description: 'Low Voltage Logic', color: '#EF4444', terminals: [{x:0, y:-0.4}], terminalLabels: ['3V3'] },
  { type: 'battery_1v5', icon: Battery, label: '1.5V Battery', defaultVal: 1.5, unit: 'V', category: 'Power', description: 'AA/AAA Cell', color: '#10B981', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'battery_9v', icon: Battery, label: '9V Battery', defaultVal: 9, unit: 'V', category: 'Power', description: 'Standard Block', color: '#10B981', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'usb', icon: Zap, label: 'USB 5V', defaultVal: 5, unit: 'V', category: 'Power', description: 'USB Power', color: '#3B82F6', terminals: [{x:0, y:-0.4}], terminalLabels: ['VCC'] },
  { type: 'ground', icon: Triangle, label: 'Ground', defaultVal: 0, unit: 'V', category: 'Power', description: '0V Reference', color: '#6B7280', terminals: [{x:0, y:-0.4}], terminalLabels: ['GND'] },

  // Passive
  { type: 'resistor', icon: Waves, label: 'Resistor', defaultVal: 220, unit: 'Ω', category: 'Passive', description: 'Current Limiter', color: '#F59E0B', terminals: T_2H },
  { type: 'potentiometer', icon: Sliders, label: 'Potentiometer', defaultVal: 10000, unit: 'Ω', category: 'Passive', description: 'Variable Resistor', color: '#F59E0B', terminals: [{x:-0.4,y:0},{x:0,y:0.4},{x:0.4,y:0}], terminalLabels: ['1', 'W', '3'] },
  { type: 'capacitor_ceramic', icon: Box, label: 'Capacitor', defaultVal: 0.1, unit: 'µF', category: 'Passive', description: 'Fast filtering', color: '#Fcd34d', terminals: T_2H },
  { type: 'capacitor_electrolytic', icon: Box, label: 'El. Capacitor', defaultVal: 100, unit: 'µF', category: 'Passive', description: 'Bulk Storage', color: '#8B5CF6', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'inductor', icon: Activity, label: 'Inductor', defaultVal: 10, unit: 'mH', category: 'Passive', description: 'Magnetic Storage', color: '#EC4899', terminals: T_2H },
  { type: 'switch_spst', icon: ToggleLeft, label: 'Switch SPST', defaultVal: 0, unit: '', category: 'Passive', description: 'Toggle Switch', color: '#3B82F6', terminals: T_2H },
  { type: 'switch_push', icon: CircleDot, label: 'Pushbutton', defaultVal: 0, unit: '', category: 'Passive', description: 'Momentary', color: '#3B82F6', terminals: T_2H },

  // Semiconductors
  { type: 'diode', icon: Triangle, label: 'Diode', defaultVal: 0, unit: '', category: 'Semi', description: 'One-way Valve', color: '#9CA3AF', terminals: T_2H, terminalLabels: ['A', 'K'] },
  { type: 'diode_zener', icon: Triangle, label: 'Zener Diode', defaultVal: 5.1, unit: 'V', category: 'Semi', description: 'Voltage Ref', color: '#F87171', terminals: T_2H, terminalLabels: ['K', 'A'] },
  { type: 'transistor_npn', icon: Share2, label: 'NPN (BJT)', defaultVal: 0, unit: '', category: 'Semi', description: 'Switch/Amp', color: '#6366F1', terminals: T_3, terminalLabels: ['B', 'C', 'E'] },
  { type: 'transistor_pnp', icon: Share2, label: 'PNP (BJT)', defaultVal: 0, unit: '', category: 'Semi', description: 'Switch/Amp', color: '#818CF8', terminals: T_3, terminalLabels: ['B', 'C', 'E'] },
  { type: 'mosfet_n', icon: Share2, label: 'N-MOSFET', defaultVal: 0, unit: '', category: 'Semi', description: 'Power Switch', color: '#6366F1', terminals: T_3, terminalLabels: ['G', 'D', 'S'] },
  { type: 'mosfet_p', icon: Share2, label: 'P-MOSFET', defaultVal: 0, unit: '', category: 'Semi', description: 'Power Switch', color: '#818CF8', terminals: T_3, terminalLabels: ['G', 'D', 'S'] },

  // ICs
  { type: 'ic_555', icon: Microchip, label: '555 Timer', defaultVal: 0, unit: '', category: 'ICs', description: 'Pulse Gen', color: '#374151', terminals: T_QUAD, terminalLabels: ['1', '8', '4', '5'] },
  { type: 'opamp', icon: Triangle, label: 'Op-Amp', defaultVal: 0, unit: '', category: 'ICs', description: 'Amplifier', color: '#374151', terminals: [{x:-0.4,y:-0.2},{x:-0.4,y:0.2},{x:0.4,y:0}], terminalLabels: ['In-', 'In+', 'Out'] },
  { type: 'logic_and', icon: Box, label: 'AND Gate', defaultVal: 0, unit: '', category: 'ICs', description: 'Logic', color: '#374151', terminals: T_GATE, terminalLabels: ['A', 'B', 'Q'] },
  { type: 'logic_or', icon: Box, label: 'OR Gate', defaultVal: 0, unit: '', category: 'ICs', description: 'Logic', color: '#374151', terminals: T_GATE, terminalLabels: ['A', 'B', 'Q'] },
  { type: 'logic_not', icon: Box, label: 'NOT Gate', defaultVal: 0, unit: '', category: 'ICs', description: 'Inverter', color: '#374151', terminals: [{x:-0.4,y:0},{x:0.4,y:0}], terminalLabels: ['In', 'Out'] },
  { type: 'regulator_7805', icon: Microchip, label: '7805 Reg', defaultVal: 5, unit: 'V', category: 'ICs', description: 'Linear Reg', color: '#374151', terminals: [{x:-0.4,y:0},{x:0,y:0.4},{x:0.4,y:0}], terminalLabels: ['In', 'GND', 'Out'] },

  // Sensors
  { type: 'sensor_ldr', icon: Eye, label: 'LDR', defaultVal: 0, unit: '', category: 'Sensors', description: 'Light Sensor', color: '#10B981', terminals: T_2H },
  { type: 'sensor_temp', icon: Thermometer, label: 'Temp Sensor', defaultVal: 25, unit: '°C', category: 'Sensors', description: 'Analog Out', color: '#10B981', terminals: [{x:0,y:0.4}, {x:0,y:-0.4}], terminalLabels: ['+', '-'] },
  { type: 'sensor_ultra', icon: Waves, label: 'Ultrasonic', defaultVal: 0, unit: 'cm', category: 'Sensors', description: 'Distance', color: '#3B82F6', terminals: [{x:-0.3,y:0.4}, {x:0.3,y:0.4}], terminalLabels: ['Trig', 'Echo'] },

  // Output
  { type: 'led', icon: Lightbulb, label: 'LED', defaultVal: 0, unit: '', category: 'Output', description: 'Indicator', color: '#EF4444', terminals: T_2H, terminalLabels: ['+', '-'] },
  { type: 'buzzer', icon: Speaker, label: 'Buzzer', defaultVal: 0, unit: '', category: 'Output', description: 'Sound', color: '#000000', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'motor_dc', icon: Fan, label: 'DC Motor', defaultVal: 0, unit: '', category: 'Output', description: 'Motion', color: '#F59E0B', terminals: T_2V, terminalLabels: ['+', '-'] },
  { type: 'motor_servo', icon: Box, label: 'Servo', defaultVal: 0, unit: '', category: 'Output', description: 'Angle Control', color: '#3B82F6', terminals: T_3, terminalLabels: ['S', '+', '-'] },

  // Drivers
  { type: 'driver_hbridge', icon: Microchip, label: 'H-Bridge', defaultVal: 0, unit: '', category: 'Drivers', description: 'Motor Driver', color: '#1F2937', terminals: T_QUAD },
];

const CircuitLab = () => {
  // --- State ---
  const [grid, setGrid] = useState<AdvancedCell[]>(Array(GRID_W * GRID_H).fill(null).map((_, i) => ({
    x: i % GRID_W, y: Math.floor(i / GRID_W), type: 'empty', rotation: 0, value: 0, id: Math.random().toString(36).substr(2, 9)
  })));
  
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedTool, setSelectedTool] = useState<ComponentType | 'select' | 'wire'>('select');
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Wiring State
  const [drawingWire, setDrawingWire] = useState<{start: ConnectionPoint, currentPath: {x:number, y:number}[]} | null>(null);
  const [hoveredTerminal, setHoveredTerminal] = useState<{componentId: string, terminalIdx: number, x: number, y: number} | null>(null);
  
  const [selectedId, setSelectedId] = useState<string | null>(null); // Can be component ID or wire ID
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [rightPanelWidth, setRightPanelWidth] = useState(260);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, targetId: string} | null>(null);
  const [hoveredCellIndex, setHoveredCellIndex] = useState<number | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [voltageMap, setVoltageMap] = useState<Map<string, 'high'|'low'|'floating'>>(new Map());
  const [flowSpeed, setFlowSpeed] = useState(0); 

  const [movingComponentId, setMovingComponentId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Category Drag Scroll
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isDraggingCats, setIsDraggingCats] = useState(false);
  const [catStartX, setCatStartX] = useState(0);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  // --- Pathfinding (A*) ---
  const findWirePath = (start: {x: number, y: number}, end: {x: number, y: number}) => {
    // A* implementation optimized for wires
    const openSet: {x: number, y: number, f: number, g: number, parent: any}[] = [];
    const closedSet = new Set<string>();
    
    openSet.push({ x: start.x, y: start.y, f: 0, g: 0, parent: null });
    
    while (openSet.length > 0) {
        let lowestIdx = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIdx].f) lowestIdx = i;
        }
        
        const current = openSet[lowestIdx];
        
        if (Math.abs(current.x - end.x) <= 0 && Math.abs(current.y - end.y) <= 0) {
            const path = [];
            let temp = current;
            while (temp) {
                path.push({ x: temp.x, y: temp.y });
                temp = temp.parent;
            }
            return path.reverse();
        }
        
        openSet.splice(lowestIdx, 1);
        closedSet.add(`${current.x},${current.y}`);
        
        const neighbors = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 }
        ];
        
        for (const n of neighbors) {
            if (n.x < 0 || n.x >= GRID_W || n.y < 0 || n.y >= GRID_H) continue;
            if (closedSet.has(`${n.x},${n.y}`)) continue;
            
            const idx = n.y * GRID_W + n.x;
            const cell = grid[idx];
            
            // Obstacle Check: Component logic
            // We allow wires to pass through empty cells, existing wires (physically crossing but not electrically connecting unless node), 
            // and the specific start/end terminal points.
            const isComponent = cell.type !== 'empty' && cell.type !== 'wire';
            const isStart = n.x === start.x && n.y === start.y;
            const isEnd = n.x === end.x && n.y === end.y;
            
            if (isComponent && !isStart && !isEnd) continue;
            
            const gScore = current.g + 1;
            let existing = openSet.find(o => o.x === n.x && o.y === n.y);
            
            if (!existing) {
                const h = Math.abs(n.x - end.x) + Math.abs(n.y - end.y);
                openSet.push({ x: n.x, y: n.y, f: gScore + h, g: gScore, parent: current });
            } else if (gScore < existing.g) {
                existing.g = gScore;
                existing.f = gScore + Math.abs(n.x - end.x) + Math.abs(n.y - end.y);
                existing.parent = current;
            }
        }
    }
    // Fallback: Manhattan
    return [start, {x: end.x, y: start.y}, end];
  };

  // --- Wire Smoothing (Bezier) ---
  const getSmoothWirePath = (points: {x: number, y: number}[]) => {
    if (!points || points.length < 2) return "";

    const toPixel = (p: {x: number, y: number}) => ({
        x: p.x * GRID_SIZE + GRID_SIZE/2,
        y: p.y * GRID_SIZE + GRID_SIZE/2
    });

    const pxPoints = points.map(toPixel);
    
    // Simple straight line
    if (pxPoints.length === 2) {
      return `M ${pxPoints[0].x} ${pxPoints[0].y} L ${pxPoints[1].x} ${pxPoints[1].y}`;
    }

    let d = `M ${pxPoints[0].x} ${pxPoints[0].y}`;
    const radius = 12; // Radius of curvature

    for (let i = 1; i < pxPoints.length - 1; i++) {
        const prev = pxPoints[i - 1];
        const curr = pxPoints[i];
        const next = pxPoints[i + 1];

        // Vector 1 (Entering corner)
        const v1 = { x: curr.x - prev.x, y: curr.y - prev.y };
        const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        
        // Vector 2 (Leaving corner)
        const v2 = { x: next.x - curr.x, y: next.y - curr.y };
        const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        // Max possible radius for this corner
        const r = Math.min(radius, len1 / 2, len2 / 2);

        if (r < 2) {
            d += ` L ${curr.x} ${curr.y}`;
        } else {
            // Start of curve (back up from corner)
            const startX = curr.x - (v1.x / len1) * r;
            const startY = curr.y - (v1.y / len1) * r;

            // End of curve (forward from corner)
            const endX = curr.x + (v2.x / len2) * r;
            const endY = curr.y + (v2.y / len2) * r;

            d += ` L ${startX} ${startY}`;
            d += ` Q ${curr.x} ${curr.y} ${endX} ${endY}`;
        }
    }

    d += ` L ${pxPoints[pxPoints.length - 1].x} ${pxPoints[pxPoints.length - 1].y}`;
    return d;
  };

  // --- Helpers ---
  const getComponentDef = (type: ComponentType) => PALETTE.find(c => c.type === type);

  const deleteSelection = () => {
    if (!selectedId) return;
    
    // Check if wire
    if (wires.find(w => w.id === selectedId)) {
        setWires(prev => prev.filter(w => w.id !== selectedId));
        setSelectedId(null);
        return;
    }
    
    // Check if component
    setGrid(prev => prev.map(cell => cell.id === selectedId ? { ...cell, type: 'empty', id: Math.random().toString() } : cell));
    // Also remove connected wires
    setWires(prev => prev.filter(w => w.from.componentId !== selectedId && w.to.componentId !== selectedId));
    
    setSelectedId(null);
    setContextMenu(null);
  };

  const rotateComponent = (id: string) => {
    setGrid(prev => prev.map(cell => cell.id === id ? { ...cell, rotation: (cell.rotation + 90) % 360 } : cell));
    // Break wires connected to this component for now (simplifies logic)
    setWires(prev => prev.filter(w => w.from.componentId !== id && w.to.componentId !== id));
    setContextMenu(null);
  };

  const getGridIndex = (clientX: number, clientY: number) => {
    if (!containerRef.current) return -1;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left - pan.x) / scale;
    const y = (clientY - rect.top - pan.y) / scale;
    
    const col = Math.floor(x / GRID_SIZE);
    const row = Math.floor(y / GRID_SIZE);

    if (col >= 0 && col < GRID_W && row >= 0 && row < GRID_H) {
      return row * GRID_W + col;
    }
    return -1;
  };

  const getTerminalAbsolutePosition = (cell: AdvancedCell, terminal: {x: number, y: number}) => {
     const rad = (cell.rotation * Math.PI) / 180;
     const rx = terminal.x * Math.cos(rad) - terminal.y * Math.sin(rad);
     const ry = terminal.x * Math.sin(rad) + terminal.y * Math.cos(rad);
     
     return {
         x: cell.x + 0.5 + rx,
         y: cell.y + 0.5 + ry
     };
  };

  // Check for terminals near mouse cursor
  const checkHoverTerminal = (e: React.MouseEvent) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left - pan.x) / scale / GRID_SIZE;
    const my = (e.clientY - rect.top - pan.y) / scale / GRID_SIZE;

    const threshold = 0.3; // Distance in grid units

    for (const cell of grid) {
        if (cell.type === 'empty') continue;
        const def = getComponentDef(cell.type);
        if (!def) continue;

        for (let i = 0; i < def.terminals.length; i++) {
            const t = def.terminals[i];
            const pos = getTerminalAbsolutePosition(cell, t);
            const dist = Math.sqrt((mx - pos.x)**2 + (my - pos.y)**2);
            
            if (dist < threshold) {
                return {
                    componentId: cell.id,
                    terminalIdx: i,
                    x: Math.round(pos.x - 0.5), // Round to nearest grid intersection for wiring
                    y: Math.round(pos.y - 0.5)
                };
            }
        }
    }
    return null;
  };

  // --- Interaction Handlers ---

  // Category Drag Handlers
  const handleCatMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    setIsDraggingCats(true);
    setCatStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setCatScrollLeft(categoryScrollRef.current.scrollLeft);
  };

  const handleCatMouseLeave = () => {
    setIsDraggingCats(false);
  };

  const handleCatMouseUp = () => {
    setIsDraggingCats(false);
  };

  const handleCatMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCats || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - catStartX) * 2; // scroll speed multiplier
    categoryScrollRef.current.scrollLeft = catScrollLeft - walk;
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    if (contextMenu) setContextMenu(null);
    e.preventDefault();
    e.stopPropagation();

    // 1. Check for Terminal Click (Highest Priority for Wiring)
    const terminal = checkHoverTerminal(e);

    // Right Click
    if (e.button === 2) {
      if (drawingWire) {
          setDrawingWire(null); // Cancel wire
          return;
      }
      const index = getGridIndex(e.clientX, e.clientY);
      if (index !== -1 && grid[index].type !== 'empty') {
         const rect = containerRef.current?.getBoundingClientRect();
         if(rect) {
            setContextMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top, targetId: grid[index].id });
            setSelectedId(grid[index].id);
         }
      }
      return;
    }

    // Wiring Logic start
    if (terminal) {
        if (drawingWire) {
            // Complete Wire
            if (drawingWire.start.componentId === terminal.componentId && drawingWire.start.terminalIndex === terminal.terminalIdx) {
                // Clicked same terminal, ignore
                return;
            }
            
            // Check duplicates
            const exists = wires.some(w => 
                (w.from.componentId === drawingWire.start.componentId && w.from.terminalIndex === drawingWire.start.terminalIndex && w.to.componentId === terminal.componentId && w.to.terminalIndex === terminal.terminalIdx) ||
                (w.to.componentId === drawingWire.start.componentId && w.to.terminalIndex === drawingWire.start.terminalIndex && w.from.componentId === terminal.componentId && w.from.terminalIndex === terminal.terminalIdx)
            );

            if (!exists) {
                const newWire: Wire = {
                    id: Math.random().toString(36).substr(2, 9),
                    from: drawingWire.start,
                    to: { componentId: terminal.componentId, terminalIndex: terminal.terminalIdx },
                    path: drawingWire.currentPath,
                    // Basic Auto-Coloring based on source logic could go here
                    color: '#10B981' // Default green
                };
                setWires(prev => [...prev, newWire]);
            }
            setDrawingWire(null);
            return;
        } else {
            // Start Wire
            setDrawingWire({
                start: { componentId: terminal.componentId, terminalIndex: terminal.terminalIdx },
                currentPath: [{x: terminal.x, y: terminal.y}]
            });
            setSelectedId(null);
            return;
        }
    } else {
        // Clicked empty space while drawing -> cancel
        if (drawingWire) {
             setDrawingWire(null);
             return;
        }
    }

    // Component Selection / Placement
    if (selectedTool !== 'wire') {
        const index = getGridIndex(e.clientX, e.clientY);
        if (index === -1) {
            setSelectedId(null);
            return;
        }

        const cell = grid[index];

        if (selectedTool === 'select') {
          if (cell.type !== 'empty') {
            setSelectedId(cell.id);
            setMovingComponentId(cell.id);
          } else {
            // Check if clicked a wire (Hit testing lines is hard, skipping for now or simple bbox)
            setSelectedId(null);
          }
        } else {
          // Place Component
          if (cell.type === 'empty') {
            const newGrid = [...grid];
            newGrid[index] = {
              ...newGrid[index],
              type: selectedTool,
              id: Math.random().toString(36).substr(2, 9),
              value: getComponentDef(selectedTool)?.defaultVal || 0
            };
            setGrid(newGrid);
            setSelectedTool('select'); 
          }
        }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const term = checkHoverTerminal(e);
    setHoveredTerminal(term);
    setHoveredCellIndex(getGridIndex(e.clientX, e.clientY));

    if (drawingWire) {
        // Update wire preview path
        let targetX = 0, targetY = 0;
        
        if (term) {
            // Snap to terminal
            targetX = term.x;
            targetY = term.y;
        } else {
            // Snap to grid
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const mx = (e.clientX - rect.left - pan.x) / scale;
            const my = (e.clientY - rect.top - pan.y) / scale;
            targetX = Math.round(mx / GRID_SIZE - 0.5);
            targetY = Math.round(my / GRID_SIZE - 0.5);
        }

        const startPos = drawingWire.currentPath[0];
        const newPath = findWirePath(startPos, {x: targetX, y: targetY});
        setDrawingWire(prev => prev ? { ...prev, currentPath: newPath } : null);
    }

    // Moving Components
    if (movingComponentId) {
        const index = getGridIndex(e.clientX, e.clientY);
        if (index !== -1) {
            const currIdx = grid.findIndex(c => c.id === movingComponentId);
            if (currIdx !== -1 && currIdx !== index && grid[index].type === 'empty') {
                const newGrid = [...grid];
                const temp = newGrid[currIdx];
                newGrid[currIdx] = { ...newGrid[index], id: Math.random().toString(), type: 'empty' };
                newGrid[index] = { ...temp, x: index % GRID_W, y: Math.floor(index / GRID_W) };
                setGrid(newGrid);
                
                // Break wires for moved component (Simplest strategy for MVP)
                setWires(prev => prev.filter(w => w.from.componentId !== movingComponentId && w.to.componentId !== movingComponentId));
            }
        }
    }
  };

  const handleMouseUp = () => {
    setMovingComponentId(null);
  };

  // --- Keyboard ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') deleteSelection();
      if (e.key === 'r' || e.key === 'R') {
          if (selectedId && !wires.find(w => w.id === selectedId)) rotateComponent(selectedId);
      }
      if (e.key === 'Escape') {
        setSelectedTool('select');
        setDrawingWire(null);
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, wires]);

  // --- Render Helpers ---

  const getWireColor = (wire: Wire) => {
      if (selectedId === wire.id) return '#3B82F6'; // Blue select
      return wire.color || '#10B981';
  };

  const filteredComponents = PALETTE.filter(c => {
    const matchesSearch = c.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return searchTerm ? matchesSearch : matchesCategory;
  });

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-[#1e1e1e] text-gray-200 overflow-hidden font-sans select-none">
      
      {/* Sidebar */}
      <div 
        style={{ width: isLeftPanelOpen ? leftPanelWidth : 0, opacity: isLeftPanelOpen ? 1 : 0 }} 
        className="flex flex-col border-r border-gray-700 bg-[#252526] z-20 flex-shrink-0 h-full shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-700 bg-[#333333] flex flex-col space-y-2 min-w-[280px]">
           <div className="flex justify-between items-center">
             <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Components</h3>
             <div className="bg-black/30 rounded px-2 py-1 text-[10px] text-gray-400">{filteredComponents.length} items</div>
           </div>
           
           <div className="relative">
             <Search className="absolute left-2 top-2 w-3.5 h-3.5 text-gray-500" />
             <input 
               type="text" 
               placeholder="Search..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md py-1.5 pl-8 pr-2 text-xs text-white focus:border-blue-500 outline-none placeholder-gray-600 transition-colors"
             />
             {searchTerm && (
               <button onClick={() => setSearchTerm('')} className="absolute right-2 top-2 text-gray-500 hover:text-white">
                 <X className="w-3.5 h-3.5" />
               </button>
             )}
           </div>
        </div>

        {!searchTerm && (
          <div 
            ref={categoryScrollRef}
            className="flex overflow-x-auto p-2 gap-1 border-b border-gray-700 scrollbar-hide flex-shrink-0 bg-[#2d2d2d] cursor-grab active:cursor-grabbing select-none min-w-[280px]"
            onMouseDown={handleCatMouseDown}
            onMouseLeave={handleCatMouseLeave}
            onMouseUp={handleCatMouseUp}
            onMouseMove={handleCatMouseMove}
          >
            {['All', 'Power', 'Passive', 'Semi', 'ICs', 'Sensors', 'Output', 'Drivers'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded text-[10px] font-bold uppercase whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar bg-[#252526] min-w-[280px]">
            <div className="grid grid-cols-2 gap-2 pb-10">
              {filteredComponents.map(comp => (
                <button
                  key={comp.type}
                  onClick={() => setSelectedTool(comp.type)}
                  className={`flex flex-col items-center p-3 rounded-md border transition-all relative group min-h-[70px] justify-center ${
                    selectedTool === comp.type 
                      ? 'bg-blue-900/30 border-blue-500 ring-1 ring-blue-500 shadow-inner' 
                      : 'bg-[#2d2d2d] border-gray-700 hover:border-gray-500 hover:bg-[#353535]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1.5 ${comp.color === '#000000' ? 'bg-gray-600' : ''}`} style={{ color: comp.color }}>
                    <comp.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium text-center leading-tight line-clamp-2 text-gray-300 group-hover:text-white">{comp.label}</span>
                </button>
              ))}
            </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex flex-col bg-[#1e1e1e] overflow-hidden">
        
        {/* Toolbar */}
        <div className="h-10 bg-[#2d2d2d] border-b border-gray-700 flex items-center justify-between px-3 z-20 flex-shrink-0 shadow-md">
           <div className="flex items-center space-x-1">
              <button 
                 onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                 className={`p-1.5 rounded mr-2 ${!isLeftPanelOpen ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                 title="Toggle Component Library"
              >
                 <PanelLeft className="w-4 h-4" />
              </button>
              <button 
                 onClick={() => setSelectedTool('select')}
                 className={`p-1.5 rounded ${selectedTool === 'select' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                 title="Select / Move (V)"
              >
                 <MousePointer2 className="w-4 h-4" />
              </button>
              <button 
                 onClick={() => { setSelectedTool('wire'); }}
                 className={`p-1.5 rounded ${selectedTool === 'wire' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                 title="Wire Tool (W)"
              >
                 <Activity className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-gray-700 mx-2"></div>
              <button className="p-1.5 text-gray-400 hover:bg-gray-700 rounded" onClick={() => setScale(s => Math.min(2, s + 0.1))}><ZoomIn className="w-4 h-4"/></button>
              <span className="text-[10px] text-gray-500 font-mono w-8 text-center">{Math.round(scale * 100)}%</span>
              <button className="p-1.5 text-gray-400 hover:bg-gray-700 rounded" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOut className="w-4 h-4"/></button>
           </div>
        </div>

        {/* Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden relative cursor-crosshair bg-[#2F5844]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`,
            cursor: drawingWire ? 'none' : (selectedTool === 'wire' ? 'crosshair' : 'default')
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div 
            className="absolute origin-top-left transition-transform duration-75 ease-linear"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
          >
            {/* 1. Component Layer */}
            <div 
               className="grid pointer-events-none absolute top-0 left-0"
               style={{ 
                 gridTemplateColumns: `repeat(${GRID_W}, ${GRID_SIZE}px)`,
                 gridTemplateRows: `repeat(${GRID_H}, ${GRID_SIZE}px)`,
                 width: GRID_W * GRID_SIZE,
                 height: GRID_H * GRID_SIZE
               }}
            >
              {grid.map((cell, i) => {
                const def = getComponentDef(cell.type);
                const isSelected = selectedId === cell.id;

                if (!def) return null;

                return (
                  <div
                    key={cell.id}
                    className="relative flex items-center justify-center"
                    style={{ gridColumn: cell.x + 1, gridRow: cell.y + 1 }}
                  >
                      <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                        <div 
                           className={`relative w-full h-full flex items-center justify-center transition-transform duration-200 ${isSelected ? 'scale-110 drop-shadow-2xl' : ''}`}
                           style={{ transform: `rotate(${cell.rotation}deg)` }}
                        >
                           {/* Selection Box */}
                           {isSelected && <div className="absolute inset-1 border-2 border-blue-400 rounded-lg animate-pulse bg-blue-500/20 pointer-events-none"></div>}
                           
                           {/* Component Icon */}
                           <def.icon 
                              className="w-6 h-6" 
                              style={{ color: def.color }} 
                              strokeWidth={2.5}
                           />
                           
                           {/* Terminals (Interaction Targets) */}
                           {def.terminals.map((t, ti) => {
                             const isHovered = hoveredTerminal && hoveredTerminal.componentId === cell.id && hoveredTerminal.terminalIdx === ti;
                             const isWireStart = drawingWire && drawingWire.start.componentId === cell.id && drawingWire.start.terminalIndex === ti;
                             
                             return (
                               <React.Fragment key={ti}>
                                 <div 
                                   className={`absolute w-3 h-3 rounded-full border-2 transition-transform z-30 cursor-crosshair 
                                      ${isHovered || isWireStart ? 'bg-green-400 scale-125 border-white shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-white border-gray-600 hover:scale-125'}
                                   `}
                                   style={{ 
                                       left: `${(0.5 + t.x) * 100}%`, 
                                       top: `${(0.5 + t.y) * 100}%`, 
                                       transform: 'translate(-50%, -50%)' 
                                   }}
                                 >
                                    {/* Tooltip for pin */}
                                    {isHovered && def.terminalLabels?.[ti] && (
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none">
                                            {def.terminalLabels[ti]}
                                        </div>
                                    )}
                                 </div>
                               </React.Fragment>
                             );
                           })}
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Wire SVG Layer (Above Components for visibility, but pointer events handled carefully) */}
            <svg 
                className="absolute top-0 left-0 overflow-visible pointer-events-none"
                width={GRID_W * GRID_SIZE} 
                height={GRID_H * GRID_SIZE}
            >
                {/* Committed Wires */}
                {wires.map(wire => (
                    <g 
                        key={wire.id} 
                        className="pointer-events-auto cursor-pointer group"
                        onClick={(e) => { e.stopPropagation(); setSelectedId(wire.id); }}
                    >
                        {/* Shadow / Hit Area */}
                        <path 
                            d={getSmoothWirePath(wire.path)}
                            stroke={selectedId === wire.id ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0,0,0,0.3)'}
                            strokeWidth={selectedId === wire.id ? 8 : 6}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all"
                        />
                        {/* Actual Wire */}
                        <path 
                            d={getSmoothWirePath(wire.path)}
                            stroke={getWireColor(wire)}
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:stroke-green-300 transition-colors"
                        />
                    </g>
                ))}

                {/* Wire Being Drawn (Preview) */}
                {drawingWire && (
                    <path 
                        d={getSmoothWirePath(drawingWire.currentPath)}
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="6,4"
                        className="opacity-80"
                    />
                )}
            </svg>
          </div>
        </div>
      </div>

      {/* Right Panel: Inspector */}
      {selectedId && (
        <div style={{ width: rightPanelWidth }} className="border-l border-gray-700 bg-[#252526] z-20 flex flex-col transition-all flex-shrink-0 h-full shadow-xl">
           <div className="p-4 border-b border-gray-700 bg-[#333333]">
              <h3 className="font-bold text-white mb-1">Properties</h3>
              <p className="text-xs text-gray-500 font-mono">ID: {selectedId.substr(0,8)}</p>
           </div>
           
           <div className="p-4 space-y-5">
              {wires.find(w => w.id === selectedId) ? (
                  // Wire Properties
                  <>
                    <div className="flex items-center text-sm font-medium text-white bg-black/20 p-2 rounded border border-white/5">
                        <Activity className="w-4 h-4 mr-2 text-green-400"/>
                        Wire Connection
                    </div>
                    <button 
                        onClick={deleteSelection}
                        className="w-full bg-red-500/10 text-red-400 border border-red-500/30 py-2.5 rounded-md text-sm font-bold hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete Wire
                    </button>
                  </>
              ) : (
                  // Component Properties
                  (() => {
                     const cell = grid.find(c => c.id === selectedId);
                     if(!cell) return null;
                     const def = getComponentDef(cell.type);
                     return (
                        <>
                           <div>
                              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Component</label>
                              <div className="flex items-center text-sm font-medium text-white bg-black/20 p-2 rounded border border-white/5">
                                 {def?.icon && <def.icon className="w-4 h-4 mr-2 text-blue-400"/>}
                                 {def?.label}
                              </div>
                           </div>
                           
                           {def?.unit && (
                             <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Value ({def?.unit})</label>
                                <input 
                                  type="number" 
                                  value={cell.value}
                                  onChange={(e) => {
                                     const val = parseFloat(e.target.value);
                                     setGrid(prev => prev.map(c => c.id === cell.id ? {...c, value: val} : c));
                                  }}
                                  className="bg-black/30 border border-gray-600 rounded px-3 py-2 w-full text-sm text-white focus:border-blue-500 outline-none transition-colors"
                                />
                             </div>
                           )}
    
                           <div className="pt-4 mt-4 border-t border-gray-700">
                              <button 
                                onClick={deleteSelection}
                                className="w-full bg-red-500/10 text-red-400 border border-red-500/30 py-2.5 rounded-md text-sm font-bold hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                              >
                                 <Trash2 className="w-4 h-4 mr-2" /> Remove
                              </button>
                           </div>
                        </>
                     )
                  })()
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default CircuitLab;
