// Chadson v69.69: Subaru WRX Knowledge Base Article
// This article provides detailed information about the Subaru WRX.

import React from 'react';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: "Subaru WRX: A Comprehensive Guide",
  author: "RC Performance",
  date: "2025-08-09",
  excerpt: "A comprehensive guide to the legendary all-wheel-drive sport compact.",
};

export default function SubaruWrxArticle() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Subaru WRX: A Comprehensive Guide</h1>
      <p className="text-lg text-muted-foreground">
        The Subaru WRX is a legendary all-wheel-drive sport compact car with a rich history in rally racing and a dedicated following among automotive enthusiasts. This guide provides a comprehensive overview of the WRX, from its history and evolution to common issues and performance tuning.
      </p>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">History & Evolution</h2>
        <p>
          The Subaru WRX (World Rally eXperimental) was first introduced in 1992 as a high-performance version of the Impreza. It quickly gained a reputation for its turbocharged boxer engine, all-wheel-drive system, and rally-inspired performance. Over the years, the WRX has evolved through several generations, each with its own unique characteristics and improvements.
        </p>
        <ul className="list-disc list-inside">
          <li><strong>First Generation (1992-2000):</strong> The original GC8 WRX set the standard for the model, with its lightweight chassis and potent performance.</li>
          <li><strong>Second Generation (2000-2007):</strong> The "New Age" Impreza WRX, known for its distinctive "bugeye," "blobeye," and "hawkeye" headlight designs, brought significant improvements in refinement and power.</li>
          <li><strong>Third Generation (2007-2014):</strong> The WRX became a separate model from the Impreza, with a more mature design and a focus on improved handling and daily drivability.</li>
          <li><strong>Fourth Generation (2014-2021):</strong> The VA WRX introduced a new direct-injected FA20F engine and a more aggressive design.</li>
          <li><strong>Fifth Generation (2022-Present):</strong> The latest VB WRX features a new 2.4L turbocharged engine and a more modern design, though it has been met with mixed reviews from enthusiasts.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Common Issues</h2>
        <p>
          While the WRX is a reliable vehicle, it is not without its common issues. Some of the most frequently reported problems include:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Ringland Failure:</strong> A common issue on the EJ-series engines, particularly with modified vehicles.</li>
          <li><strong>Head Gasket Failure:</strong> Another common issue on the EJ-series engines, especially on high-mileage vehicles.</li>
          <li><strong>Turbocharger Failure:</strong> The turbocharger can be a weak point, especially on older models or vehicles that have been driven hard.</li>
          <li><strong>Clutch Failure:</strong> The clutch can wear out prematurely, especially with aggressive driving.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Performance Tuning</h2>
        <p>
          The WRX is a popular platform for performance tuning, with a wide range of aftermarket parts and tuning options available. Some of the most common modifications include:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>ECU Tuning:</strong> A custom ECU tune can significantly improve performance by optimizing fuel and ignition timing.</li>
          <li><strong>Exhaust Systems:</strong> An aftermarket exhaust system can improve performance and give the WRX a more aggressive sound.</li>
          <li><strong>Intake Systems:</strong> A cold air intake can improve airflow to the engine, resulting in a modest performance increase.</li>
          <li><strong>Suspension Upgrades:</strong> Coilovers, sway bars, and other suspension upgrades can significantly improve handling and performance on the track.</li>
        </ul>
      </section>
    </article>
  );
}