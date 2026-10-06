import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          ".NET & ASP.NET Core",
          "APIs REST",
          "SQL Server & PostgreSQL",
          "React & TypeScript",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
