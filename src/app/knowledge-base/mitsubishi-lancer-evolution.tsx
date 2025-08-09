// Chadson v69.69: Mitsubishi Lancer Evolution Knowledge Base Article
// This article provides detailed information about the Mitsubishi Lancer Evolution.

import React from 'react';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: "Mitsubishi Lancer Evolution: A Comprehensive Guide",
  author: "RC Performance",
  date: "2025-08-09",
  excerpt: "A deep dive into the rally-bred icon, from Evo I to Evo X.",
};

export default function MitsubishiLancerEvolutionArticle() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Mitsubishi Lancer Evolution: A Comprehensive Guide</h1>
      <p className="text-lg text-muted-foreground">
        The Mitsubishi Lancer Evolution, commonly known as the "Evo," is a high-performance sedan with a rich rally heritage. This guide covers its history, common issues, and tuning potential.
      </p>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">History & Evolution</h2>
        <p>
          The Lancer Evolution was produced from 1992 to 2016, with ten generations in total. Each generation brought significant improvements in performance and technology, solidifying the Evo's legendary status.
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Evo I-III (1992-1996):</strong> The early Evos established the formula with a turbocharged 2.0L 4G63T engine and all-wheel drive.</li>
          <li><strong>Evo IV-VI (1996-2001):</strong> These models introduced Active Yaw Control (AYC) and further refined the platform's handling and performance.</li>
          <li><strong>Evo VII-IX (2001-2007):</strong> The Evo received a new chassis and significant technological upgrades, including an active center differential (ACD).</li>
          <li><strong>Evo X (2007-2016):</strong> The final generation of the Evo featured a new aluminum 4B11T engine and a dual-clutch transmission option.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Common Issues</h2>
        <p>
          While the Evo is a robust platform, it has some common issues to be aware of:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Timing Chain Stretch:</strong> The 4B11T engine in the Evo X is known for timing chain stretch, which can be prevented with regular oil changes.</li>
          <li><strong>Overheating:</strong> The Evo's high-performance nature can lead to overheating, especially when modified. Upgraded cooling systems are a common modification.</li>
          <li><strong>Transfer Case Issues:</strong> The all-wheel-drive system can be a weak point, with transfer case failures being a known issue.</li>
          <li><strong>Rust:</strong> Like many Japanese cars of its era, the Evo can be prone to rust, especially in the rear quarter panels and underbody.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Performance Tuning</h2>
        <p>
          The Evo is a tuner's dream, with a massive aftermarket and endless tuning potential. Common modifications include:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>ECU Tuning:</strong> A custom tune is the best way to unlock the Evo's full potential.</li>
          <li><strong>Upgraded Turbocharger:</strong> A larger turbo can significantly increase horsepower and torque.</li>
          <li><strong>Fuel System Upgrades:</strong> Upgraded fuel injectors and a high-flow fuel pump are necessary for supporting higher power levels.</li>
          <li><strong>Exhaust and Intake:</strong> A full exhaust system and cold air intake are essential for improving airflow and maximizing performance.</li>
        </ul>
      </section>
    </article>
  );
}