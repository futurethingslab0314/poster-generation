
/**
 * Using html2canvas or similar libraries is typical here. 
 * Since we can't easily install new libraries in this sandbox environment without ESM support for them,
 * we'll use a standard DOM-to-Image technique with SVG/Canvas.
 */

export async function generateJpg(element: HTMLElement): Promise<string> {
  const width = 2480; // A4 at 300 DPI (approx)
  const height = 3508;
  const scale = width / element.offsetWidth;

  // We use an SVG foreignObject approach to render the HTML element to a canvas
  // Note: This works best with simple CSS. Tailwind works well.
  
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = `${element.offsetWidth}px`;
  clone.style.height = `${element.offsetHeight}px`;
  clone.style.transform = 'none';
  
  // Serialize the DOM to XML
  const serializer = new XMLSerializer();
  const xml = serializer.serializeToString(clone);

  // Wrap it in SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: ${16 * scale}px; transform: scale(${scale}); transform-origin: top left; width: ${element.offsetWidth}px; height: ${element.offsetHeight}px;">
          ${xml}
        </div>
      </foreignObject>
    </svg>
  `;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  // Load the SVG into an image
  const img = new Image();
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.onerror = reject;
    img.src = url;
  });
}
