const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color for the cube
const cubeg = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeg, cubeMaterial);
cube.position.set(0, 1, 0); // Start the cube on the big platform

const bigPlatformMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color for the big platform
const bigPlatformg = new THREE.BoxGeometry(50, 1, 50);
const bigPlatform = new THREE.Mesh(bigPlatformg, bigPlatformMaterial);
bigPlatform.position.y = -0.5;
scene.add(bigPlatform);

const smallPlatformMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue color for small platforms
const spikeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for spikes
const zombieMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color for zombies

// Level data
    const levels = [
        // Level 1
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 0, z: 0 },
                { x: 30, y: 0, z: 0 }
            ],
            finishLine: { x: 40, y: 0, z: 0 },
            spikes: [],
            zombies: []
        },
        // Level 2
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 5 },
                { x: 30, y: 2, z: 0 },
                { x: 40, y: 3, z: -5 }
            ],
            finishLine: { x: 50, y: 3, z: 0 },
            spikes: [{ x: 15, y: 0.5, z: 0 }],
            zombies: []
        },
        // Level 3
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: -5 },
                { x: 30, y: 2, z: 5 },
                { x: 40, y: 3, z: 0 },
                { x: 50, y: 4, z: -5 }
            ],
            finishLine: { x: 60, y: 4, z: 0 },
            spikes: [
                { x: 15, y: 0.5, z: 0 },
                { x: 35, y: 2.5, z: 5 }
            ],
            zombies: [{ x: 25, y: 1.5, z: -5 }]
        },
        // Level 4
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 5 },
                { x: 30, y: 2, z: -5 },
                { x: 40, y: 3, z: 5 },
                { x: 50, y: 4, z: -5 },
                { x: 60, y: 5, z: 0 }
            ],
            finishLine: { x: 70, y: 5, z: 0 },
            spikes: [
                { x: 15, y: 0.5, z: 0 },
                { x: 35, y: 2.5, z: -5 },
                { x: 55, y: 4.5, z: -5 }
            ],
            zombies: [
                { x: 25, y: 1.5, z: 5 },
                { x: 45, y: 3.5, z: 5 }
            ]
        },
        // Level 5
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 10 },
                { x: 30, y: 2, z: 20 },
                { x: 40, y: 3, z: 30 },
                { x: 50, y: 4, z: 40 }
            ],
            finishLine: { x: 60, y: 4, z: 50 },
            spikes: [
                { x: 15, y: 0.5, z: 5 },
                { x: 35, y: 2.5, z: 15 },
                { x: 55, y: 4.5, z: 25 }
            ],
            zombies: [
                { x: 20, y: 1, z: 10 },
                { x: 30, y: 2, z: 20 },
                { x: 40, y: 3, z: 30 }
            ]
        },
        // Level 6
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: -10 },
                { x: 30, y: 2, z: -20 },
                { x: 40, y: 3, z: -30 },
                { x: 50, y: 4, z: -40 },
                { x: 60, y: 5, z: -50 }
            ],
            finishLine: { x: 70, y: 5, z: -60 },
            spikes: [
                { x: 15, y: 0.5, z: -5 },
                { x: 35, y: 2.5, z: -15 },
                { x: 55, y: 4.5, z: -25 }
            ],
            zombies: [
                { x: 20, y: 1, z: -10 },
                { x: 30, y: 2, z: -20 },
                { x: 40, y: 3, z: -30 }
            ]
        },
        // Level 7
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 5 },
                { x: 30, y: 2, z: 10 },
                { x: 40, y: 3, z: 5 },
                { x: 50, y: 4, z: 0 },
                { x: 60, y: 5, z: -5 },
                { x: 70, y: 6, z: -10 }
            ],
            finishLine: { x: 80, y: 6, z: -15 },
            spikes: [
                { x: 15, y: 0.5, z: 2.5 },
                { x: 35, y: 2.5, z: 7.5 },
                { x: 55, y: 4.5, z: -2.5 },
                { x: 75, y: 6.5, z: -12.5 }
            ],
            zombies: [
                { x: 25, y: 1.5, z: 7.5 },
                { x: 45, y: 3.5, z: 2.5 },
                { x: 65, y: 5.5, z: -7.5 }
            ]
        },
        // Level 8
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 10 },
                { x: 30, y: 2, z: 20 },
                { x: 40, y: 3, z: 30 },
                { x: 50, y: 4, z: 40 },
                { x: 60, y: 5, z: 50 },
                { x: 70, y: 6, z: 60 },
                { x: 80, y: 7, z: 70 }
            ],
            finishLine: { x: 90, y: 7, z: 80 },
            spikes: [
                { x: 15, y: 0.5, z: 5 },
                { x: 35, y: 2.5, z: 25 },
                { x: 55, y: 4.5, z: 45 },
                { x: 75, y: 6.5, z: 65 }
            ],
            zombies: [
                { x: 25, y: 1.5, z: 15 },
                { x: 45, y: 3.5, z: 35 },
                { x: 65, y: 5.5, z: 55 },
                { x: 85, y: 7.5, z: 75 }
            ]
        },
        // Level 9
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: -10 },
                { x: 30, y: 2, z: -20 },
                { x: 40, y: 3, z: -30 },
                { x: 50, y: 4, z: -20 },
                { x: 60, y: 5, z: -10 },
                { x: 70, y: 6, z: 0 },
                { x: 80, y: 7, z: 10 }
            ],
            finishLine: { x: 90, y: 7, z: 20 },
            spikes: [
                { x: 15, y: 0.5, z: -5 },
                { x: 35, y: 2.5, z: -25 },
                { x: 55, y: 4.5, z: -15 },
                { x: 75, y: 6.5, z: 5 }
            ],
            zombies: [
                { x: 25, y: 1.5, z: -15 },
                { x: 45, y: 3.5, z: -25 },
                { x: 65, y: 5.5, z: -5 },
                { x: 85, y: 7.5, z: 15 }
            ]
        },
        // Level 10
        {
            platforms: [
                { x: 10, y: 0, z: 0 },
                { x: 20, y: 1, z: 5 },
                { x: 30, y: 2, z: 10 },
                { x: 40, y: 3, z: 15 },
                { x: 50, y: 4, z: 20 },
                { x: 60, y: 5, z: 25 },
                { x: 70, y: 6, z: 30 },
                { x: 80, y: 7, z: 35 },
                { x: 90, y: 8, z: 40 }
        ]
    },
    // Level 11
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: -5 },
            { x: 30, y: 2, z: -10 },
            { x: 40, y: 3, z: -15 },
            { x: 50, y: 4, z: -10 },
            { x: 60, y: 5, z: -5 },
            { x: 70, y: 6, z: 0 },
            { x: 80, y: 7, z: 5 },
            { x: 90, y: 8, z: 10 }
        ],
        finishLine: { x: 100, y: 8, z: 15 },
        spikes: [
            { x: 15, y: 0.5, z: -2.5 },
            { x: 35, y: 2.5, z: -12.5 },
            { x: 55, y: 4.5, z: -7.5 },
            { x: 75, y: 6.5, z: 2.5 },
            { x: 95, y: 8.5, z: 12.5 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: -7.5 },
            { x: 45, y: 3.5, z: -12.5 },
            { x: 65, y: 5.5, z: -2.5 },
            { x: 85, y: 7.5, z: 7.5 }
        ]
    },
    // Level 12
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: 10 },
            { x: 30, y: 2, z: 20 },
            { x: 40, y: 3, z: 30 },
            { x: 50, y: 4, z: 40 },
            { x: 60, y: 5, z: 50 },
            { x: 70, y: 6, z: 60 },
            { x: 80, y: 7, z: 70 },
            { x: 90, y: 8, z: 80 },
            { x: 100, y: 9, z: 90 }
        ],
        finishLine: { x: 110, y: 9, z: 100 },
        spikes: [
            { x: 15, y: 0.5, z: 5 },
            { x: 35, y: 2.5, z: 25 },
            { x: 55, y: 4.5, z: 45 },
            { x: 75, y: 6.5, z: 65 },
            { x: 95, y: 8.5, z: 85 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: 15 },
            { x: 45, y: 3.5, z: 35 },
            { x: 65, y: 5.5, z: 55 },
            { x: 85, y: 7.5, z: 75 },
            { x: 105, y: 9.5, z: 95 }
        ]
    },
    // Level 13
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: -10 },
            { x: 30, y: 2, z: -20 },
            { x: 40, y: 3, z: -30 },
            { x: 50, y: 4, z: -40 },
            { x: 60, y: 5, z: -50 },
            { x: 70, y: 6, z: -60 },
            { x: 80, y: 7, z: -70 },
            { x: 90, y: 8, z: -80 },
            { x: 100, y: 9, z: -90 }
        ],
        finishLine: { x: 110, y: 9, z: -100 },
        spikes: [
            { x: 15, y: 0.5, z: -5 },
            { x: 35, y: 2.5, z: -25 },
            { x: 55, y: 4.5, z: -45 },
            { x: 75, y: 6.5, z: -65 },
            { x: 95, y: 8.5, z: -85 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: -15 },
            { x: 45, y: 3.5, z: -35 },
            { x: 65, y: 5.5, z: -55 },
            { x: 85, y: 7.5, z: -75 },
            { x: 105, y: 9.5, z: -95 }
        ]
    },
    // Level 14
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: 10 },
            { x: 30, y: 0, z: 20 },
            { x: 40, y: 1, z: 30 },
            { x: 50, y: 0, z: 40 },
            { x: 60, y: 1, z: 50 },
            { x: 70, y: 0, z: 60 },
            { x: 80, y: 1, z: 70 },
            { x: 90, y: 0, z: 80 },
            { x: 100, y: 1, z: 90 }
        ],
        finishLine: { x: 110, y: 1, z: 100 },
        spikes: [
            { x: 15, y: 0.5, z: 5 },
            { x: 35, y: 0.5, z: 25 },
            { x: 55, y: 0.5, z: 45 },
            { x: 75, y: 0.5, z: 65 },
            { x: 95, y: 0.5, z: 85 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: 15 },
            { x: 45, y: 1.5, z: 35 },
            { x: 65, y: 1.5, z: 55 },
            { x: 85, y: 1.5, z: 75 },
            { x: 105, y: 1.5, z: 95 }
        ]
    },
    // Level 15
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: -5 },
            { x: 30, y: 2, z: 0 },
            { x: 40, y: 3, z: 5 },
            { x: 50, y: 4, z: 0 },
            { x: 60, y: 5, z: -5 },
            { x: 70, y: 6, z: 0 },
            { x: 80, y: 7, z: 5 },
            { x: 90, y: 8, z: 0 },
            { x: 100, y: 9, z: -5 }
        ],
        finishLine: { x: 110, y: 10, z: 0 },
        spikes: [
            { x: 15, y: 0.5, z: -2.5 },
            { x: 35, y: 2.5, z: 2.5 },
            { x: 55, y: 4.5, z: -2.5 },
            { x: 75, y: 6.5, z: 2.5 },
            { x: 95, y: 8.5, z: -2.5 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: -2.5 },
            { x: 45, y: 3.5, z: 2.5 },
            { x: 65, y: 5.5, z: -2.5 },
            { x: 85, y: 7.5, z: 2.5 },
            { x: 105, y: 9.5, z: -2.5 }
        ]
    },
    // Level 16
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: 10 },
            { x: 30, y: 2, z: 20 },
            { x: 40, y: 3, z: 30 },
            { x: 50, y: 4, z: 40 },
            { x: 60, y: 5, z: 50 },
            { x: 70, y: 6, z: 60 },
            { x: 80, y: 7, z: 70 },
            { x: 90, y: 8, z: 80 },
            { x: 100, y: 9, z: 90 },
            { x: 110, y: 10, z: 100 }
        ],
        finishLine: { x: 120, y: 10, z: 110 },
        spikes: [
            { x: 15, y: 0.5, z: 5 },
            { x: 35, y: 2.5, z: 25 },
            { x: 55, y: 4.5, z: 45 },
            { x: 75, y: 6.5, z: 65 },
            { x: 95, y: 8.5, z: 85 },
            { x: 115, y: 10.5, z: 105 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: 15 },
            { x: 45, y: 3.5, z: 35 },
            { x: 65, y: 5.5, z: 55 },
            { x: 85, y: 7.5, z: 75 },
            { x: 105, y: 9.5, z: 95 }
        ]
    },
    // Level 17
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: -10 },
            { x: 30, y: 2, z: -20 },
            { x: 40, y: 3, z: -30 },
            { x: 50, y: 4, z: -40 },
            { x: 60, y: 5, z: -50 },
            { x: 70, y: 6, z: -60 },
            { x: 80, y: 7, z: -70 },
            { x: 90, y: 8, z: -80 },
            { x: 100, y: 9, z: -90 },
            { x: 110, y: 10, z: -100 }
        ],
        finishLine: { x: 120, y: 10, z: -110 },
        spikes: [
            { x: 15, y: 0.5, z: -5 },
            { x: 35, y: 2.5, z: -25 },
            { x: 55, y: 4.5, z: -45 },
            { x: 75, y: 6.5, z: -65 },
            { x: 95, y: 8.5, z: -85 },
            { x: 115, y: 10.5, z: -105 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: -15 },
            { x: 45, y: 3.5, z: -35 },
            { x: 65, y: 5.5, z: -55 },
            { x: 85, y: 7.5, z: -75 },
            { x: 105, y: 9.5, z: -95 }
        ]
    },
    // Level 18
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: 5 },
            { x: 30, y: 2, z: 10 },
            { x: 40, y: 3, z: 15 },
            { x: 50, y: 4, z: 20 },
            { x: 60, y: 5, z: 25 },
            { x: 70, y: 6, z: 30 },
            { x: 80, y: 7, z: 35 },
            { x: 90, y: 8, z: 40 },
            { x: 100, y: 9, z: 45 },
            { x: 110, y: 10, z: 50 },
            { x: 120, y: 11, z: 55 }
        ],
        finishLine: { x: 130, y: 11, z: 60 },
        spikes: [
            { x: 15, y: 0.5, z: 2.5 },
            { x: 35, y: 2.5, z: 12.5 },
            { x: 55, y: 4.5, z: 22.5 },
            { x: 75, y: 6.5, z: 32.5 },
            { x: 95, y: 8.5, z: 42.5 },
            { x: 115, y: 10.5, z: 52.5 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: 7.5 },
            { x: 45, y: 3.5, z: 17.5 },
            { x: 65, y: 5.5, z: 27.5 },
            { x: 85, y: 7.5, z: 37.5 },
            { x: 105, y: 9.5, z: 47.5 },
            { x: 125, y: 11.5, z: 57.5 }
        ]
    },
    // Level 19
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: -5 },
            { x: 30, y: 2, z: -10 },
            { x: 40, y: 3, z: -15 },
            { x: 50, y: 4, z: -20 },
            { x: 60, y: 5, z: -25 },
            { x: 70, y: 6, z: -30 },
            { x: 80, y: 7, z: -35 },
            { x: 90, y: 8, z: -40 },
            { x: 100, y: 9, z: -45 },
            { x: 110, y: 10, z: -50 },
            { x: 120, y: 11, z: -55 }
        ],
        finishLine: { x: 130, y: 11, z: -60 },
        spikes: [
            { x: 15, y: 0.5, z: -2.5 },
            { x: 35, y: 2.5, z: -12.5 },
            { x: 55, y: 4.5, z: -22.5 },
            { x: 75, y: 6.5, z: -32.5 },
            { x: 95, y: 8.5, z: -42.5 },
            { x: 115, y: 10.5, z: -52.5 }
        ],
        zombies: [
            { x: 25, y: 1.5, z: -7.5 },
            { x: 45, y: 3.5, z: -17.5 },
            { x: 65, y: 5.5, z: -27.5 },
            { x: 85, y: 7.5, z: -37.5 },
            { x: 105, y: 9.5, z: -47.5 },
            { x: 125, y: 11.5, z: -57.5 }
        ]
    },
    // Level 20
    {
        platforms: [
            { x: 10, y: 0, z: 0 },
            { x: 20, y: 1, z: 10 },
            { x: 30, y: 2, z: 20 },
            { x: 40, y: 3, z: 30 },
            { x: 50, y: 4, z: 40 },
            { x: 60, y: 5, z: 50 },
            { x: 70, y: 6, z: 60 },
            { x: 80, y: 7, z: 70 },
            { x: 90, y: 8, z: 80 },
            { x: 100, y: 9, z: 90 },
            { x: 110, y: 10, z: 100 },
            { x: 120, y: 11, z: 110 },
            { x: 130, y: 12, z: 120 }
        ],
        finishLine: { x: 140, y: 12, z: 130 },
        spikes: [
            { x: 15, y: 0.5, z: 5 },
            { x: 35, y: 2.5, z: 25 },
            { x: 55, y: 4.5, z: 45 },
            { x: 75, y: 6.5, z: 65 },
            { x: 95, y: 8.5, z: 85 },
            { x: 115, y: 10.5, z: 105 },
            { x: 120, y: 15.5, z: 110 }
        ]
    }
];

