import TuningCTA from '@/components/knowledge-base/TuningCTA';

export const metadata = {
  title: 'Mitsubishi Lancer Evolution Tuning Guide | Evo 8, 9, X (4G63, 4B11)',
  author: 'RC Performance',
  date: '2024-01-15',
  excerpt: 'Complete tuning guide for Mitsubishi Lancer Evolution VIII, IX, and X. EcuTek, ECUFlash for 4G63 and 4B11 turbo engines.',
  category: 'JDM',
  tags: ['Evo', 'Evolution', '4G63', '4B11', 'EcuTek', 'Mitsubishi', 'AYC'],
};

export default function MitsubishiEvoTuning() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Mitsubishi Lancer Evolution Tuning Guide</h1>

      <p className="lead">
        The Mitsubishi Lancer Evolution is one of the most iconic JDM performance platforms ever built.
        From the legendary 4G63 in the Evo 8/9 to the modern 4B11 in the Evo X, these turbocharged
        AWD machines have incredible tuning potential.
      </p>

      <TuningCTA vehicleName="Evo" variant="compact" />

      <h2>Evolution Overview</h2>

      <h3>Evo VIII (2003-2005)</h3>
      <ul>
        <li><strong>Engine:</strong> 4G63 2.0L Turbo (271 HP / 273 lb-ft)</li>
        <li><strong>Turbo:</strong> TD05H-16G6-10.5T</li>
        <li><strong>Transmission:</strong> 5-speed manual</li>
        <li><strong>AWD:</strong> ACD (Active Center Differential)</li>
      </ul>

      <h3>Evo IX (2006-2007)</h3>
      <ul>
        <li><strong>Engine:</strong> 4G63 MIVEC 2.0L Turbo (286 HP / 289 lb-ft)</li>
        <li><strong>Turbo:</strong> TD05HRA-16G6-10.5T</li>
        <li><strong>Improvements:</strong> MIVEC variable valve timing</li>
        <li><strong>AWD:</strong> ACD + Super AYC</li>
      </ul>

      <h3>Evo X (2008-2015)</h3>
      <ul>
        <li><strong>Engine:</strong> 4B11T 2.0L Turbo (291 HP / 300 lb-ft)</li>
        <li><strong>Turbo:</strong> TD05H-152G6-12T</li>
        <li><strong>Transmission:</strong> 5-speed manual or SST dual-clutch</li>
        <li><strong>AWD:</strong> S-AWC (Super All-Wheel Control)</li>
      </ul>

      <h2>Tuning Platforms</h2>

      <h3>EcuTek (Evo X - Recommended)</h3>
      <p>EcuTek is the primary platform for Evo X:</p>
      <ul>
        <li>Full ECU reflash capability</li>
        <li>RaceROM features (launch control, flat foot)</li>
        <li>Comprehensive table access</li>
        <li>SST transmission calibration</li>
        <li>Professional tuner support</li>
      </ul>

      <h3>ECUFlash/Evoscan (Evo 8/9)</h3>
      <p>Open-source tuning for 4G63 Evos:</p>
      <ul>
        <li>Free tuning software</li>
        <li>Strong community support</li>
        <li>Requires tactrix cable</li>
        <li>XML definition files</li>
        <li>Real-time tuning capable</li>
      </ul>

      <h3>COBB Accessport (Evo X)</h3>
      <ul>
        <li>User-friendly interface</li>
        <li>OTS maps available</li>
        <li>Custom tune support</li>
        <li>Good for simpler builds</li>
      </ul>

      <h3>Standalone ECU</h3>
      <ul>
        <li>AEM Infinity, MoTeC, Link</li>
        <li>Required for extreme builds</li>
        <li>Full engine management control</li>
        <li>Big turbo and fuel system changes</li>
      </ul>

      <h2>Evo 8/9 (4G63) Tuning</h2>

      <h3>Engine Characteristics</h3>
      <p>The 4G63 is legendary for its strength:</p>
      <ul>
        <li>Cast iron block, extremely strong</li>
        <li>Oil squirters for piston cooling</li>
        <li>Stock rods good to ~450 WHP</li>
        <li>MIVEC (Evo 9) adds mid-range</li>
      </ul>

      <h3>Stock Turbo Performance</h3>
      <ul>
        <li><strong>Stage 1:</strong> 300-320 WHP</li>
        <li><strong>Stage 2:</strong> 330-360 WHP</li>
        <li><strong>Full bolt-on:</strong> 360-400 WHP</li>
        <li><strong>Stock turbo max:</strong> ~400 WHP</li>
      </ul>

      <h3>Big Turbo Builds</h3>
      <ul>
        <li><strong>FP Red/Green:</strong> 450-550 WHP</li>
        <li><strong>EFR/GTX:</strong> 550-700 WHP</li>
        <li><strong>Stock block limit:</strong> ~600 WHP (safe)</li>
        <li><strong>Built motor:</strong> 800+ WHP possible</li>
      </ul>

      <h2>Evo X (4B11) Tuning</h2>

      <h3>Engine Characteristics</h3>
      <p>The 4B11 is modern but different from 4G63:</p>
      <ul>
        <li>Aluminum block, lighter than 4G63</li>
        <li>Stronger rods than 4G63</li>
        <li>Known piston weakness at high power</li>
        <li>MIVEC on both cams</li>
      </ul>

      <h3>Stock Turbo Performance</h3>
      <ul>
        <li><strong>Stage 1:</strong> 320-340 WHP</li>
        <li><strong>Stage 2:</strong> 350-380 WHP</li>
        <li><strong>Full bolt-on:</strong> 380-420 WHP</li>
        <li><strong>Stock turbo max:</strong> ~420 WHP</li>
      </ul>

      <h3>Turbo Upgrade</h3>
      <ul>
        <li><strong>Bolt-on turbo:</strong> 450-550 WHP</li>
        <li><strong>Built motor:</strong> 600-800+ WHP</li>
        <li>Pistons are weak link - upgrade recommended above 450 WHP</li>
      </ul>

      <h2>SST Transmission (Evo X)</h2>

      <h3>SST Tuning</h3>
      <p>The dual-clutch SST can be calibrated with EcuTek:</p>
      <ul>
        <li>Shift speed optimization</li>
        <li>Launch control improvement</li>
        <li>Torque limits increased</li>
        <li>S-Sport mode enhancement</li>
      </ul>

      <h3>SST Limitations</h3>
      <ul>
        <li>Clutch packs wear with high power</li>
        <li>~400 WHP limit on stock clutches</li>
        <li>Upgraded clutches available</li>
        <li>Heat management important</li>
      </ul>

      <h2>Critical Modifications</h2>

      <h3>Exhaust (Downpipe)</h3>
      <ul>
        <li>O2 housing + downpipe essential</li>
        <li>3" recommended for power builds</li>
        <li>Wideband O2 for tuning</li>
        <li>20-30 HP gain with tune</li>
      </ul>

      <h3>Intake</h3>
      <ul>
        <li>Stock airbox flows well</li>
        <li>MAF-based tuning requires scaling</li>
        <li>Speed density conversion available</li>
      </ul>

      <h3>Intercooler</h3>
      <ul>
        <li>Stock FMIC inadequate for high power</li>
        <li>Upgraded FMIC essential for Stage 2+</li>
        <li>AMS, ETS, MAP popular options</li>
      </ul>

      <h3>Fuel System</h3>
      <ul>
        <li>Stock fuel pump limits ~400 WHP</li>
        <li>Walbro 255 or AEM pump upgrade</li>
        <li>Larger injectors for big turbo</li>
        <li>E85 requires fuel system upgrade</li>
      </ul>

      <h2>AWD System Tuning</h2>

      <h3>ACD (Active Center Differential)</h3>
      <ul>
        <li>Controls front/rear torque split</li>
        <li>Can be tuned for different characteristics</li>
        <li>Tarmac vs Gravel vs Snow modes</li>
      </ul>

      <h3>AYC/S-AWC</h3>
      <ul>
        <li>Active Yaw Control (rear diff)</li>
        <li>Can transfer torque side-to-side</li>
        <li>AYC pump failure common issue</li>
        <li>AYC delete or pump upgrade options</li>
      </ul>

      <h2>E85 Performance</h2>

      <p>Both 4G63 and 4B11 respond well to E85:</p>
      <ul>
        <li>40-60 WHP gain over 93 octane</li>
        <li>Allows more aggressive timing</li>
        <li>Cooler intake temperatures</li>
        <li>Requires larger injectors</li>
        <li>Fuel pump upgrade recommended</li>
        <li>Flex fuel sensor for automatic blend</li>
      </ul>

      <h2>Known Issues & Solutions</h2>

      <h3>4G63</h3>
      <ul>
        <li><strong>Crankwalk:</strong> Not common on Evo 8/9 (more 1G/2G)</li>
        <li><strong>Oil pump:</strong> Upgrade recommended for high RPM</li>
        <li><strong>Rod stretch:</strong> Above ~500 WHP consider rods</li>
      </ul>

      <h3>4B11</h3>
      <ul>
        <li><strong>Piston ringland:</strong> Weak point above 450 WHP</li>
        <li><strong>Oil consumption:</strong> Some engines consume oil</li>
        <li><strong>Throttle body:</strong> Hesitation issue, tune can help</li>
      </ul>

      <h2>Tuning Tips</h2>

      <ul>
        <li>Use reputable tuner with Evo experience</li>
        <li>Data log every pull</li>
        <li>Monitor knock and timing</li>
        <li>Conservative is better for daily driving</li>
        <li>E-tune works well for Evos with proper logging</li>
      </ul>

      <TuningCTA vehicleName="Evo" />
    </article>
  );
}
