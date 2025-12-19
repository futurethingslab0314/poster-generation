
import React, { useState, useRef, useCallback } from 'react';
import { Settings, Image as ImageIcon, Download, Share2, Plus, Minus, CheckCircle2, AlertCircle, Layout } from 'lucide-react';
import { PosterData, NotionSettings, ExportStatus } from './types';
import { INITIAL_POSTER_DATA, THEME_COLORS } from './constants';
import PosterForm from './components/PosterForm';
import PosterPreview from './components/PosterPreview';
import { generateJpg } from './utils/canvasHelper';
import { syncToNotion } from './services/notionService';

const App: React.FC = () => {
  const [posterData, setPosterData] = useState<PosterData>(INITIAL_POSTER_DATA);
  const [notionSettings, setNotionSettings] = useState<NotionSettings>({ apiKey: '', databaseId: '' });
  const [showNotionSettings, setShowNotionSettings] = useState(false);
  const [exportStatus, setExportStatus] = useState<ExportStatus>(ExportStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;
    
    setExportStatus(ExportStatus.GENERATING);
    try {
      // 1. Generate JPG
      const dataUrl = await generateJpg(previewRef.current);
      
      // Download file
      const link = document.createElement('a');
      link.download = `poster-${posterData.speakerName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.href = dataUrl;
      link.click();

      // 2. Sync to Notion if configured
      if (notionSettings.apiKey && notionSettings.databaseId) {
        setExportStatus(ExportStatus.SYNCING);
        const success = await syncToNotion(posterData, notionSettings, dataUrl);
        if (!success) {
           setErrorMsg('Notion sync failed. The JPG was downloaded locally.');
        }
      }

      setExportStatus(ExportStatus.SUCCESS);
      setTimeout(() => setExportStatus(ExportStatus.IDLE), 3000);
    } catch (err) {
      console.error(err);
      setExportStatus(ExportStatus.ERROR);
      setErrorMsg('Failed to generate poster image.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ImageIcon className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">PosterGen <span className="text-blue-600">Pro</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowNotionSettings(!showNotionSettings)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              title="Notion Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleExport}
              disabled={exportStatus !== ExportStatus.IDLE}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold shadow-lg transition-all ${
                exportStatus === ExportStatus.IDLE 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              {exportStatus === ExportStatus.IDLE && <><Download className="w-4 h-4" /> Download JPG & Sync</>}
              {exportStatus === ExportStatus.GENERATING && 'Generating...'}
              {exportStatus === ExportStatus.SYNCING && 'Syncing to Notion...'}
              {exportStatus === ExportStatus.SUCCESS && <><CheckCircle2 className="w-4 h-4" /> Success!</>}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Panel (Floating/Collapsible) */}
        {showNotionSettings && (
          <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" /> Notion Integration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notion Internal Integration Token</label>
                <input 
                  type="password" 
                  value={notionSettings.apiKey}
                  onChange={(e) => setNotionSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="secret_..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Database ID</label>
                <input 
                  type="text" 
                  value={notionSettings.databaseId}
                  onChange={(e) => setNotionSettings(prev => ({ ...prev, databaseId: e.target.value }))}
                  placeholder="32-character ID"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              * Note: For real integration, ensure your Notion integration has access to the specified database.
            </p>
          </div>
        )}

        {/* Left: Input Form */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <PosterForm 
            data={posterData} 
            onChange={setPosterData} 
          />
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Live A4 Preview</h2>
              <div className="flex gap-2">
                 {['modern', 'corporate', 'minimal'].map((t) => (
                   <button
                    key={t}
                    onClick={() => setPosterData(prev => ({...prev, template: t as any}))}
                    className={`px-3 py-1 rounded text-xs font-medium capitalize border transition-all ${
                      posterData.template === t 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                   >
                     {t}
                   </button>
                 ))}
              </div>
            </div>
            <div className="flex justify-center bg-slate-200 p-8 rounded-2xl overflow-hidden min-h-[700px]">
              <div ref={previewRef} className="a4-container bg-white">
                <PosterPreview data={posterData} />
              </div>
            </div>
            
            {errorMsg && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMsg}</p>
                <button onClick={() => setErrorMsg(null)} className="ml-auto text-xs font-bold underline">Dismiss</button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleExport}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default App;
