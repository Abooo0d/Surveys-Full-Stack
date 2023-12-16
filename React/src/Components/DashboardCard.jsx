export default function DashboardCard({
  title,
  children,
  className = "",
  style = "",
}) {
  return (
    <div
      className={
        `bg-white shadow-md rounded-md p-3 text-center flex flex-col animate-fade-in-down ` +
        className
      }
      style={style}
    >
      {title && <h3 className="text-2xl font-semibold">{title}</h3>}
      {children}
    </div>
  );
}
