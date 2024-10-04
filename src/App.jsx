import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  let [char, setChar] = useState(false);
  let [num, setNum] = useState(false);
  let [pass, setPass] = useState("");
  let refPassword = useRef(null);

  const passGenrator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (char) str += "`~!@#$%^&*_+-=}{][?<>";
    if (num) str += "1234567890";

    //For loop for genrating Random String
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(index);
    }
    setPass(password);
  }, [length, num, char, setPass]);

  const copytoClipboard = useCallback(() => {
    refPassword.current?.select();
    refPassword.current?.setSelectionRange(0, 16);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passGenrator();
  }, [length, char, num, passGenrator]);

  return (
    <div className="inline-block w-full h-screen bg-zinc-900">
      <div className="w-full max-w-md px-4 py-3 mx-auto my-8 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl text-center text-white">Password Genrator</h1>
        <div className="flex my-4 overflow-hidden rounded-lg shadow">
          <input
            className="w-full px-3 py-2 text-xl outline-none"
            type="text"
            placeholder="Password"
            readOnly
            value={pass}
            ref={refPassword}
          />
          <button
            className="px-3 py-2 text-xl text-white bg-blue-500 outline-none shrink-0 hover:bg-blue-600"
            onClick={copytoClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-wrap w-full gap-3 py-3 mt-3 h-30">
          <input
            id="length"
            type="range"
            defaultValue={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="length" className="text-sm text-zinc-100">
            Length :{length}
          </label>

          <input
            type="checkbox"
            defaultChecked={num}
            onChange={() => {
              setNum((n) => !n);
            }}
            id="num"
          />
          <label className="text-sm text-zinc-100" htmlFor="num">
            Number
          </label>
          <input
            type="checkbox"
            defaultChecked={char}
            onChange={() => {
              setChar((ch) => !ch);
            }}
            id="char"
          />
          <label className="text-sm text-zinc-100" htmlFor="char">
            Character
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
