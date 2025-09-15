function toggleForm(formType) {
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById(`${formType}-form`).classList.remove('hidden');
  document.getElementById('message').textContent = '';
}

function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (localStorage.getItem(email)) {
    document.getElementById('message').textContent = '❌ Account already exists.';
    return;
  }

  const userData = { username, password };
  localStorage.setItem(email, JSON.stringify(userData));
  document.getElementById('message').textContent = '✅ Account created successfully!';
  event.target.reset();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const storedUser = localStorage.getItem(email);
  if (!storedUser) {
    document.getElementById('message').textContent = '❌ No account found.';
    return;
  }

  const userData = JSON.parse(storedUser);
  if (userData.password === password) {
    document.getElementById('message').textContent = `✅ Welcome back, ${userData.username}!`;
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
  } else {
    document.getElementById('message').textContent = '❌ Incorrect password.';
  }
}

function calculateBudget(event) {
  event.preventDefault();

  const income = parseFloat(document.getElementById('income').value);
  const rent = parseFloat(document.getElementById('rent').value);
  const food = parseFloat(document.getElementById('food').value);
  const transport = parseFloat(document.getElementById('transport').value);
  const entertainment = parseFloat(document.getElementById('entertainment').value);
  const other = parseFloat(document.getElementById('other').value);

  const totalExpenses = rent + food + transport + entertainment + other;
  const savings = income - totalExpenses;
  const savingsPercent = ((savings / income) * 100).toFixed(1);

  // Budget Summary
  let advice = '';
  if (savings < 0) {
    advice = "⚠️ You're overspending! Cut back on entertainment or extras.";
  } else if (savingsPercent < 20) {
    advice = "🟡 Saving less than 20%. Try reducing food delivery or travel costs.";
  } else {
    advice = "✅ Great job! You're saving a healthy portion of your income.";
  }

  document.getElementById('budget-summary').innerHTML = `
    <h3>📊 Budget Summary</h3>
    <p><strong>Total Expenses:</strong> ₹${totalExpenses}</p>
    <p><strong>Savings:</strong> ₹${savings} (${savingsPercent}%)</p>
    <p><strong>Advice:</strong> ${advice}</p>
    <ul>
      <li>🏠 Rent/Hostel: ₹${rent}</li>
      <li>🍽️ Food: ₹${food}</li>
      <li>🚌 Transport: ₹${transport}</li>
      <li>🎉 Entertainment: ₹${entertainment}</li>
      <li>🧾 Other: ₹${other}</li>
    </ul>
  `;

  // Dynamic Savings Goals
  let goalText = '';
  if (savings < 0) {
    goalText = `
      <h3>🎯 Savings Goals</h3>
      <p>You're spending more than you earn. Start by cutting non-essentials and aim to save ₹500–₹1,000/month.</p>
      <p>Use a daily tracker to monitor every rupee.</p>
    `;
  } else if (savingsPercent < 20) {
    goalText = `
      <h3>🎯 Savings Goals</h3>
      <p>You're saving a little—great start! Set a goal of ₹2,000–₹3,000/month and automate transfers to a savings account.</p>
      <p>Consider reducing impulse purchases and subscriptions.</p>
    `;
  } else {
    goalText = `
      <h3>🎯 Savings Goals</h3>
      <p>You're doing well! Aim for ₹5,000+/month and explore investment options like SIPs or PPF.</p>
      <p>Challenge yourself with a 30-day no-spend challenge!</p>
    `;
  }
  document.getElementById('savings-goal').innerHTML = goalText;

  // Dynamic Financial Tips
  let tipsHTML = '<h3>💡 Financial Tips</h3><ul>';
  if (savings < 0) {
    tipsHTML += `
      <li>Track every expense manually for 2 weeks.</li>
      <li>Pause all non-essential spending.</li>
      <li>Use cash envelopes for categories like food and travel.</li>
    `;
  } else if (savingsPercent < 20) {
    tipsHTML += `
      <li>Use budgeting apps to visualize spending.</li>
      <li>Set weekly spending limits for entertainment.</li>
      <li>Cook at home 4+ times a week to save on food.</li>
    `;
  } else {
    tipsHTML += `
      <li>Start a SIP or recurring deposit with your savings.</li>
      <li>Review your budget monthly and adjust goals.</li>
      <li>Teach a friend or sibling how to budget—it reinforces your habits!</li>
    `;
  }
  tipsHTML += '</ul>';
  document.getElementById('tips-list').innerHTML = tipsHTML;
}