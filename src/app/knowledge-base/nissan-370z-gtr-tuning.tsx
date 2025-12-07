import TuningCTA from '@/components/knowledge-base/TuningCTA';

export const metadata = {
  title: 'Nissan 370Z, 400Z & GT-R Tuning Guide | VQ37VHR, VR30DDTT, VR38DETT',
  author: 'RC Performance',
  date: '2024-01-15',
  excerpt: 'Complete tuning guide for Nissan 370Z, 400Z, and GT-R. UpRev, EcuTek, COBB for VQ and VR engines.',
  category: 'JDM',
  tags: ['370Z', '400Z', 'GT-R', 'VQ37', 'VR30', 'VR38', 'UpRev', 'EcuTek'],
};

export default function NissanTuning() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Nissan 370Z, 400Z & GT-R Tuning Guide</h1>

      <p className="lead">
        Nissan's performance lineup spans from the naturally aspirated VQ37 in the 370Z to the
        legendary twin-turbo VR38 in the GT-R. Each platform has unique tuning characteristics
        and specialized tools for maximizing performance.
      </p>

      <TuningCTA vehicleName="Nissan Z/GT-R" variant="compact" />

      <h2>Nissan 370Z (2009-2020)</h2>

      <h3>VQ37VHR 3.7L V6</h3>
      <ul>
        <li><strong>Power:</strong> 332-350 HP / 270-276 lb-ft</li>
        <li><strong>Technology:</strong> VVEL (Variable Valve Event and Lift)</li>
        <li><strong>Redline:</strong> 7,500 RPM</li>
        <li><strong>Transmission:</strong> 6-speed manual or 7-speed automatic</li>
      </ul>

      <h3>370Z Tuning Platforms</h3>

      <h4>UpRev (Recommended)</h4>
      <p>UpRev has been the gold standard for Nissan tuning:</p>
      <ul>
        <li>Full ECU reflash capability</li>
        <li>VVEL optimization</li>
        <li>Rev limiter adjustment</li>
        <li>Speed limiter removal</li>
        <li>Dyno-proven calibrations</li>
        <li>Custom tune support</li>
      </ul>

      <h4>EcuTek</h4>
      <ul>
        <li>RaceROM features (launch control, flat foot)</li>
        <li>Full calibration access</li>
        <li>Bluetooth logging</li>
        <li>Professional tuner network</li>
      </ul>

      <h3>370Z Tuning Gains</h3>
      <h4>Naturally Aspirated</h4>
      <ul>
        <li><strong>Tune only:</strong> 10-15 HP (VVEL optimization)</li>
        <li><strong>Headers + tune:</strong> 25-35 HP</li>
        <li><strong>Intake + exhaust + tune:</strong> 30-45 HP</li>
        <li><strong>Full bolt-on:</strong> 360-380 WHP peak</li>
      </ul>

      <h4>Forced Induction</h4>
      <ul>
        <li><strong>Supercharger:</strong> 450-550 HP (Stillen, JWT)</li>
        <li><strong>Twin turbo:</strong> 500-700+ HP</li>
        <li>Requires supporting mods and proper tune</li>
      </ul>

      <h2>Nissan Z (400Z) - 2023+</h2>

      <h3>VR30DDTT 3.0L Twin-Turbo V6</h3>
      <ul>
        <li><strong>Power:</strong> 400 HP / 350 lb-ft</li>
        <li><strong>Technology:</strong> Twin turbochargers, direct injection</li>
        <li><strong>Shared with:</strong> Infiniti Q50/Q60 Red Sport</li>
        <li><strong>Transmission:</strong> 6-speed manual or 9-speed automatic</li>
      </ul>

      <h3>400Z Tuning Platforms</h3>

      <h4>EcuTek (Primary Platform)</h4>
      <ul>
        <li>Full ECU access</li>
        <li>Boost control calibration</li>
        <li>RaceROM features</li>
        <li>Excellent data logging</li>
      </ul>

      <h4>UpRev</h4>
      <ul>
        <li>Support for VR30</li>
        <li>Proven track record with platform</li>
      </ul>

      <h3>400Z Tuning Gains</h3>
      <ul>
        <li><strong>Stage 1 (Tune only):</strong> 440-460 HP</li>
        <li><strong>Stage 2 (Downpipes + tune):</strong> 480-520 HP</li>
        <li><strong>Full bolt-on:</strong> 520-550 HP</li>
        <li><strong>Turbo upgrade potential:</strong> 600+ HP</li>
      </ul>

      <h2>Nissan GT-R (R35)</h2>

      <h3>VR38DETT 3.8L Twin-Turbo V6</h3>
      <ul>
        <li><strong>2009-2011:</strong> 480 HP / 430 lb-ft</li>
        <li><strong>2012-2016:</strong> 545 HP / 463 lb-ft</li>
        <li><strong>2017+:</strong> 565 HP / 467 lb-ft</li>
        <li><strong>NISMO:</strong> 600 HP / 481 lb-ft</li>
        <li><strong>Technology:</strong> Hand-built engines, IHI turbochargers</li>
      </ul>

      <h3>GT-R Tuning Platforms</h3>

      <h4>COBB Accessport (Popular Choice)</h4>
      <ul>
        <li>Proven GT-R platform support</li>
        <li>OTS and custom maps</li>
        <li>Launch control optimization</li>
        <li>TCM (transmission) tuning</li>
        <li>Data logging capabilities</li>
      </ul>

      <h4>EcuTek</h4>
      <ul>
        <li>Comprehensive ECU and TCM access</li>
        <li>RaceROM features</li>
        <li>Professional tuner preferred</li>
        <li>Detailed calibration control</li>
      </ul>

      <h4>MoTeC/AEM</h4>
      <ul>
        <li>Standalone ECU for big power builds</li>
        <li>Used on 1500+ HP applications</li>
        <li>Professional installation required</li>
      </ul>

      <h3>GT-R Tuning Gains</h3>

      <h4>Stock Turbos</h4>
      <ul>
        <li><strong>Stage 1 (Tune):</strong> 550-580 HP</li>
        <li><strong>Stage 2 (Bolt-ons + tune):</strong> 600-650 HP</li>
        <li><strong>Stage 3 (Full bolt-on):</strong> 650-700 HP</li>
        <li><strong>E85:</strong> Add 50-80 HP to above figures</li>
      </ul>

      <h4>Turbo Upgrade</h4>
      <ul>
        <li><strong>Bolt-on turbos:</strong> 750-850 HP</li>
        <li><strong>GT-R specific kits:</strong> 900-1200 HP</li>
        <li><strong>Built motor:</strong> 1500+ HP achievable</li>
        <li>Popular kits: ETS, AMS, T1</li>
      </ul>

      <h2>GT-R-Specific Considerations</h2>

      <h3>GR6 Transmission</h3>
      <p>The GT-R's dual-clutch transmission requires attention:</p>
      <ul>
        <li>TCM tuning essential for increased power</li>
        <li>Clutch wear monitoring important</li>
        <li>Upgraded clutches for 700+ HP</li>
        <li>Launch control calibration</li>
      </ul>

      <h3>ATTESA E-TS AWD</h3>
      <ul>
        <li>AWD controller calibration available</li>
        <li>Front/rear torque split adjustment</li>
        <li>Important for traction optimization</li>
      </ul>

      <h3>Cooling</h3>
      <ul>
        <li>Stock cooling adequate to ~650 HP</li>
        <li>Upgraded intercoolers for higher power</li>
        <li>Transmission cooler recommended</li>
        <li>Differential cooler for track use</li>
      </ul>

      <h2>Common Modifications</h2>

      <h3>370Z</h3>
      <ul>
        <li><strong>Headers:</strong> Biggest NA gain, requires tune</li>
        <li><strong>Intake:</strong> Better throttle response and sound</li>
        <li><strong>Exhaust:</strong> Mostly sound, small power gain</li>
        <li><strong>Plenum spacer:</strong> Improves mid-range</li>
      </ul>

      <h3>400Z</h3>
      <ul>
        <li><strong>Downpipes:</strong> Essential for power gains</li>
        <li><strong>Intercooler:</strong> Reduces heat soak</li>
        <li><strong>Intake:</strong> Improved turbo sound and airflow</li>
        <li><strong>Charge pipes:</strong> Prevent boost leaks</li>
      </ul>

      <h3>GT-R</h3>
      <ul>
        <li><strong>Downpipes:</strong> First bolt-on, significant gain</li>
        <li><strong>Intakes:</strong> Better airflow to turbos</li>
        <li><strong>Intercooler:</strong> Critical for consistent power</li>
        <li><strong>Exhaust:</strong> Reduces backpressure</li>
        <li><strong>Boost controller:</strong> For stock turbo optimization</li>
      </ul>

      <h2>E85 Performance</h2>

      <ul>
        <li><strong>VQ37:</strong> E85 provides significant knock resistance for FI builds</li>
        <li><strong>VR30:</strong> 50-70 HP gain over 93 octane</li>
        <li><strong>VR38:</strong> Essential for big power, 80-100+ HP gain</li>
        <li>Flex fuel systems available for all platforms</li>
      </ul>

      <TuningCTA vehicleName="Nissan Z/GT-R" />
    </article>
  );
}
