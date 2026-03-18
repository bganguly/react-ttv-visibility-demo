import { useEffect, useRef, useState } from 'react';

export default function App() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const ttv = performance.now() - start;
        console.log('TTV (ms):', ttv);
        setVisible(true);

        fetch('http://localhost:3000/api/data')
          .then(res => res.json())
          .then(console.log);
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height: '150vh', padding: '20px' }}>
      <h1>Scroll Down</h1>
      <div style={{ marginTop: '120vh' }} ref={ref}>
        👀 Target Element (Visible: {visible ? 'Yes' : 'No'})
      </div>
    </div>
  );
}