let currentLevel = 0;
let smallPlatforms = [];
let spikes = [];
let zombies = [];
let finishLine;
let isGameOver = false;

function createLevel(levelData) {
    // Remove existing small platforms, spikes, zombies, and finish line
    smallPlatforms.forEach(platform => scene.remove(platform));
    spikes.forEach(spike => scene.remove(spike));
    zombies.forEach(zombie => scene.remove(zombie));
    if (finishLine) scene.remove(finishLine);
    
    smallPlatforms = [];
    spikes = [];
    zombies = [];

    // Create new small platforms
    levelData.platforms.forEach((pos) => {
        const smallPlatformg = new THREE.BoxGeometry(3, 0.5, 3);
        const smallPlatform = new THREE.Mesh(smallPlatformg, smallPlatformMaterial);
        smallPlatform.position.set(pos.x, pos.y, pos.z);
        smallPlatforms.push(smallPlatform);
        scene.add(smallPlatform);
    });

    // Create new spikes
    levelData.spikes.forEach((pos) => {
        const spikeg = new THREE.ConeGeometry(0.5, 1, 4);
        const spike = new THREE.Mesh(spikeg, spikeMaterial);
        spike.position.set(pos.x, pos.y, pos.z);
        spikes.push(spike);
        scene.add(spike);
    });

    // Create new zombies
    levelData.zombies.forEach((pos) => {
        const zombieg = new THREE.BoxGeometry(1, 2, 1);
        const zombie = new THREE.Mesh(zombieg, zombieMaterial);
        zombie.position.set(pos.x, pos.y, pos.z);
        zombies.push(zombie);
        scene.add(zombie);
    });

    // Create new finish line
    const finishLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const finishLineg = new THREE.BoxGeometry(3, 0.5, 3);
    finishLine = new THREE.Mesh(finishLineg, finishLineMaterial);
    finishLine.position.set(levelData.finishLine.x, levelData.finishLine.y, levelData.finishLine.z);
    scene.add(finishLine);

    // Reset cube position
    cube.position.set(0, 1, 0);
}

