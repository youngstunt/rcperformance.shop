// Chadson v69.69: Ford Mustang Knowledge Base Article
// This article provides detailed information about the Ford Mustang.

import React from 'react';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: "Ford Mustang: A Comprehensive Guide",
  author: "RC Performance",
  date: "2025-08-09",
  excerpt: "An exploration of America's favorite pony car, from its inception to the present day.",
};

export default function FordMustangArticle() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold">Ford Mustang: A Comprehensive Guide</h1>
      <p className="text-lg text-muted-foreground">
        The Ford Mustang is an iconic American muscle car with a rich history and a passionate following. This guide explores its history, common issues, and tuning potential.
      </p>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">History & Evolution</h2>
        <p>
          The Ford Mustang was introduced in 1964 and has been in continuous production ever since. It has gone through six generations, each with its own unique style and performance characteristics.
        </p>
        <ul className="list-disc list-inside">
          <li><strong>First Generation (1964-1973):</strong> The original pony car, the first-generation Mustang was an instant success and created a new class of automobile.</li>
          <li><strong>Second Generation (1974-1978):</strong> The Mustang II was a smaller, more fuel-efficient model that was introduced in response to the 1973 oil crisis.</li>
          <li><strong>Third Generation (1979-1993):</strong> The Fox Body Mustang was a popular platform for drag racing and performance enthusiasts.</li>
          <li><strong>Fourth Generation (1994-2004):</strong> The SN95 Mustang featured a more modern design and the introduction of the modular V8 engine.</li>
          <li><strong>Fifth Generation (2005-2014):</strong> The S197 Mustang was a retro-styled model that paid homage to the original.</li>
          <li><strong>Sixth Generation (2015-Present):</strong> The S550 Mustang is the most technologically advanced Mustang to date, with an independent rear suspension and a range of powerful engine options.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Common Issues</h2>
        <p>
          While the Mustang is a reliable vehicle, it has some common issues to be aware of:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Paint Bubbling and Corrosion:</strong> Some models are prone to paint bubbling and corrosion, especially on the hood and trunk lid.</li>
          <li><strong>Lighting System Issues:</strong> Headlight and taillight issues are common, including burnt-out bulbs and faulty wiring.</li>
          <li><strong>Interior Electronics and Accessories:</strong> The radio display and other interior electronics can be problematic on some models.</li>
          <li><strong>Driveshaft Issues:</strong> The driveshaft can be a weak point, especially on high-horsepower vehicles.</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold">Performance Tuning</h2>
        <p>
          The Mustang is a popular platform for performance tuning, with a massive aftermarket and endless tuning potential. Common modifications include:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>ECU Tuning:</strong> A custom tune is the best way to unlock the Mustang's full potential.</li>
          <li><strong>Superchargers and Turbochargers:</strong> Forced induction is a popular way to add significant horsepower to the Mustang.</li>
          <li><strong>Exhaust and Intake:</strong> A full exhaust system and cold air intake are essential for improving airflow and maximizing performance.</li>
          <li><strong>Suspension Upgrades:</strong> Coilovers, sway bars, and other suspension upgrades can significantly improve handling and performance on the track.</li>
        </ul>
      </section>
    </article>
  );
}