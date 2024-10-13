let currentNumber, currentFromUnit, currentToUnit, correctAnswer;
let score = { correct: 0, wrong: 0 };

const units = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km'];
const conversionRates = {
    'mm': 1,
    'cm': 10,
    'dm': 100,
    'm': 1000,
    'dam': 10000,
    'hm': 100000,
    'km': 1000000
};

function generateQuestion() {
    // Menghasilkan angka acak antara 1 hingga 99
    currentNumber = Math.floor(Math.random() * 100) + 1;
    currentFromUnit = units[Math.floor(Math.random() * units.length)];
    currentToUnit = units[Math.floor(Math.random() * units.length)];
    
    // Pastikan satuan awal dan tujuan berbeda
    while (currentFromUnit === currentToUnit) {
        currentToUnit = units[Math.floor(Math.random() * units.length)];
    }

    // Menghitung jawaban yang benar berdasarkan rasio konversi
    const fromRate = conversionRates[currentFromUnit];
    const toRate = conversionRates[currentToUnit];
    correctAnswer = (currentNumber * fromRate) / toRate;

    // Jika konversi ke satuan yang lebih besar, pastikan hasilnya bilangan bulat
    if (correctAnswer % 1 !== 0) {
        generateQuestion();  // Ulangi jika hasilnya desimal
    } else {
        document.getElementById('question').textContent = `${currentNumber} ${currentFromUnit} = ... ${currentToUnit}`;
        document.getElementById('answer').value = '';
        document.getElementById('result').textContent = '';
    }
}

function checkAnswer() {
    const answer = parseFloat(document.getElementById('answer').value);
    
    if (answer === correctAnswer) {
        document.getElementById('result').textContent = 'Benar!';
        score.correct++;
    } else {
        document.getElementById('result').textContent = `Salah! Jawaban yang benar adalah ${correctAnswer}`;
        score.wrong++;
    }
    
    updateScore();
    generateQuestion();
}

function updateScore() {
    document.getElementById('score').textContent = `Benar: ${score.correct} | Salah: ${score.wrong}`;
}

// Generate the first question when page loads
window.onload = generateQuestion;

