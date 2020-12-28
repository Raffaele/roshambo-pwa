const OPTIONS = [
    'scissors',
    'rock',
    'paper'
];

const WINNER_RESULT = {
    USER: 'USER',
    MACHINE: 'MACHINE',
    PAIR: 'PAIR'
};

addEventListener('load', () => {
    initGame();
    showInstallButton();
});

function initGame() {
    const cmdButtons = [...document.querySelectorAll('.user-button')];
    const machineSymbolDom = document.getElementById('machine-symbol');
    const resultTextDom = document.getElementById('result-text');
    cmdButtons.forEach((btn, btnIndex) => {
        const type = OPTIONS[btnIndex];
        btn.classList.add(getClassName(type));
        btn.addEventListener('click', () => {
            const machineResponse = getRandomInt(3);
            displayMachineResult(machineResponse);
            disableUserButtons();
            btn.classList.add('selected');
            setTimeout(removeSelectedBtn, 1500);
            const winner = getWinner(btnIndex, machineResponse);
            showWinner(winner);
        });
    });

    function getClassName(option) {
        return `fa-hand-${option}`;
    }

    function showWinner(winner) {
        resultTextDom.dataset.winner = winner;
        switch (winner) {
            case WINNER_RESULT.MACHINE:
                resultTextDom.innerText = 'MACHINE WON';
                break;
            case WINNER_RESULT.PAIR:
                resultTextDom.innerText = 'PAIR';
                break;
            case WINNER_RESULT.USER:
                resultTextDom.innerText = 'YOU WON';
                break;
        }
    }

    function displayMachineResult(machineOptionIndex) {
        const { classList } = machineSymbolDom;
        OPTIONS.forEach((singleOption, optionIndex) => {
            const classToRemove = getClassName(singleOption);
            if (optionIndex === machineOptionIndex) {
                classList.add(classToRemove);
            } else {
                classList.remove(classToRemove);
            }
        });
    }

    function disableUserButtons() {
        cmdButtons.forEach(btn => {
            btn.disabled = true;
        });
    }

    function removeSelectedBtn() {
        cmdButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
        OPTIONS.forEach(singleOption => {
            machineSymbolDom.classList.remove(getClassName(singleOption));
        });
        resultTextDom.dataset.winner = '';
    }
}

function getWinner(userChoice, machineChoice) {
    return (userChoice === machineChoice) ? WINNER_RESULT.PAIR :
        userChoice === ((machineChoice+1)%3) ? WINNER_RESULT.USER :
        WINNER_RESULT.MACHINE;
}

function getRandomInt(max = 3) {
    return Math.trunc(Math.random() * max);
}

// sw installation
(function swInstallation() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./sw.js');
    }
} ());

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('called outside');
});

function showInstallButton () {
    const installCta = document.getElementById('install-cta');
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // // Update UI notify the user they can install the PWA
        installCta.style.display='';
        console.log('inside');
    });

    // function showInstallPromotion() {
    //     console.log('called showInstallPromotion');
    // }
    installCta.addEventListener('click', () => {
        deferredPrompt.prompt();
    });
}

