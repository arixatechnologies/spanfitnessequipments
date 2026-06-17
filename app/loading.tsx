export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__panel">
        <div className="page-loader__ring" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>Loading Span Fitness</p>
      </div>
    </div>
  );
}
