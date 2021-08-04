export default function Splash() {
  return (
    <div className="splash">
      hello guys
      <style jsx>{`
        .splash {
          position: absolute;
          left: 0px;
          top: 0px;
          transform: translateX(-70vw);
          width: 60vw;
          min-height: 100vh;
          background-color: rgba(var(--base-blue), 0.96);
          animation-timing-function: cubic-bezier(0.33, 0.13, 1, 0.76);
          animation-name: slide;
          animation-duration: 1s;
          animation-delay: 0.2s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          padding: 0px 2rem;
        }

        @keyframes slide {
          0% {
            transform: translateX(-70vw);
          }
          100% {
            transform: translateX(0px);
          }
        }
      `}</style>
    </div>
  );
}
