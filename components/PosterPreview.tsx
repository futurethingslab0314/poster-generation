
import React from 'react';
import { PosterData } from '../types';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Props {
  data: PosterData;
}

const PosterPreview: React.FC<Props> = ({ data }) => {
  const { template, themeColor } = data;

  if (template === 'minimal') {
    return (
      <div className="w-full h-full flex flex-col bg-white p-12 text-slate-800 relative">
        <div 
          className="absolute top-0 left-0 w-full h-4" 
          style={{ backgroundColor: themeColor }}
        />
        
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-black mb-8 leading-tight tracking-tight uppercase">
            {data.title}
          </h1>
          
          <img 
            src={data.speakerPhoto} 
            alt={data.speakerName}
            className="w-48 h-48 rounded-full object-cover border-8 mb-6"
            style={{ borderColor: themeColor }}
          />
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold">{data.speakerName}</h2>
            <p className="text-lg opacity-70 italic">{data.speakerTitle}</p>
          </div>

          <div className="max-w-md text-sm leading-relaxed mb-12">
            {data.speakerBio}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t pt-10 text-xs font-bold uppercase tracking-widest opacity-80">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" /> {data.eventDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" /> {data.time}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> {data.location}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template === 'corporate') {
    return (
      <div className="w-full h-full flex flex-col bg-slate-50 relative">
        <div className="h-2/5 relative overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 bg-slate-900 opacity-90 z-10" />
            <img 
              src={data.speakerPhoto} 
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm" 
              alt="background"
            />
            <div className="z-20 text-center p-12">
                <h1 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter leading-none">
                  {data.title}
                </h1>
                <div 
                  className="inline-block px-4 py-1 text-white text-xs font-bold tracking-widest rounded"
                  style={{ backgroundColor: themeColor }}
                >
                  SPECIAL SESSION
                </div>
            </div>
        </div>

        <div className="flex-1 flex p-10 gap-8">
            <div className="w-1/3">
              <div className="mb-8">
                <h3 className="text-xs font-black text-slate-400 mb-4 tracking-widest uppercase">Speaker</h3>
                <div className="flex flex-col gap-2">
                  <img src={data.speakerPhoto} className="w-full aspect-square object-cover rounded shadow-lg" alt={data.speakerName} />
                  <div className="mt-2">
                    <div className="font-bold text-lg">{data.speakerName}</div>
                    <div className="text-xs text-slate-500 font-medium">{data.speakerTitle}</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed italic">
                {data.speakerBio}
              </div>
            </div>

            <div className="flex-1">
                <h3 className="text-xs font-black text-slate-400 mb-6 tracking-widest uppercase">Agenda</h3>
                <div className="space-y-6">
                  {data.agenda.map((item, i) => (
                    <div key={i} className="flex gap-4 border-l-2 pl-4" style={{ borderColor: themeColor }}>
                      <p className="text-sm font-semibold text-slate-800">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10 grid grid-cols-2 gap-4 text-xs">
                   <div className="flex flex-col gap-2">
                      <span className="font-bold text-slate-400">WHEN</span>
                      <span className="font-semibold">{data.eventDate} @ {data.time}</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="font-bold text-slate-400">WHERE</span>
                      <span className="font-semibold">{data.location}</span>
                   </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Default: Modern Template
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden font-sans">
      {/* Top Banner */}
      <div 
        className="h-64 p-10 flex flex-col justify-end text-white relative overflow-hidden"
        style={{ backgroundColor: themeColor }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-sm">
            {data.title}
          </h1>
          <div className="flex gap-6 text-sm font-medium opacity-90">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {data.eventDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {data.time}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10 grid grid-cols-12 gap-8">
        {/* Main Side */}
        <div className="col-span-7 space-y-8">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-30">The Agenda</h2>
            <ul className="space-y-4">
              {data.agenda.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: themeColor }} />
                  <span className="text-sm font-medium text-slate-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-8 border-t border-slate-100">
             <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-30">Location</h2>
             <div className="flex items-start gap-2 text-slate-800">
               <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: themeColor }} />
               <span className="text-sm font-semibold">{data.location}</span>
             </div>
          </div>
        </div>

        {/* Speaker Side */}
        <div className="col-span-5 space-y-6">
          <div className="relative">
            <div 
              className="absolute -inset-2 rounded-2xl opacity-20" 
              style={{ backgroundColor: themeColor }} 
            />
            <img 
              src={data.speakerPhoto} 
              alt={data.speakerName}
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-xl relative z-10"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight leading-none" style={{ color: themeColor }}>{data.speakerName}</h3>
            <p className="text-sm font-bold text-slate-500">{data.speakerTitle}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {data.speakerBio}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="h-2 w-full mt-auto" style={{ backgroundColor: themeColor }} />
    </div>
  );
};

export default PosterPreview;
