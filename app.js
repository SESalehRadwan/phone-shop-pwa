fetch("phones.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("phone-list");
    data.forEach(phone => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${phone.image}" alt="${phone.name}">
        <h3>${phone.name}</h3>
        <p>${phone.description}</p>
        <strong>${phone.price}</strong>
      `;
      container.appendChild(card);
    });
  });