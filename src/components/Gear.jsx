export default function Gear({ size = 40, color = 'currentColor', spin = false }) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      className={spin ? 'gear-spin' : undefined}
      aria-hidden="true"
    >
      <g transform="translate(50 50)">
        {teeth.map((a) => (
          <rect key={a} x={-9} y={-41} width={18} height={22} rx={3} transform={`rotate(${a})`} />
        ))}
        <circle r={29} fill="none" stroke={color} strokeWidth={7} />
        <circle r={13} fill="none" stroke={color} strokeWidth={5} />
        <circle r={4} />
      </g>
    </svg>
  )
}