createLevel(levels[currentLevel]);
scene.add(cube);

// Position the camera
camera.position.set(0, 10, 30);
camera.lookAt(cube.position);

// Create level display
const levelDisplay = document.createElement('div');
levelDisplay.style.position = 'absolute';
levelDisplay.style.top = '10px';
levelDisplay.style.left = '10px';
levelDisplay.style.color = 'white';
levelDisplay.style.fontSize = '24px';
levelDisplay.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(levelDisplay);

function updateLevelDisplay() {
    levelDisplay.textContent = `Level: ${currentLevel + 1}`;
}

updateLevelDisplay();

// Object to keep track of which keys are pressed
const keysPressed = {};

// Variables for jumping and gravity
let isJumping = false;
let verticalVelocity = 0;
let gravity = -0.015;
let jumpForce = 0.3;
let moveSpeed = 0.5; // Increased move speed
let rotateSpeed = 0.1; // Increased rotate speed

// Function to handle key down events
function onDocumentKeyDown(event) {
    if (!isGameOver) {
        keysPressed[event.key] = true;
        if (event.key === ' ' && !isJumping) {
            verticalVelocity = jumpForce;
            isJumping = true;
        }
    }
}

// Function to handle key up events
function onDocumentKeyUp(event) {
    if (!isGameOver) {
        keysPressed[event.key] = false;
    }
}

