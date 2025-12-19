
import React from 'react';
import { PosterData } from '../types';
import { THEME_COLORS } from '../constants';
import { User, Calendar, MapPin, AlignLeft, Palette, Type, Plus, Trash2 } from 'lucide-react';

interface Props {
  data: PosterData;
  onChange: (data: PosterData) => void;
}

const PosterForm: React.FC<Props> = ({ data, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleAgendaChange = (index: number, value: string) => {
    const newAgenda = [...data.agenda];
    newAgenda[index] = value;
    onChange({ ...data, agenda: newAgenda });
  };

  const addAgendaItem = () => {
    onChange({ ...data, agenda: [...data.agenda, ''] });
  };

  const removeAgendaItem = (index: number) => {
    const newAgenda = data.agenda.filter((_, i) => i !== index);
    onChange({ ...data, agenda: newAgenda });
  };

  return (
    <div className="space-y-6">
      {/* Visual Settings */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Branding
        </h3>
        <div className="flex flex-wrap gap-3">
          {THEME_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => onChange({ ...data, themeColor: color.hex })}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                data.themeColor === color.hex ? 'border-blue-500 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <input 
            type="color" 
            value={data.themeColor} 
            onChange={(e) => onChange({ ...data, themeColor: e.target.value })}
            className="w-10 h-10 rounded-full border-2 border-slate-100 p-0 overflow-hidden cursor-pointer"
          />
        </div>
      </section>

      {/* Basic Info */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" /> Content
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Talk Title</label>
          <input
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                name="eventDate"
                value={data.eventDate}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input
              name="time"
              value={data.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              name="location"
              value={data.location}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Speaker Info */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <User className="w-4 h-4" /> Speaker
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Speaker Photo URL</label>
            <input
              name="speakerPhoto"
              value={data.speakerPhoto}
              onChange={handleInputChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              name="speakerName"
              value={data.speakerName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title / Company</label>
            <input
              name="speakerTitle"
              value={data.speakerTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
          <textarea
            name="speakerBio"
            value={data.speakerBio}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <AlignLeft className="w-4 h-4" /> Agenda
          </h3>
          <button 
            onClick={addAgendaItem}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {data.agenda.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => handleAgendaChange(idx, e.target.value)}
                placeholder="e.g. 10:00 AM - Opening"
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <button 
                onClick={() => removeAgendaItem(idx)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PosterForm;
