function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const apiUrl = `https://www.balldontlie.io/api/v1/players`;
fetchData(apiUrl)
  .then((data) => {
    console.log(data);
    const sorteddata = data.data.sort((a, b) => {
      let nameA = a.first_name.toLowerCase();

      let nameB = b.first_name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameB < nameA) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(sorteddata);
    sorteddata.forEach((details) => {
      let firstName = details.first_name;
      let lastName = details.last_name;
      let heightFt = details.height_feet;
      let heightIn = details.height_inches;
      let teamName = details.team.name;
      let teamCity = details.team.city;
      let weight = Math.round(details.weight_pounds * 0.453592);
      let playerdetails = document.createElement("div");
      let cardBody = document.getElementById("cardbody");
      playerdetails.className = "card col-xxl-4 col-lg-6 p-2 m-1";
      playerdetails.innerHTML = `
        <pre>
        <h2 class="textcenter">${firstName} ${lastName}</h2>
<h4>Height  :  ${heightFt || 6}' ${heightIn || ""}"</h4><h4>Weight  :  ${
        weight || 80
      } kgs</h4><h4>Team    :  ${teamName}</h4><h4>City    : ${teamCity}</h4></pre>`;
      cardBody.appendChild(playerdetails);
    });
  })

  .catch((error) => {
    console.error("Error fetching data:", error);
    // Handle the error
  });