// Add event listeners for keydown and keyup
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

// Game over logic
function checkGameOver() {
    if (cube.position.y < -10) {
        document.getElementById('gameOverScreen').style.display = 'block';
        isGameOver = true;
        cancelAnimationFrame(animationId);
    }
}

// Collision logic for spikes and zombies
function checkObstacleCollision() {
    for (let spike of spikes) {
        if (cube.position.distanceTo(spike.position) < 1) {
            document.getElementById('gameOverScreen').style.display = 'block';
            isGameOver = true;
            cancelAnimationFrame(animationId);
        }
    }

    for (let zombie of zombies) {
        if (cube.position.distanceTo(zombie.position) < 1) {
            document.getElementById('gameOverScreen').style.display = 'block';
            isGameOver = true;
            cancelAnimationFrame(animationId);
        }
    }
}

// Finish line logic
function checkFinishLine() {
    if (cube.position.distanceTo(finishLine.position) < 1.5) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            createLevel(levels[currentLevel]);
            updateLevelDisplay();
        } else {
            alert("Congratulations! You've completed all levels!");
            resetGame();
        }
    }
}

// Reset game
function resetGame() {
    createLevel(levels[currentLevel]); 
    updateLevelDisplay();
    cube.position.set(0, 1, 0);
    cube.rotation.set(0, 0, 0);
    verticalVelocity = 0;
    isJumping = false;
    rotateSpeed = 0.1;
    moveSpeed = 0.5;
    isGameOver = false;
    document.getElementById('gameOverScreen').style.display = 'none';
    animate();
}

