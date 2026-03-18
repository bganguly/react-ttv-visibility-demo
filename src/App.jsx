import { useEffect, useRef, useState } from 'react';

export default function App() {
  const ref = useRef(null);
  const [data, setData] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();
      setStartTime(start);

      const res = await fetch('http://localhost:3000/api/data');
      const json = await res.json();

      setData(json);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const visibleTime = performance.now();
        console.log(
          'Time to Visible (ms):',
          (visibleTime - startTime).toFixed(2)
        );
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [data]);

  return (
    <div style={{ height: '200vh', paddingTop: '120vh' }}>
      <h1>Scroll down to reveal data</h1>

      <div ref={ref} style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {data ? JSON.stringify(data) : 'Loading...'}
      </div>
    </div>
  );
}