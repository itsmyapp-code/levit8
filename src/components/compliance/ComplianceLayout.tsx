import React from 'react';

export default function CompliancePage({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl neon-border">
        <h1 className="text-4xl font-bold text-electric-cyan mb-8">{title}</h1>
        <div className="prose prose-invert prose-cyan max-w-none text-gray-300">
          {content}
        </div>
      </div>
    </main>
  );
}
