export default function Splash() {
  return (
    <div className="splash">
      hello guys
      <style jsx>{`
        .splash {
          position: absolute;
          left: 0px;
          top: 0px;
          transform: translateX(-90vw);
          width: 90vw;
          min-height: 100vh;
          background-color: rgba(var(--base-blue), 0.96);
          padding: 0px 2rem;
          transition: 1s ease;
          z-index: 100;
        }
        .fade {
          transform: translateX(0px);
        }
      `}</style>
    </div>
  );
}
