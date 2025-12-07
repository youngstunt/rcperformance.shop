import TuningCTA from '@/components/knowledge-base/TuningCTA';

export const metadata = {
  title: 'Subaru WRX & STI Tuning Guide | EJ257, FA20DIT, FA24',
  author: 'RC Performance',
  date: '2024-01-15',
  excerpt: 'Complete tuning guide for Subaru WRX and STI. COBB Accessport, EcuTek for EJ and FA turbo boxer engines.',
  category: 'JDM',
  tags: ['WRX', 'STI', 'EJ257', 'FA20', 'FA24', 'COBB', 'EcuTek', 'Subaru'],
};

export default function SubaruWRXSTITuning() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Subaru WRX & STI Tuning Guide</h1>

      <p className="lead">
        The Subaru WRX and STI are legendary turbocharged AWD platforms with massive tuning
        communities. From the classic EJ257 to the modern FA24, these boxer engines respond
        exceptionally well to proper ECU calibration with platforms like COBB and EcuTek.
      </p>

      <TuningCTA vehicleName="WRX/STI" variant="compact" />

      <h2>Engine Overview</h2>

      <h3>EJ257 2.5L Turbo (STI: 2004-2021)</h3>
      <ul>
        <li><strong>Power:</strong> 300-310 HP / 290-310 lb-ft</li>
        <li><strong>Technology:</strong> AVCS, IHI VF turbocharger</li>
        <li><strong>Known Issues:</strong> Ringland failure, rod bearing wear</li>
        <li><strong>Tuning Note:</strong> Requires conservative approach</li>
      </ul>

      <h3>FA20DIT 2.0L Turbo (WRX: 2015-2021)</h3>
      <ul>
        <li><strong>Power:</strong> 268 HP / 258 lb-ft</li>
        <li><strong>Technology:</strong> Direct injection, twin-scroll turbo</li>
        <li><strong>Improvements:</strong> Better fuel economy, less rod knock issues</li>
        <li><strong>Tuning Note:</strong> Responds very well, safer than EJ</li>
      </ul>

      <h3>FA24 2.4L Turbo (WRX: 2022+)</h3>
      <ul>
        <li><strong>Power:</strong> 271 HP / 258 lb-ft</li>
        <li><strong>Technology:</strong> Direct injection, improved internals</li>
        <li><strong>Improvements:</strong> Stronger bottom end, better torque curve</li>
        <li><strong>Tuning Note:</strong> Excellent potential, still developing</li>
      </ul>

      <h2>Tuning Platforms</h2>

      <h3>COBB Accessport (Most Popular)</h3>
      <p>COBB is the default choice for Subaru tuning:</p>
      <ul>
        <li>Plug-and-play ECU flash device</li>
        <li>Off-the-shelf maps included</li>
        <li>Custom tune support via protuners</li>
        <li>Data logging and gauges</li>
        <li>Multiple map storage</li>
        <li>Launch control and flat foot shifting</li>
      </ul>

      <h3>EcuTek</h3>
      <p>EcuTek offers more advanced tuning capabilities:</p>
      <ul>
        <li>More table access than COBB</li>
        <li>RaceROM features</li>
        <li>Preferred by many professional tuners</li>
        <li>Better for complex builds</li>
        <li>Wireless data logging</li>
      </ul>

      <h3>OpenSource/RomRaider</h3>
      <ul>
        <li>Free software option</li>
        <li>Requires more technical knowledge</li>
        <li>Good for experienced tuners</li>
        <li>Less user-friendly</li>
      </ul>

      <h2>STI (EJ257) Tuning</h2>

      <h3>Important Considerations</h3>
      <p>
        The EJ257 requires careful tuning due to known weaknesses:
      </p>
      <ul>
        <li>Ringland failure prone with aggressive tuning</li>
        <li>Conservative boost and timing essential</li>
        <li>Quality tune from reputable tuner critical</li>
        <li>Avoid high-torque situations in low RPM</li>
        <li>E85 reduces knock but increases stress</li>
      </ul>

      <h3>Stock Turbo Gains</h3>
      <ul>
        <li><strong>Stage 1 (Tune only):</strong> 300-320 WHP</li>
        <li><strong>Stage 2 (Downpipe + tune):</strong> 330-360 WHP</li>
        <li><strong>Full bolt-on:</strong> 360-380 WHP</li>
        <li><strong>Stock turbo limit:</strong> ~400 WHP</li>
      </ul>

      <h3>Turbo Upgrade Builds</h3>
      <ul>
        <li><strong>Bolt-on turbo (EFR, GTX):</strong> 450-550 WHP</li>
        <li><strong>Built motor:</strong> 600+ WHP possible</li>
        <li><strong>Closed deck block:</strong> Required for 500+ WHP</li>
      </ul>

      <h2>WRX (FA20DIT) Tuning</h2>

      <h3>Tuning Advantages</h3>
      <p>The FA20 is more forgiving than the EJ:</p>
      <ul>
        <li>Direct injection prevents knock better</li>
        <li>Stronger bottom end design</li>
        <li>Better cooling jacket design</li>
        <li>More responsive to tuning</li>
      </ul>

      <h3>Stock Turbo Gains</h3>
      <ul>
        <li><strong>Stage 1 (Tune only):</strong> 290-310 WHP</li>
        <li><strong>Stage 2 (J-pipe + tune):</strong> 320-350 WHP</li>
        <li><strong>Stage 2+:</strong> 350-380 WHP</li>
        <li><strong>Stock turbo limit:</strong> ~350-380 WHP</li>
      </ul>

      <h3>Turbo Upgrade</h3>
      <ul>
        <li><strong>Upgraded turbo:</strong> 400-500 WHP</li>
        <li><strong>Built motor potential:</strong> 600+ WHP</li>
        <li>FA platform handles power well with mods</li>
      </ul>

      <h2>2022+ WRX (FA24) Tuning</h2>

      <h3>Early Tuning Results</h3>
      <ul>
        <li><strong>Stage 1:</strong> 290-310 WHP</li>
        <li><strong>Stage 2:</strong> 330-360 WHP</li>
        <li>Platform still developing</li>
        <li>COBB and EcuTek support available</li>
        <li>Stronger bottom end than FA20</li>
      </ul>

      <h2>Critical Supporting Modifications</h2>

      <h3>J-Pipe/Downpipe</h3>
      <ul>
        <li>Essential for Stage 2+</li>
        <li>Catted options for emissions compliance</li>
        <li>20-40 HP gain with tune</li>
        <li>Improves turbo response significantly</li>
      </ul>

      <h3>Intake</h3>
      <ul>
        <li>Airbox vs cold air intake debate</li>
        <li>COBB SF intake popular choice</li>
        <li>Heat soak concern with some designs</li>
        <li>Requires proper tune calibration</li>
      </ul>

      <h3>Intercooler (TMIC/FMIC)</h3>
      <ul>
        <li>Stock TMIC inadequate for high power</li>
        <li>FMIC best for maximum cooling</li>
        <li>Essential for consistent track power</li>
        <li>Reduces heat soak dramatically</li>
      </ul>

      <h3>Fuel System</h3>
      <ul>
        <li>Stock injectors limit around 400 WHP</li>
        <li>Upgraded fuel pump for E85</li>
        <li>ID1050x or DW injectors popular</li>
        <li>Flex fuel kit for automatic blend detection</li>
      </ul>

      <h2>E85 and Flex Fuel</h2>

      <p>Subaru turbo engines love ethanol:</p>
      <ul>
        <li><strong>EJ257:</strong> 30-50 WHP gain, but increases stress</li>
        <li><strong>FA20:</strong> 40-60 WHP gain, safer platform</li>
        <li><strong>FA24:</strong> Similar gains to FA20</li>
        <li>Flex fuel sensor recommended for street use</li>
        <li>COBB Flex Fuel kit integrates with Accessport</li>
      </ul>

      <h2>Protuning vs OTS Maps</h2>

      <h3>Off-The-Shelf (OTS)</h3>
      <ul>
        <li>Good for stock or COBB-branded parts</li>
        <li>Conservative for reliability</li>
        <li>May leave power on the table</li>
        <li>Best for simple setups</li>
      </ul>

      <h3>Protune/E-Tune</h3>
      <ul>
        <li>Custom calibration for your specific car</li>
        <li>Optimized for your mods and fuel</li>
        <li>Better drivability and power</li>
        <li>Essential for modified cars</li>
        <li>Worth the investment</li>
      </ul>

      <h2>Reliability Tips</h2>

      <h3>EJ257</h3>
      <ul>
        <li>Keep boost conservative (18-20 psi max stock turbo)</li>
        <li>Avoid full throttle below 3500 RPM</li>
        <li>Use quality oil and change frequently</li>
        <li>Consider IAG air-oil separator</li>
        <li>Avoid prolonged high-load operation</li>
      </ul>

      <h3>FA20/FA24</h3>
      <ul>
        <li>More reliable but still respect the platform</li>
        <li>Walnut blast intake valves periodically</li>
        <li>Quality tune essential</li>
        <li>Monitor knock and feedback</li>
      </ul>

      <TuningCTA vehicleName="WRX/STI" />
    </article>
  );
}
