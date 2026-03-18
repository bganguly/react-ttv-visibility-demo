import { useEffect, useRef, useState } from 'react';

const USE_CDN = false;

const API_BASE = USE_CDN
  ? 'http://localhost:8080'
  : 'http://localhost:3000';

export default function App() {
  const [data, setData] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const start = performance.now();

    fetch(`${API_BASE}/api/data`)
      .then(res => {
        console.log({
          layer: USE_CDN ? 'CDN' : 'Direct',
          cache:
            res.headers.get('x-cache-status') ||
            res.headers.get('x-cache'),
        }); 
        return res.json();
      })
      .then(d => {
        setData(d);

        // 👇 KEEP IntersectionObserver
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            const ttv = performance.now() - start;

            console.log(
              `${USE_CDN ? 'CDN' : 'Direct'} TTV (visible): ${ttv.toFixed(2)} ms`
            );

            observer.disconnect();
          }
        });

        if (ref.current) {
          observer.observe(ref.current);
        }
      });
  }, []);

  return (
    <div style={{ height: '150vh', paddingTop: '100px' }}>
      <h1>CDN + Visibility Demo</h1>
      <h2>{USE_CDN ? 'Using CDN' : 'Direct API'}</h2>
      {data && (
        <div
          ref={ref}
          style={{
            marginTop: '200px',
            padding: '20px',
            background: '#eee'
          }}
        >
          Loaded Data Visible
        </div>
      )}
    </div>
  );
}