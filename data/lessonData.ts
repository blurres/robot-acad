
import { LessonContent, CurriculumSection, ProjectContent, Difficulty } from "../types";

// --- The Curriculum Structure ---
export const CURRICULUM: CurriculumSection[] = [
  {
    id: 'module-0',
    title: 'Module 0: Robotics Onboarding',
    description: 'Start here. No experience required. Learn the tools, safety, and mindset of an engineer.',
    icon: 'rocket',
    color: 'green',
    lessons: [
      { id: 'm0-intro', title: 'What is a Robot?', duration: '5 min', xp: 50 },
      { id: 'm0-tools', title: 'Tools You Need', duration: '6 min', xp: 50 },
      { id: 'm0-safety', title: 'Safety Essentials', duration: '5 min', xp: 50 },
      { id: 'm0-mindset', title: 'How Engineers Learn', duration: '5 min', xp: 50 },
      { id: 'm0-circuit', title: 'Your First Circuit: Light an LED', duration: '8 min', xp: 100 },
    ]
  },
  {
    id: 'module-1',
    title: 'Module 1: Electronics Fundamentals',
    description: 'The foundation of all robotics. Voltage, current, components, and schematics.',
    icon: 'zap',
    color: 'blue',
    lessons: [
      { id: 'm1-ohms', title: 'Voltage, Current & Resistance', duration: '5 min', xp: 100 },
      { id: 'm1-resistors', title: 'Deep Dive: Resistors', duration: '8 min', xp: 150 },
      { id: 'm1-capacitors', title: 'Capacitors: Storing Energy', duration: '10 min', xp: 150 },
      { id: 'm1-diodes', title: 'Diodes & Rectification', duration: '10 min', xp: 150 },
      { id: 'm1-active', title: 'Active vs Passive Components', duration: '10 min', xp: 150 },
      { id: 'm1-transistors', title: 'Transistors: The Digital Switch', duration: '12 min', xp: 200 },
      { id: 'm1-schematics', title: 'Reading Schematics', duration: '15 min', xp: 250 },
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Embedded Systems',
    description: 'Give your robot a brain. Microcontrollers, coding, and sensors.',
    icon: 'cpu',
    color: 'purple',
    lessons: [
      { id: 'm2-intro', title: 'Introduction to Embedded Systems', duration: '6 min', xp: 150 },
      { id: 'm2-hardware', title: 'Arduino Hardware Guide', duration: '10 min', xp: 200 },
      { id: 'm2-coding-foundations', title: 'Arduino Programming Foundations', duration: '10 min', xp: 200 },
      { id: 'm2-first-code', title: 'Arduino Basics: Writing Code', duration: '12 min', xp: 200 },
      { id: 'm2-sensors', title: 'Sensors: Reading the World', duration: '15 min', xp: 250 },
      { id: 'm2-interrupts', title: 'Interrupts: Real-time Response', duration: '12 min', xp: 300 },
      { id: 'm2-comms', title: 'Communication: I2C & UART', duration: '15 min', xp: 300 },
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Mechanics & Motion',
    description: 'Make it move. Physics, materials, motors, and mechanisms.',
    icon: 'cog',
    color: 'orange',
    lessons: [
      { id: 'm3-physics', title: 'Mechanical Engineering Basics', duration: '8 min', xp: 150 },
      { id: 'm3-materials', title: 'Materials & 3D Printing', duration: '12 min', xp: 200 },
      { id: 'm3-motors', title: 'Motor Types & Selection', duration: '10 min', xp: 200 },
      { id: 'm3-torque', title: 'Motors & Gears: Torque in Practice', duration: '8 min', xp: 200 },
      { id: 'm3-linkages', title: 'Linkages & Mechanisms', duration: '15 min', xp: 250 },
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: Power & Battery Systems',
    description: 'The most overlooked robotics topic. Batteries, regulation, and safety.',
    icon: 'battery',
    color: 'yellow',
    lessons: [
      { id: 'm4-batteries', title: 'Battery Types & Use Cases', duration: '10 min', xp: 200 },
      { id: 'm4-regulation', title: 'Voltage Regulation', duration: '10 min', xp: 200 },
      { id: 'm4-distribution', title: 'Power Distribution', duration: '10 min', xp: 200 },
      { id: 'm4-safety', title: 'Battery Safety', duration: '8 min', xp: 200 },
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Advanced Robotics',
    description: 'Control, intelligence, and autonomy.',
    icon: 'brain',
    color: 'pink',
    lessons: [
      { id: 'm5-kinematics', title: 'Robot Kinematics', duration: '20 min', xp: 400 },
      { id: 'm5-pid', title: 'PID Control Theory', duration: '15 min', xp: 300 },
      { id: 'm5-vision', title: 'Computer Vision Basics', duration: '15 min', xp: 350 },
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: Capstone Project',
    description: 'Build a working robot from scratch. The final test.',
    icon: 'award',
    color: 'indigo',
    lessons: [
      { id: 'm6-planning', title: 'Planning Your Robot', duration: '10 min', xp: 150 },
      { id: 'm6-assembly', title: 'Assembly & Wiring', duration: '20 min', xp: 200 },
      { id: 'm6-code', title: 'Programming Autonomous Behavior', duration: '20 min', xp: 250 },
      { id: 'm6-demo', title: 'Final Test & Demo', duration: '10 min', xp: 300 },
    ]
  }
];

// --- Community Projects (Pre-loaded) ---
export const COMMUNITY_PROJECTS: ProjectContent[] = [
  {
    id: "capstone-rover",
    title: "Capstone: Autonomous Obstacle Avoider",
    overview: "Build a fully autonomous 2WD robot chassis that navigates a room using ultrasonic sensors. This project combines electronics (H-Bridge), embedded coding (Arduino C++), and mechanics.",
    difficulty: Difficulty.INTERMEDIATE,
    estimatedTime: "5-8 Hours",
    materials: [
      "Arduino Uno",
      "L298N Motor Driver",
      "2x DC Gear Motors + Wheels",
      "HC-SR04 Ultrasonic Sensor",
      "Servo Motor (SG90)",
      "9V Battery + Holder",
      "Chassis Kit (Acrylic)",
      "Jumper Wires"
    ],
    prerequisites: ["Arduino Basics", "Soldering", "Motor Drivers", "C++ Loops"],
    steps: [
      {
        stepTitle: "Chassis Assembly",
        instruction: "Mount the DC motors to the acrylic frame. Attach the caster wheel to the front. Secure the battery holder and Arduino Uno using spacers."
      },
      {
        stepTitle: "Wiring the H-Bridge",
        instruction: "Connect the L298N driver. Motor A wires to OUT1/OUT2. Motor B to OUT3/OUT4. Connect the 12V input to your battery pack (positive) and GND to battery negative. **Crucial:** Connect the L298N GND to Arduino GND (Common Ground)."
      },
      {
        stepTitle: "Connecting the Eyes",
        instruction: "Mount the HC-SR04 sensor onto the Servo motor horn. Connect VCC to 5V, GND to GND, Trig to Pin 9, Echo to Pin 10."
      },
      {
        stepTitle: "The Algorithm",
        instruction: "Write code that drives forward until `distance < 20cm`. Then: Stop -> Look Left -> Look Right -> Turn towards the open path -> Resume."
      }
    ],
    createdAt: 1715000000000
  }
];

// --- Lesson Content Database ---
export const STATIC_LESSONS: Record<string, LessonContent> = {
  
  // --- Module 0: Onboarding ---
  "m0-intro": {
    id: "m0-intro",
    title: "What is a Robot?",
    nextLessonId: "m0-tools",
    content: `
# Welcome to Robotics
A robot is not just a machine; it is a physical device that interacts with the world. All robots, from a Roomba to a Mars Rover, follow the **Three Pillars of Robotics**:

### 1. Sense (Input)
The robot gathers data from its environment.
*   *Examples:* Cameras (Vision), Microphones (Sound), Ultrasonic Sensors (Distance), Thermometers (Heat).

### 2. Think (Processing)
The robot's "brain" decides what to do based on the sensor data and its programming.
*   *Examples:* Microcontrollers (Arduino), Single Board Computers (Raspberry Pi), AI Algorithms.

### 3. Act (Output)
The robot physically changes the world or moves itself.
*   *Examples:* Motors (Wheels), Servos (Arms), LEDs (Lights), Speakers (Sound).

### What you will build
By the end of this course, you will build a fully autonomous robot that can navigate a room on its own.
    `,
    quiz: [
      {
        question: "What are the three pillars of robotics?",
        options: ["Input, Process, Output", "Sense, Think, Act", "See, Hear, Speak", "Battery, Motor, Wire"],
        correctIndex: 1,
        explanation: "Robots Sense the world, Think about the data, and Act upon it."
      },
      {
        question: "Which component is responsible for 'Thinking'?",
        options: ["The Motor", "The Battery", "The Microcontroller", "The Frame"],
        correctIndex: 2,
        explanation: "The microcontroller executes the code and makes decisions."
      },
      {
        question: "A camera on a robot is an example of...",
        options: ["Actuation", "Sensing", "Thinking", "Power"],
        correctIndex: 1,
        explanation: "A camera gathers visual data from the environment, so it is a sensor."
      }
    ]
  },

  "m0-tools": {
    id: "m0-tools",
    title: "Tools You Need",
    nextLessonId: "m0-safety",
    content: `
# Your Engineering Lab
To build robots, you need the right tools. Here is your starter kit:

### 1. The Breadboard
A reusable platform for building circuits without soldering. It has holes connected internally by metal strips.
*   **Rows**: Connected horizontally (for components).
*   **Power Rails**: Connected vertically (Red for +, Blue for -).

### 2. Jumper Wires
The nerves of your robot.
*   **Male-to-Male**: For connecting points on a breadboard.
*   **Male-to-Female**: For connecting sensors to the Arduino.

### 3. The Multimeter
The engineer's stethoscope. It measures:
*   **Voltage (V)**: Electrical pressure.
*   **Current (A)**: Electrical flow.
*   **Resistance (Ω)**: Opposition to flow.
*   **Continuity**: Beeps if two points are connected. (Most useful feature!)

### 4. Microcontroller
We will use an **Arduino Uno** (or compatible board). It is rugged, beginner-friendly, and has a huge community.
    `,
    quiz: [
      {
        question: "What is the most useful feature of a multimeter for debugging connection issues?",
        options: ["Measuring Amps", "Continuity (Beep)", "Measuring Heat", "Weighing parts"],
        correctIndex: 1,
        explanation: "Continuity mode beeps if a wire is unbroken. If it doesn't beep, you have a loose connection."
      },
      {
        question: "Do you need to solder to use a breadboard?",
        options: ["Yes, always", "No, never", "Only for power", "Only for LEDs"],
        correctIndex: 1,
        explanation: "Breadboards rely on spring clips inside the holes to hold wires, making them solder-free and reusable."
      },
      {
        question: "What are the vertical strips on the side of a breadboard usually used for?",
        options: ["Data signals", "Power distribution (+/-)", "Nothing", "Mounting screws"],
        correctIndex: 1,
        explanation: "The long vertical rails are designed to distribute Power (VCC) and Ground (GND) to the whole circuit."
      }
    ]
  },

  "m0-safety": {
    id: "m0-safety",
    title: "Safety Essentials",
    nextLessonId: "m0-mindset",
    content: `
# Respect the Electrons
Electronics is generally safe at low voltages (5V-12V), but bad habits can ruin components or cause burns.

### 1. The Short Circuit
The most common mistake. Connecting Positive (+) directly to Negative (-) with no load (like a light or motor) in between.
*   **Result**: Infinite current flows. Wires melt. Batteries explode.
*   **Prevention**: Always double-check your wiring before plugging in power.

### 2. Polarity
Some components care about which way electricity flows.
*   **LEDs**: Long leg is (+), Short leg is (-).
*   **Electrolytic Capacitors**: Stripe indicates (-).
*   **Chips**: Dot indicates Pin 1.
*   **Rule**: If you plug them in backwards, they might pop and release "magic smoke".

### 3. Current Limits
An Arduino pin can only provide **20mA**.
*   **Safe**: Lighting an LED.
*   **Unsafe**: Powering a motor directly. (You will burn the chip).
    `,
    quiz: [
      {
        question: "What happens in a short circuit?",
        options: ["Current becomes zero", "Current becomes extremely high", "Voltage becomes infinite", "The circuit cools down"],
        correctIndex: 1,
        explanation: "V=IR. If R approaches 0, I approaches infinity. High current creates massive heat."
      },
      {
        question: "Which leg of an LED is usually Positive (Anode)?",
        options: ["The short one", "The long one", "The flat side", "The middle one"],
        correctIndex: 1,
        explanation: "The Longer Leg is the Anode (+). Think 'L' for Long and Light."
      },
      {
        question: "Can you power a motor directly from an Arduino signal pin?",
        options: ["Yes, it works great", "No, it draws too much current", "Only if it is a large motor", "Yes, if you use a red wire"],
        correctIndex: 1,
        explanation: "Motors draw hundreds of milliamps. Arduino pins supply ~20mA. You need a transistor or driver."
      }
    ]
  },

  "m0-mindset": {
    id: "m0-mindset",
    title: "How Engineers Learn",
    nextLessonId: "m0-circuit",
    content: `
# Failure is Data
Engineering is not about knowing the answer; it is about finding it.

### 1. Break it Down
Don't try to build the "Robot" all at once.
*   Build the power system. Test it.
*   Build the motor driver. Test it.
*   Write the sensor code. Test it.
*   *Then* combine them.

### 2. Isolate the Variable
If something doesn't work, change **one thing** at a time.
*   If you change the code AND the wiring at the same time, you won't know which one fixed (or caused) the problem.

### 3. RTFM (Read The Manual)
Every component has a **Datasheet**. It tells you the voltage limits, pinout, and logic. Learning to Google "L298N datasheet" is a superpower.
    `,
    quiz: [
      {
        question: "If your robot doesn't work, what should you do?",
        options: ["Throw it away", "Change everything at once", "Test individual subsystems", "Guess randomly"],
        correctIndex: 2,
        explanation: "Debugging requires isolating the problem. Check power, then check logic, then check mechanics."
      },
      {
        question: "What is a Datasheet?",
        options: ["A piece of paper for notes", "The technical manual for a component", "A cheat sheet for code", "A bill for materials"],
        correctIndex: 1,
        explanation: "Datasheets are the official documentation from manufacturers containing all technical specs."
      },
      {
        question: "Why should you change only one variable at a time?",
        options: ["It is slower", "To know exactly what caused the change", "It saves electricity", "It is polite"],
        correctIndex: 1,
        explanation: "Scientific method 101: Isolating variables allows you to determine cause and effect."
      }
    ]
  },

  "m0-circuit": {
    id: "m0-circuit",
    title: "Your First Circuit: Light an LED",
    nextLessonId: "m1-ohms",
    content: `
# Let there be Light
We will build the "Hello World" of hardware.

### Materials
*   9V Battery (or 5V USB power)
*   Breadboard
*   LED (Any color)
*   Resistor (330Ω to 1kΩ)

### The Circuit
We need a closed loop: **Power (+) -> Resistor -> LED -> Ground (-)**.

1.  **Resistor**: Plug one leg into the Red Power Rail (+). Plug the other into a row (e.g., Row 10).
2.  **LED**: Plug the **Long Leg (+)** into Row 10 (connecting to resistor). Plug the **Short Leg (-)** into Row 11.
3.  **Jumper**: Plug a wire from Row 11 to the Blue Ground Rail (-).
4.  **Power**: Connect your battery to the rails.

### Why the Resistor?
The LED has almost zero resistance. If connected directly to 9V, Ohm's law says Current = 9V / 0Ω = Infinity. The LED will burn out immediately. The resistor "resists" the flow, limiting it to a safe level.
    `,
    quiz: [
      {
        question: "What is the purpose of the resistor in this circuit?",
        options: ["To make the LED brighter", "To limit current", "To store energy", "To act as a switch"],
        correctIndex: 1,
        explanation: "It limits the current to prevent the LED from burning out due to excessive power."
      },
      {
        question: "The Long Leg of the LED connects towards...",
        options: ["The Negative side", "The Positive side", "Nowhere", "The Ground"],
        correctIndex: 1,
        explanation: "The Long Leg is the Anode (+), so it faces the voltage source."
      },
      {
        question: "What happens if the circuit is 'Open'?",
        options: ["Electricity flows fast", "Nothing happens", "Short circuit", "Sparks fly"],
        correctIndex: 1,
        explanation: "An open circuit has a gap (like a cut wire). Electricity cannot jump the gap, so no current flows."
      }
    ]
  },

  // --- Module 1: Electronics ---

  "m1-ohms": {
    id: "m1-ohms",
    title: "Voltage, Current & Resistance",
    nextLessonId: "m1-resistors",
    content: `
# The Water Analogy
To understand electricity, imagine water flowing through a pipe:

*   **Voltage (V)** is the **Water Pressure**. Measured in **Volts (V)**.
*   **Current (I)** is the **Flow Rate**. Measured in **Amperes (A)**.
*   **Resistance (R)** is the **Pipe Size**. Measured in **Ohms (Ω)**.

### Ohm's Law
> **V = I × R**

If you increase pressure (V), flow (I) increases. If you narrow the pipe (increase R), flow decreases.
    `,
    quiz: [
      {
        question: "If Voltage increases and Resistance stays the same, what happens to Current?",
        options: ["Decreases", "Increases", "Stays same", "Becomes zero"],
        correctIndex: 1,
        explanation: "More pressure (Voltage) pushes more water (Current) if the pipe size (Resistance) doesn't change."
      },
      {
        question: "What is the unit of Resistance?",
        options: ["Volts", "Amps", "Ohms", "Watts"],
        correctIndex: 2,
        explanation: "Resistance is measured in Ohms (Ω)."
      },
      {
        question: "Which formula is correct?",
        options: ["V = I / R", "I = V * R", "V = I * R", "R = V * I"],
        correctIndex: 2,
        explanation: "V = IR is the standard form of Ohm's Law."
      }
    ]
  },

  "m1-resistors": {
    id: "m1-resistors",
    title: "Deep Dive: Resistors",
    nextLessonId: "m1-capacitors",
    content: `
# Reading Resistors
Resistors use colored bands to indicate value.
**Mnemonics**: "Black 0, Brown 1, Red 2..."

### Series vs Parallel
*   **Series**: $R_{total} = R_1 + R_2$. Resistance adds up.
*   **Parallel**: $\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2}$. Total resistance decreases.

### Power Rating
Resistors get hot. Standard ones are **1/4 Watt**. If you put too much current through them ($P = I^2R$), they will burn.
    `,
    quiz: [
      {
        question: "Two 100Ω resistors in Series equal...",
        options: ["50Ω", "100Ω", "200Ω", "10kΩ"],
        correctIndex: 2,
        explanation: "In series, R_total = R1 + R2."
      },
      {
        question: "Two 100Ω resistors in Parallel equal...",
        options: ["50Ω", "100Ω", "200Ω", "10kΩ"],
        correctIndex: 0,
        explanation: "In parallel, two equal resistors result in half the resistance."
      },
      {
        question: "What happens if a resistor exceeds its power rating?",
        options: ["It works better", "It cools down", "It burns up", "It becomes a capacitor"],
        correctIndex: 2,
        explanation: "Exceeding the wattage rating causes overheating and failure."
      }
    ]
  },

  "m1-capacitors": {
    id: "m1-capacitors",
    title: "Capacitors: Storing Energy",
    nextLessonId: "m1-diodes",
    content: `
# The Tiny Bucket
Capacitors store energy in an electric field. Think of them as a water bucket attached to the pipe.
*   If pressure drops, the bucket pours water back in (Smoothing).
*   It takes time to fill the bucket (Timing).

### Units
**Farads (F)**. Usually µF (micro), nF (nano), pF (pico).

### Types
*   **Ceramic**: Small, non-polarized. High speed.
*   **Electrolytic**: Large, polarized (+/-). Big storage. **Explodes if reversed.**
    `,
    quiz: [
      {
        question: "What does a capacitor do to voltage fluctuations?",
        options: ["Amplifies them", "Smooths them", "Ignores them", "Creates them"],
        correctIndex: 1,
        explanation: "Capacitors resist changes in voltage, smoothing out ripples."
      },
      {
        question: "Which type of capacitor is polarized?",
        options: ["Ceramic", "Electrolytic", "Mylar", "Air"],
        correctIndex: 1,
        explanation: "Electrolytic capacitors have a positive and negative side."
      },
      {
        question: "What is the unit of capacitance?",
        options: ["Henry", "Farad", "Ohm", "Watt"],
        correctIndex: 1,
        explanation: "Farad (F)."
      }
    ]
  },

  "m1-diodes": {
    id: "m1-diodes",
    title: "Diodes & Rectification",
    nextLessonId: "m1-active",
    content: `
# The One-Way Valve
Diodes allow current to flow only in one direction (Anode to Cathode).

### Uses
1.  **Protection**: Stop battery from frying circuit if plugged in backwards.
2.  **Rectification**: Convert AC (wiggles back and forth) to DC (one way).
3.  **Clamping**: Flyback diodes protect chips from motors spinning down.

### The LED
A Light Emitting Diode is just a diode that glows. It still acts as a valve!
    `,
    quiz: [
      {
        question: "Current flows from...",
        options: ["Cathode to Anode", "Anode to Cathode", "Ground to Power", "Left to Right"],
        correctIndex: 1,
        explanation: "Anode (+) to Cathode (-)."
      },
      {
        question: "What is a Bridge Rectifier used for?",
        options: ["Building bridges", "Converting AC to DC", "Converting DC to AC", "Amplifying signals"],
        correctIndex: 1,
        explanation: "A bridge of 4 diodes flips negative AC cycles to positive DC."
      },
      {
        question: "What is a Flyback diode used for?",
        options: ["Flying", "Lighting up", "Protecting against voltage spikes from motors", "Wireless charging"],
        correctIndex: 2,
        explanation: "Inductive loads like motors generate high voltage spikes when turned off. The diode safely recirculates this current."
      }
    ]
  },

  "m1-active": {
    id: "m1-active",
    title: "Active vs Passive Components",
    nextLessonId: "m1-transistors",
    content: `
# Who is in Control?

### Passive Components
They cannot introduce net energy into the circuit. They behave linearly.
*   **Examples**: Resistors, Capacitors, Inductors, Diodes (sort of).
*   **Role**: Limit, Store, Filter.

### Active Components
They can rely on a source of energy to control the flow of electricity. They can amplify signals.
*   **Examples**: Transistors, Op-Amps, Integrated Circuits (ICs), Microcontrollers.
*   **Role**: Switch, Amplify, Decide.
    `,
    quiz: [
      {
        question: "Which is an Active component?",
        options: ["Resistor", "Transistor", "Capacitor", "Inductor"],
        correctIndex: 1,
        explanation: "Transistors can use external power to amplify a signal."
      },
      {
        question: "Can a passive component amplify a signal?",
        options: ["Yes", "No", "Only if hot", "Only resistors"],
        correctIndex: 1,
        explanation: "No. Passive components can only attenuate (reduce) or store energy."
      },
      {
        question: "What do active components generally require?",
        options: ["A power source", "Water cooling", "Internet connection", "Solar panels"],
        correctIndex: 0,
        explanation: "Active components need a DC power source to perform their active functions."
      }
    ]
  },

  "m1-transistors": {
    id: "m1-transistors",
    title: "Transistors: The Digital Switch",
    nextLessonId: "m1-schematics",
    content: `
# The Magic Switch
Transistors allow a tiny current to control a huge current.

### BJT (Bipolar Junction Transistor)
*   **NPN**: Turn ON by giving voltage to Base. (Most common).
*   **PNP**: Turn ON by connecting Base to Ground.

### MOSFETs
Used for high power. They switch based on **Voltage** (Gate) rather than **Current** (Base). They are more efficient and used in drone ESCs.

### Use Case
An Arduino pin provides 20mA. A Motor needs 1000mA.
*   **Base** -> Arduino Pin
*   **Collector** -> Motor
*   **Emitter** -> Ground
When Arduino goes HIGH, the Transistor connects Motor to Ground, and it spins!
    `,
    quiz: [
      {
        question: "Which pin controls the flow in a BJT?",
        options: ["Emitter", "Collector", "Base", "Gate"],
        correctIndex: 2,
        explanation: "In a BJT, the Base current controls the Collector-Emitter current."
      },
      {
        question: "Why use a MOSFET instead of a BJT?",
        options: ["It's cheaper", "It handles high power more efficiently", "It's older", "It's blue"],
        correctIndex: 1,
        explanation: "MOSFETs have very low internal resistance when ON, producing less heat at high currents."
      },
      {
        question: "What signal turns an NPN transistor ON?",
        options: ["Low Voltage / Ground", "High Voltage", "No connection", "AC power"],
        correctIndex: 1,
        explanation: "NPN transistors saturate (turn on) when voltage is applied to the Base."
      }
    ]
  },

  "m1-schematics": {
    id: "m1-schematics",
    title: "Reading Schematics",
    nextLessonId: "m2-intro",
    content: `
# The Engineer's Map
A schematic shows connections, not physical location.

### Key Symbols
*   **Zigzag**: Resistor
*   **Parallel Lines**: Capacitor
*   **Triangle/Three Lines**: Ground (0V)
*   **Arrow Up**: VCC (Power, e.g., 5V)

### Junctions
*   **Dot**: Wires connect.
*   **No Dot**: Wires cross over without connecting.

### Nets
Labels like "SDA" or "MOTOR_L". Any line with the same label is connected, even if you don't see a wire drawn between them. This keeps drawings clean.
    `,
    quiz: [
      {
        question: "What does a solid dot at a wire crossing mean?",
        options: ["No connection", "Electrical connection", "A capacitor", "A mistake"],
        correctIndex: 1,
        explanation: "A dot signifies a physical solder joint or connection between the wires."
      },
      {
        question: "What symbol represents Ground?",
        options: ["Up arrow", "Zigzag", "Downward triangle", "Circle"],
        correctIndex: 2,
        explanation: "Ground is usually a downward pointing triangle or three horizontal lines."
      },
      {
        question: "If two wires have the same Net Label (e.g. '5V'), are they connected?",
        options: ["Yes", "No", "Only if close", "Depends on color"],
        correctIndex: 0,
        explanation: "Net labels are virtual wires. All points with the same label share the same electrical potential."
      }
    ]
  },

  // --- Module 2: Embedded ---

  "m2-intro": {
    id: "m2-intro",
    title: "Introduction to Embedded Systems",
    nextLessonId: "m2-hardware",
    content: `
# Computing on the Edge
An embedded system is a computer designed for a dedicated task.
*   **General PC**: Runs Windows, many apps, high power.
*   **Embedded**: Runs firmware, one task (e.g., microwave timer), low power.

### Microcontrollers (MCU)
The brain. Contains CPU, RAM, and Flash Memory on a single chip.
*   *Examples:* Arduino (ATmega328), ESP32 (Wi-Fi), STM32.

### Peripherals
Special hardware inside the MCU:
*   **ADC**: Read analog sensors.
*   **PWM**: Fade LEDs/Run motors.
*   **UART/I2C/SPI**: Talk to other chips.
    `,
    quiz: [
      {
        question: "What distinguishes an embedded system from a PC?",
        options: ["It has no keyboard", "It performs a dedicated function", "It is slower", "It is expensive"],
        correctIndex: 1,
        explanation: "Embedded systems are optimized for specific tasks (like controlling a robot arm), unlike general-purpose PCs."
      },
      {
        question: "What is Firmware?",
        options: ["Hard hardware", "Software running on an MCU", "A phone case", "A type of wire"],
        correctIndex: 1,
        explanation: "Firmware is the code permanently or semi-permanently programmed into the hardware."
      },
      {
        question: "Which component reads analog sensors?",
        options: ["DAC", "ADC", "PWM", "USB"],
        correctIndex: 1,
        explanation: "ADC (Analog to Digital Converter) translates voltage levels into numbers the CPU can process."
      }
    ]
  },

  "m2-hardware": {
    id: "m2-hardware",
    title: "Arduino Hardware Guide",
    nextLessonId: "m2-coding-foundations",
    content: `
# The Arduino Uno
Your development board.

### Pins
*   **Digital (0-13)**: On/Off.
*   **PWM (~)**: Simulated analog out.
*   **Analog (A0-A5)**: Read voltage (0-5V).

### Power
*   **USB**: 5V.
*   **Barrel Jack/Vin**: 7-12V.
*   **3.3V / 5V Pins**: Output to power sensors.

### Warning
Current limit per pin is **20mA**. Do not power motors directly from GPIO pins!
    `,
    quiz: [
      {
        question: "What is the voltage of the USB port?",
        options: ["3.3V", "5V", "9V", "12V"],
        correctIndex: 1,
        explanation: "Standard USB voltage is 5V."
      },
      {
        question: "Which pins can read variable voltage sensors?",
        options: ["Digital", "Analog (A0-A5)", "Power", "Reset"],
        correctIndex: 1,
        explanation: "Analog pins are connected to the ADC to read voltages between 0 and 5V."
      },
      {
        question: "Can you power a 1A motor from an Arduino pin?",
        options: ["Yes", "No, it will fry the pin", "Yes, with a resistor", "Only if blue"],
        correctIndex: 1,
        explanation: "Arduino pins max out at ~40mA. 1A is 1000mA. It will destroy the chip immediately."
      }
    ]
  },

  "m2-coding-foundations": {
    id: "m2-coding-foundations",
    title: "Arduino Programming Foundations",
    nextLessonId: "m2-first-code",
    content: `
# Coding C++
Arduino uses a version of C++. Before the "loop", you need to know the grammar.

### Variables
Containers for data.
*   \`int age = 10;\` (Integer)
*   \`float temp = 98.6;\` (Decimal)
*   \`bool isOn = true;\` (True/False)

### Conditionals
Making decisions.
\`\`\`cpp
if (sensorValue > 500) {
  turnOnLED();
} else {
  turnOffLED();
}
\`\`\`

### Loops
Doing things repeatedly.
*   \`void loop()\` runs forever.
*   \`for(int i=0; i<5; i++)\` runs 5 times.
    `,
    quiz: [
      {
        question: "Which variable type stores decimals?",
        options: ["int", "char", "float", "bool"],
        correctIndex: 2,
        explanation: "Float stands for Floating Point number, used for decimals."
      },
      {
        question: "What does 'else' do?",
        options: ["Repeats code", "Runs if the 'if' condition is false", "Stops the program", "Defines a variable"],
        correctIndex: 1,
        explanation: "The 'else' block executes only when the 'if' condition is not met."
      },
      {
        question: "Why do we use loops?",
        options: ["To slow down the code", "To repeat tasks efficiently", "To confuse reading", "To save memory"],
        correctIndex: 1,
        explanation: "Loops allow us to perform repetitive actions (like checking a sensor) without writing the same code 100 times."
      }
    ]
  },

  "m2-first-code": {
    id: "m2-first-code",
    title: "Arduino Basics: Writing Code",
    nextLessonId: "m2-sensors",
    content: `
# Structure of a Sketch
Arduino code has two required functions:

1.  **setup()**: Runs **ONCE** when powered on. Used to configure pins.
2.  **loop()**: Runs **FOREVER**. The main logic.

### Blink Example
\`\`\`cpp
void setup() {
  pinMode(13, OUTPUT); // Set Pin 13 as Output
}

void loop() {
  digitalWrite(13, HIGH); // On (5V)
  delay(1000);            // Wait 1 sec
  digitalWrite(13, LOW);  // Off (0V)
  delay(1000);            // Wait 1 sec
}
\`\`\`
    `,
    quiz: [
      {
        question: "How many times does setup() run?",
        options: ["Once", "Twice", "Forever", "Never"],
        correctIndex: 0,
        explanation: "It runs once on boot or reset."
      },
      {
        question: "What does pinMode(13, OUTPUT) do?",
        options: ["Turns pin 13 on", "Prepares pin 13 to send voltage", "Reads from pin 13", "Deletes pin 13"],
        correctIndex: 1,
        explanation: "It configures the hardware register to drive the pin as an output source."
      },
      {
        question: "What is the unit of delay()?",
        options: ["Seconds", "Milliseconds", "Microseconds", "Minutes"],
        correctIndex: 1,
        explanation: "delay(1000) means 1000 milliseconds, which is 1 second."
      }
    ]
  },

  "m2-sensors": {
    id: "m2-sensors",
    title: "Sensors: Reading the World",
    nextLessonId: "m2-interrupts",
    content: `
# Input Devices
Sensors convert physics into electricity.

### Types
1.  **Digital**: Button. (Pressed/Not Pressed).
2.  **Analog**: LDR (Light sensor). Brighter light = Higher voltage.
3.  **Complex**: Ultrasonic. Sends a sound ping, waits for echo.

### Analog Read
\`\`\`cpp
int val = analogRead(A0);
\`\`\`
Returns a number between 0 (0V) and 1023 (5V).

### Mapping
Often we need to convert that 0-1023 to something useful, like 0-100%.
\`\`\`cpp
int percent = map(val, 0, 1023, 0, 100);
\`\`\`
    `,
    quiz: [
      {
        question: "What does analogRead() return?",
        options: ["0 or 1", "0 to 1023", "0 to 255", "-5 to +5"],
        correctIndex: 1,
        explanation: "The Arduino ADC is 10-bit, offering 1024 resolution steps."
      },
      {
        question: "What is an LDR?",
        options: ["Light Dependent Resistor", "Low Data Rate", "Long Distance Radio", "Light Diode Ray"],
        correctIndex: 0,
        explanation: "It acts as a variable resistor based on light intensity."
      },
      {
        question: "What function converts one range of numbers to another?",
        options: ["convert()", "change()", "map()", "switch()"],
        correctIndex: 2,
        explanation: "map(value, fromLow, fromHigh, toLow, toHigh) handles linear interpolation."
      }
    ]
  },

  "m2-interrupts": {
    id: "m2-interrupts",
    title: "Interrupts: Real-time Response",
    nextLessonId: "m2-comms",
    content: `
# Polling vs Interrupts
*   **Polling**: Asking "Are we there yet?" every second. Wastes time.
*   **Interrupt**: The driver poking you when you arrive.

### Why use Interrupts?
If your robot is busy calculating a path, it might miss a bumper sensor press in a polling loop. With an interrupt, the hardware forces the code to pause and handle the bumper press immediately.

### ISR (Interrupt Service Routine)
The function that runs. Must be **fast**.
\`\`\`cpp
attachInterrupt(digitalPinToInterrupt(2), stopRobot, RISING);
\`\`\`
    `,
    quiz: [
      {
        question: "What is a main advantage of Interrupts?",
        options: ["Easier to code", "Immediate response to events", "Uses less memory", "Slower"],
        correctIndex: 1,
        explanation: "They allow the CPU to respond instantly to external events regardless of what the main loop is doing."
      },
      {
        question: "What should you avoid inside an ISR?",
        options: ["Math", "Setting variables", "delay() and Serial.print()", "Turning on LEDs"],
        correctIndex: 2,
        explanation: "delay() relies on interrupts, which are disabled inside an ISR. Using it causes the chip to freeze."
      },
      {
        question: "Which pins on Arduino Uno support external interrupts?",
        options: ["All pins", "2 and 3", "13", "A0"],
        correctIndex: 1,
        explanation: "On the Uno, only Digital Pins 2 and 3 can be used for attachInterrupt()."
      }
    ]
  },

  "m2-comms": {
    id: "m2-comms",
    title: "Communication: I2C & UART",
    nextLessonId: "m3-physics",
    content: `
# Digital Languages
Chips talk to each other using protocols.

### UART (Serial)
*   **Pins**: TX (Transmit) and RX (Receive).
*   **Rule**: TX connects to RX.
*   **Use**: Debugging to PC, GPS, Bluetooth.

### I2C (Inter-Integrated Circuit)
*   **Pins**: SDA (Data) and SCL (Clock).
*   **Bus**: Can connect 100+ sensors to the same 2 wires! Each has an **Address**.
*   **Use**: OLED screens, Gyroscopes (IMU).
    `,
    quiz: [
      {
        question: "In UART, TX connects to...",
        options: ["TX", "RX", "GND", "VCC"],
        correctIndex: 1,
        explanation: "Transmission must go to Reception."
      },
      {
        question: "How many wires does I2C need?",
        options: ["1", "2", "4", "10"],
        correctIndex: 1,
        explanation: "SDA and SCL (plus power/ground)."
      },
      {
        question: "How does I2C tell devices apart?",
        options: ["Different wires", "Addresses", "Voltage levels", "Magic"],
        correctIndex: 1,
        explanation: "Each chip has a unique hex address (e.g., 0x3C)."
      }
    ]
  },

  // --- Module 3: Mechanics ---

  "m3-physics": {
    id: "m3-physics",
    title: "Mechanical Engineering Basics",
    nextLessonId: "m3-materials",
    content: `
# Physics of Motion
*   **Force (F)**: Push or Pull. $F = ma$.
*   **Velocity**: Speed with direction.
*   **Torque**: Rotational force. $T = Force \\times Distance$.

### Why Torque Matters
A motor might spin fast (High RPM) but be weak (Low Torque). To move a heavy robot, we need Torque. We gain torque by sacrificing speed using **Gears**.
    `,
    quiz: [
      {
        question: "Torque is best described as...",
        options: ["Linear speed", "Rotational force", "Friction", "Gravity"],
        correctIndex: 1,
        explanation: "Torque is the twisting force that causes rotation."
      },
      {
        question: "To get more torque from a wrench, you should...",
        options: ["Use a shorter handle", "Use a longer handle", "Push lighter", "Heat it up"],
        correctIndex: 1,
        explanation: "Torque = Force x Distance. Increasing distance increases torque."
      },
      {
        question: "Force equals...",
        options: ["Mass x Acceleration", "Mass / Speed", "Gravity + Weight", "Speed x Time"],
        correctIndex: 0,
        explanation: "Newton's Second Law: F=ma."
      }
    ]
  },

  "m3-materials": {
    id: "m3-materials",
    title: "Materials & 3D Printing",
    nextLessonId: "m3-motors",
    content: `
# Building the Body
*   **Wood/Cardboard**: Prototyping.
*   **Acrylic**: Laser cut. Brittle.
*   **Aluminum**: Strong, light, standard for chassis.

### 3D Printing
*   **PLA**: Easy, biodegradable. Melts in hot cars.
*   **PETG**: Strong, flexible, heat resistant. Good for functional parts.
*   **TPU**: Rubber. Used for tires and bumpers.
    `,
    quiz: [
      {
        question: "Which material is flexible?",
        options: ["PLA", "ABS", "TPU", "Aluminum"],
        correctIndex: 2,
        explanation: "TPU is a flexible thermoplastic used for shock absorption."
      },
      {
        question: "Why avoid PLA for outdoor robots?",
        options: ["It dissolves in rain", "It degrades in UV/Heat", "It is too heavy", "It is conductive"],
        correctIndex: 1,
        explanation: "PLA has a low glass transition temperature and warps in direct sunlight."
      },
      {
        question: "Which material is commonly laser cut?",
        options: ["Steel", "Acrylic", "TPU", "Glass"],
        correctIndex: 1,
        explanation: "Acrylic sheet is easily cut by CO2 lasers to create flat robot chassis parts."
      }
    ]
  },

  "m3-motors": {
    id: "m3-motors",
    title: "Motor Types & Selection",
    nextLessonId: "m3-torque",
    content: `
# Choosing Muscles
1.  **Brushed DC**: Cheap, easy (2 wires). Spinning wheels.
2.  **Brushless (BLDC)**: Fast, efficient. Drones. Needs ESC.
3.  **Servo**: Precise angle (0-180). Robot arms.
4.  **Stepper**: Precise rotation. 3D printers.
    `,
    quiz: [
      {
        question: "Which motor is best for a robot arm joint?",
        options: ["DC Motor", "Servo", "Fan", "Vibration motor"],
        correctIndex: 1,
        explanation: "Servos can move to and hold a specific angle."
      },
      {
        question: "Which motor is used in drones?",
        options: ["Stepper", "Brushless DC", "Servo", "Diesel"],
        correctIndex: 1,
        explanation: "Brushless motors offer the high RPM and power-to-weight ratio needed for flight."
      },
      {
        question: "Which motor moves in discrete steps?",
        options: ["Stepper", "DC", "Servo", "AC"],
        correctIndex: 0,
        explanation: "Stepper motors move one 'step' at a time (e.g. 1.8 degrees)."
      }
    ]
  },

  "m3-torque": {
    id: "m3-torque",
    title: "Motors & Gears: Torque in Practice",
    nextLessonId: "m3-linkages",
    content: `
# Mechanical Advantage
Gears allow us to trade Speed for Torque.
*   **Small Gear -> Big Gear**: Speed Down, Torque Up. (Low Gear).
*   **Big Gear -> Small Gear**: Speed Up, Torque Down. (High Gear).

### Gear Ratio
If a 10-tooth gear drives a 50-tooth gear, the ratio is 5:1.
The output spins 5x slower but pushes 5x harder.
    `,
    quiz: [
      {
        question: "A 5:1 gear ratio means...",
        options: ["5x Speed", "5x Torque", "1/5 Torque", "No change"],
        correctIndex: 1,
        explanation: "Reducing speed multiplies torque."
      },
      {
        question: "To climb a hill, you want...",
        options: ["High Speed", "High Torque", "Small wheels", "Low friction"],
        correctIndex: 1,
        explanation: "Torque is the force required to overcome gravity on a slope."
      },
      {
        question: "Input Gear: 10T, Output Gear: 10T. What happens?",
        options: ["Speed doubles", "Torque doubles", "No change in speed/torque", "It locks up"],
        correctIndex: 2,
        explanation: "A 1:1 ratio transmits power without changing mechanical advantage."
      }
    ]
  },

  "m3-linkages": {
    id: "m3-linkages",
    title: "Linkages & Mechanisms",
    nextLessonId: "m4-batteries",
    content: `
# Converting Motion
Linkages change the *type* of motion.
*   **Four-Bar Linkage**: Converts rotation into complex curves (like a windshield wiper).
*   **Cam**: Converts rotation to linear motion (piston).
*   **Slider-Crank**: Engine pistons.

### Degrees of Freedom (DoF)
How many joints does it have? A car is 3 DoF (x, y, theta). A drone is 6 DoF.
    `,
    quiz: [
      {
        question: "A mechanism that converts rotation to linear motion is...",
        options: ["A gear", "A slider-crank", "A bearing", "A battery"],
        correctIndex: 1,
        explanation: "Slider-cranks are found in engines and pumps to convert spinning to pushing."
      },
      {
        question: "How many Degrees of Freedom does a train on a track have?",
        options: ["1", "2", "3", "6"],
        correctIndex: 0,
        explanation: "It can only move forward/backward along the defined track."
      },
      {
        question: "What is a 4-bar linkage used for?",
        options: ["Storing data", "Complex motion paths", "Generating power", "Cooling"],
        correctIndex: 1,
        explanation: "It allows the output link to follow a complex path based on the input rotation."
      }
    ]
  },

  // --- Module 4: Power ---

  "m4-batteries": {
    id: "m4-batteries",
    title: "Battery Types & Use Cases",
    nextLessonId: "m4-regulation",
    content: `
# The Fuel Tank
Choosing the right battery is critical.

### 1. Alkaline (AA/AAA)
*   **Voltage**: 1.5V.
*   **Pros**: Everywhere, safe.
*   **Cons**: Weak current, disposable. Good for remotes, bad for robots.

### 2. Li-Ion (18650)
*   **Voltage**: 3.7V (4.2V charged).
*   **Pros**: High capacity, rechargeable.
*   **Use**: Laptops, Tesla cars, medium robots.

### 3. LiPo (Lithium Polymer)
*   **Voltage**: 3.7V per cell (1S, 2S=7.4V, 3S=11.1V).
*   **Pros**: Massive current output (Discharge Rate "C"). Light.
*   **Cons**: Volatile.
*   **Use**: Drones, combat robots.
    `,
    quiz: [
      {
        question: "Which battery is best for high-performance drones?",
        options: ["9V Block", "Alkaline AA", "LiPo", "Lead Acid"],
        correctIndex: 2,
        explanation: "LiPos have high 'C' ratings, allowing them to dump huge amps quickly for motors."
      },
      {
        question: "What is the nominal voltage of a Li-Ion cell?",
        options: ["1.5V", "3.7V", "5V", "9V"],
        correctIndex: 1,
        explanation: "3.7V is the standard nominal voltage."
      },
      {
        question: "Why are 9V rectangular batteries bad for motors?",
        options: ["Too much power", "Wrong shape", "Very low capacity and current", "Too heavy"],
        correctIndex: 2,
        explanation: "They have high internal resistance and can't supply the amps motors need."
      }
    ]
  },

  "m4-regulation": {
    id: "m4-regulation",
    title: "Voltage Regulation",
    nextLessonId: "m4-distribution",
    content: `
# Taming the Voltage
Batteries change voltage as they drain (12.6V -> 10V). Chips need exactly 5V.

### Linear Regulators (L7805)
*   Burns off excess voltage as **Heat**.
*    inefficient. If dropping 12V to 5V, you waste more energy than you use.

### Buck Converters (Switching)
*   Chops the voltage up thousands of times a second to lower it.
*   **Efficient** (90%+). Runs cool.
*   **Use**: Powering Raspberry Pi or Servos from a big battery.

### Boost Converters
*   Increases voltage (e.g., 3.7V -> 5V).
    `,
    quiz: [
      {
        question: "Which regulator is more efficient?",
        options: ["Linear", "Buck Converter", "Resistor", "Fuse"],
        correctIndex: 1,
        explanation: "Buck converters use inductors and switching to convert voltage with minimal loss."
      },
      {
        question: "What happens to the extra energy in a linear regulator?",
        options: ["It goes back to battery", "It becomes heat", "It becomes light", "It disappears"],
        correctIndex: 1,
        explanation: "They act like dynamic resistors, burning the excess voltage as waste heat."
      },
      {
        question: "If you need 5V from a 3V battery, you need a...",
        options: ["Buck converter", "Boost converter", "Linear regulator", "Diode"],
        correctIndex: 1,
        explanation: "Boost converters step voltage UP."
      }
    ]
  },

  "m4-distribution": {
    id: "m4-distribution",
    title: "Power Distribution",
    nextLessonId: "m4-safety",
    content: `
# Separating Brains and Brawn
Motors generate electrical noise and voltage spikes (Brownouts). Microcontrollers are sensitive.

### The Golden Rule
**Share Ground, Separate Positive.**
1.  **Logic Power**: 9V Battery -> Arduino.
2.  **Motor Power**: 4xAA Battery Pack -> Motor Driver.
3.  **Ground**: Connect Arduino GND to Battery Pack GND.

### Why Common Ground?
Voltage is relative. If grounds aren't connected, the Motor Driver won't understand the Arduino's 5V signal because they have no common reference point.
    `,
    quiz: [
      {
        question: "What connects different power systems together?",
        options: ["Positive", "Ground", "Nothing", "Plastic"],
        correctIndex: 1,
        explanation: "Common Ground is required for signal reference between devices."
      },
      {
        question: "What is a 'Brownout'?",
        options: ["Too much power", "A color", "Voltage dip causing reset", "Battery explosion"],
        correctIndex: 2,
        explanation: "When motors start, they draw huge current, dropping system voltage. If it drops below ~4V, the CPU resets."
      },
      {
        question: "Should you power motors from the Arduino 5V pin?",
        options: ["Yes", "No", "Sometimes", "Only small ones"],
        correctIndex: 1,
        explanation: "Never. The regulator on the Arduino cannot handle motor current/noise."
      }
    ]
  },

  "m4-safety": {
    id: "m4-safety",
    title: "Battery Safety",
    nextLessonId: "m5-kinematics",
    content: `
# Handling High Energy
LiPos are dangerous if mistreated.

### Rules of LiPo
1.  **Never puncture**: Lithium burns on contact with air.
2.  **Never over-discharge**: If a cell drops below 3.0V, it is chemically damaged and may catch fire next charge.
3.  **Balance Charge**: Cells must stay at equal voltage. Use a proper charger.
4.  **Storage**: If not using for a week, charge/discharge to 3.8V (Storage Mode).

### Charging
Always use a **LiPo Bag** (Fireproof) and never leave unattended.
    `,
    quiz: [
      {
        question: "What is the minimum safe voltage for a LiPo cell?",
        options: ["0V", "1.5V", "3.0V", "5V"],
        correctIndex: 2,
        explanation: "Below 3.0V, internal chemistry degrades, posing a fire risk."
      },
      {
        question: "Where should you charge LiPos?",
        options: ["On the bed", "In a fireproof bag/container", "In the sun", "In a pocket"],
        correctIndex: 1,
        explanation: "To contain flames in the rare event of a malfunction."
      },
      {
        question: "What is 'Storage Mode'?",
        options: ["Full charge", "Empty", "~3.8V per cell", "Frozen"],
        correctIndex: 2,
        explanation: "3.8V is the stable chemical state for long-term storage."
      }
    ]
  },

  // --- Module 5: Advanced ---
  
  "m5-kinematics": {
    id: "m5-kinematics",
    title: "Robot Kinematics",
    nextLessonId: "m5-pid",
    content: `
# Math of Movement
**Kinematics** is the geometry of motion.

### Forward Kinematics (FK)
"I set my motor angles to 30° and 45°. Where is my robot hand?"
*   Easy math (Trigonometry).

### Inverse Kinematics (IK)
"I want my hand at (x:10, y:20). What angles do I need?"
*   Hard math. Often has multiple solutions (Elbow up vs Elbow down).

### Differential Drive
For 2-wheeled robots:
*   Move straight: Left Speed = Right Speed.
*   Turn: Left Speed != Right Speed.
*   Spin: Left Forward, Right Backward.
    `,
    quiz: [
      {
        question: "Inverse Kinematics solves for...",
        options: ["End position", "Joint angles", "Battery life", "Speed"],
        correctIndex: 1,
        explanation: "It calculates required joint angles to reach a target coordinate."
      },
      {
        question: "If Left Wheel = Forward and Right Wheel = Backward, the robot...",
        options: ["Moves Forward", "Stops", "Spins in place", "Jumps"],
        correctIndex: 2,
        explanation: "This is a zero-radius turn."
      },
      {
        question: "Which is harder to calculate?",
        options: ["Forward Kinematics", "Inverse Kinematics", "Addition", "Subtraction"],
        correctIndex: 1,
        explanation: "IK is non-linear and computationally expensive."
      }
    ]
  },

  "m5-pid": {
    id: "m5-pid",
    title: "PID Control Theory",
    nextLessonId: "m5-vision",
    content: `
# Smooth Control
How does a line follower stay *exactly* on the line?

**PID**: Proportional, Integral, Derivative.
Error = Target - Actual.

1.  **P (Proportional)**: "Steer towards the line." (Big error = Big turn). *Oscillates.*
2.  **D (Derivative)**: "Don't turn too fast!" (Dampening). *Stops wobble.*
3.  **I (Integral)**: "Accumulate small errors." (Fixes steady-state drift).

Output = (P * Error) + (I * sumError) + (D * changeError).
    `,
    quiz: [
      {
        question: "Which term reduces oscillation/wobble?",
        options: ["P", "I", "D", "None"],
        correctIndex: 2,
        explanation: "The Derivative term predicts future error based on speed of change and counteracts it."
      },
      {
        question: "If Error is 0, what is the P output?",
        options: ["0", "100", "Infinite", "Negative"],
        correctIndex: 0,
        explanation: "P is directly proportional to error. No error, no P action."
      },
      {
        question: "What does PID stand for?",
        options: ["Power, Input, Drive", "Proportional, Integral, Derivative", "Position, Index, Distance", "Program, Integer, Data"],
        correctIndex: 1,
        explanation: "The three mathematical terms in the control loop."
      }
    ]
  },

  "m5-vision": {
    id: "m5-vision",
    title: "Computer Vision Basics",
    nextLessonId: "m6-planning",
    content: `
# Robot Sight
Cameras see a grid of pixels (Red, Green, Blue).

### Image Processing
1.  **Thresholding**: "Turn everything strictly Black or White." Good for line following.
2.  **Color Blob Detection**: "Find the biggest red patch." Good for ball tracking.
3.  **Edge Detection**: Finding outlines of objects.

### Hardware
Arduino is usually too slow for video. We use:
*   **PixyCam**: Does color tracking on a separate chip.
*   **Raspberry Pi / Jetson**: Full computers for OpenCV.
*   **ESP32-CAM**: Basic streaming and still photos.
    `,
    quiz: [
      {
        question: "An image is made of...",
        options: ["Waves", "Pixels", "Vectors", "Magic"],
        correctIndex: 1,
        explanation: "A grid of pixels containing color data."
      },
      {
        question: "Is Arduino Uno good for video processing?",
        options: ["Yes, very fast", "No, too slow/low RAM", "Yes, 4K video", "Only black and white"],
        correctIndex: 1,
        explanation: "Processing images requires megabytes of RAM. Arduino has 2 kilobytes."
      },
      {
        question: "What is Thresholding?",
        options: ["Deleting images", "Converting to binary (B/W)", "Coloring", "Zooming"],
        correctIndex: 1,
        explanation: "Converting grayscale to simple 1-bit Black/White based on a brightness cutoff."
      }
    ]
  },

  // --- Module 6: Capstone ---

  "m6-planning": {
    id: "m6-planning",
    title: "Planning Your Robot",
    nextLessonId: "m6-assembly",
    content: `
# The Capstone: Obstacle Avoiding Robot
We will build a robot that drives freely and avoids walls.

### The Plan
1.  **Chassis**: 2WD Acrylic Kit.
2.  **Brain**: Arduino Uno.
3.  **Eyes**: HC-SR04 Ultrasonic.
4.  **Muscles**: Yellow Gear Motors + L298N Driver.
5.  **Power**: 2x 18650 Li-Ion cells (7.4V).

### Block Diagram
Draw connections before buying parts.
*   Battery -> Switch -> L298N.
*   L298N (5V Out) -> Arduino.
*   Arduino (Pins) -> L298N (Logic).
*   Arduino (Pins) -> Sensor.
    `,
    quiz: [
      {
        question: "What is the first step in building?",
        options: ["Buying parts", "Planning/Block Diagram", "Soldering", "Coding"],
        correctIndex: 1,
        explanation: "Always plan connections and logic before touching hardware."
      },
      {
        question: "What sensor will we use?",
        options: ["Camera", "Lidar", "Ultrasonic", "GPS"],
        correctIndex: 2,
        explanation: "HC-SR04 Ultrasonic sensor is cheap and effective for obstacle avoidance."
      },
      {
        question: "How many motors for a 2WD robot?",
        options: ["1", "2", "4", "6"],
        correctIndex: 1,
        explanation: "Two drive motors plus a caster wheel for balance."
      }
    ]
  },

  "m6-assembly": {
    id: "m6-assembly",
    title: "Assembly & Wiring",
    nextLessonId: "m6-code",
    content: `
# Building It
### 1. Mechanical
*   Peel paper off acrylic.
*   Solder wires to motors.
*   Mount motors and wheels.
*   Mount Caster wheel.

### 2. Wiring L298N
*   **12V In**: To Battery (+).
*   **GND**: To Battery (-) AND Arduino GND.
*   **5V Out**: To Arduino Vin (Powers the Arduino).
*   **ENA/ENB**: Keep jumpers on (Full speed) or remove for PWM speed control.
*   **IN1-IN4**: To Arduino Digital Pins (e.g., 5, 6, 9, 10).

### 3. Sensor
*   VCC -> 5V.
*   GND -> GND.
*   Trig -> Pin 11.
*   Echo -> Pin 12.
    `,
    quiz: [
      {
        question: "Where does the L298N GND go?",
        options: ["Battery only", "Arduino only", "Both (Common Ground)", "Nowhere"],
        correctIndex: 2,
        explanation: "Crucial step: Ground must be shared for signals to work."
      },
      {
        question: "What powers the Arduino in this setup?",
        options: ["USB", "5V output from L298N", "9V Battery", "Solar"],
        correctIndex: 1,
        explanation: "The L298N has a built-in 5V regulator that can power the Arduino via Vin/5V pin."
      },
      {
        question: "What wires should be soldered to the motors?",
        options: ["None", "Red and Black", "USB cable", "Fiber optic"],
        correctIndex: 1,
        explanation: "Standard copper wire to connect to the driver."
      }
    ]
  },

  "m6-code": {
    id: "m6-code",
    title: "Programming Autonomous Behavior",
    nextLessonId: "m6-demo",
    content: `
# The Intelligence
### Logic
\`\`\`cpp
void loop() {
  int distance = readSensor();
  
  if (distance < 20) {
    stop();
    delay(200);
    moveBackward();
    delay(300);
    turnLeft();
    delay(500);
  } else {
    moveForward();
  }
}
\`\`\`

### Functions
Write helper functions: \`void moveForward()\`, \`void turnLeft()\`. This makes the main loop clean and readable.
    `,
    quiz: [
      {
        question: "If distance is less than 20cm, the robot should...",
        options: ["Speed up", "Stop and turn", "Beep", "Shut down"],
        correctIndex: 1,
        explanation: "Avoid collision logic."
      },
      {
        question: "Why use helper functions like moveForward()?",
        options: ["It runs faster", "Readability and reuse", "Required by C++", "Uses less battery"],
        correctIndex: 1,
        explanation: "It abstracts complex pin logic into human-readable actions."
      },
      {
        question: "What happens in the 'else' block?",
        options: ["Robot stops", "Robot turns", "Robot moves forward", "Robot explodes"],
        correctIndex: 2,
        explanation: "If no obstacle is seen (distance > 20), keep driving."
      }
    ]
  },

  "m6-demo": {
    id: "m6-demo",
    title: "Final Test & Demo",
    nextLessonId: undefined,
    content: `
# It's Alive!
### Calibration
*   **Does it drive straight?** If one motor is faster, use PWM to slow it down.
*   **Does it see walls?** Use Serial Monitor to check sensor distance values.
*   **Does it turn enough?** Adjust the \`delay()\` in your turn function.

### Troubleshooting
*   **Robot resets when moving?** Batteries are dead or too weak (Brownout).
*   **Wheels spin wrong way?** Swap the red/black wires on the motor driver.
*   **Sensor reads 0?** Check wiring.

Congratulations! You are now a Robotics Engineer.
    `,
    quiz: [
      {
        question: "If the robot resets every time it starts moving, what is likely wrong?",
        options: ["Code error", "Brownout / Low Battery", "Too much light", "Wire too long"],
        correctIndex: 1,
        explanation: "Voltage drop from motor surge resets the Arduino."
      },
      {
        question: "If the robot turns right instead of left...",
        options: ["Rewrite code or swap motor wires", "Buy new motors", "Change batteries", "Use a bigger chassis"],
        correctIndex: 0,
        explanation: "Simple polarity swap fix."
      },
      {
        question: "What is the next step after this course?",
        options: ["Quit", "Build something new!", "Sleep", "Forget everything"],
        correctIndex: 1,
        explanation: "Engineering is a lifelong journey. Build a drone next!"
      }
    ]
  }
};
