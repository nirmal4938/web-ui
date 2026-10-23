import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Line, Group, Circle } from 'react-konva';
import {
  ArrowDownToLine,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  CreditCard,
  FileText,
  LocateFixed,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import './GisPlotAllotment.css';

type PlotStatus = 'available' | 'selected' | 'sold';

interface StallPlot {
  id: string;
  label: string;
  status: PlotStatus;
  x: number;
  y: number;
  baseFee: number;
}

interface StallCardProps {
  plot: StallPlot;
  isSelected: boolean;
  onSelect: (plotId: string) => void;
}

const INITIAL_PLOTS: StallPlot[] = [
  { id: 'A-08', label: 'Plot A-08', status: 'available', x: 122, y: 164, baseFee: 15000 },
  { id: 'A-09', label: 'Plot A-09', status: 'selected', x: 328, y: 164, baseFee: 15000 },
  { id: 'A-10', label: 'Plot A-10', status: 'sold', x: 534, y: 164, baseFee: 15000 },
  { id: 'A-11', label: 'Plot A-11', status: 'sold', x: 122, y: 326, baseFee: 15000 },
];

const PLOT_WIDTH = 174;
const PLOT_HEIGHT = 112;
const MAP_WIDTH = 860;
const MAP_HEIGHT = 520;

const moneyFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const StallCard: React.FC<StallCardProps> = ({ plot, isSelected, onSelect }) => {
  const isSold = plot.status === 'sold';
  const fill = isSold ? '#374151' : isSelected ? '#FBBF24' : '#10B981';
  const textColor = isSelected ? '#422006' : '#F8FAFC';
  const status = isSold ? 'Sold Out' : isSelected ? 'Selected' : 'Available';

  return (
    <Group
      x={plot.x}
      y={plot.y}
      onClick={() => !isSold && onSelect(plot.id)}
      onTap={() => !isSold && onSelect(plot.id)}
      listening={!isSold}
    >
      {isSelected && (
        <Rect
          x={-5}
          y={-5}
          width={PLOT_WIDTH + 10}
          height={PLOT_HEIGHT + 10}
          cornerRadius={18}
          stroke="#FBBF24"
          strokeWidth={2}
          dash={[7, 5]}
        />
      )}
      <Rect
        width={PLOT_WIDTH}
        height={PLOT_HEIGHT}
        cornerRadius={14}
        fill={fill}
        opacity={isSold ? 0.6 : 1}
        shadowColor="#020617"
        shadowBlur={isSelected ? 18 : 10}
        shadowOpacity={isSelected ? 0.4 : 0.2}
        shadowOffsetY={5}
        stroke={isSelected ? '#FDE68A' : isSold ? '#64748B' : '#6EE7B7'}
        strokeWidth={isSelected ? 2 : 1}
      />
      <Text
        x={14}
        y={18}
        text={plot.label}
        fontFamily="Inter, sans-serif"
        fontSize={16}
        fontStyle="bold"
        fill={textColor}
      />
      <Text
        x={14}
        y={47}
        text={status}
        fontFamily="Inter, sans-serif"
        fontSize={12}
        fontStyle="bold"
        fill={textColor}
      />
      <Text
        x={14}
        y={76}
        text={isSold ? 'Booked' : 'Service stall'}
        fontFamily="Inter, sans-serif"
        fontSize={11}
        fill={textColor}
        opacity={0.82}
      />
      {isSelected && (
        <Group x={PLOT_WIDTH - 31} y={12}>
          <Circle radius={11} fill="#422006" />
          <Text
            x={-6}
            y={-6}
            text="✓"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontStyle="bold"
            fill="#FDE68A"
          />
        </Group>
      )}
    </Group>
  );
};

const GisPlotAllotment: React.FC = () => {
  const [selectedPlotId, setSelectedPlotId] = useState('A-09');
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);

  const selectedPlot = useMemo(
    () => INITIAL_PLOTS.find((plot) => plot.id === selectedPlotId) ?? INITIAL_PLOTS[1],
    [selectedPlotId],
  );
  const totalPayable = selectedPlot.baseFee * 1.18;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setCanvasSize({
        width: Math.floor(entry.contentRect.width),
        height: Math.floor(entry.contentRect.height),
      });
    });
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, []);

  const resetCanvas = useCallback(() => {
    setZoom(1);
    setStagePosition({ x: 0, y: 0 });
  }, []);

  const adjustZoom = (direction: 1 | -1) => {
    const nextZoom = Math.min(1.6, Math.max(0.65, zoom + direction * 0.15));
    const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 };
    const ratio = nextZoom / zoom;
    setStagePosition({
      x: center.x - (center.x - stagePosition.x) * ratio,
      y: center.y - (center.y - stagePosition.y) * ratio,
    });
    setZoom(nextZoom);
  };

  const handleSelectPlot = (plotId: string) => {
    setSelectedPlotId(plotId);
    setCheckoutMessage('');
  };

  const stageWidth = canvasSize.width;
  const mapScale = Math.min(1, (stageWidth - 32) / MAP_WIDTH);
  const mapOffsetX = (stageWidth - MAP_WIDTH * mapScale) / 2;
  const mapOffsetY = Math.max(16, (canvasSize.height - MAP_HEIGHT * mapScale) / 2);
  const verticalGridLines = Array.from({ length: 22 }, (_, index) => index * 40);
  const horizontalGridLines = Array.from({ length: 14 }, (_, index) => index * 40);

  return (
    <main className="mela-gis-shell min-h-screen w-full">
      <header className="mela-topbar">
        <div className="mela-brand">
          <div className="mela-brand-mark" aria-hidden="true">
            <MapPin size={21} />
          </div>
          <div>
            <p className="mela-brand-title">Sonepur Mela 2026</p>
            <p className="mela-brand-subtitle">Primary Service Layer</p>
          </div>
        </div>

        <div className="mela-topbar-actions">
          <span className="mela-live-indicator">
            <span />
            Registry online
          </span>
          <div className="mela-profile">
            <div className="mela-avatar">RK</div>
            <div className="mela-profile-copy">
              <span className="mela-profile-name">Rajesh Kumar</span>
              <span className="mela-profile-role">Mern Dev / Admin</span>
            </div>
            <ChevronDown size={16} className="mela-profile-chevron" />
          </div>
        </div>
      </header>

      <div className="mela-page-heading">
        <div>
          <div className="mela-eyebrow">VENUE OPERATIONS / STALL MANAGEMENT</div>
          <h1>Interactive GIS Canvas &amp; Stall Charting</h1>
          <p>Map, verify, and reserve vendor plots across the Sonepur Mela grounds.</p>
        </div>
        <div className="mela-step-pill">
          <span className="mela-step-dot" />
          Booking step <strong>02 / 04</strong>
        </div>
      </div>

      <div className="mela-workspace grid grid-cols-1 gap-[18px] lg:grid-cols-[minmax(0,3fr)_minmax(310px,1fr)]">
        <section className="mela-map-panel" aria-label="Interactive stall map">
          <div className="mela-map-toolbar">
            <div className="mela-map-title">
              <span className="mela-sector-icon">
                <MapPin size={16} />
              </span>
              <div>
                <h2>Sector 3</h2>
                <span>North Service Corridor</span>
              </div>
            </div>
            <div className="mela-map-legend">
              <span><i className="legend-available" />Available</span>
              <span><i className="legend-selected" />Selected</span>
              <span><i className="legend-sold" />Sold out</span>
            </div>
          </div>

          <div className="mela-map-viewport" ref={viewportRef}>
            {stageWidth > 0 && (
              <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                scaleX={zoom}
                scaleY={zoom}
                x={stagePosition.x}
                y={stagePosition.y}
                draggable
                onDragEnd={(event) => setStagePosition(event.target.position())}
                onWheel={(event) => {
                  event.evt.preventDefault();
                  adjustZoom(event.evt.deltaY < 0 ? 1 : -1);
                }}
              >
                <Layer>
                  <Group
                    x={mapOffsetX}
                    y={mapOffsetY}
                    scaleX={mapScale}
                    scaleY={mapScale}
                    clipX={0}
                    clipY={0}
                    clipWidth={MAP_WIDTH}
                    clipHeight={MAP_HEIGHT}
                  >
                    <Rect
                      width={MAP_WIDTH}
                      height={MAP_HEIGHT}
                      fill="#0F172A"
                      cornerRadius={14}
                      stroke="#334155"
                      strokeWidth={1}
                    />
                    <Group clipX={0} clipY={0} clipWidth={MAP_WIDTH} clipHeight={MAP_HEIGHT}>
                    {verticalGridLines.map((x) => (
                      <Line
                        key={`v-${x}`}
                        points={[x, 0, x, MAP_HEIGHT]}
                        stroke="#1E293B"
                        strokeWidth={1}
                      />
                    ))}
                    {horizontalGridLines.map((y) => (
                      <Line
                        key={`h-${y}`}
                        points={[0, y, MAP_WIDTH, y]}
                        stroke="#1E293B"
                        strokeWidth={1}
                      />
                    ))}
                    <Rect
                      x={34}
                      y={36}
                      width={MAP_WIDTH - 68}
                      height={MAP_HEIGHT - 72}
                      cornerRadius={8}
                      stroke="#475569"
                      strokeWidth={1}
                      dash={[8, 6]}
                    />
                    <Rect x={34} y={47} width={MAP_WIDTH - 68} height={44} fill="#1E293B" cornerRadius={6} />
                    <Text
                      x={54}
                      y={61}
                      text="CENTRAL MELA PROMENADE WALKWAY"
                      fontFamily="Inter, sans-serif"
                      fontSize={13}
                      fontStyle="bold"
                      letterSpacing={1.1}
                      fill="#CBD5E1"
                    />
                    <Line
                      points={[54, 104, MAP_WIDTH - 54, 104]}
                      stroke="#38BDF8"
                      strokeWidth={2}
                      dash={[10, 8]}
                      opacity={0.8}
                    />
                    <Text
                      x={54}
                      y={119}
                      text="VENDOR STALL ROW A  •  SELECT A PLOT TO VIEW BOOKING DETAILS"
                      fontFamily="Inter, sans-serif"
                      fontSize={10}
                      fontStyle="bold"
                      letterSpacing={0.7}
                      fill="#64748B"
                    />
                    {INITIAL_PLOTS.map((plot) => (
                      <StallCard
                        key={plot.id}
                        plot={plot}
                        isSelected={plot.id === selectedPlotId}
                        onSelect={handleSelectPlot}
                      />
                    ))}
                    <Text
                      x={760}
                      y={250}
                      text="RIVERFRONT SERVICE ACCESS"
                      fontFamily="Inter, sans-serif"
                      fontSize={10}
                      fontStyle="bold"
                      letterSpacing={1}
                      fill="#64748B"
                      rotation={-90}
                    />
                    </Group>
                  <Group x={MAP_WIDTH - 42} y={18}>
                    <Circle radius={18} fill="#1E293B" stroke="#475569" strokeWidth={1} />
                    <Text x={-5} y={-8} text="N" fontFamily="Inter, sans-serif" fontSize={11} fontStyle="bold" fill="#F8FAFC" />
                    <Line points={[0, -3, 0, 8]} stroke="#FBBF24" strokeWidth={2} />
                  </Group>
                  </Group>
                </Layer>
              </Stage>
            )}
            <div className="mela-map-controls" aria-label="Map controls">
              <button type="button" onClick={() => adjustZoom(1)} aria-label="Zoom in">
                <Plus size={17} />
              </button>
              <button type="button" onClick={() => adjustZoom(-1)} aria-label="Zoom out">
                <Minus size={17} />
              </button>
              <span />
              <button type="button" onClick={resetCanvas} aria-label="Reset map position">
                <RotateCcw size={15} />
              </button>
              <button type="button" onClick={resetCanvas} aria-label="Center map">
                <LocateFixed size={16} />
              </button>
            </div>
            <div className="mela-map-coordinates">
              <span className="mela-coordinate-dot" />
              25° 59&apos; 12.4&quot; N&nbsp;&nbsp; 85° 40&apos; 08.1&quot; E
            </div>
            <div className="mela-zoom-label">{Math.round(zoom * 100)}%</div>
          </div>

          <div className="mela-map-footer">
            <div className="mela-map-footer-note">
              <CircleHelp size={15} />
              Drag to pan · Scroll or use controls to zoom · Select an available plot
            </div>
            <span>MAP LAYER: VENDOR / SECTOR 3</span>
          </div>
        </section>

        <aside className="mela-registry-panel" aria-label="Vendor onboarding registry">
          <div className="mela-registry-heading">
            <div className="mela-registry-heading-icon"><Building2 size={18} /></div>
            <div>
              <div className="mela-eyebrow">VENDOR ONBOARDING REGISTRY</div>
              <h2>Verification &amp; Booking</h2>
            </div>
          </div>

          <div className="mela-selected-plot-card">
            <div className="mela-selected-plot-copy">
              <span>SELECTED STALL</span>
              <strong>Plot {selectedPlot.id}</strong>
              <small><MapPin size={12} /> Sector 3 · Promenade Row A</small>
            </div>
            <div className="mela-plot-price">
              <span>BASE FEE</span>
              <strong>₹{selectedPlot.baseFee.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="mela-form-section-heading">
            <span>01</span>
            <div>
              <strong>Identity verification</strong>
              <small>Confirm vendor credentials</small>
            </div>
          </div>

          <div className="mela-field">
            <div className="mela-label-row">
              <label htmlFor="aadhaar-id">Aadhaar Unique Identification ID</label>
              <button type="button" className="mela-info-button" aria-label="Aadhaar verification information">
                <CircleHelp size={14} />
              </button>
            </div>
            <div className="mela-input-with-badge">
              <input id="aadhaar-id" type="text" value="5421 8890 4321" readOnly />
              <span className="mela-verified-badge"><BadgeCheck size={13} /> UIDAI Verified</span>
            </div>
            <span className="mela-field-hint"><ShieldCheck size={12} /> Identity securely verified with UIDAI</span>
          </div>

          <div className="mela-field">
            <label htmlFor="udyam-number">MSME Udyam Registration Number</label>
            <input id="udyam-number" type="text" value="UDYAM-BR-26-0034912" readOnly />
            <span className="mela-field-hint"><Check size={12} /> Registration details validated</span>
          </div>

          <div className="mela-form-section-heading mela-doc-heading">
            <span>02</span>
            <div>
              <strong>Supporting documents</strong>
              <small>Vendor eligibility proof</small>
            </div>
          </div>

          <div className="mela-document-card">
            <div className="mela-document-icon"><FileText size={19} /></div>
            <div className="mela-document-copy">
              <strong>artisan_certificate_bihar.pdf</strong>
              <span>PDF DOCUMENT · 2.4 MB</span>
            </div>
            <button type="button" aria-label="Download artisan certificate">
              <ArrowDownToLine size={17} />
            </button>
          </div>

          <div className="mela-pricing-card">
            <div className="mela-pricing-title">
              <span>PAYMENT SUMMARY</span>
              <CreditCard size={16} />
            </div>
            <div className="mela-pricing-line">
              <span>Stall booking fee</span>
              <strong>₹{selectedPlot.baseFee.toLocaleString('en-IN')}.00</strong>
            </div>
            <div className="mela-pricing-line">
              <span>GST &amp; service charges (18%)</span>
              <strong>₹{moneyFormatter.format(totalPayable - selectedPlot.baseFee)}</strong>
            </div>
            <div className="mela-pricing-total">
              <span>Total Payable Gross Amount</span>
              <strong>₹{moneyFormatter.format(totalPayable)}</strong>
            </div>
          </div>

          <button
            className="mela-checkout-button"
            type="button"
            onClick={() => setCheckoutMessage('Secure BharatQR checkout will be available when payment services are connected.')}
          >
            <LockKeyhole size={16} />
            <span>Pay &amp; Lock Stall via BharatQR Route</span>
          </button>
          {checkoutMessage && <p className="mela-checkout-message" role="status">{checkoutMessage}</p>}
          <p className="mela-secure-note"><ShieldCheck size={13} /> Secure payment · Stall held for 15 minutes</p>
        </aside>
      </div>

      <footer className="mela-page-footer">
        <span>© 2026 Sonepur Mela Operations</span>
        <div><span>Help &amp; support</span><span>Privacy &amp; data protection</span></div>
      </footer>
    </main>
  );
};

export default GisPlotAllotment;
