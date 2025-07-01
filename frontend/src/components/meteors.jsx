"use client"

export function Meteors() {
  const meteors = new Array(20).fill(true)

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={`
            animate-meteor-effect
            absolute top-1/2 left-1/2
            h-0.5 w-0.5
            rounded-[9999px]
            bg-white
            shadow-[0_0_0_1px_#ffffff10]
            rotate-[215deg]
          `}
          style={{
            top: "0px",
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
          }}
        />
      ))}
    </>
  )
}

