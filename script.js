// Simple OSINT Terminal Simulation

const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');
const cursor = document.getElementById('cursor');
let commandHistory = [];
let historyIndex = 0;

function typeText(text, callback) {
    let i = 0;
    const interval = setInterval(() => {
        terminal.innerHTML += text[i++];
        if (i >= text.length) {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

function blinkCursor() {
    cursor.classList.toggle('blink');
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const command = commandInput.value;
        commandInput.value = '';
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        terminal.innerHTML += `<br/>$ ${command}`;
        processCommand(command);
    }
}

function processCommand(command) {
    typeText(`Executing: ${command}...`, () => {
        const output = simulateOSINT(command);
        typeText(`<br/>${output}`, () => {
            terminal.scrollTop = terminal.scrollHeight;
        });
    });
}

function simulateOSINT(command) {
    const responses = {
        "whois example.com": "Domain: example.com\nRegistrar: Example Registrar\n...",
        "ping example.com": "Pinging example.com...\nReply from 93.184.216.34: bytes=32 time=56ms",
        "help": "Commands: whois, ping, help"
    };
    return responses[command] || "Command not found. Type 'help' for a list of commands.";
}

document.addEventListener('keydown', handleCommand);
setInterval(blinkCursor, 500);
```

This JavaScript code simulates a terminal output for an OSINT web project, allowing users to enter commands and receive dynamic responses with a blinking cursor effect. It enhances user engagement through text typing effects and maintains a concise structure.