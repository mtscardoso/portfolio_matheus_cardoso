interface JsonExportProps {
  config: any;
}

export default function JsonExport({ config }: JsonExportProps) {
  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4" id="json-export-container">
      <div className="bg-brand-dark text-brand-light/90 p-4 rounded-lg font-mono text-xs overflow-auto max-h-[200px] border border-white/10">
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
      
      <button 
        onClick={handleDownloadJson}
        className="w-full py-3 bg-brand-dark text-white rounded-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2"
        id="btn-download-json"
      >
        Download JSON Config
      </button>
    </div>
  );
}
