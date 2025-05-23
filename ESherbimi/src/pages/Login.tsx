import React, { useEffect, useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

const VoiceLoginBlind: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [stage, setStage] = useState<"intro" | "email" | "password" | "ready">(
    "intro"
  );

  const speak = (text: string, onDone?: () => void) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "sq-AL";
    utter.onend = () => onDone && onDone();
    synth.speak(utter);
  };

  const listen = (callback: (result: string) => void) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Shfletuesi juaj nuk mbështet Web Speech API");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "sq-AL";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      let result = event.results[0][0].transcript.trim();
      // Remove final period if it exists (e.g., "Agon.")
      if (result.endsWith(".")) {
        result = result.slice(0, -1);
      }
      callback(result);
    };

    recognition.onerror = () => {
      speak("Nuk kuptova. Provojmë sërish.", () => listen(callback));
    };

    recognition.start();
  };

  const askEmail = () => {
    speak("Thuaj usernamen tënd.", () => {
      listen((res) => {
        setEmail(res);
        setStage("password");
        askPassword();
      });
    });
  };

  const askPassword = () => {
    speak("Tani thuaj fjalëkalimin.", () => {
      listen((res) => {
        setPassword(res);
        setStage("ready");
        speak(
          "Fjalëkalimi u ruajt. Thuaj 'vazhdo' për të vazhduar.",
          listenForLogin
        );
      });
    });
  };

  const listenForLogin = () => {
    listen((res) => {
      if (res.toLowerCase().includes("vazhdo")) {
        speak(`Jeni kyçur me sukses si ${email}.`);
        setTimeout(() => {
          onLogin();
          setMessage("Login i suksesshëm!");
        }, 1000);
      } else {
        speak("Nuk kuptova. Thuaj 'vazhdo' për të vazhduar.", listenForLogin);
      }
    });
  };

  useEffect(() => {
    speak("A dëshironi të kyçeni me zë? Thuaj po për të vazhduar.", () => {
      listen((res) => {
        if (res.toLowerCase().includes("po")) {
          setStage("username");
          askEmail();
        } else {
          speak("Në rregull. Ju riktheheni në mënyrën normale të kyçjes.");
        }
      });
    });
  }, []);

  return (
    <div className="login-body">
      <header className="login-header">
        <div className="logo-box">
          <h1>E-Shërbimi Qytetar</h1>
        </div>
      </header>

      <main className="login-main">
        <div className="login-card">
          <h2>Hyr në llogarinë tuaj</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            <div className="input-icon">
              <i></i>
              <input
                type="text"
                placeholder="Username i juaj"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-icon">
              <i></i>
              <input
                type="password"
                placeholder="Fjalëkalimi juaj"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              <span>Hyr</span>
            </button>
          </form>
          {message && <p>{message}</p>}
          {listening && <p className="text-green-600">🎤 Duke dëgjuar...</p>}
        </div>
      </main>
    </div>
  );
};

export default VoiceLoginBlind;
