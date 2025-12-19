
import React from 'react';

export const THEME_COLORS = [
  { name: 'Default Blue', hex: '#2563eb' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Slate', hex: '#334155' },
];

export const INITIAL_POSTER_DATA = {
  title: 'Future of Generative AI in Web Design',
  speakerName: 'Dr. Jane Smith',
  speakerTitle: 'Lead AI Engineer @ TechCorp',
  speakerBio: 'Over 15 years of experience in distributed systems and neural networks. Previously at Google Brain.',
  speakerPhoto: 'https://picsum.photos/400/400',
  agenda: [
    '09:00 - Welcome & Introduction',
    '10:00 - Deep Dive: Transformer Models',
    '11:30 - Hands-on Workshop',
    '13:00 - Q&A Session'
  ],
  time: '09:00 AM - 02:00 PM',
  location: 'Tech Hub Arena, 4th Floor',
  eventDate: '2024-12-15',
  themeColor: '#2563eb',
  template: 'modern' as const,
};