document.getElementById('tryAgainButton').addEventListener('click', resetGame);

// Function to check collision with platforms
function checkPlatformCollision() {
    // Check collision with big platform
    if (cube.position.y - 0.5 <= bigPlatform.position.y + 0.5 &&
        cube.position.y + 0.5 >= bigPlatform.position.y - 0.5 &&
        Math.abs(cube.position.x) <= 25 &&
        Math.abs(cube.position.z) <= 25) {
        return bigPlatform;
    }

    // Check collision with small platforms
    for (let platform of smallPlatforms) {
        if (cube.position.y - 0.5 <= platform.position.y + 0.25 &&
            cube.position.y + 0.5 >= platform.position.y - 0.25 &&
            Math.abs(cube.position.x - platform.position.x) <= 1.5 &&
            Math.abs(cube.position.z - platform.position.z) <= 1.5) {
            return platform;
        }
    }
    return null;
}

// Function to move zombies towards the player
function moveZombies() {
    zombies.forEach(zombie => {
        const direction = new THREE.Vector3();
        direction.subVectors(cube.position, zombie.position).normalize();
        zombie.position.add(direction.multiplyScalar(0.02)); // Adjust speed as needed
    });
}

// --- NEW CODE FOR RESIZING STARTS HERE ---

/**
 * Handles adjusting the Three.js camera and renderer size 
 * whenever the browser window is resized.
 */
