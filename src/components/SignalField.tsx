import { onMount, onCleanup } from "solid-js";

interface SignalFieldProps {
  cols?: number;
  rows?: number;
  dotGap?: number;
  speed?: number;
  frequency?: number;
  seed?: number;
  class?: string;
}

export default function SignalField(props: SignalFieldProps) {
  let canvasRef!: HTMLCanvasElement;

  onMount(() => {
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement || canvas;
    const gridCols = props.cols ?? 13;
    const gridRows = props.rows ?? 13;
    const dotGap = props.dotGap ?? 0.35;
    const speedMul = props.speed ?? 1;
    const frequency = props.frequency ?? 1;
    const seed = props.seed ?? 2025;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const COLOR_AMBIENT = [217, 217, 224];
    const COLOR_SIGNAL = [107, 161, 204];
    const AMBIENT_ALPHA = 0.3;

    let seedState = seed | 0;
    function rand() {
      seedState = (seedState + 0x6d2b79f5) | 0;
      let t = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    function hash2(a: number, b: number) {
      let h = a * 374761393 + b * 668265263 + seed * 2654435761;
      h = (h ^ (h >>> 13)) * 1274126177;
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    }

    let width = 0,
      height = 0,
      dpr = 1;
    let cellSize = 0,
      dotRadius = 0;
    let offsetX = 0,
      offsetY = 0;

    interface Stream {
      col: number;
      head: number;
      speed: number;
      length: number;
    }
    const streams: Stream[] = [];
    let lastSpawn = 0;
    let prevTime: number | null = null;
    let raf = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellSize = Math.min(width / gridCols, height / gridRows);
      dotRadius = cellSize * (0.5 - dotGap / 2);
      offsetX = (width - cellSize * gridCols) / 2;
      offsetY = (height - cellSize * gridRows) / 2;
    }

    function spawnStream() {
      const col = Math.floor(rand() * gridCols);
      streams.push({
        col,
        head: -(2 + rand() * 4),
        speed: (2.5 + rand() * 3) * speedMul,
        length: 2 + Math.floor(rand() * 5),
      });
    }

    function stepStreams(dt: number, now: number) {
      const baseRate = (gridCols / 13) * frequency;
      if (now - lastSpawn > 1000 / Math.max(baseRate, 0.05)) {
        spawnStream();
        lastSpawn = now;
      }
      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];
        s.head += s.speed * dt;
        if (s.head - s.length > gridRows + 2) streams.splice(i, 1);
      }
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, width, height);

      const active: Record<string, boolean> = {};
      for (const s of streams) {
        for (let o = 0; o < s.length; o++) {
          const row = Math.floor(s.head - o);
          if (row < 0 || row >= gridRows) continue;
          active[s.col + "," + row] = true;
        }
      }

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = offsetX + c * cellSize + cellSize / 2;
          const y = offsetY + r * cellSize + cellSize / 2;
          const isOn = active[c + "," + r];

          const presence = hash2(c * 3 + 1, r * 5 + 2);
          const showAmbient = presence > 0.3;

          if (isOn) {
            ctx!.beginPath();
            ctx!.fillStyle = `rgba(${COLOR_SIGNAL[0]},${COLOR_SIGNAL[1]},${COLOR_SIGNAL[2]},1)`;
            ctx!.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx!.fill();
          } else if (showAmbient) {
            const phase = hash2(c, r) * Math.PI * 2;
            const speedN = 0.15 + hash2(r, c) * 0.25;
            const wave = prefersReducedMotion
              ? Math.sin(phase)
              : Math.sin(now * 0.001 * speedN + phase);
            const breathing = 0.6 + 0.4 * wave;
            const alpha = presence * breathing * AMBIENT_ALPHA;

            ctx!.beginPath();
            ctx!.fillStyle = `rgba(${COLOR_AMBIENT[0]},${COLOR_AMBIENT[1]},${COLOR_AMBIENT[2]},${alpha.toFixed(3)})`;
            ctx!.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }
    }

    function loop(now: number) {
      if (prevTime == null) prevTime = now;
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      stepStreams(dt, now);
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw(0);
    });
    resizeObserver.observe(container);

    onCleanup(() => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      class={props.class}
      style="display: block; width: 100%; height: 100%;"
    />
  );
}
