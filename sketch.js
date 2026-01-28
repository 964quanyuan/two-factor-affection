let selectedAnswer = null;

function initializeCaptcha() {
  const checkbox = document.getElementById('captchaCheckbox');
  const dialogue = document.getElementById('captchaDialogue');
  const answerChoices = document.querySelectorAll('.answer-choice');
  const verifyButton = document.getElementById('verifyButton');
  
  // Checkbox toggle
  checkbox.addEventListener('change', function() {
    dialogue.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) {
      document.getElementById('hintBox').style.display = 'none';
    }
  });
  
  // Answer choice selection
  answerChoices.forEach(img => {
    img.addEventListener('click', function() {
      // Remove previous selection markers
      answerChoices.forEach(el => {
        el.parentElement.querySelector('.answer-marker').style.display = 'none';
      });
      
      // Mark selected answer
      selectedAnswer = this.dataset.answer;
      this.parentElement.querySelector('.answer-marker').style.display = 'flex';
      
      // Show verify button and hide try again message/husky/hint
      verifyButton.style.display = 'block';
      document.getElementById('tryAgainMessage').style.display = 'none';
      document.getElementById('huskyImage').style.display = 'none';
      document.getElementById('hintBox').style.display = 'none';
    });
  });
  
  // Verify button click
  verifyButton.addEventListener('click', function() {
    if (selectedAnswer === 'c') {
      // Correct answer - hide captcha and go to second screen
      document.getElementById('captchaContainer').style.display = 'none';
      dialogue.style.display = 'none';
      checkbox.checked = false;
      
      // Trigger second screen
      if (typeof showSecondScreen === 'function') {
        showSecondScreen();
      }
    } else {
      // Wrong answer - show try again message, husky image, and hint
      document.getElementById('tryAgainMessage').style.display = 'block';
      document.getElementById('huskyImage').style.display = 'block';
      document.getElementById('hintBox').style.display = 'block';
      verifyButton.style.display = 'none';
      selectedAnswer = null;
    }
  });
}

function showSecondScreen() {
  const secondScreen = document.getElementById('secondScreen');
  secondScreen.classList.add('show');
  
  // Add nerd shiba and finger animation on input focus
  let nerdShibaShown = false;
  const securityInputs = document.querySelectorAll('.security-input');
  securityInputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (!nerdShibaShown) {
        const unit = document.createElement('div');
        unit.className = 'bottom-right-unit';
        
        const finger = document.createElement('img');
        finger.id = 'finger';
        finger.src = 'assets/finger.png';
        
        const nerdShiba = document.createElement('img');
        nerdShiba.id = 'nerdShiba';
        nerdShiba.src = 'assets/nerd-shiba.png';
        
        unit.appendChild(finger);
        unit.appendChild(nerdShiba);
        document.body.appendChild(unit);
        nerdShibaShown = true;
        
        // Show dialogue box after animation completes (1s)
        setTimeout(() => {
          const dialogue = document.createElement('div');
          dialogue.className = 'nerd-shiba-dialogue';
          
          const arrow = document.createElement('div');
          arrow.className = 'nerd-shiba-dialogue-arrow';
          
          dialogue.textContent = 'I will cut you some slack if you write in all lower case! but if you get some of them wrong, I\'ll leave you guessing on which one is wrong! heeheehee';
          dialogue.appendChild(arrow);
          document.body.appendChild(dialogue);
        }, 500);
      }
    });
  });
  // Add submit button functionality
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function() {
    const answer1 = document.getElementById('question1').value.trim();
    const answer2 = document.getElementById('question2').value.trim();
    const answer3 = document.getElementById('question3').value.trim();
    const answer4 = document.getElementById('question4').value.trim();
    
    // Validate that all fields are filled
    if (answer1 === '' || answer2 === '' || answer3 === '' || answer4 === '') {
        alert('Please answer all questions before submitting.');
        return;
    }

    // Correct answers (case-insensitive comparison)
    const correctAnswers = {
      1: 'Nom Akor Tnout',
      2: 'Koh Rong Sanloem',
      3: 'Sora',
      4: 'snake'
    };
    // Check answers (case-insensitive)
    const isCorrect = 
      answer1.toLowerCase() === correctAnswers[1].toLowerCase() &&
      answer2.toLowerCase() === correctAnswers[2].toLowerCase() &&
      answer3.toLowerCase() === correctAnswers[3].toLowerCase() &&
      answer4.toLowerCase() === correctAnswers[4].toLowerCase();
    
    if (isCorrect) {      
      document.body.innerHTML = '';
      displayButterflyAnimation(3);
      showText();
      displayCatBouquet();
      displayVilla();
      playOceanWaves();
    } else {
      // Generic error message without revealing which answer is wrong
      alert('One or more answers are incorrect. Please try again.');
    }
  });
}