function onWindowResize() {
    // 1. Update the camera's aspect ratio based on the new window dimensions
    camera.aspect = window.innerWidth / window.innerHeight;
    
    // 2. Recalculate the projection matrix for the aspect ratio change to take effect
    camera.updateProjectionMatrix();
    
    // 3. Update the renderer's size to match the new window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Attach the resize handler to the window's 'resize' event
window.addEventListener('resize', onWindowResize);

// --- NEW CODE FOR RESIZING ENDS HERE ---


let animationId;
function animate() {
    // Move the cube
    if (keysPressed['w']) {
        cube.position.z += moveSpeed * Math.cos(cube.rotation.y);
        cube.position.x += moveSpeed * Math.sin(cube.rotation.y);
    }
    if (keysPressed['s']) {
        cube.position.z -= moveSpeed * Math.cos(cube.rotation.y);
        cube.position.x -= moveSpeed * Math.sin(cube.rotation.y);
    }
    if (keysPressed['a']) {
        cube.position.x += moveSpeed * Math.cos(cube.rotation.y);
        cube.position.z -= moveSpeed * Math.sin(cube.rotation.y);
    }
    if (keysPressed['d']) {
        cube.position.x -= moveSpeed * Math.cos(cube.rotation.y);
        cube.position.z += moveSpeed * Math.sin(cube.rotation.y);
    }
    if (keysPressed['ArrowLeft']) {
        cube.rotation.y += 0.05;
    }
    if (keysPressed['ArrowRight']) {
        cube.rotation.y -= 0.05;
    }

    // Apply gravity
    verticalVelocity += gravity;
    cube.position.y += verticalVelocity;

    // Check for platform collision
    const collidedPlatform = checkPlatformCollision();
    if (collidedPlatform) {
        cube.position.y = collidedPlatform.position.y + (collidedPlatform === bigPlatform ? 1 : 0.75); // Place cube on top of platform
        verticalVelocity = 0;
        isJumping = false;
    }

    // Move zombies
    moveZombies();

    // Update camera position
    camera.position.x = cube.position.x - 10 * Math.sin(cube.rotation.y);
    camera.position.y = cube.position.y + 10;
    camera.position.z = cube.position.z - 10 * Math.cos(cube.rotation.y);
    camera.lookAt(cube.position);

    checkGameOver();
    checkObstacleCollision();
    checkFinishLine();
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