function showText() {
  const textElement = document.createElement('div');
  textElement.className = 'happy-valentines-text';
  textElement.textContent = "Will you be my Valentine?";
  textElement.style.fontFamily = 'aeiou';
  document.body.appendChild(textElement);
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  
  // Create first "yes" button
  const yesButton1 = document.createElement('button');
  yesButton1.className = 'yes-button';
  yesButton1.textContent = 'yes';
  yesButton1.addEventListener('click', function() {
    displayCouple();
    playVisitorQ();
  });
  
  // Create second "yes" button
  const yesButton2 = document.createElement('button');
  yesButton2.className = 'yes-button';
  yesButton2.textContent = 'yes';
  yesButton2.addEventListener('click', function() {
    displayCouple();
    playBreeze();
  });
  
  buttonContainer.appendChild(yesButton1);
  buttonContainer.appendChild(yesButton2);
  document.body.appendChild(buttonContainer);
}

function playVisitorQ() {
  let theme = new Audio('assets/visitor_q_trim.mp3');
  theme.volume = 0.4;
  theme.play();
}

function playBreeze() {
  let theme = new Audio('assets/breeze_trim.mp3');
  theme.volume = 0.7;
  theme.play();
}

function playOceanWaves() {
  let ocean = new Audio('assets/ocean.mp3');
  ocean.loop = true;
  ocean.volume = 0.4;
  ocean.play();
}

function displayCouple() {
  document.body.removeChild(document.body.getElementsByClassName('happy-valentines-text')[0]);
  document.body.removeChild(document.body.getElementsByClassName('button-container')[0]);
  document.body.removeChild(document.body.getElementsByClassName('cat-bouquet-image')[0]);
  document.body.removeChild(document.body.getElementsByClassName('butterfly-animation')[0]);
  const couple = document.createElement('img');
  couple.src = 'assets/backshot.png';
  couple.className = 'couple-image';
  document.body.appendChild(couple);
}

function displayCatBouquet() {
  const catBouquet = document.createElement('img');
  catBouquet.src = 'assets/cat.gif';
  catBouquet.className = 'cat-bouquet-image';
  document.body.appendChild(catBouquet);
}

function displayVilla() {
  const villa = document.createElement('img');
  villa.src = 'assets/villa.jpg';
  villa.className = 'villa-image';
  document.body.appendChild(villa);
}

function displayButterflyAnimation(count = 1) {
  // Create array to store butterfly data
  const butterflies = [];
  
  // Create butterfly elements and initialize their motion data
  for (let i = 0; i < count; i++) {
    const butterfly = document.createElement('img');
    butterfly.src = 'assets/butterfly-speed.gif';
    butterfly.className = 'butterfly-animation';
    document.body.appendChild(butterfly);
    butterfly.style.height = (4**(2 + Math.random())) + 30 + 'px';
    // Store butterfly data
    butterflies.push({
      element: butterfly,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      velocityX: 0,
      velocityY: 0,
      angle: Math.random() * Math.PI * 2,
      speed: 2,
      turnAmount: 0.4
    });
  }
  
  function animateButterflyStep() {
    // Update each butterfly
    butterflies.forEach(butterfly => {
      // Random change in direction (Brownian motion)
      butterfly.angle += (Math.random() - 0.5) * butterfly.turnAmount;
      
      // Calculate new velocity based on angle
      butterfly.velocityX = Math.cos(butterfly.angle) * butterfly.speed;
      butterfly.velocityY = Math.sin(butterfly.angle) * butterfly.speed;
      
      // Update position
      butterfly.x += butterfly.velocityX;
      butterfly.y += butterfly.velocityY;
      
      // Bounce off walls
      if (butterfly.x < 0) butterfly.x = window.innerWidth;
      if (butterfly.x > window.innerWidth) butterfly.x = 0;
      if (butterfly.y < 0) butterfly.y = window.innerHeight;
      if (butterfly.y > window.innerHeight) butterfly.y = 0;
      
      // Update butterfly position and rotation
      const displayAngle = (butterfly.angle * 180 / Math.PI) + 90;
      butterfly.element.style.left = (butterfly.x - 50) + 'px';
      butterfly.element.style.top = (butterfly.y - 50) + 'px';
      butterfly.element.style.transform = `rotate(${displayAngle}deg)`;
    });
    
    requestAnimationFrame(animateButterflyStep);
  }
  
  animateButterflyStep();
}

// Initialize captcha on page load
document.addEventListener('DOMContentLoaded', initializeCaptcha);

